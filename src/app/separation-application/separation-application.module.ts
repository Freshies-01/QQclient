import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { SeparationApplicationListComponent } from "./separation-application-list/separation-application-list.component";
import { SeparationApplicationFormComponent } from "./separation-application-form/separation-application-form.component";
import { ActionListComponent } from "./action-list/action-list.component";

import { AngularMaterialModule } from "app/shared/angular-material.module";
import { SharedModule } from "app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    SeparationApplicationListComponent,
    SeparationApplicationFormComponent,
    ActionListComponent
  ]
})
export class SeparationApplicationModule {}
