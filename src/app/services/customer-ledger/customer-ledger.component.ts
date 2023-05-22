import { Component, OnInit, HostListener } from '@angular/core';
import { AccountService } from 'src/app/account-flow/account.service';
import { ServicesService } from '../services.service';
import Utils from 'src/app/helpers/utils';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import * as moment from 'moment';
import { DialogService } from 'primeng/dynamicdialog';
import { JobViewCustomerLedgerComponent } from '../job-view-customer-ledger/job-view-customer-ledger.component';
@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.css'],
})
export class CustomerLedgerComponent implements OnInit {
  calenderData: any[] = [];
  index = 0
  public eventLists = [];
  products: any[];
  selectedCustomer: string;
  customerListDropdown: any[];
  customerList: any = {};
  showCustomerRecord: boolean = false;
  jobSkills: any[] = [];
  receiptData: any[] = [];
  moreAddressDialog: boolean = false;
  public filteredGroups: any[];
  manage: any[] = [
    { name: 'Service History', code: 1 },
    { name: 'Job Closer Request', code: 0 },
    { name: 'Patient Data', code: 2 },
  ];
  displayServiceHistory: boolean = false;
  displayCloseRequest: boolean = false;
  displayPatientData: boolean = false;
  manageHistoryData = [
    { empName: 'Amresh', sDate: '12-01-2022', eDate: '28-01-2022' },
  ];
  Date;
  customerHistory: any[];
  customerJobDetails: any[];
  customerServiceItem: any[];
  customerLedger: any[];
  customerReceipt: any[];
  customerInvoice: any[];
  rows = 10;
  displayJobHistory: boolean = false;
  jobHistoryData: any[];
  jobReceiptPDF: boolean = false;
  fullCalendar: boolean = false;

  constructor(
    private service: ServicesService,
    private accountservice: AccountService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const branchId = localStorage.getItem("branchId");
    // this.service.getCustomerList(branchId).subscribe((res) => {
    //   this.customerListDropdown = res['data'];
    //   //console.log(this.customerListDropdown );
    // });
    const body = {}
    this.service.loadAllPatientData(branchId).subscribe((res: any) => {
      console.log('body', res);
      if (res && res.data) {
        this.customerListDropdown = res.data;
      }

    })
  }
  public customer: any;

  public jobDetails: any = [];
  public patientDetails: any[] = [];

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.moreAddressDialog = false;
  }

  rowGroupMetadata: any;
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.jobDetails) {
      for (let i = 0; i < this.jobDetails.length; i++) {
        let rowData = this.jobDetails[i];
        let representativeName = rowData.name;

        if (i == 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.jobDetails[i - 1];
          let previousRowGroup = previousRowData.name;
          if (representativeName === previousRowGroup)
            this.rowGroupMetadata[representativeName].size++;
          else
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
        }
      }
    }
  }
  acId;
  customerDetail(evt) {
    // console.log('calling');
    // console.log(evt['nAcid']);

    let customerID = evt['nAcid'];
    this.acId = evt['nAcid'];
    this.service.getCustomerLedgerById(customerID).subscribe((res:any): void => {
      if (res && res.data && res.data.length) {
        this.customerList = res['data'][0];
        this.customerHistory = this.customerList['addressDetail'];
        this.patientDetails = this.customerList['patientDetail'];
        this.customerJobDetails = this.customerList['jobDetail'];
        this.customerServiceItem = this.customerList['jobSrvItems'];
        this.customerLedger = this.customerList['ledger'];
        this.customerReceipt = this.customerList['receipts'];
        this.customerInvoice = this.customerList['invoice'];
        console.log(this.customerList);
  
        this.customer = this.customerList;
        //  let jobDetail = this.customerList['jobDetail'];
        //  jobDetail.forEach((element,index) => {
        //     let tmpString = element['jobNo'] + "-"+element['patientNm'] + "-"+element['srvCode'] + "-"+element['service'];
        //     let tmpObj = {};
        //     tmpObj['name'] = tmpString;
        //     tmpObj['srvPoint'] = [];
        //     element['jobSrvSkills'].forEach(elem => {
        //       tmpObj['nJobdId'] = elem['nJobdId'];
        //       tmpObj['description'] = elem['description'];
        //       tmpObj['rate'] = elem['rate'];
        //       tmpObj['frequency'] = elem['frequency'];
        //       tmpObj['securityAmt'] = elem['securityAmt'];
        //       tmpObj['type'] = 'Skill';
        //       tmpObj['viewDetails'] = false;
        //       tmpObj['status'] = elem['status'];
  
        //       if(elem['jobSrvPnt'] && elem['jobSrvPnt'].length > 0){
  
        //         tmpObj['srvPoint'] = elem['jobSrvPnt'];
        //       }
  
        //       this.jobDetails.push(tmpObj);
        //     });
  
        //     let tmpObj1 = {};
        //     tmpObj1['name'] = tmpString;//element['jobNo'];
        //     tmpObj1['srvPoint'] = null;
  
        //     element['jobSrvItems'].forEach(elem => {
        //       tmpObj1['nJobdId'] = elem['nJobdId'];
        //       tmpObj1['description'] = elem['description'];
        //       tmpObj1['rate'] = elem['rate'];
        //       tmpObj1['frequency'] = elem['frequency'];
        //       tmpObj1['securityAmt'] = elem['securityAmt'];
        //       tmpObj1['type'] = 'Item';
        //       tmpObj1['status'] = elem['status'];
        //       tmpObj1['srvPoint'] = null;
        //       this.jobDetails.push(tmpObj1);
        //     });
  
        //  });
        console.log(this.jobDetails);
        this.updateRowGroupMetaData();
        this.showCustomerRecord = true;
      }

    });
  }

  populateServiceSkill(jobData) {
    this.jobSkills = jobData['jobSrvSkills'];
  }

  showMoreAddress() {
    this.moreAddressDialog = true;
  }

  filterGroup(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.customerListDropdown.length; i++) {
      let group = this.customerListDropdown[i];
      if (group.cPatientNm.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredGroups = filtered;
    //console.log(this.filteredGroups)
  }

  manageDialog(evt) {
    //console.log('hello',evt.value['code'])
    switch (evt.value['code']) {
      case 0:
        this.displayCloseRequest = true;
        break;

      case 1:
        this.displayServiceHistory = true;
        break;
      case 2:
        this.displayPatientData = true;
        break;
      default:
        this.displayServiceHistory = false;
        this.displayCloseRequest = false;
        this.displayPatientData = false;
    }
    // if(evt.value['code'] === 1){
    //   this.displayServiceHistory = true;
    // } else {
    //   this.displayServiceHistory = false;
    // }
  }

  public formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  empJobNo;
  empJobStartDate;

  viewJobHistory(data) {
    // console.log(data)
    this.empJobNo = data['cJobNo'];
    this.empJobStartDate = data['jobstartdate'];
    this.displayJobHistory = true;
    let jid = data['njobid'];
    let fDate = data['jobstartdate'];
    let tDate = new Date();
    let ref = 'A';
    this.service.getJobHistory(jid, this.formatDate(fDate), this.formatDate(tDate), ref).subscribe((data) => {
      this.jobHistoryData = data['data'];
      //console.log(this.jobHistoryData);
    })
  }

  batchNo;

  downloadPdf(data) {
    this.batchNo = data['cBatchNo'];
    this.printPDF();
  }

  pdfDat: any[] = [];
  totalAmountPdf: number = 0;
  totalAmountPdfWord: string;
  printPDF() {
    this.jobReceiptPDF = true;

    this.accountservice.getPdfData(this.acId, this.batchNo).subscribe((res) => {
      this.pdfDat = res['data'];
      this.pdfDat['jobReceipts'].forEach(element => {
        this.totalAmountPdf = this.totalAmountPdf + element['amount'];

      });
      this.totalAmountPdfWord = Utils.intToEnglish(this.totalAmountPdf);
      console.log(this.pdfDat)
    }, (err) => { });
    // console.log('click');
    close();
  }

  generatePDF() {

    var element = document.getElementById('contentToConvert');
    //console.log(element);
    let options = {
      imageTimeout: 25000000000000000,
      background: "white",
      allowTaint: true,
      useCORS: false,
      height: 1500,
      width: 1200
    };
    setTimeout(() => {

      html2canvas(element, options).then(canvas => {
        // Few necessary setting options

        let imgData = canvas.toDataURL('image/png');

        let imgWidth = 195,
          pageHeight = 230,
          imgHeight = canvas.height * imgWidth / canvas.width,
          heightLeft = imgHeight,
          doc = new jspdf('p', 'mm', 'a5'),
          width = doc.internal.pageSize.getWidth() - 10,
          height = doc.internal.pageSize.getHeight(),
          position = 0;

        doc.addImage(imgData, 'PNG', 7, 0, width, height);
        heightLeft -= pageHeight;

        let blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf' });
        let blobUrl = URL.createObjectURL(blobPDF);
        window.open(blobUrl);

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      });
    }, 3000);
  }
  getEventItem(evt) {
    this.eventLists = evt;
    this.index = 1
    // console.log(evt);
  }

  fcalJobNo;
  fcalCustomerName;
  fcalPatientName;
  history(data) {
    console.log(data);
    this.fcalJobNo = data['cjobno'];
    //this.fcalCustomerName = data['CCustNm'];
    this.fcalPatientName = data['patientname'];
    const startOfMonth = moment(this.Date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(this.Date).endOf('month').format('YYYY-MM-DD');
    const jobId = data['njobdid'];

    this.service.getJobHistoryData(jobId, startOfMonth, endOfMonth).subscribe((res) => {
      // console.log(res);
      res['data']['jobId'] = data['njobdid'];
      this.calenderData = res['data'];
      // console.log(this.calenderData)
    }, (err) => { });
    // console.log(startOfMonth,endOfMonth);
    // console.log(data);
    this.fullCalendar = true;
  }
  closeCalendar() {
    this.fullCalendar = false;
  }
  viewJobWithId(id, status, jobNumber) {
    const ref = this.dialogService.open(JobViewCustomerLedgerComponent, {
      data: {
        servId: id,
        cStatus: status,
        jobNum: jobNumber,
        processOfJob: 'jobapproval'
      },
      header: `Approval Job  #${jobNumber}`,
      width: '60vw',
      styleClass: 'customer-modal'
    });
    ref.onClose.subscribe((res: any) => {
      //this.getPatient();
    });
  }

}
