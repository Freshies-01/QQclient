import { ExportToCsv } from 'export-to-csv';
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import { ISeparationApplication, Status } from "app/shared/model/separation-application.model";

@Component({
  selector: "app-application-report-card",
  templateUrl: "./application-report-card.component.html",
  styles: []
})
export class ApplicationReportCardComponent implements OnInit {
  separationApplications: ISeparationApplication[];
  data: {ID: Number, Status: Status, User: String, HR: String, FR: String,
    DateSubmitted: Date, DateApproved: Date, DateCompleted: Date, DateOfLeave: Date}[] = [];

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

  ngOnInit() {
    this.loadClosed();
  }

  loadClosed() {
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  csvGen() {
    if (this.separationApplications === null) { return; }
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'SA Report',
      useBom: true,
      useKeysAsHeaders: true,
    };
  const csvExporter = new ExportToCsv(options);
  for (let i = 0; i < this.separationApplications.length; i++) {
    const sa = this.separationApplications[i];
    this.data.push({ID: sa.id, Status: sa.status, User: sa.employee.user.firstName + " " + sa.employee.user.lastName,
                  HR: sa.hr.employee.user.firstName + " " + sa.hr.employee.user.lastName,
                  FR: sa.fr.employee.user.firstName + " " + sa.fr.employee.user.lastName,
                  DateSubmitted: sa.dateSumbitted.toDate(), DateApproved: sa.dateApproved.toDate(),
                  DateCompleted: sa.dateCompleted.toDate(), DateOfLeave: sa.dateOfLeave.toDate()});
  }
  csvExporter.generateCsv(this.data);
  }
}
