import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import Utils from 'src/app/helpers/utils';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-job-running-sheet',
  templateUrl: './job-running-sheet.component.html',
  styleUrls: ['./job-running-sheet.component.css']
})
export class JobRunningSheetComponent implements OnInit {
  branchData: any;
  branchId;
  formDate: any;
  jobRunningSheetItemTableRes: any;
  rows = 15;
  searchBox: string = "";
  searchResponse: any;
  constructor(private service: ServicesService, private messageService: MessageService,) { }

  ngOnInit(): void {
    this.BranchLocation();
    let d = new Date();
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.formDate = d;
   // this.addHoursToDate("2023-02-27T08:00:00", 15)
   
  }
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.service.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.branchId = this.branchData[0];
        console.log('This is Branch location', this.branchData);
      }
    );
  }
  filterRunningSheetItem() {
    let branchType = this.branchId.val;
    this.service.jobRunningSheetItemList(Utils.formatDate(this.formDate), branchType).subscribe(
      res => {
        this.jobRunningSheetItemTableRes = res['data'];
        console.log(this.jobRunningSheetItemTableRes);
      }
    )
  }
  // pagingnation
  first = 0;
  next() {
    this.first = this.first + this.rows;
  };

  prev() {
    this.first = this.first - this.rows;
  };

  reset() {
    this.first = 0;
  };
  isLastPage(): boolean {
    return this.jobRunningSheetItemTableRes ? this.first === (this.jobRunningSheetItemTableRes.length - this.rows) : true;
  };

  isFirstPage(): boolean {
    return this.jobRunningSheetItemTableRes ? this.first === 0 : true;
  };
  // End Pagingnation

  JobEnd(evt) {
    const now = new Date();
    let formData = {
      "njSchid": evt['nJSchid'],
      "dJobDate": Utils.formatDate(now),
      "nJobExeId": evt['nJobExeid'],
    };
    this.service.addJobEnd(formData).subscribe(
      res => {
        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Job End Success Saved', detail: res['message'] });
        }
        this.filterRunningSheetItem();
      }
    )
  }

  addHoursToDate(date, hours: number)  {
   var timestring1 = date;
var startdate = moment(timestring1);
var returned_endate = moment(startdate).add(hours, 'hours');  // see the cloning?
let Date = moment(returned_endate).format("YYYY-MM-DDTHH:mm:SS")


return Date ;
   
// var numberOfMlSeconds = date.getTime();
// var addMlSeconds = Number(hours)*60 * 60 * 1000;
// var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
//     return newDateObj ;
   
    
  }

  FullDay(evt) {
    debugger
    const str = evt['ScheduledOn'];
   // const date = new Date(str);
    let formData = {
      "njSchid": evt['nJSchid'],
      "dJobDate": this.addHoursToDate(str, evt['Jobhours']),
      "nJobExeId": evt['nJobExeid'],
    };
    this.service.addJobEnd(formData).subscribe(
      res => {
        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Full Day Successfully Saved', detail: res['message'] });
        }
        this.filterRunningSheetItem();
      }
    )
  }



  HalfDay(evt) {
    let res = Number(evt['Jobhours']) / 2;
    const date = evt['ScheduledOn'];
    let formData = {
      "njSchid": evt['nJSchid'],
      "dJobDate": this.addHoursToDate(date, res),
      "nJobExeId": evt['nJobExeid'],
    };
    this.service.addJobEnd(formData).subscribe(
      res => {
        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Half Day Successfully Saved', detail: res['message'] });
        }
        this.filterRunningSheetItem();
      }
    )
  }
}
