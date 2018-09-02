import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

import { CookieModule } from "ngx-cookie";

import { AngularMaterialModule } from "./angular-material.module";
import { LoginComponent } from "./login-component/login.component";

@NgModule({
  imports: [
    CommonModule,
    CookieModule.forRoot(),
    HttpModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: []
})
export class SharedModule {}
