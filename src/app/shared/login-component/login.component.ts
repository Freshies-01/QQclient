import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionStorageService } from "ngx-webstorage";

import { AuthServerProvider } from "app/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: []
})
export class LoginComponent implements OnInit {
  pageTitle = "testing";
  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    rememberMe: new FormControl(false)
  });

  constructor(
    private authServerProvider: AuthServerProvider,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.pageTitle = data.activatedRoute;
    });
  }

  OnSubmitLoginForm() {
    const data = this.loginForm.getRawValue();
    this.authServerProvider
      .login(data)
      .subscribe(result => this.navigateToNextPage);
  }

  navigateToNextPage() {
    const redirectUrl = sessionStorage.getItem("redirectUrl");
    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
      this.sessionStorage.clear("redirectUrl");
    } else {
      this.router.navigate([""]);
    }
  }
}
