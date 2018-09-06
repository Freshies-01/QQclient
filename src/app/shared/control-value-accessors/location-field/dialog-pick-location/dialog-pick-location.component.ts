import {
  Component,
  OnInit,
  Inject,
  AfterContentInit,
  OnDestroy
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Employee } from "app/shared/model/employee.model";
import { Location } from "app/shared/model/location.model";
import { LocationService } from "app/shared/Services/location.service";

import { fromEvent, Subscription } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-dialog-pick-location",
  templateUrl: "./dialog-pick-location.component.html",
  styleUrls: ["./dialog-pick-location.component.css"]
})
export class DialogPickLocationComponent
  implements OnInit, AfterContentInit, OnDestroy {
  allLocations: Location[];
  filteredLocation: Location[];
  typeAheadSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<DialogPickLocationComponent>,
    private locationService: LocationService,
    @Inject(MAT_DIALOG_DATA) private passedInData
  ) {}

  ngOnInit() {
    this.populateLocationPool();
  }

  populateLocationPool() {
    this.locationService
      .query(this.passedInData.requestParameters)
      .subscribe(result => {
        this.allLocations = result.body;
        this.filteredLocation = this.allLocations;
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
    this.filteredLocation = this.allLocations.filter(item => {
      const addressString = `${item.address} ${item.city} ${item.state} ${
        item.country
      }`;
      const RegularExpression = new RegExp(searchTerm, "gmi");
      return addressString.match(RegularExpression);
    });
  }

  onItemSelected(employee: Employee) {
    this.dialogRef.close(employee);
  }

  ngOnDestroy() {
    this.typeAheadSubscription.unsubscribe();
  }
}
