import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

import { Principal } from "app/core";

import { LoginService } from "app/core/auth/login.service";

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
    private loginService: LoginService
  ) {}

  signOut() {
    this.loginService.logout();
    console.log("signOut navigated");
    this.router.navigate(["login"]);
  }

  isAuthenticated(): Boolean {
    return this.principal.isAuthenticated();
  }
}
