import { IEmployee } from "app/shared/model/employee.model";

export const enum DepartmentCodes {
  IT = "IT",
  EXEC = "EXEC",
  LGL = "LGL",
  FINAC = "FINAC",
  DEV = "DEV",
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
