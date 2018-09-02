import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeFieldComponent } from "./employee-field/employee-field.component";
import { AngularMaterialModule } from "app/shared/angular-material.module";
import { DialogPickHrComponent } from "./hr-field/dialog-pick-hr/dialog-pick-hr.component";
import { HrFieldComponent } from "app/shared/control-value-accessors/hr-field/hr-field.component";
import { FrFieldComponent } from "./fr-field/fr-field.component";
import { DialogPickFrComponent } from "./fr-field/dialog-pick-fr/dialog-pick-fr.component";
import { DialogPickEmployeeComponent } from "./employee-field/dialog-pick-employee/dialog-pick-employee.component";

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [
    EmployeeFieldComponent,
    DialogPickHrComponent,
    HrFieldComponent,
    FrFieldComponent,
    DialogPickFrComponent,
    DialogPickEmployeeComponent
  ],
  exports: [
    EmployeeFieldComponent,
    DialogPickHrComponent,
    HrFieldComponent,
    FrFieldComponent,
    DialogPickFrComponent
  ],
  entryComponents: [
    DialogPickHrComponent,
    DialogPickFrComponent,
    DialogPickEmployeeComponent
  ]
})
export class ControlValueAccessorsModule {}
