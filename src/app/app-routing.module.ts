import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes, Route } from "@angular/router";

import { LoginComponent } from "./shared/login-component/login.component";
import { NavigationLayoutComponent } from "app/layout/navigation-layout.component";

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
    children: []
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
