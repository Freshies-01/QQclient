import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

import { User } from "app/core";

@Component({
  selector: "jhi-employee-change",
  templateUrl: "./employee-change.component.html",
  styles: []
})
export class EmployeeChangeComponent implements OnInit {
  DebugFormRawValue; // DEBUG field
  public userFormGroup = new FormGroup({
    login: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    adminAuthorization: new FormControl(false),
    humanResourcesAuthorization: new FormControl(false),
    functionalRepAuthorization: new FormControl(false)
  });

  constructor(private activetedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.populateUserFormWithDataFromRouteData();
  }

  populateUserFormWithDataFromRouteData() {
    this.activetedRoute.data.subscribe((data: { user: User }) => {
      this.userFormGroup.patchValue({
        login: data.user.login,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        adminAuthorization: data.user.authorities
          ? data.user.authorities.includes("ROLE_ADMIN")
          : false,
        humanResourcesAuthorization: data.user.authorities
          ? data.user.authorities.includes("ROLE_HR")
          : false,
        functionalRepAuthorization: data.user.authorities
          ? data.user.authorities.includes("ROLE_FUNCTION")
          : false
      });
    });
  }

  SaveUserForm() {
    console.log(this.userFormGroup.getRawValue());
  }
}
