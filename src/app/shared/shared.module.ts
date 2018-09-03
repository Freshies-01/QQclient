import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";

import { CookieModule } from "ngx-cookie";

import { AngularMaterialModule } from "./angular-material.module";
import { LoginComponent } from "./login-component/login.component";

import { KeysPipe } from "./utilities/EnumKeyPipe/enum-key.pipe";
import { ControlValueAccessorsModule } from "./control-value-accessors/control-value-accessors.module";

@NgModule({
  imports: [
    CommonModule,
    CookieModule.forRoot(),
    HttpModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ControlValueAccessorsModule
  ],
  declarations: [LoginComponent, KeysPipe],
  exports: [ControlValueAccessorsModule, KeysPipe],
  providers: []
})
export class SharedModule {}
