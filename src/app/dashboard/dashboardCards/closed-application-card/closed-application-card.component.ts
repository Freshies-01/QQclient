import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";

@Component({
  selector: "app-closed-application-card",
  templateUrl: "./closed-application-card.component.html",
  styles: []
})
export class ClosedApplicationCardComponent implements OnInit {
  numClosed = 0;
  separationApplications: ISeparationApplication[];
  closedApplications: ISeparationApplication[];

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

  ngOnInit() {
    this.loadClosed();
  }

  loadClosed() {
    this.separationApplicationService.queryClosed().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.closedApplications = res.body;
        this.numClosed = this.closedApplications.length;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
}
