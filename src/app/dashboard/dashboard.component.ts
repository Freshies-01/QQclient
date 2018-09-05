import { Component, OnInit } from "@angular/core";
import { DashboardCardsService } from "./dashboardCardsService";
import { DashboardCard } from "./dashboardCards/dashboardCard";
import { PendingApplicationCardComponent } from "./dashboardCards/pending-application-card/pending-application-card.component";
import { ClosedApplicationCardComponent } from "./dashboardCards/closed-application-card/closed-application-card.component";
import { ApplicationReportCardComponent } from "./dashboardCards/application-report-card/application-report-card.component";
import { FunctionWiseDurationCardComponent } from "./dashboardCards/function-wise-duration-card/function-wise-duration-card.component";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  entryComponents: [
    PendingApplicationCardComponent,
    ClosedApplicationCardComponent,
    ApplicationReportCardComponent,
    FunctionWiseDurationCardComponent
  ]
})
export class DashboardComponent implements OnInit {
  cards: DashboardCard[] = [];
  cols: number;
  rows: number;

  constructor(private cardsService: DashboardCardsService) {
    this.cardsService.cards.subscribe(cards => {
      this.cards = cards;
    });
  }
  ngOnInit() {
    this.cards.length = 0;
    this.generateCard(
      "Pending Applications",
      "./dashboardCards/pending-application-card",
      PendingApplicationCardComponent
    );
    this.generateCard(
      "Closed Applications",
      "./dashboardCards/closed-application-card",
      PendingApplicationCardComponent
    );
    this.generateCard(
      "Application Report",
      "./dashboardCards/application-report-card",
      ApplicationReportCardComponent
    );
    this.generateCard(
      "Average Function Wise Duration",
      "./dashboardCards/function-wise-duration-card",
      FunctionWiseDurationCardComponent
    );
  }


  generateCard(_name: string, _routerLink: string, cardType: any) {
    this.cardsService.addCard(
      new DashboardCard(
        {
          name: { key: DashboardCard.metadata.NAME, value: _name },
          routerLink: {
            key: DashboardCard.metadata.ROUTERLINK,
            value: _routerLink
          },
          color: { key: DashboardCard.metadata.COLOR, value: "blue" },
          cols: { key: DashboardCard.metadata.COLS, value: 1 },
          rows: { key: DashboardCard.metadata.ROWS, value: 1 }
        },
        cardType
      )
    );
  }
}
