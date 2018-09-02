import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

import { Principal } from "app/core";

@Component({
  selector: "app-nav-top",
  templateUrl: "./nav-top.component.html",
  styleUrls: ["./nav-top.component.css"]
})
export class NavTopComponent {
  @Output()
  toogleNav = new EventEmitter();

  constructor(private principal: Principal, private router: Router) {}

  signOut() {
    alert("hook up login button to login service!");
    this.router.navigate([""]);
  }

  isAuthenticated(): Boolean {
    return this.principal.isAuthenticated();
  }
}
