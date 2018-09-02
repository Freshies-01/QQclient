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

import { DialogPickEmployeeComponent } from "app/q_q/records/employee/dialog-pick-employee/dialog-pick-employee.component";
import { Employee } from "app/shared/model/employee.model";
import { HrReps } from "app/shared/model/hr-reps.model";
import { DialogPickHrComponent } from "app/shared/control-value-accessors/hr-field/dialog-pick-hr/dialog-pick-hr.component";

@Component({
  selector: "jhi-hr-field",
  templateUrl: "./hr-field.component.html",
  styles: [],
  providers: [{ provide: MatFormFieldControl, useExisting: HrFieldComponent }]
})
export class HrFieldComponent
  implements
    OnInit,
    ControlValueAccessor,
    MatFormFieldControl<HrReps>,
    OnDestroy {
  @ViewChild("location") location: ElementRef;
  dialogReference: MatDialogRef<DialogPickHrComponent>;
  _hr: HrReps = null;
  private onChange;
  stateChanges = new Subject<void>();
  static nextId = 0;
  readonly placeholder: string;

  @HostBinding() id = `hr-field-input-${HrFieldComponent.nextId++}`;

  focused = false;

  @Input() requestParameters: { filter?: String; locID?: String };

  get value(): HrReps | null {
    return this._hr || null;
  }
  set value(value: HrReps | null) {
    this._hr = value;
    this.stateChanges.next();
  }
  get empty(): boolean {
    return !this._hr;
  }
  get shouldLabelFloat(): boolean {
    return !this.empty;
  }
  readonly required = false;
  readonly errorState = false;
  readonly controlType = "hr-field-component";
  private _disabled = false;
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = !!dis;
    this.stateChanges.next();
  }
  @HostBinding("attr.aria-describedby") describedBy = "";
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
    private renderer: Renderer2,
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

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void {
    this._hr = obj;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void;

  openHrSelectorDialog() {
    this.dialogReference = this.dialog.open(DialogPickHrComponent, {
      data: { requestParameters: this.requestParameters },
      width: "370px",
      minHeight: "530px"
    } as MatDialogConfig);
    this.dialogReference.beforeClose().subscribe(pickedHr => {
      if (pickedHr) {
        this._hr = pickedHr;
        this.onChange(this._hr);
      }
    });
  }
}
