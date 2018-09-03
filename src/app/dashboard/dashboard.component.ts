import { Component, OnInit } from "@angular/core";
import { DashboardCardsService } from "./dashboardCardsService";
import { DashboardCard } from "./dashboardCards/dashboardCard";
import { PendingApplicationCardComponent } from "./dashboardCards/pending-application-card/pending-application-card.component";
import { ClosedApplicationCardComponent } from "./dashboardCards/closed-application-card/closed-application-card.component";
@Component({
  selector: "jhi-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  entryComponents: [
    PendingApplicationCardComponent,
    ClosedApplicationCardComponent
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
