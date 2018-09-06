import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionStorageService } from "ngx-webstorage";

import { AuthServerProvider } from "app/core";
import { LoginService } from "app/core/auth/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  pageTitle = "testing";
  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    rememberMe: new FormControl(false)
  });

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.pageTitle = data.activatedRoute;
    });
  }

  OnSubmitLoginForm() {
    const data = this.loginForm.getRawValue();
    this.loginService.login(data).then(result => {
      this.navigateToNextPage();
    });
  }

  navigateToNextPage() {
    const redirectUrl = sessionStorage.getItem("redirectUrl");
    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
      this.sessionStorage.clear("redirectUrl");
    } else {
      this.router.navigate(["dashboard"]);
    }
  }
}
