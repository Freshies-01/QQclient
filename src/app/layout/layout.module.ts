import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NavTopComponent } from "./nav-top/nav-top.component";
import { NavSideComponent } from "./nav-side/nav-side.component";
import { SharedModule } from "app/shared/shared.module";
import { NavigationLayoutComponent } from "./navigation-layout.component";

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: [NavTopComponent, NavSideComponent, NavigationLayoutComponent],
  exports: [NavigationLayoutComponent]
})
export class LayoutModule {}
