import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-inner',
  templateUrl: './reports-inner.component.html',
  styleUrls: ['./reports-inner.component.css']
})
export class ReportsInnerComponent implements OnInit {


  reportServer: string = 'http://173.212.241.74/ReportServer_MSSQLSERVER2';
  reportUrl: string = 'sayluss/cashbook';
  showParameters: string = "true"; 
  parameters: any = {
   "BrID": "1",
   "BankNm" : "sayluss",
   "UserNm" : "Rajesh",
   "ToDt" : "03-FEB-2022",
   "RptBrId" : "1",
   "FrmDt": "01-JAN-2022"
   };
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";


  branch = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor() { }

  ngOnInit(): void {
    
  }


}
