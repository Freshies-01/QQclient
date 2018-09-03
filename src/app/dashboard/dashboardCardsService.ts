import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DashboardCard } from "./dashboardCards/dashboardCard";

@Injectable()
export class DashboardCardsService {
  private _cards: BehaviorSubject<DashboardCard[]> = new BehaviorSubject<
    DashboardCard[]
  >([]);

  constructor() {}

  addCard(card: DashboardCard): void {
    this._cards.next(this._cards.getValue().concat(card));
  }

  get cards(): BehaviorSubject<DashboardCard[]> {
    return this._cards;
  }
}
