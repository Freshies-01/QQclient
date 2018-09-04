import { Component, OnInit, Input, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeparationApplicationService } from "app/shared/Services/separation-application.service";
import {
  ISeparationApplication,
  SeparationApplication
} from "app/shared/model/separation-application.model";
import { IAction, ActionStatus } from "app/shared/model/action.model";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ActionService } from "app/shared/Services/action.service";
import { Observable } from "rxjs";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { FunctionRepsService } from "app/shared/Services/function-reps.service";
// import { JhiEventManager } from "ng-jhipster";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface ActionData {
  action: IAction;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: "jhi-action-list",
  templateUrl: "./action-list.component.html",
  styleUrls: ["./action-list.component.css"],
  providers: [SeparationApplicationService]
})
export class ActionListComponent implements OnInit {
  actions: IAction[];
  private _action: IAction;
  functionRep: IFunctionReps;
  @Input() saId: number;
  isSaving: boolean;
  separationApplication: ISeparationApplication;

  public actionForm = new FormGroup({
    id: new FormControl(""),
    task: new FormControl("")
  });

  constructor(
    private separationApplicationService: SeparationApplicationService,
    private actionService: ActionService,
    private functionRepsService: FunctionRepsService,
    // private eventManager: JhiEventManager,
    public dialog: MatDialog
  ) {}

  loadActions() {
    this.separationApplicationService.queryActions(this.saId).subscribe(
      (res: HttpResponse<IAction[]>) => {
        this.actions = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadFr() {
    this.functionRepsService.findCurrentFunctionRep().subscribe(
      (res: HttpResponse<IFunctionReps>) => {
        this.functionRep = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  getApp() {
    this.separationApplicationService.find(this.saId).subscribe(
      (res: HttpResponse<ISeparationApplication>) => {
        this.separationApplication = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  save() {
    const action: IAction = this.actionForm.getRawValue();
    if (action.task === "" || null) {
      return;
    }
    this.actionForm.reset();
    action.id = undefined;
    action.isCompleted = false;
    action.separationApplication = this.separationApplication;
    action.separationApplication.id = this.saId;
    action.functionReps = this.functionRep;
    this.isSaving = true;
    this.updateAction(action);
  }

  toggleCompleted(action: IAction) {
    action.isCompleted = !action.isCompleted;
    this.updateAction(action);
  }

  updateAction(action: IAction) {
    if (action.id !== undefined) {
      this.subscribeToSaveResponse(this.actionService.update(action));
    } else {
      this.subscribeToSaveResponse(this.actionService.create(action));
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
    this.loadActions();
  }

  private onSaveError() {
    this.isSaving = false;
    this.loadActions();
  }

  confirmDelete(id: number) {
    this.actionService.delete(id).subscribe(response => {
      // this.eventManager.broadcast({
      //   name: "actionListModification",
      //   content: "Deleted an action"
      // });
      this.loadActions();
    });
  }

  dispute(action: IAction) {
    // increment numDisputes
    // if numDisputes > 2, reveal 'accept', 'delete', and 'edit' button to HR
    // change text of action.task to red
    // disable dispute button
    action.numDisputes++;
    action.actionStatus = ActionStatus.DISPUTED;
    this.updateAction(action);
  }

  openDialog(action: IAction): void {
    const dialogRef = this.dialog.open(ActionEditPopupComponent, {
      width: "400px",
      height: "200px",
      data: { editAction: action }
    });

    dialogRef.afterClosed().subscribe(editAction => {
      action.task = editAction.task;
      action.actionStatus = ActionStatus.EDITED;
      this.updateAction(action);
    });
  }

  edit(action: IAction) {
    // set action.task to form value
    // change action.task text color to normal
    // reenable dispute button
    const editAction: IAction = this.actionForm.getRawValue();
    if (editAction.task === "" || null || action.task) {
      return;
    }
    // console.log(action.id);
    action.task = editAction.task;
    action.actionStatus = ActionStatus.EDITED;
    this.updateAction(action);
  }

  accept(action: IAction) {
    // set action.task text style to BOLD
    // remove ability to edit this action
    action.numDisputes = 0;
    action.actionStatus = ActionStatus.ACCEPTED;
    this.updateAction(action);
  }

  ngOnInit() {
    this.loadActions();
    this.loadFr();
    this.getApp();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: "jhi-action-edit-popup",
  template: 'passed in {{data.editAction}}',
  templateUrl: "action-edit-popup.html",
  providers: [SeparationApplicationService]
})
export class ActionEditPopupComponent {

  public actionEditForm = new FormGroup({
    task: new FormControl("")
  });

  constructor(
    public dialogRef: MatDialogRef<ActionEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAction
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    const editAction: IAction = this.actionEditForm.getRawValue();
    if (editAction.task === "" || null) {
      return;
    }
    // console.log(action.id);
    this.dialogRef.close(editAction);
  }
}
