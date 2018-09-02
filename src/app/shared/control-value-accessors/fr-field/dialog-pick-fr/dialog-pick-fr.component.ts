import {
  Component,
  OnInit,
  Inject,
  AfterContentInit,
  OnDestroy,
  Input
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { HrReps } from "app/shared/model/hr-reps.model";
import { FunctionReps } from "app/shared/model/function-reps.model";
import { EmployeeService } from "app/entities/employee/employee.service";
import { HrRepsService } from "app/entities/hr-reps/hr-reps.service";
import { FunctionRepsService } from "app/entities/function-reps/function-reps.service";
import { createRequestOption } from "app/shared/util/request-util";

import { fromEvent, Subscription } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

export interface DialockPickHrData {
  selectedFrRep: FunctionReps;
}

@Component({
  selector: "jhi-dialog-pick-fr",
  templateUrl: "./dialog-pick-fr.component.html",
  styleUrls: ["./dialog-pick-fr.component.css"]
})
export class DialogPickFrComponent
  implements OnInit, AfterContentInit, OnDestroy {
  frRepPool: FunctionReps[];
  filteredFrReps: FunctionReps[];
  filterFieldSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<DialogPickFrComponent>,
    private frService: FunctionRepsService,
    @Inject(MAT_DIALOG_DATA) private passedInData
  ) {}

  ngOnInit() {
    this.populateFrPool();
  }

  populateFrPool() {
    this.frService
      .query(this.passedInData.requestParameters)
      .subscribe(result => {
        this.frRepPool = result.body;
        this.filteredFrReps = this.frRepPool;
      });
  }

  ngAfterContentInit() {
    const searchBox = document.getElementById("search-box") as HTMLInputElement;

    const searchBarObservable = fromEvent(searchBox, "input").pipe(
      map((event: KeyboardEvent) => (event.target as HTMLOutputElement).value),
      debounceTime(10),
      distinctUntilChanged()
    );

    this.filterFieldSubscription = searchBarObservable.subscribe(data => {
      this.FilterBySearchTerm(data);
    });
  }

  FilterBySearchTerm(searchTerm: string) {
    this.filteredFrReps = this.frRepPool.filter(item => {
      const firstAndLastName = `${item.employee.user.firstName} ${
        item.employee.user.lastName
      }`;
      const RegularExpression = new RegExp(searchTerm, "gmi");
      return firstAndLastName.match(RegularExpression);
    });
  }

  onHrSelected(pickedFrRep: HrReps) {
    this.dialogRef.close(pickedFrRep);
  }

  ngOnDestroy() {
    this.filterFieldSubscription.unsubscribe();
  }
}
