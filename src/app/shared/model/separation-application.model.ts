import { Moment } from "moment";
import { IEmployee } from "app/shared/model/employee.model";
import { IAction } from "app/shared/model/action.model";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { IFunctionReps } from "app/shared/model/function-reps.model";

export enum Status {
  PENDING = "Pending",
  UNDER_REVIEW_FR = "Under Review By FR",
  EMPLOYEE_TASKS_IN_PROGRESS = "Employee Tasks In Progress",
  EMPLOYEE_TASKS_COMPLETED = "Employee Tasks Completed",
  CLOSED_BY_HR = "Closed By HR"
}

export interface ISeparationApplication {
  id?: number;
  status?: Status;
  dateOfLeave?: Moment;
  dateSumbitted?: Moment;
  dateCompleted?: Moment;
  dateApproved?: Moment;
  employee?: IEmployee;
  actions?: IAction[];
  hr?: IHrReps;
  fr?: IFunctionReps;
}

export class SeparationApplication implements ISeparationApplication {
  constructor(
    public id?: number,
    public status?: Status,
    public dateOfLeave?: Moment,
    public dateSumbitted?: Moment,
    public dateCompleted?: Moment,
    public dateApproved?: Moment,
    public employee?: IEmployee,
    public actions?: IAction[],
    public hr?: IHrReps,
    public fr?: IFunctionReps
  ) {}
}
