import { InjectionToken } from "@angular/core";

export class DashboardCard {
  static metadata: any = {
    NAME: new InjectionToken<string>("name"),
    ROUTERLINK: new InjectionToken<string>("routerLink"),
    COLOR: new InjectionToken<string>("color"),
    COLS: new InjectionToken<number>("cols"),
    ROWS: new InjectionToken<number>("rows")
  };
  constructor(
    private _input: {
      name: {
        key: InjectionToken<string>;
        value: string;
      };
      routerLink: {
        key: InjectionToken<string>;
        value: string;
      };
      color: {
        key: InjectionToken<string>;
        value: string;
      };
      cols: {
        key: InjectionToken<number>;
        value: number;
      };
      rows: {
        key: InjectionToken<number>;
        value: number;
      };
    },
    private _component: any
  ) {}

  get inputs(): any {
    return this._input;
  }

  get title(): any {
    return this._input.name.value;
  }

  get component(): any {
    return this._component;
  }
}
