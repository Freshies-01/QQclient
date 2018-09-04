import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { CookieModule } from "ngx-cookie";

import { AngularMaterialModule } from "./angular-material.module";
import { LoginComponent } from "./login-component/login.component";

import { KeysPipe } from "./utilities/EnumKeyPipe/enum-key.pipe";
import { ControlValueAccessorsModule } from "./control-value-accessors/control-value-accessors.module";
import { HasAnyAuthorityDirective } from "./auth/has-any-authority.directive";

@NgModule({
  imports: [
    CommonModule,
    CookieModule.forRoot(),
    HttpModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ControlValueAccessorsModule,
    RouterModule
  ],
  declarations: [LoginComponent, KeysPipe, HasAnyAuthorityDirective],
  exports: [
    ControlValueAccessorsModule,
    KeysPipe,
    ReactiveFormsModule,
    AngularMaterialModule,
    CommonModule,
    RouterModule,
    HasAnyAuthorityDirective
  ],
  providers: []
})
export class SharedModule {}
