import { Component, OnInit } from "@angular/core";

import { LocationService } from "app/shared/Services/location.service";

import { Location } from "app/shared/model/location.model";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.css"]
})
export class LocationListComponent implements OnInit {
  locations: Location[];
  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.query().subscribe(result => {
      this.locations = result.body;
    });
  }
}
