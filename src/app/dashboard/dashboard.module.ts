import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardCardSpawnerComponent } from "./dashboardCardSpawnerComponent";
import { DashboardComponent } from "./dashboard.component";
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule
} from "@angular/material";
import { Routes } from "@angular/router";
import { PendingApplicationCardComponent } from "./dashboardCards/pending-application-card/pending-application-card.component";
import { ClosedApplicationCardComponent } from "./dashboardCards/closed-application-card/closed-application-card.component";
import { ApplicationReportCardComponent } from "app/dashboard/dashboardCards/application-report-card/application-report-card.component";
import { DisputedApplicationCardComponent } from "./dashboardCards/disputed-application-card/disputed-application-card.component";
import { DashboardCardsService } from "./dashboardCardsService";
import { FunctionWiseDurationCardComponent } from './dashboardCards/function-wise-duration-card/function-wise-duration-card.component';

export const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    DashboardComponent,
    DashboardCardSpawnerComponent,
    PendingApplicationCardComponent,
    ClosedApplicationCardComponent,
    DisputedApplicationCardComponent,
    ApplicationReportCardComponent,
    FunctionWiseDurationCardComponent
  ],
  exports: [DashboardComponent],
  providers: [DashboardCardsService]
})
export class DashboardModule {}
