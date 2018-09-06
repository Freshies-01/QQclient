import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  HostBinding,
  Optional,
  Self,
  Input
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatFormFieldControl,
  MatDialogConfig
} from "@angular/material";

import { Subject } from "rxjs";

import { DialogPickLocationComponent } from "./dialog-pick-location/dialog-pick-location.component";
import { Location } from "app/shared/model/location.model";

@Component({
  selector: "app-location-field",
  templateUrl: "./location-field.component.html",
  styleUrls: ["./location-field.component.css"],
  providers: [
    { provide: MatFormFieldControl, useExisting: LocationFieldComponent }
  ]
})
export class LocationFieldComponent
  implements
    OnInit,
    ControlValueAccessor,
    MatFormFieldControl<Location>,
    OnDestroy {
  static nextId = 0;
  @ViewChild("location")
  locationElement: ElementRef;
  dialogReference: MatDialogRef<DialogPickLocationComponent>;
  location: Location = null;
  private onChange;
  stateChanges = new Subject<void>();
  readonly placeholder: string;
  @HostBinding()
  id = `employee-field-input-${LocationFieldComponent.nextId++}`;
  focused = false;
  get empty(): boolean {
    return !this.location;
  }
  get value(): Location | null {
    return this.location || null;
  }
  set value(value: Location | null) {
    this.location = value;
    this.stateChanges.next();
  }
  get shouldLabelFloat(): boolean {
    return !this.empty;
  }
  readonly required = false;
  private _disabled = false;
  readonly errorState = false;
  readonly controlType = "location-field-component";
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = !!dis;
    this.stateChanges.next();
  }
  @HostBinding("attr.aria-describedby")
  describedBy = "";
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(" ");
  }

  onContainerClick(event: MouseEvent) {
    // // FOLLOWING IS A GOOD IMPLEMENTATION FOR MAKING SURE THAT THE CORRECT THING IN CUSTOM ELEMENT GETS FOCUSED WHEN CLICKED
    // if ((event.target as Element).tagName.toLowerCase() !== "input") {
    //   this.elRef.nativeElement.querySelector("input").focus();
    // }
  }

  constructor(
    private dialog: MatDialog,
    @Optional()
    @Self()
    public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  writeValue(obj: any): void {
    this.location = obj;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void;

  openEmployeeSelectorDialog() {
    this.dialogReference = this.dialog.open(DialogPickLocationComponent, {
      data: {},
      width: "370px",
      minHeight: "530px"
    } as MatDialogConfig);
    this.dialogReference.beforeClose().subscribe(pickedLocation => {
      if (pickedLocation) {
        console.log(pickedLocation);
        this.location = pickedLocation;
        this.onChange(this.location);
      }
    });
  }
}
