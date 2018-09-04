import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Ng2Webstorage } from "ngx-webstorage";

import { QQuitCoreModule } from "./core";
import { AppRoutingModule } from "./app-routing.module";

import { SharedModule } from "app/shared/shared.module";
import { BootstrapComponent } from "./bootstrap.component";
import { LayoutModule } from "app/layout/layout.module";

import { MyEmployeeModule } from "app/employee/employee.module";
import { SeparationApplicationModule } from "app/separation-application/separation-application.module";
import { DashboardModule } from "app/dashboard/dashboard.module";
import { LocationsModule } from "./locations/locations.module";

@NgModule({
  declarations: [BootstrapComponent],
  imports: [
    BrowserModule,
    QQuitCoreModule,
    AppRoutingModule,
    Ng2Webstorage.forRoot({ prefix: "app", separator: "-" }),
    LayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    MyEmployeeModule,
    SeparationApplicationModule,
    DashboardModule,
    LocationsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [BootstrapComponent]
})
export class AppModule {}
