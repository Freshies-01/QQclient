import { Component, OnInit } from "@angular/core";
import { DepartmentService } from "app/shared/Services/department.service";
import { Department, DepartmentCodes } from "app/shared/model/department.model";
@Component({
  selector: "app-department-list",
  templateUrl: "./department-list.component.html",
  styles: []
})
export class DepartmentListComponent implements OnInit {
  PoolOfDepartments: Department[];
  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.departmentService
      .query()
      .subscribe(result => (this.PoolOfDepartments = result.body));
  }

  onSubmit() {}
}
