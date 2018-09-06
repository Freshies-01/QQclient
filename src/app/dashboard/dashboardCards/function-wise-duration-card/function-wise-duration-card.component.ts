import { ExportToCsv } from 'export-to-csv';
import { Component, OnInit } from '@angular/core';
import { IDepartment, DepartmentCodes } from '../../../shared/model/department.model';
import { DepartmentService } from '../../../shared/Services/department.service';
import { ActionService } from '../../../shared/Services/action.service';
import { HttpErrorResponse, HttpResponse } from '../../../../../node_modules/@angular/common/http';
import { resolve } from 'url';

@Component({
  selector: 'app-function-wise-duration-card',
  templateUrl: "./function-wise-duration-card.component.html",
  styles: []
})
export class FunctionWiseDurationCardComponent implements OnInit {

  departments: IDepartment[];
  data: {ID: number, Name: DepartmentCodes, AvgDuration: String}[] = [];
  constructor(private actionService: ActionService, private departmentService: DepartmentService) {}
  duration: String = "";
  ngOnInit() {
  }

  load() {
    this.departmentService.query().subscribe(
      (res: HttpResponse<IDepartment[]>) => {
        this.departments = res.body;
        this.csvGenHidden();
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  csvGen() {
    this.load();
  }

  async csvGenHidden() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Function Wise Report',
      useBom: true,
      useKeysAsHeaders: true,
    };
    if (this.departments != null && this.departments.length > 0) {
      const csvExporter = new ExportToCsv(options);
      let dept = this.departments[0];
      for (let index = 0; index < this.departments.length; ++index) {
        dept = this.departments[index];
        await this.getFunctionWisePromise(dept.id).then((result) => {
        this.duration = result;
      });
        this.data.push({ID: dept.id, Name: dept.name, AvgDuration: this.duration});
      }
      csvExporter.generateCsv(this.data);
    }
  }
  async getFunctionWisePromise(deptId: number): Promise<string> {
    try {
      const str = await this.actionService.functionWise(deptId).toPromise();

      console.log("Promise Body: " + str.body.toString());
      return str.body.duration;
    } catch (error) {
      console.log(error.message);
    }
    finally {}
  }
}
