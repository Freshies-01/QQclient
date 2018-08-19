import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QQuitCoreModule } from './core';
import { LoginModule } from './login';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, QQuitCoreModule, LoginModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
