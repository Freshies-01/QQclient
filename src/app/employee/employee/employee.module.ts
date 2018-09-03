import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeChangeComponent } from "./employee-change/employee-change.component";
import { AngularMaterialModule } from "app/shared/angular-material.module";
import { EmployeeRegisterComponent } from "./employee-register/employee-register.component";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeChangeComponent,
    EmployeeRegisterComponent
  ],
  entryComponents: []
})
export class MyEmployeeModule {}
