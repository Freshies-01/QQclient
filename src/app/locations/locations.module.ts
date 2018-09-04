import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationListComponent } from "./location-list/location-list.component";
import { ReactiveFormsModule } from "@angular/forms";

import { Routes } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { LocationChangeComponent } from "./location-change/location-change.component";

@NgModule({
  imports: [SharedModule],
  declarations: [LocationListComponent, LocationChangeComponent]
})
export class LocationsModule {}
