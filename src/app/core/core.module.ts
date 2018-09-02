import { NgModule, LOCALE_ID } from "@angular/core";
import { DatePipe, registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Title } from "@angular/platform-browser";
import locale from "@angular/common/locales/en";

import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

import { AuthInterceptor } from "./auth/auth.interceptor";

import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  providers: [
    Title,
    {
      provide: LOCALE_ID,
      useValue: "en"
    },
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService, SessionStorageService]
    }
  ]
})
export class QQuitCoreModule {
  constructor() {
    registerLocaleData(locale);
  }
}
