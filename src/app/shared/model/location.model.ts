import { IEmployee } from "app/shared/model/employee.model";

export const enum State {
  AL,	AK,	AZ,	AR,	CA,
  CO,	CT,	DE,	FL,	GA,
  HI,	ID,	IL, IN,	IA,
  KS,	KY,	LA,	ME,	MD,
  MA,	MI,	MN,	MS, MO,
  MT, NE, NV,	NH, NJ,
  NM,	NY,	NC,	ND,	OH,
  OK,	OR,	PA,	RI, SC,
  SD, TN,	TX,	UT, VT,
  VA,	WA,	WV,	WI,	WY
}

export const enum Country {
  USA = "United"
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
