import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import Utils from 'src/app/helpers/utils';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {
  date: Date;
  branchData: any;
  branchId;
  EmployeeAttendanceData: any = [];
  rows = 15;
  isExcelButton:boolean=false;
  constructor(private hrservice: HrService,  private messageservice: MessageService) { }

  ngOnInit(): void {
    this.BranchLocation();
  }
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.hrservice.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.branchId = this.branchData[0];
      }
    );
  }
  ViewEmployeeAttendance()
  {
    if (this.date==undefined) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Please Enter Date' });
      return
    }
    this.hrservice.getEmployeeAttendance(Utils.formatDate(this.date),this.branchId['val']).subscribe(
      res => {
        this.EmployeeAttendanceData=[];
        this.EmployeeAttendanceData = res['data'];
        if(this.EmployeeAttendanceData.length>0)
        {this.isExcelButton=true;}
        else
        {
          this.isExcelButton=false;
        }
      }
    )
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.EmployeeAttendanceData); // Sale Data
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "EmployeeAttendance");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + EXCEL_EXTENSION
      );
    });
  }
}
