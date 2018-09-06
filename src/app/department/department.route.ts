import { Routes, Resolve } from "@angular/router";

import { DepartmentListComponent } from "app/department/department-list/department-list.component";
import { DepartmentChangeComponent } from "app/department/department-change/department-change.component";

export const departmentRoutes: Routes = [
  {
    path: "department",
    children: [
      {
        path: "new",
        component: DepartmentChangeComponent
      },
      {
        path: ":id/change",
        component: DepartmentChangeComponent
      },
      {
        path: "",
        component: DepartmentListComponent
      }
    ]
  }
];
