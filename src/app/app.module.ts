import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QQuitCoreModule } from './core';
import { LoginModule } from './login';

import { Ng2Webstorage } from 'ngx-webstorage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    QQuitCoreModule,
    LoginModule,
    Ng2Webstorage.forRoot({ prefix: 'app', separator: '-' })
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
