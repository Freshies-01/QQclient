import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-bootstrap",
  template: `
  <router-outlet></router-outlet>
  `
})
export class BootstrapComponent implements OnInit {
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        filter(route => route.outlet === "primary"),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map(route => route.snapshot.data.pageTitle)
      )
      .subscribe(leafRoutePageTitle =>
        this.titleService.setTitle(leafRoutePageTitle)
      );
  }
}
