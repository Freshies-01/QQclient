import { Moment } from "moment";
import { IEmployee } from "app/shared/model//employee.model";
import { ISeparationApplication } from "app/shared/model//separation-application.model";

export const enum EditType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export interface ISeparationApplicationLog {
  id?: number;
  editType?: EditType;
  dateEdited?: Moment;
  employee?: IEmployee;
  separationApplication?: ISeparationApplication;
}

export class SeparationApplicationLog implements ISeparationApplicationLog {
  constructor(
    public id?: number,
    public editType?: EditType,
    public dateEdited?: Moment,
    public employee?: IEmployee,
    public separationApplication?: ISeparationApplication
  ) {}
}
