import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CookieModule } from 'ngx-cookie';

@NgModule({
  imports: [CommonModule, CookieModule.forRoot(), HttpModule],
  declarations: [],
  providers: []
})
export class SharedModule {}
