import { Component, OnInit } from "@angular/core";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import { ISeparationApplication, Status } from "app/shared/model/separation-application.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

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
  value: number;

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

  trackActionProgress(apps: ISeparationApplication[]) {
    console.log(apps);
    for (const app of apps) {
      if (app.actions) {
        if (app.actions.length === 0) {
          return;
        }
        let numCompleted = 0;
        for (const action of app.actions) {
          if (action.isCompleted === true) {
            numCompleted++;
          }
        }
        this.value = (numCompleted / app.actions.length) * 100;
      }
    }
  }

  queryApps() {
    this.separationApplicationService.findByLogin().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
        this.applications = this.separationApplications;
        // this.trackActionProgress(this.applications);
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadAll() {
    this.separationApplicationService.query().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.separationApplications = res.body;
        this.applications = this.separationApplications;
        // this.trackActionProgress(this.applications);
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  loadPending() {
    this.separationApplicationService.queryPending().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.pendingApplications = res.body;
        this.applications = this.pendingApplications;
        // this.trackActionProgress(this.applications);
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
  loadClosed() {
    this.separationApplicationService.queryClosed().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.closedApplications = res.body;
        this.applications = this.closedApplications;
        // this.trackActionProgress(this.applications);
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  filterAll() {
    this.queryApps();
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
