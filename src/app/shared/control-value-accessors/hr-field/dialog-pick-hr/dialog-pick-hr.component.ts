import {
  Component,
  OnInit,
  Inject,
  AfterContentInit,
  OnDestroy,
  Input
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { HrReps } from "app/shared/model/hr-reps.model";
import { EmployeeService } from "app/entities/employee/employee.service";
import { HrRepsService } from "app/entities/hr-reps/hr-reps.service";
import { createRequestOption } from "app/shared/util/request-util";

import { fromEvent, Subscription } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

export interface DialockPickHrData {
  selectedHrRep: HrReps;
}

@Component({
  selector: "jhi-dialog-pick-hr",
  templateUrl: "./dialog-pick-hr.component.html",
  styleUrls: ["./dialog-pick-hr.component.css"]
})
export class DialogPickHrComponent
  implements OnInit, AfterContentInit, OnDestroy {
  hrRepPool: HrReps[];
  filteredHrReps: HrReps[];
  filterFieldSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<DialogPickHrComponent>,
    private hrService: HrRepsService,
    @Inject(MAT_DIALOG_DATA) private passedInData
  ) {}

  ngOnInit() {
    this.populateEmployeePool();
  }

  populateEmployeePool() {
    this.hrService
      .query(this.passedInData.requestParameters)
      .subscribe(result => {
        this.hrRepPool = result.body;
        this.filteredHrReps = this.hrRepPool;
      });
  }

  ngAfterContentInit() {
    const searchBox = document.getElementById("search-box") as HTMLInputElement;

    const searchBarObservable = fromEvent(searchBox, "input").pipe(
      map((event: KeyboardEvent) => (event.target as HTMLOutputElement).value),
      debounceTime(10),
      distinctUntilChanged()
    );

    this.filterFieldSubscription = searchBarObservable.subscribe(data => {
      this.FilterBySearchTerm(data);
    });
  }

  FilterBySearchTerm(searchTerm: string) {
    this.filteredHrReps = this.hrRepPool.filter(item => {
      const firstAndLastName = `${item.employee.user.firstName} ${
        item.employee.user.lastName
      }`;
      const RegularExpression = new RegExp(searchTerm, "gmi");
      return firstAndLastName.match(RegularExpression);
    });
  }

  onHrSelected(pickedHrRep: HrReps) {
    this.dialogRef.close(pickedHrRep);
  }

  ngOnDestroy() {
    this.filterFieldSubscription.unsubscribe();
  }
}
