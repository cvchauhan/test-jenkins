import { Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { AccountService } from '../account.service';
import Utils from 'src/app/helpers/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as uuid from 'uuid';
import { CommonService } from 'src/app/shared-services/local-storage.service';
import { StockService } from 'src/app/stock-flow/stock.service';
@Component({
  selector: 'app-job-receipts',
  templateUrl: './job-receipts.component.html',
  styleUrls: ['./job-receipts.component.css']
})
export class JobReceiptsComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  invoiceDetailHeader: any;
  jobReceipt: any[] = [];
  displayJobReceipt: boolean = false;
  showJobReceiptTable: boolean = false;
  paymentForm: FormGroup;
  branchData: any;
  jobInvServiceDtlsData: any;
  totalAmount: number;
  amount: any;
  paymentModeVal: any;
  refNo: any;
  bank: any;
  jobReceiptAddData: any[] = [];
  saveReceiptData: any[] = [];
  invoiceData: any[] = [];
  tableAmountData: any[] = [];
  paymentStatusData: any[] = [
    { 'name': 'Pending', 'value': 'A' },
    { 'name': 'Received', 'value': 'R' }
  ]

  fromDate;

  enableGenerateInv: boolean = false;
  toDate;
  displayJobInvServiceDtls: boolean = false;
  branch;
  invoiceGenerationDate;
  BillingDate: any;
  InvoiceDate: any;
  invoiceBranch;
  showPrint: boolean = false;
  historyFromDate;
  historyToDate;
  historyBranch;
  invoiceHistoryData: any[] = [];
  jobData: any[] = [];
  displayPDFpreview: boolean = false;
  jobReceiptPDF: boolean = false;
  rows = 15;
  gstCalculation:any = {
    sgst:0,
    cgst:0,
    igst:0
  };
  totalAmountData:number = 0;
  payLoadCollectionBody = [];
  createGenerationDataStore:any = [];
  openNextTable:any = null;

  constructor(private accountservice: AccountService, private stockService: StockService, private messageService: MessageService, private formBuilder: FormBuilder) {
    // console.log(this.jobReceipt);
  }

  branchChange() {



  }
  changeBranch() {
    this.loadInvoiceData();
  }
  GetCustomerName(e, nAcID) {
    this.invoiceDetailHeader = e;
    this.openNextTable = nAcID;
  }


  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayJobReceipt = false;
    this.displayPDFpreview = false;
    this.jobReceiptPDF = false;
  }

  onChangeBranch(evt) {
    this.branch = evt.value;
  }

  showDetail(data, JobNo) {
    this.displayJobInvServiceDtls = true;
    let n = this.invoiceDetailHeader;
    this.invoiceDetailHeader = "Invoice Detail - " + n + " - " + JobNo;
    this.jobInvServiceDtlsData = data;
    console.log(this.jobInvServiceDtlsData);
  }
  onChangeHistoryBranch(evt) {
    this.historyBranch = evt.value;
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
          pageHeight = 310,
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


        //  heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // doc.output('dataurlnewwindow');
        // doc.save( "invoice"+'.pdf');

        // window.open(doc.output('datauristring'), '_blank');
        // console.log(doc.output('datauristring'));

        // let str = doc.output('datauristring');
        // let x = window.open();
        // x.document.open();
        // x.document.location=str;

      });
    }, 3000);


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

  downloadPDF(data) {
    var element = document.getElementById('contentToConvert');
    console.log('data', data);
    console.log(element)
  }

  loadInvoiceData() {
    if (this.branch == null) {
      this.branch = 0;
    }
    this.accountservice.loadInvoiceGenerationData(Utils.formatDate(this.InvoiceDate), Utils.formatDate(this.BillingDate), this.branch).subscribe((res) => {
      if (res['status'] == 200) {
        this.invoiceData = res['data'];
        this.storeInviceGenData();
        this.invoiceData.forEach((elem, index) => {
          this.invoiceData[index]['isVisibleBlack'] = false;
          // this.invoiceData[index]['isVisibleCheckBox'] = true;
          this.invoiceData[index]['isChecked'] = false;
          this.invoiceData[index]['jobInvServices'].forEach((element, ind) => {
            this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = false;
          });
        });
      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res['errorMessage'] });
      }
      console.log(this.invoiceData);
    }, (err) => { });
  }

  receiptStatusId: any = this.paymentStatusData[0]['value'];
  pendingStatusHideShow: boolean = false;
  statusChange(evt) {
    this.receiptStatusId = evt['value'];
    console.log(this.receiptStatusId);
  }
  loadReceiptData() {
    let statusCode = this.receiptStatusId;
    let frDate = Utils.formatDate(this.fromDate);
    let toDate = Utils.formatDate(this.toDate);
    if (this.receiptStatusId == 'A') {
      this.accountservice.getJobReceipt(this.branch, frDate, toDate, statusCode).subscribe((res) => {
        // console.log(res);
        this.jobReceipt = res['data'];
        if (this.jobReceipt != null) {
          if (this.jobReceipt.length > 0) {
            this.showJobReceiptTable = true;
          } else {
            this.showJobReceiptTable = false;
          }
          this.pendingStatusHideShow = true;
        }
        // console.log(this.jobReceipt);
      }, (err) => {

      });
    } else {

      this.accountservice.getJobReceiptRcvd(this.branch, frDate, toDate, statusCode).subscribe((res) => {
        // console.log(res);
        this.jobReceipt = res['data'];
        if (this.jobReceipt.length > 0) {
          this.showJobReceiptTable = true;
        } else {
          this.showJobReceiptTable = false;
        }
        this.pendingStatusHideShow = false;
        // console.log(this.jobReceipt);
      }, (err) => {

      });
    }

  }

  paymentMode: any[] = [];
  selectedPayMode;
  showBankDropDowns: boolean = true;

  loadPaymentMode() {

    this.stockService.getFillDDLWithCodeByCtgParent(25).subscribe((res:any) =>{
      let data = res.data;
      this.paymentMode = data;
        this.paymentForm.patchValue({
          paymentMode: this.paymentMode[0]
        });
    });
    // let categoryData = JSON.parse(localStorage.getItem('FILLCODEDATA'));
    // categoryData.forEach((elem, ind) => {
    //   if (elem['ctgID'] == 25) {
    //     this.paymentMode.push(elem);
    //     console.log(elem);
    //     this.paymentForm.patchValue({
    //       paymentMode: this.paymentMode[0]
    //     });
    //   }
    // });
    this.selectedPayMode = {
      "serialNo": 9,
      "codeID": 1,
      "ctgID": 25,
      "categoryName": "DOC TYPE",
      "codeName": "CASH",
      "parentSerialNo": 0,
      "parentCodeName": "",
      "parentCtgID": 0,
      "parentCategoryName": "",
      "hr": 0
    };
    this.selectCashMode()

  }


  jobRecptData1: any[] = [];
  uniqId: any;
  saveData() {
    let jobType: number;
    this.uniqId = Math.floor(100000000 + Math.random() * 900000000);
    this.saveReceiptData = [];
    this.jobRecptData1 = [];
    console.log(this.jobReceiptAddData);

    let tmpObj = { "NJobid": this.jobData['nJobid'], "NUserid": 2.0, "NAcid": this.jobData['nAcid'], "dVrdate": Utils.formatDate(this.dateP), "NBranchid": this.jobData['nBranchId'], "JobReceipt": [] };
    this.jobReceiptAddData.forEach((elem, ind) => {
      let tmpObjRecept = { "NDocType": elem['paymentId'], "NAmount": elem['amount'], "NBankAcid": elem.hasOwnProperty('bank') && elem['bank'] ? elem['bank']['nAcid'] : null, "CRefNo": elem['refNo'] ? elem['refNo'] : null, "Remarks": elem['remarks'] };
      tmpObj.JobReceipt.push(tmpObjRecept);
    });
    // //let tmpObj =  { "dVrDate": "2021-03-12", "nAcid": 1, "nDocType": 1, "nAmtType": 130, "cNarration": "Cash Pay", "cChequeNo": null, "nDrAmt": 0, "nCrAmt": 20, "nBranchid": 1, "nOptid": 1, "nJobid": null, "nItemid": null };
    // this.jobReceiptAddData.forEach((elem, ind) => {

    //   if (elem['paymentMode']['serialNo'] == 10) {
    //     jobType = 2;

    //     this.saveReceiptData = [];
    //     let tmpObj = { "dVrDate": elem['dDate'], "nAcid": this.jobData['nAcid'], "nDocType": jobType, "nAmtType": 130, "cNarration": elem['remarks'], "cChequeNo": elem['refNo'], "nDrAmt": 0, "nCrAmt": elem['amount'], "nBranchid": this.jobData['nBranchId'], "nOptid": 1, "nJobid": this.jobData['nJobid'], "nItemid": null, "CBatchNo": this.uniqId };
    //     let tmpObj1 = { "dVrDate": elem['dDate'], "nAcid": elem['bank']['nAcid'], "nDocType": jobType, "nAmtType": 130, "cNarration": elem['remarks'], "cChequeNo": elem['refNo'], "nDrAmt": elem['amount'], "nCrAmt": 0, "nBranchid": this.jobData['nBranchId'], "nOptid": 1, "nJobid": this.jobData['nJobid'], "nItemid": null, "CBatchNo": this.uniqId };
    //     this.saveReceiptData.push(tmpObj);
    //     this.saveReceiptData.push(tmpObj1);
    //     this.addVoucherEntry(this.saveReceiptData);
    //   } else {
    //     jobType = 1;
    //     this.saveReceiptData = [];
    //     let tmpObj = { "dVrDate": elem['dDate'], "nAcid": this.jobData['nAcid'], "nDocType": jobType, "nAmtType": 130, "cNarration": elem['remarks'], "cChequeNo": null, "nDrAmt": 0, "nCrAmt": elem['amount'], "nBranchid": this.jobData['nBranchId'], "nOptid": 1, "nJobid": this.jobData['nJobid'], "nItemid": null, "CBatchNo": this.uniqId };
    //     this.saveReceiptData.push(tmpObj);
    //     this.addVoucherEntry(this.saveReceiptData);
    //   }


    // });

    // if (this.jobData['nDeliveryCharge'] && this.jobData['nDeliveryCharge'] > 0) {


    //   jobType = 2;
    //   this.saveReceiptData = [];
    //   let tmpObj = { "dVrDate": Utils.formatDate(this.dateP), "nAcid": this.jobData['nDeliveryChargeAcID'], "nDocType": jobType, "nAmtType": 317, "cNarration": "delivery_charges_" + this.jobData['cJobNo'], "cChequeNo": null, "nDrAmt": 0, "nCrAmt": this.jobData['nDeliveryCharge'], "nBranchid": this.jobData['nBranchId'], "nOptid": 1, "nJobid": this.jobData['nJobid'], "nItemid": null, "CBatchNo": this.uniqId };
    //   let tmpObj1 = { "dVrDate": Utils.formatDate(this.dateP), "nAcid": this.jobData['nAcid'], "nDocType": jobType, "nAmtType": 317, "cNarration": "delivery_charges_" + this.jobData['cJobNo'], "cChequeNo": null, "nDrAmt": this.jobData['nDeliveryCharge'], "nCrAmt": 0, "nBranchid": this.jobData['nBranchId'], "nOptid": 1, "nJobid": this.jobData['nJobid'], "nItemid": null, "CBatchNo": this.uniqId };
    //   this.saveReceiptData.push(tmpObj);
    //   this.saveReceiptData.push(tmpObj1);
    //   this.addVoucherEntry(this.saveReceiptData);
    // }

    // if (this.jobData['installationCharge'] && this.jobData['nDeliveryCharge'] > 0) {
    //   jobType = 2;
    //   this.saveReceiptData = [];
    //   let tmpObj = { "dVrDate": Utils.formatDate(this.dateP), "nAcid": this.jobData['nInstallationChargeAcID'], "nDocType": jobType, "nAmtType": 316, "cNarration": "installation_charges_" + this.jobData['cJobNo'], "cChequeNo": null, "nDrAmt": 0, "nCrAmt": this.jobData['installationCharge'], "nBranchid": this.jobData['nBranchId'], "nOptid": 1, "nJobid": this.jobData['nJobid'], "nItemid": null, "CBatchNo": this.uniqId };
    //   let tmpObj1 = { "dVrDate": Utils.formatDate(this.dateP), "nAcid": this.jobData['nAcid'], "nDocType": jobType, "nAmtType": 316, "cNarration": "installation_charges_" + this.jobData['cJobNo'], "cChequeNo": null, "nDrAmt": this.jobData['installationCharge'], "nCrAmt": 0, "nBranchid": this.jobData['nBranchId'], "nOptid": 1, "nJobid": this.jobData['nJobid'], "nItemid": null, "CBatchNo": this.uniqId };
    //   this.saveReceiptData.push(tmpObj);
    //   this.saveReceiptData.push(tmpObj1);
    //   this.addVoucherEntry(this.saveReceiptData);

    // }

    // //this.jobApprove();
    // this.jobReceiptAddData = [];

    // // this.addVoucherEntry(this.saveReceiptData);

    // // console.log(this.jobData);
    // let totalNadSec = 0;

    // let optId = localStorage.getItem('empID');
    // this.jobData['srvItems'].forEach((element, ind) => {
    //   if (element['nItemid']) {
    //     totalNadSec = totalNadSec + element['nadSecurity'];
    //     let tmpObj = { "dVrDate": Utils.formatDate(this.dateP), "nAcid": this.jobData['nAcid'], "nDocType": 2, "nAmtType": 129, "cNarration": "s_deposit - " + element['item'], "cChequeNo": null, "nDrAmt": element['nadSecurity'], "nCrAmt": 0, "nBranchid": this.jobData['nBranchId'], "nOptid": optId, "nJobid": this.jobData['nJobid'], "nItemid": element['nItemid'], "CBatchNo": this.uniqId };
    //     this.jobRecptData1.push(tmpObj);
    //   }
    // });

    // if (this.jobRecptData1.length > 0) {
    //   let tmpObj = { "dVrDate": Utils.formatDate(this.dateP), "nAcid": this.jobData['secDepAcid'], "nDocType": 2, "nAmtType": 129, "cNarration": "s_deposit - " + this.jobData['cCustNm'], "cChequeNo": null, "nDrAmt": 0, "nCrAmt": totalNadSec, "nBranchid": this.jobData['nBranchId'], "nOptid": optId, "nJobid": this.jobData['nJobid'], "nItemid": 0, "CBatchNo": this.uniqId };
    //   this.jobRecptData1.push(tmpObj);
    //   this.addVoucherEntry(this.jobRecptData1);

    // }
    this.addJobReceipt(tmpObj);



  }

  cancel() {
    // console.log('hide');
    this.jobReceiptAddData = [];
    this.jobReceiptPDF = false;
    this.displayJobReceipt = false;
    this.paymentForm.reset();
    this.paymentForm.patchValue({
      paymentMode: this.paymentMode[0]
    });
    this.selectCashMode();
  }

  jobApprove() {

    let tmpData = { "nJobid": this.jobData['nJobid'], "cStatus": 'R' };
    this.accountservice.approveJob(tmpData).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
      this.loadReceiptData();
      // console.log(data);

      //  this.searchJobApproval();

    }, (err) => {

    });
  }
  addJobReceipt(data) {
    this.accountservice.addJobReceipt(data).subscribe((response) => {

      if (response['status'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });

        // this.showPrint = true;

        this.jobApprove();
        this.displayJobReceipt = false;
        this.paymentForm.reset();
        this.disabledSave = false;
        this.paymentForm.patchValue({
          paymentMode: this.paymentMode[0]
        });
        this.selectCashMode();
      }
      setTimeout(() => {
        if (response['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage);
          this.messageService.add({ severity: 'error', summary: response['errorMessage'], detail: 'Not Added' });
        }

      }, 5000);


    }, (err) => {

    });
  }
  addVoucherEntry(data) {
    this.accountservice.addVoucherEntry(data).subscribe((response) => {

      if (response['status'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });

        this.showPrint = true;

      }
      setTimeout(() => {
        if (response['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage);
          this.messageService.add({ severity: 'error', summary: response['errorMessage'], detail: 'Not Added' });
        }

      }, 5000);


    }, (err) => {

    });
  }

  selectCashMode() {
    let evtVal = this.selectedPayMode['serialNo'];

    if (evtVal == 9) {
      this.showBankDropDowns = false;
    } else {
      this.showBankDropDowns = true;
    }
    console.log(evtVal);
  }

  totalAddedAmount: number = 0;
  disabledSave: boolean = false;

  onAdd() {
    let formVal = this.paymentForm.value;

    let tmpObj = {};
    tmpObj['paymentMode'] = formVal['paymentMode'];
    tmpObj['paymentId'] = formVal['paymentMode']['serialNo'];
    tmpObj['ref'] = formVal['refNo'];
    tmpObj['bank'] = formVal['bank'];
    tmpObj['amount'] = formVal['amount'];
    tmpObj['dDate'] = Utils.formatDate(this.dateP);
    tmpObj['remarks'] = formVal['remarks'];
    this.jobReceiptAddData.push(tmpObj);
    this.totalAddedAmount = this.totalAddedAmount + (+formVal['amount']);
    this.paymentForm.reset();
    this.paymentForm.patchValue({
      paymentMode: this.paymentMode[0]
    });
    this.selectCashMode();
    //console.log(this.totalAddedAmount, this.totalAmount)
    if (this.totalAddedAmount === this.totalAmount) {
      this.disabledSave = false;

    } else {
      this.disabledSave = true;
    }



    //console.log(this.jobReceiptAddData);
  }

  delRec(ind) {


    this.totalAddedAmount = this.totalAddedAmount - (+this.jobReceiptAddData[ind]['amount']);
    console.log(this.totalAddedAmount);
    // if ((this.totalAddedAmount - this.totalAmount) > 0) {
    //   this.disabledSave = true;

    // } else {
    //   this.disabledSave = false;
    // }

    if (this.totalAddedAmount === this.totalAmount) {
      this.disabledSave = false;

    } else {
      this.disabledSave = true;
    }
    this.jobReceiptAddData.splice(ind, 1);

  }

  finalInvoiceGenerationDate;
  finalDate;
  ngOnInit(): void {
    this.initializeForm();
    this.BranchLocation();
    this.loadBanks();
    this.loadPaymentMode();

    let d = new Date();
    this.finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.fromDate = finalFromDate;
    this.toDate = new Date(this.finalDate);
    this.BillingDate = new Date(d);
    this.InvoiceDate = new Date(d);
    this.historyFromDate = finalFromDate;
    this.historyToDate = new Date(this.finalDate);
    // this.loadInvoiceData();
  }

  invoiceGenJobNos: any[] = [];
  UnselectAll() {
    this.jobInvoiceGeneratePayload = [];
    this.invoiceGenJobNos = [];
    // if (evt.checked) {
    this.invoiceData.forEach((elem, index) => {
      let tmpObj = {};
      this.invoiceGenJobNos = [];
      tmpObj['nAcID'] = elem['nAcID'];
      tmpObj['invoiceDate'] = Utils.formatDate(this.toDate);
      tmpObj['branchId'] = this.invoiceBranch;
      tmpObj['billingDate'] = Utils.formatDate(this.BillingDate);
      tmpObj['userId'] = localStorage.getItem('empID');
      this.invoiceData[index]['isChecked'] = true;
      this.invoiceData[index]['jobInvServices'].forEach((e, ind) => {
        e['jobInvServiceDtls'].forEach((el, inde) => {
          let invObj = {};
          invObj['frmDt'] = e['dJobdDt'].split("T")[0];
          invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
          invObj['nJobId'] = e['nJobId'];
          invObj['nJobdId'] = el['nJobdid'];
          invObj['nSrvId'] = el['nSrvID'];
          invObj['nSrvSkill'] = el['nSrvSkillId'];
          invObj['nSrvPointid'] = el['nSrvPointId'];
          invObj['nItem'] = el['nItemid'];
          invObj['amount'] = el['nAmount'];
          invObj['nQty'] = el['nQty'];

          invObj['nRateId'] = el['nRateId'];
          invObj['mrp'] = el['mrp'];
          invObj['adRate'] = el['adRate'];
          invObj['discPer'] = el['discPer'];
          invObj['discAmount'] = el['discRateAmt'];
          invObj['unitNm'] = el['unitNm'];
          invObj['jobNo'] = e['cJobdNo'];
          invObj['taxDtls'] = el['jobInvServiceTaxDtls'];
          this.invoiceGenJobNos.push(invObj);
        });
        // invObj['']
        this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
      });
      tmpObj['invoiceGenJobNos'] = this.invoiceGenJobNos;
      this.jobInvoiceGeneratePayload.push(tmpObj);
    });
    // } 
    // else {
    //   this.invoiceData.forEach((elem, index) => {
    //     this.invoiceData[index]['isChecked'] = false;
    //     this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
    //       this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = false;
    //     });
    //   });
    // }
    if (this.jobInvoiceGeneratePayload.length > 0) {
      this.enableGenerateInv = true;
    }
    console.log(this.jobInvoiceGeneratePayload);
  }
  selectAll(evt) {
    this.jobInvoiceGeneratePayload = [];
    this.invoiceGenJobNos = [];
    console.log(this.invoiceData)
    if (evt.checked) {
      this.invoiceData.forEach((elem, index) => {
        let tmpObj = {};
        this.invoiceGenJobNos = [];
        tmpObj['nAcID'] = elem['nAcID'];
        tmpObj['invoiceDate'] = Utils.formatDate(this.toDate);
        tmpObj['branchId'] = this.branch;
        tmpObj['billingDate'] = Utils.formatDate(this.BillingDate);
        tmpObj['userId'] = localStorage.getItem('empID');
        this.invoiceData[index]['isChecked'] = true;
        let invObj = {};
        this.invoiceData[index]['jobInvServices'].forEach((e, ind) => {
            invObj['frmDt'] = e['dJobdDt'].split("T")[0];
            invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
            invObj['nJobId'] = e['nJobId'];
            invObj['nJobdId'] = e['jobInvServiceDtls'][0]['nJobdid'];
            invObj['nSrvId'] = e['jobInvServiceDtls'][0]['nSrvID'];
            invObj['nSrvSkill'] = e['jobInvServiceDtls'][0]['nSrvSkillId'];
            invObj['nSrvPointid'] = e['jobInvServiceDtls'][0]['nSrvPointId'];
            invObj['nItem'] = e['jobInvServiceDtls'][0]['nItemid'];
            invObj['amount'] = e['jobInvServiceDtls'][0]['nAmount'];
            invObj['nQty'] = e['jobInvServiceDtls'][0]['nQty'];
            invObj['nRateId'] = e['jobInvServiceDtls'][0]['nRateId'];
            invObj['mrp'] = e['jobInvServiceDtls'][0]['mrp'];
            invObj['adRate'] = e['jobInvServiceDtls'][0]['adRate'];
            invObj['discPer'] = e['jobInvServiceDtls'][0]['discPer'];
            invObj['discAmount'] = e['jobInvServiceDtls'][0]['discRateAmt'];
            invObj['unitNm'] = e['jobInvServiceDtls'][0]['unitNm'];
            invObj['jobNo'] = e['cJobdNo'];
            invObj['taxDtls'] = e['jobInvServiceDtls'][0]['jobInvServiceTaxDtls'];
            this.invoiceGenJobNos.push(invObj);
          // invObj['']
          this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
        });
        tmpObj['invoiceGenJobNos'] = this.invoiceGenJobNos;
        this.jobInvoiceGeneratePayload.push(tmpObj);
      });
    } else {
      this.invoiceData.forEach((elem, index) => {
        this.invoiceData[index]['isChecked'] = false;
        this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
          this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = false;
        });
      });
      this.jobInvoiceGeneratePayload = [];
    }
    if (this.jobInvoiceGeneratePayload.length > 0) {
      this.enableGenerateInv = true;
    }
    else {
      this.enableGenerateInv = false;
    }
    console.log(this.jobInvoiceGeneratePayload);
  }


  pdfData: any = {};
  generatePdf() {

    //this.pdfData = historyData;
    this.generatePDF();
    console.log(this.pdfData);
  }
  netAmountInvHst;
  subTotal;
  discount;
  cGst = 0;
  iGst = 0;
  cGstRate = 0;
  iGstRate = 0;
  otherAdj = 0;
  grandTotal

  previewPDF(data:any) {
    this.pdfData = data;
    this.calculationTax(this.pdfData)
    console.log('View', data)
    // // this.pdfData.forEach(element => console.log(element))
    // console.log(this.pdfData)
    // let netAmount = this.pdfData['jobInvServices'][0]['jobInvServiceDtls'][0]['adRate'] * this.pdfData['jobInvServices'][0]['jobInvServiceDtls'][0]['nQty'];
     this.netAmountInvHst = Utils.intToEnglish(data.jobInvServices[0].invoiceAmt);
     console.log(this.netAmountInvHst);
     

    // let finalData = this.pdfData['jobInvServices'][0]['jobInvServiceDtls'][0];
    // this.subTotal = finalData['mrp'] * finalData['nQty'];
    // this.cGst = finalData['jobInvServiceTaxDtls'][0]['taxAmount'];
    // this.cGstRate = finalData['jobInvServiceTaxDtls'][0]['taxRate'];
    // this.discount = finalData['discRateAmt'];
    // this.grandTotal = this.subTotal - this.discount + (this.cGst + this.cGst + this.iGst);

    this.displayPDFpreview = true;
  }
  generateInvoice() {

    this.accountservice.generateInvoice(this.payLoadCollectionBody).subscribe((res) => {

      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
      // console.log(res);

      if (res['status'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });

      }
      if (res['status'] == 204) {
        //  this.messageService.add(this.response.errorMessage);
        this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Added' });
      }

    }, (err) => {
      //  this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added' });
    })
  }

  selectAllJob(evt, nAcid) {
    if (evt.checked) {
      this.invoiceData.forEach((elem, index) => {
        if (elem['nAcID'] == nAcid) {
          this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
            this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
          });

          let tmpObj = {};
          this.invoiceGenJobNos = [];
          tmpObj['nAcID'] = elem['nAcID'];
          tmpObj['invoiceDate'] = Utils.formatDate(this.toDate);
          tmpObj['branchId'] = this.branch;
          tmpObj['billingDate'] = Utils.formatDate(this.BillingDate);
          tmpObj['userId'] = localStorage.getItem('empID');
          this.invoiceData[index]['jobInvServices'].forEach((e, ind) => {
            e['jobInvServiceDtls'].forEach((el, inde) => {
              let invObj = {};
              invObj['frmDt'] = e['dJobdDt'].split("T")[0];
              invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
              invObj['nJobId'] = e['nJobId'];
              invObj['nJobdId'] = el['nJobdid'];
              invObj['nSrvId'] = el['nSrvID'];
              invObj['nSrvSkill'] = el['nSrvSkillId'];
              invObj['nSrvPointid'] = el['nSrvPointId'];
              invObj['nItem'] = el['nItemid'];
              invObj['amount'] = el['nAmount'];
              invObj['nQty'] = el['nQty'];
              invObj['nRateId'] = el['nRateId'];
              invObj['mrp'] = el['mrp'];
              invObj['adRate'] = el['adRate'];
              invObj['discPer'] = el['discPer'];
              invObj['discAmount'] = el['discRateAmt'];
              invObj['unitNm'] = el['unitNm'];
              invObj['jobNo'] = e['cJobdNo'];
              invObj['taxDtls'] = el['jobInvServiceTaxDtls'];
              this.invoiceGenJobNos.push(invObj);
            });

          });

          tmpObj['invoiceGenJobNos'] = this.invoiceGenJobNos;
          this.jobInvoiceGeneratePayload.push(tmpObj);


        }
      });
      // console.log(this.jobInvoiceGeneratePayload);

    } else {
      this.invoiceData.forEach((elem, index) => {
        if (elem['nAcID'] == nAcid) {
          this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
            this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = false;
          });
        }
      });

      if (this.jobInvoiceGeneratePayload.length > 0) {
        let sInd = Utils.getIndexById(this.jobInvoiceGeneratePayload, 'nAcID', nAcid);
        if (sInd !== null) {
          this.jobInvoiceGeneratePayload.splice(sInd, 1);

          // console.log(this.jobInvoiceGeneratePayload);
          // console.log(sInd);
        }

      }
      console.log(this.jobInvoiceGeneratePayload);
    }

    // if (evt.checked) {
    //   this.invoiceData.forEach((elem, index) => {
    //     if (elem['nAcID'] == nAcid) {
    //       this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
    //         this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
    //       });
    //     }
    //   });
    // } else {

    //   this.invoiceData.forEach((elem, index) => {
    //     if (elem['nAcID'] == nAcid) {
    //       this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
    //         this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = false;
    //       });
    //     }
    //   });

    //   if (this.jobInvoiceGeneratePayload.length > 0) {
    //     let sInd = Utils.getIndexById(this.jobInvoiceGeneratePayload, 'nAcID', nAcid);
    //     if (sInd !== null) {
    //       this.jobInvoiceGeneratePayload.splice(sInd, 1);

    //       //console.log(this.jobInvoiceGeneratePayload);
    //       // console.log(sInd);
    //     }
    //   }
    // }
    if (this.jobInvoiceGeneratePayload.length > 0) {
      this.enableGenerateInv = true;
    }
    else {
      this.enableGenerateInv = false;
    }
  }

  jobInvoiceGeneratePayload: any[] = [];

  selectJob(evt, nAcid, jobid, item) {
    console.log(item)
    this.invoiceGenJobNos = [];
    if (evt.checked) {
      if (this.jobInvoiceGeneratePayload.length > 0) {
        this.jobInvoiceGeneratePayload.forEach((e, index) => {
          
          let res = this.jobInvoiceGeneratePayload.filter(e => e.nAcID == nAcid);
          if (nAcid == e['nAcID'] && res.length > 0) {
            this.invoiceGenJobNos = e['invoiceGenJobNos'];
            this.invoiceData.forEach((elem, index) => {
              if (nAcid == elem['nAcID']) {
                this.invoiceData[index]['jobInvServices'].forEach((e, ind) => {
                  if (jobid == e['nJobId']) {
                    e['jobInvServiceDtls'].forEach((el, inde) => {
                      let invObj = {};
                      invObj['frmDt'] = e['dJobdDt'].split("T")[0];
                      invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
                      invObj['nJobId'] = e['nJobId'];
                      invObj['nJobdId'] = el['nJobdid'];
                      invObj['nSrvId'] = el['nSrvID'];
                      invObj['nSrvSkill'] = el['nSrvSkillId'];
                      invObj['nSrvPointid'] = el['nSrvPointId'];
                      invObj['nItem'] = el['nItemid'];
                      invObj['amount'] = el['nAmount'];
                      invObj['nQty'] = el['nQty'];
                      invObj['nRateId'] = el['nRateId'];
                      invObj['mrp'] = el['mrp'];
                      invObj['adRate'] = el['adRate'];
                      invObj['discPer'] = el['discPer'];
                      invObj['discAmount'] = el['discRateAmt'];
                      invObj['unitNm'] = el['unitNm'];
                      invObj['jobNo'] = e['cJobdNo'];
                      invObj['taxDtls'] = el['jobInvServiceTaxDtls'];
                      this.invoiceGenJobNos.push(invObj);
                    });
                    this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
                  }
                });
              }
            });
          }
          else if (res.length == 0) {
            let tmpObj = {};
            this.invoiceGenJobNos = [];
            this.invoiceData.forEach((elem, index) => {
              if (nAcid == elem['nAcID']) {
                tmpObj['nAcID'] = elem['nAcID'];
                tmpObj['invoiceDate'] = Utils.formatDate(this.toDate);
                tmpObj['branchId'] = this.branch;
                tmpObj['billingDate'] = Utils.formatDate(this.BillingDate);
                tmpObj['userId'] = localStorage.getItem('empID');
                this.invoiceData[index]['isChecked'] = true;
                this.invoiceData[index]['jobInvServices'].forEach((e, ind) => {
                  if (jobid == e['nJobId']) {
                    e['jobInvServiceDtls'].forEach((el, inde) => {
                      let invObj = {};
                      invObj['frmDt'] = e['dJobdDt'].split("T")[0];
                      invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
                      invObj['nJobId'] = e['nJobId'];
                      invObj['nJobdId'] = el['nJobdid'];
                      invObj['nSrvId'] = el['nSrvID'];
                      invObj['nSrvSkill'] = el['nSrvSkillId'];
                      invObj['nSrvPointid'] = el['nSrvPointId'];
                      invObj['nItem'] = el['nItemid'];
                      invObj['amount'] = el['nAmount'];
                      invObj['nQty'] = el['nQty'];
                      invObj['nRateId'] = el['nRateId'];
                      invObj['mrp'] = el['mrp'];
                      invObj['adRate'] = el['adRate'];
                      invObj['discPer'] = el['discPer'];
                      invObj['discAmount'] = el['discRateAmt'];
                      invObj['unitNm'] = el['unitNm'];
                      invObj['jobNo'] = e['cJobdNo'];
                      invObj['taxDtls'] = el['jobInvServiceTaxDtls'];
                      this.invoiceGenJobNos.push(invObj);
                    });
                    this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
                  }
                });
                tmpObj['invoiceGenJobNos'] = this.invoiceGenJobNos;
                this.jobInvoiceGeneratePayload.push(tmpObj);
                return;
              }
            });
          }
        });
      }
      else {
        this.invoiceData.forEach((elem, index) => {
          let tmpObj = {};
          this.invoiceGenJobNos = [];
          if (nAcid == elem['nAcID']) {
            tmpObj['nAcID'] = elem['nAcID'];
            tmpObj['invoiceDate'] = Utils.formatDate(this.toDate);
            tmpObj['branchId'] = this.branch;
            tmpObj['billingDate'] = Utils.formatDate(this.BillingDate);
            tmpObj['userId'] = localStorage.getItem('empID');
            this.invoiceData[index]['isChecked'] = true;
            
            this.invoiceData[index]['jobInvServices'].forEach((e, ind) => {
              if (jobid == e['nJobId']) {
                e['jobInvServiceDtls'].forEach((el, inde) => {
                  let invObj = {};
                  invObj['frmDt'] = e['dJobdDt'].split("T")[0];
                  invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
                  invObj['nJobId'] = e['nJobId'];
                  invObj['nJobdId'] = el['nJobdid'];
                  invObj['nSrvId'] = el['nSrvID'];
                  invObj['nSrvSkill'] = el['nSrvSkillId'];
                  invObj['nSrvPointid'] = el['nSrvPointId'];
                  invObj['nItem'] = el['nItemid'];
                  invObj['amount'] = el['nAmount'];
                  invObj['nQty'] = el['nQty'];
                  invObj['nRateId'] = el['nRateId'];
                  invObj['mrp'] = el['mrp'];
                  invObj['adRate'] = el['adRate'];
                  invObj['discPer'] = el['discPer'];
                  invObj['discAmount'] = el['discRateAmt'];
                  invObj['unitNm'] = el['unitNm'];
                  invObj['jobNo'] = e['cJobdNo'];
                  invObj['taxDtls'] = el['jobInvServiceTaxDtls'];
                  this.invoiceGenJobNos.push(invObj);
                });
                this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
              }
            });
            tmpObj['invoiceGenJobNos'] = this.invoiceGenJobNos;
            this.jobInvoiceGeneratePayload.push(tmpObj);
            return;
          }
        });
      }
    } else {
      // this.invoiceData.forEach((elem, index) => {
      //   this.invoiceData[index]['isChecked'] = false;
      //   this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
      //     this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = false;
      //   });
      // });
      this.jobInvoiceGeneratePayload.forEach((elem, ind) => {
        if (elem['nAcID'] == nAcid) {
          let tmpArr = this.jobInvoiceGeneratePayload[ind]['invoiceGenJobNos'];
          this.jobInvoiceGeneratePayload[ind]['invoiceGenJobNos'] = [];
          this.invoiceGenJobNos = [];
          tmpArr.forEach((element, inde) => {
            if (jobid != element['nJobId']) {
              let invObj = {};
              invObj['frmDt'] = element['frmDt'];
              invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
              invObj['nJobId'] = element['nJobId'];
              invObj['nJobdId'] = element['nJobdid'];
              invObj['nSrvId'] = element['nSrvID'];
              invObj['nSrvSkill'] = element['nSrvSkillId'];
              invObj['nSrvPointid'] = element['nSrvPointId'];
              invObj['nItem'] = element['nItemid'];
              invObj['amount'] = element['nAmount'];
              invObj['nQty'] = element['nQty'];
              invObj['nRateId'] = element['nRateId'];
              invObj['mrp'] = element['mrp'];
              invObj['adRate'] = element['adRate'];
              invObj['discPer'] = element['discPer'];
              invObj['discAmount'] = element['discRateAmt'];
              invObj['unitNm'] = element['unitNm'];
              invObj['jobNo'] = element['cJobdNo'];
              invObj['taxDtls'] = element['jobInvServiceTaxDtls'];
              this.invoiceGenJobNos.push(invObj);
            }
          });

          // tmpArr = tmpArr.filter(function (item) {
          //   return item.nJobId != jobid;
          // });

          // while(!Utils.getIndexById(tmpArr,'nJobId',jobid)){
          //   let tmpInd =Utils.getIndexById(tmpArr,'nJobId',jobid);
          //   tmpArr.splice(tmpInd,1);
          // }
          // this.jobInvoiceGeneratePayload[ind]['invoiceGenJobNos'] = [];
          this.jobInvoiceGeneratePayload[ind]['invoiceGenJobNos'] = this.invoiceGenJobNos;
        }
      });

      console.log(this.jobInvoiceGeneratePayload);
    }
    if (this.jobInvoiceGeneratePayload.length > 0) {
      this.enableGenerateInv = true;
    }
    else {
      this.enableGenerateInv = false;
    }
    console.log('payload', this.jobInvoiceGeneratePayload);
    console.log('data',this.invoiceGenJobNos);
  }

  selectInvoiceDate(evt) {
    //console.log(evt);
    let tmpDate = `${this.invoiceGenerationDate.getMonth() + 1}/${this.invoiceGenerationDate.getDate()}/${this.invoiceGenerationDate.getFullYear()}`;
    this.finalInvoiceGenerationDate = Utils.formatDate(tmpDate);


    // console.log(this.finalInvoiceGenerationDate);
  }
  storeInviceGenData(){
    console.log(this.invoiceData)
    let payLoadCollection:any = [];
    this.invoiceData.forEach((element, index) =>{
      this.invoiceData[index]['isChecked'] = true;
      var dataObject:any = {
        nAcID:element.nAcID,
        invoiceDate: Utils.formatDate(this.toDate),
        branchId: this.branch,
        billingDate: Utils.formatDate(this.BillingDate),
        userId: localStorage.getItem('empID'),
        invoiceGenJobNos:[]
      }
      element.jobInvServices.forEach((element2:any) =>{
        console.log(element2.jobInvServiceDtls)
        let object2:any = {
          frmDt: element2.dJobdDt.split("T")[0],
          toDt: Utils.formatDate(this.InvoiceDate),
          nJobId: element2.nJobId,
          nJobdId: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nJobdid:null,
          nSrvId: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nSrvID:null,
          nSrvSkill: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nSrvSkillId:null,
          nSrvPointid: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nSrvPointId:null,
          nItem: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nItemid:null,
          amount: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nAmount:null,
          nQty: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nQty:null,
          nRateId: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.nRateId:null,
          mrp: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.mrp:null,
          adRate: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.adRate:null,
          discPer: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.discPer:null,
          discAmount: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.discRateAmt:null,
          unitNm: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.unitNm:null,
          jobNo: element2.cJobdNo,
          remarks: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.Remarks:null,
          taxDtls: element2.jobInvServiceDtls.length > 0 ? element2.jobInvServiceDtls[0]?.jobInvServiceTaxDtls:[]
        }
        
        dataObject.invoiceGenJobNos.push(object2)
      })
      payLoadCollection.push(dataObject)
    });
    this.createGenerationDataStore = [...payLoadCollection];
    console.log('collection', this.createGenerationDataStore)
  }

  selectAllJobData(event){
    
    if(event.checked){
      const stringData = JSON.stringify(this.createGenerationDataStore)
      this.payLoadCollectionBody = [];
      this.payLoadCollectionBody = JSON.parse(stringData);
      this.invoiceData.forEach((element, index) =>{
        this.invoiceData[index]['isChecked'] = true;
        element.jobInvServices.forEach((element2, index2) =>{
          this.invoiceData[index]['jobInvServices'][index2]['isChecked'] = true;
        })
      });
    }else{
      this.payLoadCollectionBody = [];
      this.invoiceData.forEach((element, index) =>{
        this.invoiceData[index]['isChecked'] = false;
        element.jobInvServices.forEach((element2, index2) =>{
          this.invoiceData[index]['jobInvServices'][index2]['isChecked'] = false;
        })
      });
    }
    console.log(this.payLoadCollectionBody)
  }
  selectInvoiceData(event, id, index){
    console.log(event.checked, id)
    const avilabData =  this.payLoadCollectionBody.some(item => item.nAcID == id);
    const indexData =  this.payLoadCollectionBody.findIndex((item) => item.nAcID == id);
    if(event.checked){
      if(avilabData){
        this.payLoadCollectionBody.splice(indexData, 1);
      }
     const dataCheced = this.createGenerationDataStore.find(item => item.nAcID == id);
     this.payLoadCollectionBody.push(dataCheced);
     this.invoiceData[index]['jobInvServices'].forEach((element2, index2) =>{
      this.invoiceData[index]['jobInvServices'][index2]['isChecked'] = true;
    })
    }else{
      this.payLoadCollectionBody.splice(indexData, 1);
      this.invoiceData[index]['jobInvServices'].forEach((element2, index2) =>{
        this.invoiceData[index]['jobInvServices'][index2]['isChecked'] = false;
      })
    }
    console.log(this.payLoadCollectionBody)
  }

  singleSelectJob(event, nAcID, index, data){
    const storeIndex = this.createGenerationDataStore.findIndex((item) => item.nAcID == nAcID);
    const allDataSet = this.createGenerationDataStore.find(item => item.nAcID == nAcID);
    const deepCopy = JSON.stringify(allDataSet)
    const checkAvila = this.payLoadCollectionBody.some(item => item.nAcID == nAcID);
    const indexData =  this.payLoadCollectionBody.findIndex((item) => item.nAcID == nAcID);
    if(event.checked){
      if(!checkAvila){
        const mainObj = JSON.parse(deepCopy);
        const itemPush = mainObj.invoiceGenJobNos[index];
        mainObj.invoiceGenJobNos = [itemPush]
        this.payLoadCollectionBody.push(mainObj)
      }else{
        const mainObj = JSON.parse(deepCopy);
        const itemPush1 = mainObj.invoiceGenJobNos[index];
        this.payLoadCollectionBody[indexData].invoiceGenJobNos.push(itemPush1)
      }
    }else{
      const jobIndex = this.payLoadCollectionBody[indexData].invoiceGenJobNos.findIndex((item) => item.nJobId == data.nJobId)
      this.payLoadCollectionBody[indexData].invoiceGenJobNos.splice(jobIndex, 1)
      if(this.payLoadCollectionBody[indexData].invoiceGenJobNos.length == 0){
      this.payLoadCollectionBody.splice(indexData, 1)

      }
    }
    // const mainObjList = JSON.parse(deepCopy);
    // let checkSection = false;
    // if(this.payLoadCollectionBody.length > 0){
    //   checkSection = this.payLoadCollectionBody[indexData].jobInvServices.length == mainObjList.jobInvServices.length;
    // }
    

    // if(checkSection){
    //   const findIndex = this.invoiceData.findIndex((item) => item.nAcID == nAcID);

    //   this.invoiceData[findIndex]['jobInvServices'].forEach((element2, index2) =>{
    //     this.invoiceData[findIndex]['jobInvServices'][index2]['isChecked'] = true;
    //   })
    // }

  }



  selectInvoice(evt, nAcid) {
    if (evt.checked) {
      this.invoiceData.forEach((elem, index) => {
        if (elem['nAcID'] == nAcid) {
          this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
            this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = true;
          });
          let tmpObj = {};
          this.invoiceGenJobNos = [];
          tmpObj['nAcID'] = elem['nAcID'];
          tmpObj['invoiceDate'] = Utils.formatDate(this.toDate);
          tmpObj['branchId'] = this.branch;
          tmpObj['billingDate'] = Utils.formatDate(this.BillingDate);

          tmpObj['userId'] = localStorage.getItem('empID');
          this.invoiceData[index]['jobInvServices'].forEach((e, ind) => {
            e['jobInvServiceDtls'].forEach((el, inde) => {
              let invObj = {};
              invObj['frmDt'] = e['dJobdDt'].split("T")[0];
              invObj['toDt'] = Utils.formatDate(this.InvoiceDate);
              invObj['nJobId'] = e['nJobId'];
              invObj['nJobdId'] = el['nJobdid'];
              invObj['nSrvId'] = el['nSrvID'];
              invObj['nSrvSkill'] = el['nSrvSkillId'];
              invObj['nSrvPointid'] = el['nSrvPointId'];
              invObj['nItem'] = el['nItemid'];
              invObj['amount'] = el['nAmount'];
              invObj['nQty'] = el['nQty'];

              invObj['nRateId'] = el['nRateId'];
              invObj['mrp'] = el['mrp'];
              invObj['adRate'] = el['adRate'];
              invObj['discPer'] = el['discPer'];
              invObj['discAmount'] = el['discRateAmt'];
              invObj['unitNm'] = el['unitNm'];
              invObj['jobNo'] = e['cJobdNo'];
              invObj['taxDtls'] = el['jobInvServiceTaxDtls'];
              this.invoiceGenJobNos.push(invObj);

            });

          });

          tmpObj['invoiceGenJobNos'] = this.invoiceGenJobNos;
          this.jobInvoiceGeneratePayload.push(tmpObj);


        }
      });


      // console.log(this.jobInvoiceGeneratePayload);


    } else {
      this.invoiceData.forEach((elem, index) => {
        if (elem['nAcID'] == nAcid) {
          this.invoiceData[index]['jobInvServices'].forEach((elem, ind) => {
            this.invoiceData[index]['jobInvServices'][ind]['isChecked'] = false;
          });
        }
      });

      if (this.jobInvoiceGeneratePayload.length > 0) {
        let sInd = Utils.getIndexById(this.jobInvoiceGeneratePayload, 'nAcID', nAcid);
        if (sInd !== null) {
          this.jobInvoiceGeneratePayload.splice(sInd, 1);

          // console.log(this.jobInvoiceGeneratePayload);
          // console.log(sInd);
        }

      }
      console.log(this.jobInvoiceGeneratePayload);
    }

    if (this.jobInvoiceGeneratePayload.length > 0) {
      this.enableGenerateInv = true;
    }
    else {
      this.enableGenerateInv = false;
    }

  }
  dateP: any = new Date;

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }



  getInvoiceHistory() {
    //console.log(this.historyBranch);
    this.accountservice.invoiceHistory(Utils.formatDate(this.fromDate), Utils.formatDate(this.toDate), this.historyBranch).subscribe((res) => {
      this.invoiceHistoryData = res['data'];
      console.log(this.invoiceHistoryData);
    }, (err) => { });

  }
  editJob(data, paymentStatus) {
    console.log(data);
    this.uniqId = data['cBatchNo'];
    this.jobData = data;
    if (this.receiptStatusId == 'A') {
      this.displayJobReceipt = true;
      this.totalAmount = this.jobData['nAdvanceAmt'] + this.jobData['nTotalSecurity'] + this.jobData['installationCharge'] + this.jobData['nDeliveryCharge'];

    } else {

    }

    //console.log(data);
  }

  downloadPdf(data, paymentStatus) {
    console.log(data);
    this.uniqId = data['cBatchNo'];
    this.jobData = data;
    this.printPDF();
  }

  bankData: any[] = [];
  selectBanks(evt) {
    console.log(evt);
  }
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.accountservice.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.branch = this.branchData[0]['val']
        this.historyBranch = this.branchData[0]['val']
        // console.log('This is Branch location',this.branchData);
      }
    );
  }
  loadBanks() {
    let branchId = localStorage.getItem("branchId");
    this.accountservice.getBanks(branchId).subscribe(
      res => {
        this.bankData = res['data'];
        // console.log('This is Branch location',this.branchData);
      }
    );
  }

  initializeForm() {

    this.paymentForm = this.formBuilder.group({
      paymentMode: ['', Validators.required],
      refNo: [''],
      bank: [''],
      amount: ['', Validators.required],
      remarks: ['',],
      dateP: ['', Validators.required]
    });

  }

  jobPdfDialog() {
    this.jobReceiptPDF = true;
  }



  pdfDat: any[] = [];
  totalAmountPdf: number = 0;
  totalAmountPdfWord: string;
  printPDF() {
    this.jobReceiptPDF = true;

    console.log(this.jobData);

    this.accountservice.getPdfData(this.jobData['nAcid'], this.uniqId).subscribe((res) => {
      this.pdfDat = res['data'];
      this.pdfDat['jobReceipts'].forEach(element => {
        this.totalAmountPdf = this.totalAmountPdf + element['amount'];

      });
      this.totalAmountPdfWord = Utils.intToEnglish(this.totalAmountPdf);

    }, (err) => { });
    // console.log('click');
    close();
  }

  calculationTax(data){
    const jobData = data.jobInvServices
    let dataSet:any ={
      sgst:0,
      cgst:0,
      igst:0
    }
    let totalAmount = 0;
    console.log('calculation', data);
    jobData.forEach(element => {
      element.jobInvServiceDtls.forEach(element2 => {
        totalAmount = totalAmount + element2.aDRate;
        element2.jobInvServiceTaxDtls.forEach(element3 => {
            if(element3.taxType == 'CENTRAL'){
              dataSet.cgst = dataSet.cgst + element3.taxAmount
            }
            if(element3.taxType == 'STATE'){
              dataSet.sgst = dataSet.sgst + element3.taxAmount
            }
            if(element3.taxType == 'INDIA'){
              dataSet.igst = dataSet.igst + element3.taxAmount
            }
        });
      });
    });

    console.log(dataSet)
    this.gstCalculation = dataSet;
    this.totalAmountData = totalAmount;
    
  }

  taxCalculation(data){
   let totalGst = 0
    let dataSet:any ={
      sgst:0,
      cgst:0,
      igst:0
    }
     data.forEach((element:any) =>{
      totalGst = totalGst + element.taxAmount;
      if(element.taxType == 'CENTRAL'){
        dataSet.cgst = dataSet.cgst + element.taxAmount
      }
      if(element.taxType == 'STATE'){
        dataSet.cgst = dataSet.sgst + element.taxAmount
      }
      if(element.taxType == 'INDIA'){
        dataSet.cgst = dataSet.igst + element.taxAmount
      }
    });
    return totalGst;
  }


}
