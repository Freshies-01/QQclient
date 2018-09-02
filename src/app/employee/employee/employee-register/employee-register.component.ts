import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Register } from "app/account/register/register.service";

import { User } from "app/core";

@Component({
  selector: "jhi-employee-register",
  templateUrl: "./employee-register.component.html",
  styles: []
})
export class EmployeeRegisterComponent implements OnInit {
  public userFormGroup = new FormGroup({
    login: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    password2: new FormControl(""),
    department: new FormControl(""),
    location: new FormControl(""),
    adminAuthorization: new FormControl(false),
    humanResourcesAuthorization: new FormControl(false),
    functionalRepAuthorization: new FormControl(false)
  });

  constructor(private registerService: Register) {}

  CreateUserFromUserFormGroup() {
    const user = {
      login: this.userFormGroup.get("login").value,
      firstName: this.userFormGroup.get("firstName").value,
      lastName: this.userFormGroup.get("lastName").value,
      email: this.userFormGroup.get("email").value,
      password: this.userFormGroup.get("password").value,
      password2: this.userFormGroup.get("password2").value,
      location: this.userFormGroup.get("location").value,
      department: this.userFormGroup.get("department").value,
      authorities: [
        this.userFormGroup.get("adminAuthorization").value
          ? "ROLE_ADMIN"
          : undefined,
        this.userFormGroup.get("humanResourcesAuthorization").value
          ? "ROLE_HR"
          : undefined,
        this.userFormGroup.get("functionalRepAuthorization").value
          ? "ROLE_FUNCTION"
          : undefined
      ]
    };
    return user;
  }

  ngOnInit() {}

  SaveUserForm() {
    this.registerService
      .q_qsave(this.CreateUserFromUserFormGroup())
      .subscribe();
  }
}
