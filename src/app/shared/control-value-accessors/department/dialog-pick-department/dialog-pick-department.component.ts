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
import { Department } from "app/shared/model/department.model";
import { DepartmentService } from "app/shared/Services/department.service";
import { createRequestOption } from "app/shared/utilities/request-util";

import { fromEvent, Subscription } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

export interface DialockPickDepartment {
  employee: Employee;
}

@Component({
  selector: "app-dialog-pick-department",
  templateUrl: "./dialog-pick-department.component.html",
  styleUrls: ["./dialog-pick-department.component.css"]
})
export class DialogPickDepartmentComponent
  implements OnInit, AfterContentInit, OnDestroy {
  poolOfDepartments: Department[];
  filteredDepartments: Department[];
  typeAheadSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<DialogPickDepartmentComponent>,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) private passedInData
  ) {}

  ngOnInit() {
    this.populateEmployeePool();
  }

  populateEmployeePool() {
    this.departmentService.query().subscribe(result => {
      this.poolOfDepartments = result.body;
      this.filteredDepartments = this.poolOfDepartments;
    });
  }

  ngAfterContentInit() {
    const searchBox = document.getElementById("search-box") as HTMLInputElement;

    const searchBarObservable = fromEvent(searchBox, "input").pipe(
      map((event: KeyboardEvent) => (event.target as HTMLOutputElement).value),
      debounceTime(10),
      distinctUntilChanged()
    );

    this.typeAheadSubscription = searchBarObservable.subscribe(searchTerm => {
      this.filterBySearchTerm(searchTerm);
    });
  }

  filterBySearchTerm(searchTerm: string) {
    this.filteredDepartments = this.poolOfDepartments.filter(item => {
      const RegularExpression = new RegExp(searchTerm, "gmi");
      return item.name.match(RegularExpression);
    });
  }

  onEmployeeSelected(department: Department) {
    this.dialogRef.close(department);
  }

  ngOnDestroy() {
    this.typeAheadSubscription.unsubscribe();
  }
}
