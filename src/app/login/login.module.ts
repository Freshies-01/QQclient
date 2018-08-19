import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { NgMaterialImportsModule } from 'app/shared';

@NgModule({
  imports: [CommonModule, NgMaterialImportsModule, ReactiveFormsModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
