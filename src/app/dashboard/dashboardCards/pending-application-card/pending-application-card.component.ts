import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import { ISeparationApplication } from "app/shared/model/separation-application.model";

@Component({
  selector: "app-pending-application-card",
  templateUrl: "./pending-application-card.component.html",
  styles: []
})
export class PendingApplicationCardComponent implements OnInit {
  pendingApplications: ISeparationApplication[];
  separationApplications: ISeparationApplication[];
  numPending = 0;

  constructor(
    private separationApplicationService: SeparationApplicationService
  ) {}

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.separationApplicationService.queryPending().subscribe(
      (res: HttpResponse<ISeparationApplication[]>) => {
        this.pendingApplications = res.body;
        this.numPending = this.pendingApplications.length;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
}
