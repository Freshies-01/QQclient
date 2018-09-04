import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { LocationService } from "app/shared/Services/location.service";
import { Router, ActivatedRoute } from "@angular/router";

import { Location } from "app/shared/model/location.model";

@Component({
  selector: "app-location-change",
  templateUrl: "./location-change.component.html",
  styles: []
})
export class LocationChangeComponent implements OnInit {
  createLocationForm = this.formBuilder.group({
    id: [null],
    address: [null],
    city: [null],
    state: [null],
    country: [null]
  });
  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activedRoute.data.subscribe(data => {
      if (data.location && data.location.id) {
        this.createLocationForm.patchValue(data.location);
      }
    });
  }

  onSubmit() {
    if (this.createLocationForm.get("id").value) {
      this.updateLocation();
    } else {
      this.createLocation();
    }
  }

  createLocation() {
    this.locationService
      .create(this.createLocationForm.getRawValue())
      .subscribe(() => this.router.navigate(["location"]));
  }

  updateLocation() {
    this.locationService
      .update(this.createLocationForm.getRawValue())
      .subscribe(() => this.router.navigate(["location"]));
  }

  deleteLocation() {
    this.locationService
      .delete(this.createLocationForm.get("id").value)
      .subscribe(
        null,
        () =>
          alert(
            "could not delete this location, there might be records that depend on it"
          ),
        () => this.router.navigate(["location"])
      );
  }
}
