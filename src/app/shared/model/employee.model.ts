import { ILocation } from "app/shared/model/location.model";
import { ISeparationApplication } from "app/shared/model/separation-application.model";
import { IUser } from "app/core/user/user.model";
import { IHrReps } from "app/shared/model/hr-reps.model";
import { IFunctionReps } from "app/shared/model/function-reps.model";
import { IDepartment } from "app/shared/model/department.model";

export interface IEmployee {
  id?: number;
  location?: ILocation;
  separationApplication?: ISeparationApplication;
  user?: IUser;
  hr?: IHrReps;
  fr?: IFunctionReps;
  department?: IDepartment;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public location?: ILocation,
    public separationApplication?: ISeparationApplication,
    public user?: IUser,
    public hr?: IHrReps,
    public fr?: IFunctionReps,
    public department?: IDepartment
  ) {}
}
