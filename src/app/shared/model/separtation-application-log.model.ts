import { Moment } from "moment";
import { IEmployee } from "app/shared/model/employee.model";
import { IAction } from "app/shared/model/action.model";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { ISeparationApplication } from "app/shared/model/separation-application.model";

export const enum Status {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  CLOSED = "CLOSED",
  IN_PROGRESS = "IN_PROGRESS"
}

export const enum EditType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export interface ISepartationApplicationLog {
  id?: number;
  status?: Status;
  dateApproved?: Moment;
  dateSubmitted?: Moment;
  dateCompleted?: Moment;
  dateOfLeave?: Moment;
  actionAdded?: boolean;
  dateEdited?: Moment;
  editType?: EditType;
  editor?: IEmployee;
  action?: IAction;
  hrReps?: IHrReps;
  functionReps?: IFunctionReps;
  employee?: IEmployee;
  separationApplication?: ISeparationApplication;
}

export class SepartationApplicationLog implements ISepartationApplicationLog {
  constructor(
    public id?: number,
    public status?: Status,
    public dateApproved?: Moment,
    public dateSubmitted?: Moment,
    public dateCompleted?: Moment,
    public dateOfLeave?: Moment,
    public actionAdded?: boolean,
    public dateEdited?: Moment,
    public editType?: EditType,
    public editor?: IEmployee,
    public action?: IAction,
    public hrReps?: IHrReps,
    public functionReps?: IFunctionReps,
    public employee?: IEmployee,
    public separationApplication?: ISeparationApplication
  ) {
    this.actionAdded = false;
  }
}
