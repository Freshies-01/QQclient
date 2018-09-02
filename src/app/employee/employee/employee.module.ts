import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { EmployeeListComponent } from "app/Q_Q/records/employee/employee-list/employee-list.component";
import { EmployeeChangeComponent } from "./employee-change/employee-change.component";
import { AngularMaterialModule } from "app/shared/angular-material.module";
import { EmployeeRegisterComponent } from "./employee-register/employee-register.component";
import { DialogPickEmployeeComponent } from "app/q_q/records/employee/dialog-pick-employee/dialog-pick-employee.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeChangeComponent,
    EmployeeRegisterComponent,
    DialogPickEmployeeComponent
  ],
  entryComponents: [DialogPickEmployeeComponent]
})
export class MyEmployeeModule {}
