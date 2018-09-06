import { Component, OnInit, NgModule } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication,
  Status as SeparationApplicationStatus
} from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/shared/Services/employee.service";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { HrRepsService } from "app/shared/Services/hr-reps.service";
import { SeparationApplicationLogService } from "app/shared/Services/separation-application-log.service";
import { IFunctionReps } from "app/shared/model/function-reps.model";
// add import for SeparationApplicationLogService
import { FunctionRepsService } from "app/shared/Services/function-reps.service";
import { FormGroup, FormControl } from "@angular/forms";
import * as moment from "moment";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ISeparationApplicationLog, EditType } from "app/shared/model/separation-application-log.model";
import * as Moment from "moment";
@Component({
  selector: "app-separation-application-form",
  templateUrl: "./separation-application-form.component.html",
  styleUrls: ["./separation-application-form.component.css"]
})
export class SeparationApplicationFormComponent implements OnInit {
  statusOptions = SeparationApplicationStatus;
  private currentEmployee: IEmployee;

  public appForm = new FormGroup({
    id: new FormControl(null),
    status: new FormControl(null),
    dateOfLeave: new FormControl(null),
    dateApproved: new FormControl(null),
    dateSumbitted: new FormControl(null),
    dateCompleted: new FormControl(null),
    location: new FormControl(null),
    employee: new FormControl(null),
    fr: new FormControl(null),
    hr: new FormControl(null)
  });

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private hrRepsService: HrRepsService,
    private functionRepsService: FunctionRepsService,
    private employeeService: EmployeeService,
    private logService: SeparationApplicationLogService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(routeData => {
      if (routeData.separationApplication.id) {
        this.mapSeparationApplicationToAppForm(routeData.separationApplication);
      }
    });
    this.loadCurrentEmployee();
  }

  mapSeparationApplicationToAppForm(sa: SeparationApplication) {
    // If the record we got here has id, then this record allready exists and we need to populate the form with it
    // If not, then then we just stick empty values that form is initialized with
    const adjustedSa: any = sa;
    // remapping of values because angular material expects default javascript date objects
    if (sa.dateOfLeave) {
      adjustedSa.dateOfLeave = sa.dateOfLeave.toDate();
    }
    if (sa.dateApproved) {
      adjustedSa.dateApproved = sa.dateApproved.toDate();
    }
    if (sa.dateCompleted) {
      adjustedSa.dateCompleted = sa.dateCompleted.toDate();
    }
    if (sa.dateSumbitted) {
      adjustedSa.dateSumbitted = sa.dateSumbitted.toDate();
    }
    this.appForm.patchValue(adjustedSa);
  }

  save() {
    const sa: SeparationApplication = this.appForm.getRawValue();
    // we have to convert dates back to momment because that is what jhipster expects
    sa.dateOfLeave = moment(sa.dateOfLeave);
    sa.dateApproved = moment(sa.dateApproved);
    // DEBUG: API demands that we submit these date fields - these values are not correct
    sa.dateSumbitted = moment(sa.dateSumbitted);
    sa.dateCompleted = moment(sa.dateCompleted);
    if (sa.id) {
      this.subscribeToSaveResponse(
        this.separationApplicationService.update(sa)
        // logService.create, editType is UPDATE
      );
      this.subscribeToSaveResponseMeh(this.logService.addToLog(
        Moment(Date.now()), this.currentEmployee, sa, EditType.UPDATE
      ));
    } else {
      this.subscribeToSaveResponse(
        this.separationApplicationService.create(sa)
      );
      this.subscribeToSaveResponseMeh(this.logService.addToLog(
        Moment(Date.now()), this.currentEmployee, sa, EditType.CREATE
      ));
    }
  }

  private subscribeToSaveResponseMeh(result: Observable<HttpResponse<ISeparationApplicationLog>>) {
    result.subscribe(
      (res: HttpResponse<ISeparationApplication>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess() {}

  private onSaveError() {}

  private subscribeToSaveResponse(
    result: Observable<HttpResponse<ISeparationApplication>>
  ) {
    result.subscribe(
      (res: HttpResponse<ISeparationApplication>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onError(errorMessage: string) {}

  loadCurrentEmployee() {
    this.employeeService.findCurrent().subscribe(
      (res: HttpResponse<IEmployee>) => {
        this.currentEmployee = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
}
