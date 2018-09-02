import { Component, OnInit } from "@angular/core";
import { IEmployee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee/employee.service";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

@Component({
  selector: "jhi-employee-list",
  templateUrl: "./employee-list.component.html",
  styles: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[];

  constructor(private employeeService: EmployeeService) {}

  loadAll() {
    this.employeeService.query().subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        this.employees = res.body;
      },
      (res: HttpErrorResponse) => console.error(res.message)
    );
  }
  ngOnInit() {
    this.loadAll();
  }
}
