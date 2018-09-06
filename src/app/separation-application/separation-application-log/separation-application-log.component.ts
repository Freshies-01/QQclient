import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";

import { ISeparationApplicationLog } from "app/shared/model/separation-application-log.model";
import { Principal } from "app/core";
import { SeparationApplicationLogService } from "app/shared/Services/separation-application-log.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "jhi-separation-application-log",
  templateUrl: "./separation-application-log.component.html",
  styleUrls: ["./separation-application-log.component.css"]
})
export class SeparationApplicationLogComponent implements OnInit {
  separationApplicationLogs: ISeparationApplicationLog[];
  currentAccount: any;
  eventSubscriber: Subscription;
  saId: number;
  displayedColumns: string[] = ['dateEdited', 'employee', 'separationApplication', 'editType'];

  constructor(
    private separationApplicationLogService: SeparationApplicationLogService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute
  ) {}

  loadAll() {
    this.separationApplicationLogService.query().subscribe(
      (res: HttpResponse<ISeparationApplicationLog[]>) => {
        this.separationApplicationLogs = res.body;
      }
    );
  }

  loadLogsById(id: number) {
    this.separationApplicationLogService.findBySaId(id).subscribe(
      (res: HttpResponse<ISeparationApplicationLog[]>) => {
        this.separationApplicationLogs = res.body;
        // console.log(this.separationApplicationLogs[0].id);
      }
    );
  }

  ngOnInit() {
    // this.activatedRoute.data.subscribe(routeData => {
    //   if (routeData.separationApplication.id) {
    //     this.loadLogsById(routeData.separationApplication.id);
    //   }
    // });
    this.loadAll();
  }

  trackId(index: number, item: ISeparationApplicationLog) {
    return item.id;
  }
}
