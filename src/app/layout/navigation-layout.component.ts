import { Component } from "@angular/core";

@Component({
  styleUrls: ["./navigation-layout.component.css"],
  selector: "app-navigation-layout",
  template: `
  <app-nav-top (toogleNav)="sideNav.setShown(! sideNav.Shown)"></app-nav-top>
  <app-nav-side #sideNav [elementsPushedBySideBar]="[mainWrapper]"></app-nav-side>
  <div id="mainWrapper" #mainWrapper>
    <main id="mainContentCard">
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class NavigationLayoutComponent {}
