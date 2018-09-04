import { Moment } from "moment";
import { ISeparationApplication } from "app/shared/model//separation-application.model";
import { IFunctionReps } from "app/shared/model//function-reps.model";

export const enum ActionStatus {
  DISPUTED = "DISPUTED",
  EDITED = "EDITED",
  ACCEPTED = "ACCEPTED"
}

export interface IAction {
  id?: number;
  isCompleted?: boolean;
  task?: string;
  dateCompleted?: Moment;
  numDisputes?: number;
  actionStatus?: ActionStatus;
  separationApplication?: ISeparationApplication;
  functionReps?: IFunctionReps;
}

export class Action implements IAction {
  constructor(
    public id?: number,
    public isCompleted?: boolean,
    public task?: string,
    public dateCompleted?: Moment,
    public numDisputes?: number,
    public actionStatus?: ActionStatus,
    public separationApplication?: ISeparationApplication,
    public functionReps?: IFunctionReps
  ) {
    this.isCompleted = false;
  }
}
