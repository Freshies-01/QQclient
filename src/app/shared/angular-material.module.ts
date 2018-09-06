import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatStepperModule,
  MatSelectModule,
  MatTableModule
} from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule
  ],
  providers: []
})
export class AngularMaterialModule {}
