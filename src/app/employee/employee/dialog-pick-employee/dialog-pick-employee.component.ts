import {
  Component,
  OnInit,
  Inject,
  AfterContentInit,
  OnDestroy,
  Input
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Employee } from "app/shared/model/employee.model";
import { EmployeeService } from "app/entities/employee/employee.service";
import { createRequestOption } from "app/shared/util/request-util";

import { fromEvent, Subscription } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

export interface DialockPickEmployeeData {
  employee: Employee;
}

@Component({
  selector: "jhi-dialog-pick-employee",
  templateUrl: "./dialog-pick-employee.component.html",
  styleUrls: ["./dialog-pick-employee.component.css"]
})
export class DialogPickEmployeeComponent
  implements OnInit, AfterContentInit, OnDestroy {
  allEmployees: Employee[];
  filteredEmployees: Employee[];
  typeAheadSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<DialogPickEmployeeComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) private passedInData
  ) {}

  ngOnInit() {
    this.populateEmployeePool();
  }

  populateEmployeePool() {
    this.employeeService
      .query(this.passedInData.requestParameters)
      .subscribe(result => {
        this.allEmployees = result.body;
        this.filteredEmployees = this.allEmployees;
      });
  }

  ngAfterContentInit() {
    const searchBox = document.getElementById("search-box") as HTMLInputElement;

    const searchBarObservable = fromEvent(searchBox, "input").pipe(
      map((event: KeyboardEvent) => (event.target as HTMLOutputElement).value),
      debounceTime(10),
      distinctUntilChanged()
    );

    this.typeAheadSubscription = searchBarObservable.subscribe(data => {
      this.FilterBySearchTerm(data);
    });
  }

  FilterBySearchTerm(searchTerm: string) {
    this.filteredEmployees = this.allEmployees.filter(item => {
      const firstAndLastName = `${item.user.firstName} ${item.user.lastName}`;
      const RegularExpression = new RegExp(searchTerm, "gmi");
      return firstAndLastName.match(RegularExpression);
    });
  }

  onEmployeeSelected(employee: Employee) {
    this.dialogRef.close(employee);
  }

  ngOnDestroy() {
    this.typeAheadSubscription.unsubscribe();
  }
}
