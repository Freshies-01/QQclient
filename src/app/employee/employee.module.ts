import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeChangeComponent } from "./employee-change/employee-change.component";
import { SharedModule } from "app/shared/shared.module";
import { EmployeeRegisterComponent } from "app/employee/employee-register/employee-register.component";

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
  declarations: [
    EmployeeListComponent,
    EmployeeChangeComponent,
    EmployeeRegisterComponent
  ],
  entryComponents: []
})
export class MyEmployeeModule {}
