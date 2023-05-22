import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { HolidayServices } from '../holiday-services.service';
import Utils from '../../helpers/utils';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';



//import jspdf from 'jspdf';
// import html2canvas from 'html2canvas';

import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-manage-holiday-job',
  templateUrl: './manage-holiday-job.component.html',
  styleUrls: ['./manage-holiday-job.component.css'],
})
export class ManageHolidayJobComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  public holidaytTable: any[];
  public SchdholidaytTable: any[] = [];
  public months = [];
  public dateValue: any;
  public holidayD: any;
  selectedValue: string;
  public editManageHolidayJobDialog: boolean = false;
  public jobdata: any = [];
  public addrId: number;
  public displayPDFpreview:boolean = false;

  USERS = [
    {
      "id": "1",
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];


  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  manRecruitment = [
    { ItemName: 'Nursing Cardio', IssueQty: '1' },
    { ItemName: '6GDA-Gen', IssueQty: '2' },
  ];
  fieldStaff = [
    {
      staffName: 'Ram Singh',
      endDate: '12-04-2020 11:15 AM',
      distance: '5 KM',
    },
    {
      staffName: 'Sher Singh',
      endDate: '16-10-2020 11:15 AM',
      distance: '1.5 KM',
    },
  ];

  constructor(
    private holidayServices: HolidayServices,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.editManageHolidayJobDialog = false;
    this.displayPDFpreview = false;
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  public serviceSkillData: any = [];
  public jobSchedulePlanData: any = [];
  selectAllServices(evt) {
    // console.log(evt);
    if(evt.checked){
      this.SchdholidaytTable.forEach((elem, ind) => {
        this.SchdholidaytTable[ind]['isChecked'] =
          true;
      });
    }else{
      this.SchdholidaytTable.forEach((elem, ind) => {
        this.SchdholidaytTable[ind]['isChecked'] =
         false;
      });
    }

  

    if (evt.checked) {
      this.SchdholidaytTable.forEach((elem, ind) => {
        let tmpObj = {};
        tmpObj['nJobid'] = elem['nJobid'];
        tmpObj['nJobdid'] = elem['nJobdid'];
        tmpObj['nEmpid'] = elem['nEmpid'];
        tmpObj['dOnPlanDate'] = this.holidayD;
        this.jobSchedulePlanData.push(tmpObj);

        // this.SchdholidaytTable[ind]['isChecked'] = !this.SchdholidaytTable[ind]['isChecked'];
      });
    } else {
      this.jobSchedulePlanData = [];
    }

    console.log(this.SchdholidaytTable);
  }

  scheduleJob() {
    this.holidayServices.scheduleJob(this.jobSchedulePlanData).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.showError(error[''])
      }
    );
  }
  changePerm(evt, jobId, elem, rowInd) {
    if (evt.checked) {
      this.SchdholidaytTable[rowInd]['isChecked'] = true;
      let tmpObj = {};
      tmpObj['nJobid'] = elem['nJobid'];
      tmpObj['nJobdid'] = elem['nJobdid'];
      tmpObj['nEmpid'] = elem['nEmpid'];
      tmpObj['dOnPlanDate'] = this.holidayD;
      this.jobSchedulePlanData.push(tmpObj);
    } else {
      this.jobSchedulePlanData = Utils.removeByAttr(
        this.jobSchedulePlanData,
        'nJobid',
        jobId
      );
      this.SchdholidaytTable[rowInd]['isChecked'] = false;
    }

    console.log(this.jobSchedulePlanData);
  }
  public getJobAssignmentData(holidayDate) {
    this.holidayD = holidayDate;
    let branchId = localStorage.getItem('branchId');
    let fromDate = holidayDate.split('T')[0];
    this.holidayServices.jobAssignmentList(fromDate, branchId).subscribe(
      (res) => {
        //console.log(res);

        
        if (res['status'] == 200) {
          //this.showSuccess(res['data']['msg')

          this.SchdholidaytTable = res['data'];
          this.SchdholidaytTable.forEach((elem, ind) => {
            this.SchdholidaytTable[ind]['isChecked'] = false;
          });
          res['data'].forEach((elem, index) => {
            let tmpObj = {};
            tmpObj['id'] = elem['nSrvSkillid'];
            tmpObj['name'] = elem['srvSkill'];
            if (!Utils.checkKeyValPair(this.serviceSkillData, tmpObj)) {
              this.serviceSkillData.push(tmpObj);
            }
          });
        
        }

        if (res['status'] == 204) {
          this.showError(res['errorMessage']);
          //  this.messageService.add(this.response.errorMessage)
         // this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }


        // console.log(this.serviceSkillData);
      },
      (error) => {}
    );
    // console.log(holidayDate);
  }
  public holidayListData: any;

  generatePDF() {   

    var element  = document.getElementById('contentToConvert');
    //console.log(data);
    let options = {
      imageTimeout: 25000000000000000,
      background: "white",
      allowTaint : true,
      useCORS: false,
      height: 1800,
      width: 1300
 };
  html2canvas(element,options).then(canvas => {
      // Few necessary setting options  

      let imgData = canvas.toDataURL('image/png');

            let imgWidth = 210,
            pageHeight = 295,
            imgHeight = canvas.height * imgWidth / canvas.width,
            heightLeft = imgHeight,
            doc = new jspdf('p', 'mm'),
            position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        doc.save( "agree"+'.pdf');
  });

   // let data = this.htmlData.nativeElement;


    // let data = document.getElementById("htmlData");  
    // html2canvas(data).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   var pdf = new jspdf('p', 'mm', 'a4');

    //   // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    //   pdf.save('Filename.pdf');   
    // });

    
      //  let options : any = {
      //    orientation: 'p',
      //    unit: 'px',
      //    format: 'a0',
      //    };
      //  let doc = new jspdf(options);
      //   doc.html(data.innerHTML, {
      //    callback: function (doc) {
      //          doc.save("angular-demo.pdf");
      //        },
      //    margin:15,
      //    x: 10,
      //    y: 10
      //  });
     

    // var data = document.getElementById('contentToConvert');
    // html2canvas(data).then(canvas => {
    //   // Few necessary setting options  
    //   var imgWidth = 208;
    //   var pageHeight = 300;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   var heightLeft = imgHeight;

    //   const contentDataURL = canvas.toDataURL('image/png')
    //   let pdf = new jspdf('p', 'mm', 'a4'); 
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   setTimeout(()=>{
    //     pdf.save('products.pdf');
    //   }, 5000);
      
    // });
  }

  previewPDF(){
    this.displayPDFpreview = true;
  }

  getMonthYear() {
    //console.log(this.dateValue);

    let date = new Date(this.dateValue),
      y = date.getFullYear(),
      m = date.getMonth();
    let lastDay = new Date(y, m + 1, 0);
    //console.log(lastDay);
    let frmDate = this.formatDate(this.dateValue);
    let toDate = this.formatDate(lastDay);
    this.holidayServices.listHolidays(frmDate, toDate).subscribe(
      (res) => {
        this.holidayListData = res['data'];
        // console.log(res);
      },
      (err) => {}
    );
  }

  editManageJob(jobd, jno) {
    this.jobdata = jobd;
    // console.log(jno)
    this.editManageHolidayJobDialog = true;
  }

  showSuccess(succ) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: succ,
    });
  }

  showError(error) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  }
}
