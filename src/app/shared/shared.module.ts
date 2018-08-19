import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  imports: [CommonModule, CookieModule.forRoot()],
  declarations: []
})
export class SharedModule {}
