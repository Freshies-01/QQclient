import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [MatCardModule, MatFormFieldModule, MatInputModule]
})
export class NgMaterialImportsModule {}
