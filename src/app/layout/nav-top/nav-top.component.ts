import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

import { Principal } from "app/core";

import { AuthServerProvider } from "app/core/auth/auth-jwt.service";

@Component({
  selector: "app-nav-top",
  templateUrl: "./nav-top.component.html",
  styleUrls: ["./nav-top.component.css"]
})
export class NavTopComponent {
  @Output()
  toogleNav = new EventEmitter();

  constructor(
    private principal: Principal,
    private router: Router,
    private authProvider: AuthServerProvider
  ) {}

  signOut() {
    this.authProvider.logout().subscribe(null, null, () => {
      console.log("signOut navigated");
      this.router.navigate(["login"]);
    });
  }

  isAuthenticated(): Boolean {
    return this.principal.isAuthenticated();
  }
}
