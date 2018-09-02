import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { IAction } from "app/shared/model/action.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ActionService } from "app/shared/Services/action.service";
import { Observable } from "rxjs";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-action-list",
  templateUrl: "./action-list.component.html",
  styleUrls: ["./action-list.component.css"],
  providers: [SeparationApplicationService]
})
export class ActionListComponent implements OnInit {
  actions: IAction[];
  private action: IAction;
  @Input()
  saId: number;
  isSaving: boolean;

  // public actionForm = new FormGroup ({
  //   id: new FormControl("")
  // });

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private actionService: ActionService
  ) {}

  loadActions() {
    this.separationApplicationService.queryActions(this.saId).subscribe(
      (res: HttpResponse<IAction[]>) => {
        this.actions = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  save() {
    this.isSaving = true;
    if (this.action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(this.action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(this.action));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IAction>>) {
    result.subscribe(
      (res: HttpResponse<IAction>) => this.onSaveSuccess(),
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  private onSaveSuccess() {
    this.isSaving = false;
  }

  private onSaveError() {
    this.isSaving = false;
  }

  ngOnInit() {
    this.loadActions();
  }
}
