import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import { ISeparationApplication, Status } from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: "app-separation-application-list",
  templateUrl: "./separation-application-list.component.html",
  styleUrls: ["./separation-application-list.component.css"]
})
export class SeparationApplicationListComponent implements OnInit {
  separationApplications: ISeparationApplication[];
  pendingApplications: ISeparationApplication[];
  closedApplications: ISeparationApplication[];
  applications: ISeparationApplication[];
  data: {ID: Number, Status: Status, User: String, HR: String, FR: String,
        DateSubmitted: Date, DateApproved: Date, DateCompleted: Date, DateOfLeave: Date}[] = [];
  value = 100;

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

  queryApps() {
    this.separationApplicationService.findByLogin().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
        this.applications = this.separationApplications;
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

  loadAll() {
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
        this.applications = this.separationApplications;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  loadPending() {
    this.separationApplicationService.queryPending().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.pendingApplications = res.body;
        this.applications = this.pendingApplications;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  loadClosed() {
    this.separationApplicationService.queryClosed().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.closedApplications = res.body;
        this.applications = this.closedApplications;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  filterAll() {
    this.loadAll();
  }

  filterPending() {
    this.loadPending();
  }

  filterClosed() {
    this.loadClosed();
  }

  ngOnInit() {
    this.loadAll();
  }

  trackId(index: number, item: ISeparationApplication) {
    return item.id;
  }
}
