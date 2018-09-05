import {
  Component,
  HostListener,
  HostBinding,
  Optional,
  Self
} from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import {
  MatFormFieldControl,
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from "@angular/material";

import { Observable, Subject } from "rxjs";

import { Department, DepartmentCodes } from "app/shared/model/department.model";

// tslint:disable-next-line:max-line-length
import { DialogPickDepartmentComponent } from "app/shared/control-value-accessors/department/dialog-pick-department/dialog-pick-department.component";

@Component({
  selector: "app-department-field",
  templateUrl: "./department-field.component.html",
  providers: [
    { provide: MatFormFieldControl, useExisting: DepartmentFieldComponent }
  ]
})
export class DepartmentFieldComponent
  implements ControlValueAccessor, MatFormFieldControl<Department> {
  private static nextId = 0;

  poolOfDepartments: Department[];
  value: Department | null;
  readonly stateChanges: Observable<void> = new Subject<void>();
  @HostBinding()
  readonly id = `department-select-field-${DepartmentFieldComponent.nextId++}`;
  readonly placeholder: string = null;
  readonly focused = false;
  get empty() {
    return !this.value;
  }
  get shouldLabelFloat() {
    return !!this.placeholder || !this.empty;
  }
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  // tslint:disable-next-line:whitespace
  readonly controlType? = "department-field-controll";
  // tslint:disable-next-line:whitespace
  readonly autofilled? = false;
  private _onChange;
  private _onTouched: () => {};
  @HostBinding("attr.aria-describedby")
  describedBy = "";
  dialogReference: MatDialogRef<DialogPickDepartmentComponent>;

  constructor(
    @Optional()
    @Self()
    public ngControl: NgControl,
    private dialogService: MatDialog
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  @HostListener("blur")
  ontouchend() {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  onContainerClick(event: MouseEvent): void {}

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(" ");
  }

  writeValue(obj: Department): void {
    this.value = obj;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  openDepartmentSelectorDialog() {
    this.dialogReference = this.dialogService.open(
      DialogPickDepartmentComponent,
      {
        data: {},
        width: "370px",
        minHeight: "530px"
      } as MatDialogConfig
    );
    this.dialogReference.beforeClose().subscribe(pickedDepartment => {
      if (pickedDepartment) {
        this.value = pickedDepartment;
        this._onChange(this.value);
      }
    });
  }
}
