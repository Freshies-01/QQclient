import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationListComponent } from "./location-list/location-list.component";

import { Routes } from "@angular/router";

export const locationRoutes: Routes = [
  {
    path: "location",
    component: LocationListComponent
  }
];

@NgModule({
  imports: [CommonModule],
  declarations: [LocationListComponent]
})
export class LocationsModule {}
