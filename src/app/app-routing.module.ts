import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes, Route } from "@angular/router";

import { LoginComponent } from "./shared/login-component/login.component";
import { NavigationLayoutComponent } from "app/layout/navigation-layout.component";

import { UserRouteAccessService } from "app/core/auth/user-route-access-service";

import { employeeRoutes } from "./employee/employee.route";
import { separationApplicationRoute } from "./separation-application/separation-application.route";
import { dashboardRoutes } from "./dashboard/dashboard.module";
import { locationRoutes } from "app/locations/locations.module";

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: {
      pageTitle: "Login"
    }
  },
  {
    path: "",
    component: NavigationLayoutComponent,
    canActivate: [UserRouteAccessService],
    data: { authorities: ["ROLE_ADMIN"] },
    children: [
      ...employeeRoutes,
      ...separationApplicationRoute,
      ...dashboardRoutes,
      ...locationRoutes
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
      // enableTracing: true
    }),
    CommonModule
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
