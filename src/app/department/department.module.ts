import { NgModule } from "@angular/core";
import { DepartmentListComponent } from "./department-list/department-list.component";

import { SharedModule } from "app/shared/shared.module";
import { DepartmentChangeComponent } from './department-change/department-change.component';

@NgModule({
  imports: [SharedModule],
  declarations: [DepartmentListComponent, DepartmentChangeComponent]
})
export class DepartmentModule {}
