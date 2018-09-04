import { Routes } from "@angular/router";

import { DepartmentListComponent } from "app/department/department-list/department-list.component";
import { DepartmentChangeComponent } from "app/department/department-change/department-change.component";

export const departmentRoutes: Routes = [
  {
    path: "department/browse",
    component: DepartmentListComponent
  },
  {
    path: "department/new",
    component: DepartmentChangeComponent
  }
];
