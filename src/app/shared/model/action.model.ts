import { Moment } from "moment";
import { ISeparationApplication } from "app/shared/model//separation-application.model";
import { IFunctionReps } from "app/shared/model//function-reps.model";

export interface IAction {
  id?: number;
  isCompleted?: boolean;
  task?: string;
  dateCompleted?: Moment;
  separationApplication?: ISeparationApplication;
  functionReps?: IFunctionReps;
}

export class Action implements IAction {
  constructor(
    public id?: number,
    public isCompleted?: boolean,
    public task?: string,
    public dateCompleted?: Moment,
    public separationApplication?: ISeparationApplication,
    public functionReps?: IFunctionReps
  ) {
    this.isCompleted = false;
  }
}
