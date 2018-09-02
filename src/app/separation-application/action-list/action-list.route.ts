import {
  Routes,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { ActionDeletePopupComponent } from "../../../../entities/action/action-delete-dialog.component";
import { IAction, Action } from "app/shared/model/action.model";
import { ActionService } from "app/entities/action";
import { map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { of } from "rxjs";
import { UserRouteAccessService } from "app/core";

@Injectable({ providedIn: "root" })
export class ActionResolve implements Resolve<IAction> {
  constructor(private service: ActionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service
        .find(id)
        .pipe(map((action: HttpResponse<Action>) => action.body));
    }
    return of(new Action());
  }
}

export const actionPopupRoute: Routes = [
  {
    path: "action/:id/delete",
    component: ActionDeletePopupComponent,
    resolve: {
      action: ActionResolve
    },
    data: {
      authorities: [],
      pageTitle: "Actions"
    },
    canActivate: [UserRouteAccessService],
    outlet: "popup"
  }
];
