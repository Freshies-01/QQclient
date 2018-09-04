import { IEmployee } from "app/shared/model/employee.model";

export enum DepartmentCodes {
  IT = "IT",
  Executive = "EXEC",
  Legal = "LGL",
  Financial = "FINAC",
  Development = "DEV",
  HR = "HR"
}

export interface IDepartment {
  id?: number;
  name?: DepartmentCodes;
  employees?: IEmployee[];
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public name?: DepartmentCodes,
    public employees?: IEmployee[]
  ) {}
}
