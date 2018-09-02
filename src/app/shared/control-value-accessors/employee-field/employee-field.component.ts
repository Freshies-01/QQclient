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

@Component({
  selector: "jhi-employee-field",
  templateUrl: "./employee-field.component.html",
  styleUrls: ["./employee-field.component.css"],
  providers: [
    { provide: MatFormFieldControl, useExisting: EmployeeFieldComponent }
  ]
})
export class EmployeeFieldComponent
  implements
    OnInit,
    ControlValueAccessor,
    MatFormFieldControl<Employee>,
    OnDestroy {
  @ViewChild("location") location: ElementRef;
  dialogReference: MatDialogRef<DialogPickEmployeeComponent>;
  employee: Employee = null;
  private onChange;
  stateChanges = new Subject<void>();
  static nextId = 0;
  readonly placeholder: string;
  @HostBinding() id = `employee-field-input-${EmployeeFieldComponent.nextId++}`;
  focused = false;
  @Input() requestParameters: { filter?: String; locID?: String };
  get empty(): boolean {
    return !this.employee;
  }
  get value(): Employee | null {
    return this.employee || null;
  }

  get shouldLabelFloat(): boolean {
    return !this.empty;
  }
  readonly required = false;
  private _disabled = false;
  readonly errorState = false;
  readonly controlType = "employee-field-component";
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = !!dis;
    this.stateChanges.next();
  }
  set value(value: Employee | null) {
    this.employee = value;
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

  writeValue(obj: any): void {
    this.employee = obj;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void;

  openEmployeeSelectorDialog() {
    this.dialogReference = this.dialog.open(DialogPickEmployeeComponent, {
      data: { requestParameters: this.requestParameters },
      width: "370px",
      minHeight: "530px"
    } as MatDialogConfig);
    this.dialogReference.beforeClose().subscribe(pickedEmployee => {
      if (pickedEmployee) {
        this.employee = pickedEmployee;
        this.onChange(this.employee);
      }
    });
  }
}
