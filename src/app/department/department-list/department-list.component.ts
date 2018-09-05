import { Component, OnInit } from "@angular/core";
import { DepartmentService } from "app/shared/Services/department.service";
import { Department, DepartmentCodes } from "app/shared/model/department.model";
import { Router } from "@angular/router";
@Component({
  selector: "app-department-list",
  templateUrl: "./department-list.component.html",
  styles: []
})
export class DepartmentListComponent implements OnInit {
  PoolOfDepartments: Department[];
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.departmentService
      .query()
      .subscribe(result => (this.PoolOfDepartments = result.body));
  }
}
