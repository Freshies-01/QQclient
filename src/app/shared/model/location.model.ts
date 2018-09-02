import { IEmployee } from "app/shared/model/employee.model";

export const enum State {
  IL = "IL"
}

export const enum Country {
  USA = "USA"
}

export interface ILocation {
  id?: number;
  address?: string;
  city?: string;
  state?: State;
  country?: Country;
  employees?: IEmployee[];
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public address?: string,
    public city?: string,
    public state?: State,
    public country?: Country,
    public employees?: IEmployee[]
  ) {}
}
