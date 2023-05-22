import { Component, OnInit,HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Excel from 'exceljs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HolidayServices } from '../holiday-services.service';

@Component({
  selector: 'app-manage-holiday',
  templateUrl: './manage-holiday.component.html',
  styleUrls: ['./manage-holiday.component.css']
})
export class ManageHolidayComponent implements OnInit {

  public value: Date;
  public fromDate: Date;
  public toDate:Date;
  public holidatTable: any[];
  public holidayDialog:boolean=false;
  public holidayFormsGroup: FormGroup;
  public isEdit:boolean = false;
  public holidayId:number;
  constructor(private holidayServices:HolidayServices, private messageService: MessageService, private fb: FormBuilder,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.addHolidayForm();
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.holidayDialog = false;
  }

addHolidayForm() {
    this.holidayFormsGroup = this.fb.group({
      cHolidayName: ['', [Validators.required]],
      dDate: ['',[Validators.required]],
    });
}

get formControls() {
    return this.holidayFormsGroup.controls;
}

editHoliday(holiday){
  this.isEdit = true;
  this.holidayDialog = true;
  this.holidayId = holiday['nHolidayId'];
  this.holidayFormsGroup.patchValue({
    cHolidayName:holiday['cHolidayName'],
    dDate: new Date(holiday['dDate'])
  });

 // console.log(holiday);
}
deleteHoliday(holidaId){

  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.holidayServices.deleteHoliday(holidaId).subscribe(res => {
           // console.log(res)
            if (res['status'] == 200) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully'});
                this.getDates();
            }
            if (res['status'] == 204) {
                this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Deleted Successfully' });
            }
        });
    },
    reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
    }
});

}

submitHoliday(formValues){
 // console.log(formValues);
  formValues['dDate'] = this.formatDate(formValues['dDate']);

 // console.log(formValues);
 if(!this.isEdit){
    this.holidayServices.addHoliday(formValues).subscribe((res)=>{
      this.showSuccess(res['message']);
      this.holidayFormsGroup.reset();
      this.holidayDialog = false;
      this.getDates();
  
    },(error)=>{
  
    })
 }else{
  formValues['nHolidayId'] = this.holidayId;
  this.holidayServices.updateHoliday(formValues).subscribe((res)=>{
    this.showSuccess(res['message']);
    this.holidayFormsGroup.reset();
    this.holidayDialog = false;
    this.getDates();
  },(error)=>{

  });
 }

}

  addHolidayDialog(){
    this.holidayDialog = true;
  }


  formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  readExcel(event) {
    let excelData = [];

    const workbook = new Excel.Workbook();
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    /**
     * Final Solution For Importing the Excel FILE
     */

    const arryBuffer = new Response(target.files[0]).arrayBuffer();
    arryBuffer.then( (data)=> {
      workbook.xlsx.load(data)
        .then( ()=> {

          // play with workbook and worksheet now
         // console.log(workbook);
          const worksheet = workbook.getWorksheet(1);
          console.log('rowCount: ', worksheet.rowCount);
          worksheet.eachRow( (row, rowNumber)=> {
            if(rowNumber > 1){
              let rowData = row.values;
              
                let tmpObj = {}; 
                let holidayName = rowData[1];
                let holidayDate = this.formatDate(rowData[2]);
                tmpObj["cHolidayName"] = holidayName;
                tmpObj["dDate"] = holidayDate;
                excelData.push(tmpObj);
              //console.log(rowData);
            }
            //console.log('Row: ' + rowNumber + ' Value: ' + row.values);
          });

          this.holidayServices.importHoliday(excelData).subscribe((res)=>{
            if(res['status'] == 200){
              this.showSuccess(res['data']['msg']);
            }else{
              this.showError(res['errorMessage'])
            }
            
           // console.log(res);
          },(error)=>{

          });
          console.log(excelData);

        });
    });
  }

  getDates(){
   // console.log(this.fromDate,this.toDate);
    let fDate = this.formatDate(this.fromDate);
    let tDate = this.formatDate(this.toDate);
    this.holidayServices.listHolidays(fDate,tDate).subscribe((res)=>{
      this.holidatTable = res['data'];
      // console.log(res);

    },(error)=>{

    })

  }

downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '/assets/files/Holiday.xlsx');
    link.setAttribute('download', `holiday.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}



showSuccess(succ) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
}

showError(error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
}

}
