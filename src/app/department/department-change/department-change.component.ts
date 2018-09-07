import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

import { Department, DepartmentCodes } from "app/shared/model/department.model";
import { DepartmentService } from "app/shared/Services/department.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-department-change",
  templateUrl: "./department-change.component.html",
  styles: []
})
export class DepartmentChangeComponent implements OnInit {
  departmentChangeForm = this.formBuilder.group({
    id: [""],
    name: [""]
  });
  departmentOptions = DepartmentCodes;
  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.departmentService
      .create(this.departmentChangeForm.getRawValue())
      .subscribe(() =>
        this.router.navigate(["../"], { relativeTo: this.activatedRoute })
      );
  }

  previousState() {
    window.history.back();
  }
}
