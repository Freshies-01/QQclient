import { ExportToCsv } from 'export-to-csv';
import { Component, OnInit } from '@angular/core';
import { IDepartment, DepartmentCodes } from '../../../shared/model/department.model';
import { Duration } from '../../../../../node_modules/moment';
import { DepartmentService } from '../../../shared/Services/department.service';
import { HttpErrorResponse, HttpResponse } from '../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-function-wise-duration-card',
  template: `
    <p>
      function-wise-duration-card works!
    </p>
  `,
  styles: []
})
export class FunctionWiseDurationCardComponent implements OnInit {

  departments: IDepartment[];
  data: {ID: number, Name: DepartmentCodes, AvgDuration: Duration}[] = [];
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
  }

  load() {
    this.departmentService.query().subscribe(
      (res: HttpResponse<IDepartment[]>) => {
        this.departments = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  csvGen() {
    this.load();
    if (this.departments === null) { return; }
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
    const csvExporter = new ExportToCsv(options);
    for(let index = 0; index < this.departments.length; ++index) {
      const dept = this.departments[index];
      this.data.push({ID: dept.id, Name: dept.name, AvgDuration: this.departmentService.functionWise(dept.id)});
    }
  }

}
