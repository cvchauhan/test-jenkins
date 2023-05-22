import { Component, Input, OnInit,HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { element } from 'protractor';
import Utils from 'src/app/helpers/utils';
import { AccountService } from '../account.service';
import * as uuid from 'uuid';
import moment from 'moment';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
@Component({
  selector: 'app-voucher-entry',
  templateUrl: './voucher-entry.component.html',
  styleUrls: ['./voucher-entry.component.css']
})
export class VoucherEntryComponent implements OnInit {
  products = [
    { name: 'Gitanjli' },
  ];
  @Input() ledgerName: string;
  @Input() nAcidId:any;
  docType: boolean = false;
  transfer: boolean = false;
  cash: boolean = true;
  branch: 'UDAIPUR';
  creditA:any = "";
  debitA:any = "";
  cashVal = 1;
  transferVal = 2;
  creditAmmount: any;
  debitAmmount: any;
  searchLedger:any = '';
  jobItemData: any[] = [];
  jobItem: any[] = [];
  jobItemResData: any;
  debit: boolean = true;
  credit: boolean = true;
  sTableList: any[];
  checkNo: boolean = false;
  iteam: boolean = false;
  job: boolean = false;
  nDocType: any = 1;
  voucherEntryData: any;
  formDate: any;
  toDate: any;
  uniqId:any;
  public deadline: Date;
  ledgerEntry = [];
  branchData: any;
  branchId;
  ledgerData: any;
  response: any;
  ledgerForm: FormGroup;
  displayPosition: boolean;
  displayPayment: boolean;
  displayJournal: boolean;
  position: string;
  minimumDate = new Date();
  selectedCategory: any = "";
  categories: any[] = [{ name: 'Cash', key: '1' }, { name: 'Transfer', key: '2' }];
  nVoucherType:any;
  invalidDates: Array<Date>;
  categoriesData: any[] = [];
  ammountData: any[] = [];
  selectedBranch:string;
  filteredGroups: any[];
  depositTable:boolean=false;
  public voucherType;
  public displayRefund:boolean = false;
  public bankDetailTable: any[] = [];
  public securityDeposit: any[] = [];
  public transactionTitle = '';

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private empService : EmployeeService
  ) { 
    this.voucherType = [
      // {name: 'Receipts', code: 'R'},
      // {name: 'Payments', code: 'P'},
      // {name: 'Journal', code: 'J'},
  ];

  this.bankDetailTable = [
    {pmode: 'Cash',insno:'12556',amount:'52655'}
  ];

  this.securityDeposit = [
    {item: 'Item 1', deposit: '5000'}
  ]
  }
  ngOnInit(): void {
   // this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));

   this.empService.getctgData(26).subscribe((res:any)=>{
    this.categoriesData = res.data
   })
     
    this.uniqId = Math.floor(100000000 + Math.random() * 900000000);
    this.BranchLocation();
    this.ledgerVoucherForm();
    this.selectedCategory = this.categories[1];
    this.ammountTypeF();
    this.selectLedger();

    this.accountService.getVoucherType().subscribe((res)=>{
      this.voucherType = res['data'];
      // res['data'].forEach((elem,ind)=>{

      // });
     // console.log(res);
    },(err)=>{

    });
    // this.defaultDate.setDate(this.defaultDate.getDate() - 5);
    // this.deadline.setDate((new Date()).getDate() - 5);
    let d = new Date();
    let finalDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.formDate = finalFromDate;
    this.toDate = new Date(finalDate);

  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayPosition = false;
    this.displayPayment = false;
    this.displayJournal = false;
    this.displayRefund = false;
  }
  
  selectLedgerF(typeofledger?) {
    let branchId=localStorage.getItem("branchId");
    if(typeofledger){
      this.accountService.selectCustomer(branchId,typeofledger,).subscribe(
        res => {
            this.selectLedger = res['data'];
          //  console.log('this is select Ledger Data', this.selectLedger);
        }
    );
    }else{

      this.accountService.selectCustomer(branchId).subscribe(
        res => {
            this.selectLedger = res['data'];
          //  console.log('this is select Ledger Data', this.selectLedger);
        }
    );
    }
   
}
  // get dropdown Ammount Type Data
  ammountTypeF() {
    this.categoriesData.forEach((element) => {
      if (element['categoryName'] == 'AMT TYPE') {
        this.ammountData.push({ serialNo: element['serialNo'], codeID: element['codeID'], ctgID: element['ctgID'], categoryName: element['categoryName'], codeName: element['codeName'], parentSerialNo: element['parentSerialNo'], parentCodeName: element['parentCodeName'] });
        console.log('This is Ammount Type dropdown Data', this.ammountData);
      }
    });
  }
  isReceiptClicked:boolean = false;
  isPaymentClicked:boolean = false;
  showPopup() {
    this.isReceiptClicked = true;
    this.isPaymentClicked = false;
    this.debitA = 0;
    this.selectLedgerF();
    this.displayPosition = true;
    this.transactionTitle = "Voucher Receipts";
  }
  showPopupContra(){

    this.isReceiptClicked = true;
    this.isPaymentClicked = true;
    this.debitA = 0;
    this.creditA = 0;
    this.selectLedgerF(6);
    this.displayPosition = true;
    this.transactionTitle = "Voucher Contra";
  }

  showPopupPayments(){
    this.displayPayment = true;
    this.creditA = 0;
    this.isPaymentClicked = true;
    this.isReceiptClicked = false;
    this.transactionTitle = "Voucher Payments";
  }

  showPopupJournal(){
    this.displayJournal = true;
    this.transactionTitle = "Voucher Journal";
  }

  // get Select Ledger DropDown
  selectLedger() {
    let branchId=localStorage.getItem("branchId");
    this.accountService.filterLedgerData(this.searchLedger,branchId).subscribe(
      res => {
        this.ledgerData = res['data'];
        console.log('this is select Ledger Data', this.ledgerData);
        this.ledgerName = this.ledgerData[0].cLedgerNm;
        console.log('Ledger Name',this.ledgerName);
        this.nAcidId = this.ledgerData[0].nAcid;
      }
    );
  }
  // Select Branch location
  //  get Branch and Location
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.accountService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.branchId=this.branchData[0];
      //  this.selectedBranch = this.branchData.value;
        // console.log(this.selectedBranch);

        // console.log('This is Branch location',this.branchData);
      }
    );
  }
  ledgerVoucherForm() {
    this.ledgerForm = this.fb.group({
      dVrDate: new FormControl('', [Validators.required]),
      nAcid: new FormControl('', [Validators.required]),
      nDocType: new FormControl('1'),
      nAmtType: new FormControl('', [Validators.required]),
      cNarration: new FormControl('', [Validators.required]),
      cChequeNo: new FormControl(''),
      nDrAmt: new FormControl(''),
      nCrAmt: new FormControl(''),
      nBranchid: new FormControl('', [Validators.required]),
      nOptid: new FormControl('1'),
      cBatchNo:new FormControl(this.uniqId),
      nJobid: new FormControl(''),
      nItemid: new FormControl('')
    });
  }
  get formControls() {
    return this.ledgerForm.controls;
  }
  submit(form: any) {
    // if(this.ledgerForm.invalid){
    //   this.messageService.add({ severity: 'error', summary: 'Invalid Form', detail: 'Kindly Fill The Form' });
    //   return false
    // }
    // console.log('this is form value', form.value);
    // let formValues = this.ledgerForm.value;
    // // let dateDate = formValues['dVrDate'];
    // formValues.dVrDate'] = formValues.dVrDate;
    // const nCrAmt = formValues.nCrAmt !=null?formValues.nCrAmt:0;
    // const nDrAmt = formValues.nDrAmt !=null?formValues.nDrAmt:0;
    // const nDocType = formValues.nDocType !=null?formValues.nDocType:0;;
    // if(nDocType){
    //   formData =[{
    //     nDocType: this.nDocType= 1,
    //     "dVrDate": formValues['dVrDate'],
    //     "nAcid": formValues['nAcid']['nAcid'],
    //     "nAmtType": formValues['nAmtType']['serialNo'],
    //     "cNarration": formValues['cNarration'],
    //     "cChequeNo": formValues['cChequeNo'],
    //     "nDrAmt": formValues['nDrAmt'],
    //     "nCrAmt": formValues['nCrAmt'],
    //     "nBranchid": formValues['nBranchid']['val'],
    //     "nOptid": formValues['nOptid'],
    //     "nJobid": formValues['nJobid']['nJobID'],
    //     "nItemid": formValues['nItemid']['nItemID']
    //   }]
    // }else{
    //   formData=[{
    //     nDocType: this.nDocType= 2,
    //     "dVrDate": formValues['dVrDate'],
    //     "nAcid": formValues['nAcid']['nAcid'],
    //     "nAmtType": formValues['nAmtType']['serialNo'],
    //     "cNarration": formValues['cNarration'],
    //     "cChequeNo": formValues['cChequeNo'],
    //     "nDrAmt": formValues['nDrAmt'],
    //     "nCrAmt": formValues['nCrAmt'],
    //     "nBranchid": formValues['nBranchid']['val'],
    //     "nOptid": formValues['nOptid'],
    //     "nJobid": formValues['nJobid']['nJobID'],
    //     "nItemid": formValues['nItemid']['nItemID']
    //   }]
    // }

    this.accountService.addVoucherEntry(this.ledgerEntry).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfull' });
          this.ledgerForm.reset({
            dVrDate:new Date(),
            nBranchid:this.branchData[0]
          });
          this.displayPosition=false
          // window.location.reload();
          this.ledgerEntry = [];
        }
        if (this.response['status'] == 204) {
          this.ledgerEntry = []
          this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Successfull' });
        }
        // else{
        //   this.messageService.add({severity:'error', summary:'Something Went Wrong', detail:'Not Added'});
        // }
      }
    )
  }

  AddLedgerEntry() {
    console.log(this.ledgerForm.value);
    const formData = this.ledgerForm.value;
    if(formData){
      this.ledgerEntry.push({
        dVrDate: formData.dVrDate,
        nAcid: formData.nAcid?.nAcid,
        nDocType:this.nVoucherType?.codeID!= null ? this.nVoucherType?.codeID:1,
        nAmtType: formData.nAmtType?.serialNo,
        cNarration: formData.cNarration,
        cChequeNo: formData.cChequeNo,
        nDrAmt: formData.nDrAmt != null ? formData.nDrAmt:0,
        nCrAmt: formData.nCrAmt  != null ? formData.nCrAmt:0,
        nBranchid: formData.nBranchid?.val,
        nOptid: formData.nOptid != null ? formData.nOptid:1,
        nJobid: formData.nJobid?.nJobID,
        nItemid: formData.nItemid?.nItemID
      });
    }
    
    setTimeout(() =>{
      this.ledgerForm.reset({
        dVrDate:formData.dVrDate,
        nBranchid:this.branchData[1]
      });
    }, 20)
  }
  deleteLedgerEntry(id) {
    this.ledgerEntry.splice(id);
  }

  // Delete Table Data
  deleteVoucherDataF(id: any, LoginID) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteVoucherById(id, LoginID).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.searcVoucherF();
            }
            if (this.response['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Deleted Successfully' });
            }
          }
        );
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });
  }

  // Voucher List

  onSelectMethod(event, typ) {
    // let d = new Date(event);
    // console.log(d);
    // let finalDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    // // let finalDate = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
    // console.log(finalDate);
    // if (typ == "fromD") {
    //   this.formDate = finalDate;
    // } else {
    //   this.toDate = finalDate;
    // }
  }
  //   search Table Data
  searcVoucherF() {

    const dataSet = this.nVoucherType && this.nVoucherType.codeID ? this.nVoucherType['codeID'] : 0;
    //  let docType = evt;
    // console.log(this.formDate, 'this is formdate');
    // console.log(this.toDate, 'this is todate');
    //console.log('this is doctype',this.nVoucherType['codeID']);
    this.accountService.voucherList( Utils.formatDate(this.formDate),Utils.formatDate(this.toDate),dataSet).subscribe(
      res => {
      //  console.log(res, 'this is response');
        this.voucherEntryData = res['data'];
      //  console.log(this.voucherEntryData, 'Table Data');
      }
    );
  }

  // pagingnation
  first = 0;

  rows = 10;
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.sTableList ? this.first === (this.sTableList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.sTableList ? this.first === 0 : true;
  }
  // End Pagingnation

  // Add voucher popup pagingnation
  firsts = 0;

  row = 2;
  nexts() {
    this.firsts = this.firsts + this.row;
  }

  prevs() {
    this.firsts = this.firsts - this.row;
  }

  resets() {
    this.firsts = 0;
  }
  isLastPages(): boolean {
    return this.ledgerEntry ? this.firsts === (this.sTableList.length - this.row) : true;
  }

  isFirstPages(): boolean {
    return this.ledgerEntry ? this.firsts === 0 : true;
  }
  // End voucher Popup Pagingnation

  debitEntry(type) {
    if (type == 'debit') {
      this.debit = true;
      this.credit = false;
    }
    else {
      this.credit = true;
      this.debit = false;
    }
    console.log('this is cash and transfer value');
  }

  onTransferF() {
    this.debit = true;
    this.credit = true;
    console.log('this is transfer value');
  }
  amoountTypeF(event) {
    console.log(event);
    let amountName = event.value['codeName'];
   
    switch (amountName) {
      case 'SECURITY DEPOSIT':
        this.iteam = true;
        this.job = true;
        this.jobItemData;
        this.jobItemData.forEach((element) => {
          this.creditAmmount = element['nSecurity'] - element['nSecurityDeposit'];
          this.debitAmmount = element['nSecurityDeposit'];
          console.log('debitAmmount', this.debitAmmount);
          console.log('creditAmmount', this.creditAmmount);
          this.jobItem.push({ cItem: element['cItem'], cJob: element['cJob'], nItemID: element['nItemID'], nJobID: element['nJobID'], nRant: element['nRant'], nSale: element['nSale'], nSecurity: element['nSecurity'], nSecurityDeposit: element['nSecurityDeposit'], nUnit: element['nUnit'], unit: element['nUnit'] });
          let debitAmount = this.ledgerForm.value['nDrAmt'];
          let creditAmount = this.ledgerForm.value['nCrAmt'];
          console.log(debitAmount)
          if (debitAmount > this.debitAmmount && debitAmount > 0) {
            this.creditA = 0;
            this.messageService.add({ severity: 'error', summary: 'OOPS', detail: `You Have Only ${this.debitAmmount} Kindly Change Your Debit Ammount` });
          };
          if (creditAmount > this.creditAmmount && creditAmount > 0) {
            this.debitA = 0;
            this.messageService.add({ severity: 'error', summary: 'OOPS', detail: `You Have Only' ${this.creditAmmount} Kindly Change Your Credit Ammount` });
          }
        });
        console.log(this.jobItemData);
        break;
      case 'ON ACCOUNT':
        this.iteam = false;
        this.job = false;
        break;
    }
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

  jobItemF(event) {
    let nAcid = event.value['nAcid'];
    console.log()
    console.log(nAcid);
    if (nAcid) {
      this.accountService.jobItem(nAcid).subscribe(
        res => {
          this.jobItemResData = res['data'];
          if(this.jobItemResData && this.jobItemResData.length > 0){
            this.jobItemResData.forEach(element => {
              this.jobItemData.push({ cItem: element['cItem'], cJob: element['cJob'], nItemID: element['nItemID'], nJobID: element['nJobID'], nRant: element['nRant'], nSale: element['nSale'], nSecurity: element['nSecurity'], nSecurityDeposit: element['nSecurityDeposit'], nUnit: element['nUnit'], unit: element['nUnit'] });
              // let debitAmount = this.ledgerForm.value['nDrAmt'];
              // let creditAmount = this.ledgerForm.value['nCrAmt'];
              // console.log(debitAmount);
              // if(debitAmount>this.debitAmmount){
              //   alert("not alow");
              // }
            });
          }else{
            this.ledgerForm.get('nJobid').setValue(0);
          }
          
        }
      );
    }
    else {
      this.jobItemResData = null;
    }
  }
  creditF(ty) {

    //console.log(ty);
    if(ty == "debit" && this.debitA > 0){
      this.creditA = 0;
    }else{
      this.debitA = 0;
    }
    // let credit = this.ledgerForm.value['nCrAmt'];
    // let debit = this.ledgerForm.value['nDrAmt'];
 
    // if (credit > 0) {
    //   this.debitA = 0;
  
    // }
    // if (debit > 0) {
    //   this.creditA = 0;
   
    // }
  }

  cashF() {
    this.transfer = false;
    this.cash = true;
    this.docType = false;
    this.nDocType = 1;
  }
  transactionF() {
    this.transfer = true;
    this.cash = false;
    this.docType = true;
    this.nDocType = 2;

  }

  onFocusCredit(ty){

    if(ty == "debit"){
      this.creditA = 0;
    }else{
      this.debitA = 0;
    }
    // if(event.target.value == 0 || event.target.value == '') {
    //   event.target.value = '';
    //   console.log('blank');
    // } else{
    //   event.target.value = 0;
    // }
    // console.log(event.target.value);
  }
  onHideModal(){
    this.ledgerForm.reset({
      dVrDate:new Date(),
      nBranchid:this.branchData[0]
    });
    this.ledgerEntry = [];
  }

  filterLedger(event) {
    let query = event.query;
    let filtered: any[] = [];
     for (let i = 0; i < this.selectLedger.length; i++) {
          let group = this.selectLedger[i];
          if (group.cLedgerNm.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(group);
          }
      }
      this.filteredGroups = filtered;
    }

  filterAtype(event) {
    let query = event.query;
   // this.amoountTypeF(event);
    let filtered: any[] = [];
     for (let i = 0; i < this.ammountData.length; i++) {
          let group = this.ammountData[i];
          if (group.codeName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(group);
          }
      }
      this.filteredGroups = filtered;
    }

    amtType(evt){
      
      console.log(evt.codeName);
      if(evt.codeName == 'SECURITY DEPOSIT'){
        this.depositTable = true;
      } else {
        this.depositTable = false;
      }
    }

    showRefund(){
      this.displayRefund = true;
    }
}
