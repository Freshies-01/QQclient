import { NgModule, Injectable } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationListComponent } from "./location-list/location-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes
} from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { LocationChangeComponent } from "./location-change/location-change.component";
import { LocationService } from "app/shared/Services/location.service";
import { ILocation } from "app/shared/model/location.model";

@Injectable({ providedIn: "root" })
export class LocationResolver implements Resolve<ILocation> {
  constructor(private locationService: LocationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.locationService
        .find(id)
        .pipe(map((location: HttpResponse<Location>) => location.body));
    }
    return of(new Location());
  }
}

export const locationRoutes: Routes = [
  {
    path: "location/new",
    component: LocationChangeComponent
  },
  {
    path: "location/:id/view",
    component: LocationChangeComponent,
    resolve: {
      location: LocationResolver
    }
  },
  {
    path: "location",
    component: LocationListComponent
  }
];
