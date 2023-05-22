import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';
import * as moment from 'moment';
@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  private menuId:number;
  menuData:any = [];
  underData:any[] = [];
  selectedAuto;
  globalFromDate;
  globalDate;
  globalToDate;
  reportMode:string;
  vrType:string;
  public filteredGroups: any[];
  reportForm: FormGroup;
  reportName:string;
  constructor(private route: ActivatedRoute, private reportService : ReportService, private formBuilder: FormBuilder) { }
 // showDateRange:boolean = false;
  //showDate:boolean = false;
 // showInput:boolean = false;
  //showAutoComplete:boolean = false;
  dateRange:any = {
    "active":false,
  };
  dateObj:any = {
    "active":false,
  };
  inputObj:any = {
    "active":false,
  };
  autoComplete:any = {
    "active":false,
  };

  ngOnInit(): void {
    this.menuId = +this.route.snapshot.paramMap.get('menuId');
    this.reportName = this.route.snapshot.paramMap.get('rdlName');
    this.loadMenuData(this.menuId);

    console.log(this.reportName);
  }


  onSelectFromDate(evt){
    this.globalFromDate = moment(evt).format('DD-MMM-YYYY');

  }
  onSelectDate(evt){
    this.globalDate = moment(evt).format('DD-MMM-YYYY');

  }

  onSelectToDate(evt){
    this.globalToDate = moment(evt).format('DD-MMM-YYYY');

  }


  viewReport(){

    //this.pdfSrc = "http://saylussapi.bancplus.in/images/CashBook_13052022101251.pdf";
   switch(this.reportName) {
     case 'GetVoucherBook':{
      let tmpObj = {};
      tmpObj['fromDate'] = this.globalFromDate;
      tmpObj['toDate'] = this.globalToDate;
      tmpObj['vrType'] = this.vrType;
      this.reportService.getReport(this.reportName,tmpObj).subscribe(
        (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
       // this.pdfSrc = "http://saylussapi.bancplus.in/images/CashBook_13052022101251.pdf";
       this.pdfSrc = fileURL;
      },(err)=>{});
     }
     case 'GetTrialBalance':{
      let tmpObj = {};
      tmpObj['fromDate'] = this.globalFromDate;
      tmpObj['toDate'] = this.globalToDate;
      tmpObj['GrpID'] = this.groupVal;
      tmpObj['Mode'] = this.reportModeVal;
      this.reportService.getReport(this.reportName,tmpObj).subscribe(
        (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
       // this.pdfSrc = "http://saylussapi.bancplus.in/images/CashBook_13052022101251.pdf";
       this.pdfSrc = fileURL;
      },(err)=>{});

      break;
     }

     case 'GetDayBook':{
      let tmpObj = {};
      tmpObj['fromDate'] = this.globalFromDate;
      tmpObj['toDate'] = this.globalToDate;
      this.reportService.getReport(this.reportName,tmpObj).subscribe(
        (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
       // this.pdfSrc = "http://saylussapi.bancplus.in/images/CashBook_13052022101251.pdf";
       this.pdfSrc = fileURL;
      },(err)=>{});
     }
     case 'GetProfitAndLoss':{
      let tmpObj = {};
      tmpObj['AsOnDt'] = this.globalDate;
      this.reportService.getReport(this.reportName,tmpObj).subscribe(
        (data: Blob) => {
          var file = new Blob([data], { type: 'application/pdf' })
          var fileURL = URL.createObjectURL(file);
       // this.pdfSrc = "http://saylussapi.bancplus.in/images/CashBook_13052022101251.pdf";
       this.pdfSrc = fileURL;
      },(err)=>{});
     }

     default: {
       break;
     }
   }
  }
  reportModeVal:string;
  groupVal:string;
  onSelectAutoComplete(evt,label){
    console.log(evt,label);

  }
  onChangeDropDown(evt,type){
    console.log(evt,type);
    switch(type) {
      case 'Report Mode': {
         this.reportModeVal = evt['value'];
         break;
      }
      case 'Voucher Type ': {
         this.vrType = evt['value'];
        // console.log(evt);
         break;
      }
      case 'Group': {
        this.groupVal = evt['value'];
       // console.log(evt);
        break;
     }
      default: {
         //statements;
         break;
      }
   }
  }
  initializeReportForm(reportFormObj){

    this.reportForm = this.formBuilder.group(reportFormObj);

  }


  loadMenuData(menuId){
    this.reportService.getMenuData(menuId).subscribe((res)=>{
      this.menuData = res['data'];
      this.menuData.forEach((elem,ind)=>{
        if(elem['inputType'] == 'daterange'){
          this.dateRange["active"] = true;
          this.dateRange["from"] = elem['label'].split(",")[0];
          this.dateRange["to"] = elem['label'].split(",")[1];
          this.dateRange["data"] = elem["datafill"];
        }
        if(elem['inputType'] == 'date'){
          this.dateObj["active"] = true;
          this.dateObj["label"] = elem['label'];
        }

        if(elem['inputType'] == 'autocomplete'){
        this.underData = elem['datafilllist'];
        }

      });
     //console.log(this.menuData);
    },(err)=>{

    });
  }

  filterGroup(event) {
    let query = event.query;
    let filtered: any[] = [];
     for (let i = 0; i < this.underData.length; i++) {
          let group = this.underData[i];
          if (group.cName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(group);
          }
      }
      this.filteredGroups = filtered;
    }

}
