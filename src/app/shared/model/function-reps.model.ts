import { IEmployee } from "app/shared/model/employee.model";
import { ISeparationApplication } from "app/shared/model/separation-application.model";

export interface IFunctionReps {
  id?: number;
  employee?: IEmployee;
  applications?: ISeparationApplication[];
}

export class FunctionReps implements IFunctionReps {
  constructor(
    public id?: number,
    public employee?: IEmployee,
    public applications?: ISeparationApplication[]
  ) {}
}
