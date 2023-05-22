import { Component, OnInit } from '@angular/core';
import { ManageStockService } from '../managestock.service';
import Utils from '../../helpers/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-stock-issue',
  templateUrl: './stock-issue.component.html',
  styleUrls: ['./stock-issue.component.scss']
})
export class StockIssueComponent implements OnInit {
//abc
  formDate: any;
  toDate: any;
  stockItemTableRes:any[] = [];
  issueDialog:boolean = false;
  issueForm: FormGroup;
  empTableQty:any[] = [];
  showGrid:boolean = false;
  isCustomer:boolean = false;
  pDate: any;
  showIssueEmpItems:boolean=false;
  otpDialog:boolean = false;
  showCustomerIssue:boolean = true;
  showEmployeeIssue: boolean = false;
  showCustomerDeposit:boolean =true;
  showEmployeeDeposit:boolean = false;
  showCustomerDepositeTable:boolean = false;
  showEmployeeDepositeTable:boolean = false;
  isCustDelivery: boolean = false;
  customerData = [];
  employeeData=[];
  issueBranchId;
  jobData:any[]=[];
  public currAcid;
  public showSn:boolean = false;
  totalQtyEmp:number=0;
  saveButtonEnabled:boolean = false;
  response: any;
  items = [];
  deliveryDate;
  deliverBy;
  showSerializedErr:boolean = false;
  currentOtpJobnAcId:any;
  mobileNo:string;
  issuePrintDialog: boolean = false;
  stockId;
  otpValue: any;
  issue = [];
  branchData: any;
  selectedBranch: any = {};
  stockDetailCustomer: any[] = [];
  serialized:any[] = [];
  serializedDialog:boolean = false;
  rows =15;


  constructor(
    private _manageStockService: ManageStockService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    private servicesService: ServicesService
    ) {
      this.issueForm = this._formBuilder.group({
        cTrType: ['I'],
        dStkDate: [''],
        dDeliDate:[''],
        issueTo: [''],
        nAcid:[null],
        issueBranch:[null],
        nJobid: [''],
        nEmpid:[null],
        nDelivered:[null],
        nDeliveredBy:[null],
        createIssueItem: this._formBuilder.group({
          nItemid: [''],
          cSerialNo: [''],
          nQty: [''],
        }),
      });

      this.issue = [
        { name: 'Customer', valName: 'C' },
        { name: 'Employee', valName: 'E' }

      ];
    }

  serializedVal:string[] = [];
  finalSerializedVal:string;
  onChangeSerialized(evt,item,index){
    this.serializedVal = evt['value'];

    this.finalSerializedVal = this.serializedVal.join(",");
    if(this.serializedVal.length > item.approveItemQty){
      // this.showSerializedErrorMsg = true;
      this.empTableQty[index]['isError'] = true;
      this.empTableQty[index]['nQty'] = this.serializedVal.length;
     // this.saveButtonEnabled = false;
    }else{
      this.empTableQty[index]['isError'] = false;
      this.empTableQty[index]['nQty'] = this.serializedVal.length;
      this.empTableQty[index]['cSerialNo'] = this.finalSerializedVal;

    }

    this.manageSaveButtonEnable();


  }
  ngOnInit(): void {
    this.BranchLocation();
    this.getItemList();
    this.searchCustomerIssueData();
    this.autoPopulateEmpIssueData();

    let d = new Date();
    let finalDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.formDate = finalFromDate;
    this.toDate = new Date(finalDate);
  }

  filterManageItem() {
    // console.log(this.trType);
    let transType = 'I';
    this._manageStockService.stockItemList(Utils.formatDate(this.formDate), Utils.formatDate(this.toDate), transType).subscribe(
      res => {
        this.stockItemTableRes = res['data'];
        //console.log(this.stockItemTableRes);
      }
    )
  }

  editStockTrans(){

  }

  delStock(stockId) {

    // console.log('reached');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._manageStockService.delStock(stockId).subscribe(res => {


          if (res['status'] == 200) {
            this.filterManageItem();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });

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

  addPopup(){
    this.issueDialog = true;
  }


  addIssueDetails(){
    let tmpStockDetail = this.issueForm.value;
    let tmpObj = {};

      tmpObj['itemName'] = tmpStockDetail['createIssueItem']['nItemid']['cItemNm'];
      tmpObj['nItemid'] = tmpStockDetail['createIssueItem']['nItemid']['nItemid'];
      tmpObj['cSerialNo'] = tmpStockDetail['createIssueItem']['cSerialNo'];
      tmpObj["cStkType"] = "R",

      tmpObj['nQty'] = tmpStockDetail['createIssueItem']['nQty'];
      tmpObj['nBranchid'] = tmpStockDetail['nBranchid'];
      tmpObj['nUserid'] = localStorage.getItem('loginId');

      // if(this.isCustomer){
      //   tmpObj['nQty'] = 1;
      // }
      this.empTableQty.push(tmpObj);
      this.showGrid = true;
     // console.log(this.empTableQty);
   //  console.log(tmpObj['itemName'])
      this.issueForm.patchValue({
        createIssueItem:{
          nItemid: [''],
          cSerialNo: [''],
          nQty: ['']
        }
      });
  }

  onSelectDate(event) {
    let d = new Date(event);
    this.pDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
    //console.log(finalDate);
  }

  onIssueChange(evt){
    console.log(evt)
    if(evt.value == 'C'){
      this.isCustomer = true;
      this.searchCustomerIssueData();
      this.showIssueEmpItems = false;
      this.showCustomerIssue = true;
      this.showEmployeeIssue = false;
      this.showCustomerDeposit = true;
      this.showEmployeeDeposit = false;
      this.isCustDelivery = true;
    } else{
      this.isCustomer = false;
      this.autoPopulateEmpIssueData();
      this.showIssueEmpItems = true;
      this.showCustomerIssue = false;
      this.showEmployeeIssue = true;
      this.showCustomerDeposit = false;
      this.showEmployeeDeposit = true;
      this.isCustDelivery = false;
    }
   }

   public cMobileNumber:any;
  searchCustomerIssueData(){
    let LedgerSearch = '';
    this._manageStockService.searchCustIssueData(LedgerSearch).subscribe(
      res => {
        this.customerData = res['data'];
       // this.cMobileNumber = this.customerData[2]['addresses'][0]['cMobile'] | 0;
        // console.log(this.customerData[0]);
      }
    );
  }

  autoPopulateEmpIssueData(){
    let LedgerSearch = '';
    let loginId = localStorage.getItem("loginId");
    this._manageStockService.autopopulateEmpIssueData(LedgerSearch,loginId).subscribe(
      res => {
        this.employeeData = res['data'];
        this.deliverBy = this.employeeData[0].nEmpid;
        this.issueForm.get('nDelivered').setValue(this.employeeData[0].nEmpid)
        this.issueForm.get('nDeliveredBy').setValue(this.employeeData[0].nEmpid)
        this.issueForm.get('nEmpid').setValue(this.employeeData[0].nEmpid)
       // this.cMobileNumber = this.employeeData[1]['cMobile1'];
        //console.log(this.employeeData);
      // console.log(this.cMobileNumber);
      }
    );
  }

  onIssueBranchChange(evt){
    this.issueBranchId = evt.value;
  }

  searchJobIssueData(event) {
    let q = event.query;
  //  console.log(this.branchId);

  let branch = this.issueForm.get('issueBranch').value;
    this._manageStockService.loadJobData(q,this.issueBranchId).subscribe((res) => {
        this.jobData = res['data'];
       //console.log(this.jobData);
    }, (err) => { });
     console.log(q);
  }



selectJob(evt) {
  //console.log(evt);
 console.log(this.customerData);
  let jobid = evt['nJobid'];
  let custName = evt['cCustNm'];
  this.currAcid = evt['nAcid'];
  const fJob = this.customerData.filter(e => e.cLedgerNm == custName);
 // console.log(fJob);
 //this.cMobileNumber = fJob[0]['addresses'][0]['cMobile'];
  this.issueForm.patchValue({"nAcid":custName});


  this.getIssueJobno(jobid);

//console.log(evt);


}


  getIssueJobno(jobId){
    //console.log(evt.target.value);

    this.empTableQty = [];
    this._manageStockService.getJobNo(jobId).subscribe(
      res=>{
        let tmpData = res['data'];
        this.cMobileNumber = tmpData[0]['addresses'][0]['cMobile'];
        //console.log(this.cMobileNumber)
        //console.log(tmpData[0]['addresses'][0]['cMobile'])
       //this.issueForm.patchValue({"nAcid":tmpData['cCustNm']});
        tmpData.forEach((element,index) => {
          let jobIssueNO = {};
          //let tmpQty = element['stockBalance'] < 1 ? 0 : 1;
          let tmpQty = 0;
          jobIssueNO['itemName'] = element['CItemNm'];
          jobIssueNO['nItemid'] = element['NItemid'];
          jobIssueNO['approveItemQty'] = element['ApproveItemQty'];
          jobIssueNO['customerInHand'] = element['CustomerInHand'];
          jobIssueNO['nJobdid'] = element['NJobdid'];
          jobIssueNO['stockBalance'] = element['StockBalance'];
          jobIssueNO['nBranchid'] = this.issueForm.get('issueBranch').value;
          jobIssueNO['nQty']= tmpQty;
          jobIssueNO['qntyWrong'] = false;
          jobIssueNO['stockInHand'] = element['StockInHand'];
          jobIssueNO['isError'] = false;
          this.totalQtyEmp = this.totalQtyEmp + tmpQty;
         // this.mobileNo = tmpData['cMobile'];
          jobIssueNO['nUserid'] = localStorage.getItem('loginId');
          jobIssueNO['cSrlzd'] = element['CSrlzd'];
          // if(element['cSrlzd'] && (element['StockBalance'] >= element['ApproveItemQty'])){
          //   this.saveButtonEnabled = false;
          // }

          this.empTableQty.push(jobIssueNO);
        });
        console.log(this.empTableQty);
        // if(this.totalQtyEmp <1){
        //   this.saveButtonEnabled = false;
        // }else{
        //   this.saveButtonEnabled = true;
        // }
        this.showGrid = true;
        this.response = res;
        this.manageSaveButtonEnable();
        // console.log('Issue job no', res);
        // if (this.response['status'] == 200) {
        //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job no Match' });
        // }
        if (this.response['status'] == 204) {
         // console.log('Error')
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

      }
    )
    //salert('HI')
  }


  validateOtp() {
    // this.mobileNo = '9015370897';
    let existingFormValues = this.issueForm.value;
    // console.log(existingFormValues);
    let formData = {};

    formData['cTrType'] = existingFormValues['cTrType'];
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nEmpid'] = existingFormValues['nEmpid'];
    formData['nAcid'] = existingFormValues['nJobid']['nAcid'];
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['stockDetail'] = this.empTableQty;
    console.log(formData);
    let tmpEmp = existingFormValues['nEmpid'] ? existingFormValues['nEmpid'] : 0;
    let tmpAcid = existingFormValues['nJobid'] ? existingFormValues['nJobid']['nAcid'] : 0;
    this._manageStockService.validateOtp(localStorage.getItem('loginId'), tmpEmp, tmpAcid, this.cMobileNumber, this.otpValue).subscribe(

      (res) => {

        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });

          this.otpDialog = false;

          this.stockId = res['data']['nStkid'];
          //   this._manageStockService.addIssue(formData).subscribe(
          //   res => {
          //     this.response = res;
          //     if (this.response['status'] == 200) {
          //       this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
          //       this.issueForm.reset();
          //     }
          //     if (this.response['status'] == 204) {
          //       //  this.messageService.add(this.response.errorMessage)
          //       this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          //     }
          //   }
          // );

          this.empTableQty = [];
          this.issueForm.reset();
          this.issueDialog = false;
          this.issueBranchId = null;
         // window.location.reload();
        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

      },
      (error) => {

      }
    )



  }
  getItemList() {
    this._manageStockService.ItemList().subscribe(
      res => {
        this.items = res['data'];
        console.log(this.items);
      }
    );
  }

  onSelectDeliveryDate(event){
    let d = new Date(event);
    this.deliveryDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
  }

  onChangeDeliverBy(evt, option:Dropdown) {    
    const selectedOption = option.selectedOption;    
    if(selectedOption){
      this.issueForm.get('nDelivered').setValue(selectedOption.nEmpId)
      this.issueForm.get('nDeliveredBy').setValue(selectedOption.nEmpId)     
      this.deliverBy = this.issueForm.get('nDelivered').value;      
    }
  }

  manageSaveButtonEnable(){
    for(let i =0;i<this.empTableQty.length;i++){
      if(this.empTableQty[i].nQty >0){
        if(this.empTableQty[i].nQty > this.empTableQty[i].approveItemQty){
          this.saveButtonEnabled = false;
          break;
        }else{
          this.saveButtonEnabled = true;
        }

      }else{
        continue;
        this.saveButtonEnabled = false;
      }
    }

  }
  nQuanty(item,evt,ind){
    let qtyVal = evt.target.value;
    if(qtyVal > item.approveItemQty){
      this.empTableQty[ind]['qntyWrong'] = true;
      this.empTableQty[ind]['nQty'] = qtyVal;
      // this.saveButtonEnabled = false;
      //this.empTableQty[ind]['qty'] = 0;
    }else{
      this.empTableQty[ind]['qntyWrong'] = false;
      this.empTableQty[ind]['nQty'] = qtyVal;

    }

    this.manageSaveButtonEnable();

    // console.log(item);
    // console.log(evt.target.value);
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

  showOTPDialog(){
    let tmpEmpTable = [];
    this.empTableQty.forEach((elem,ind)=>{
      if(elem['nQty'] > 0){
        tmpEmpTable.push(elem);
      }
    });
    let existingFormValues = this.issueForm.value;

    this.currentOtpJobnAcId = existingFormValues['nJobid']['nAcid'];
    this.mobileNo = this.cMobileNumber;
    //console.log(this.mobileNo)
    let formData = {};

    formData['cTrType'] = existingFormValues['cTrType']? existingFormValues['cTrType'] : "I";
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nEmpid'] = existingFormValues['nEmpid'] ;
    formData['nAcid'] = existingFormValues['nJobid']['nAcid'];
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['stockDetail'] = tmpEmpTable;
    formData['dDeliveryDueDate'] = this.deliveryDate;
    formData['nDeliveredBy'] = this.deliverBy;
    formData['nJobid'] = existingFormValues['nJobid']['nJobid']
    formData['cStkType'] = "R";

    let tmpEmp = existingFormValues['nEmpid'] ? existingFormValues['nEmpid']:0;
    let tmpAcid = existingFormValues['nAcid'] ? existingFormValues['nAcid']:0;
    this._manageStockService.sendOtp(localStorage.getItem('loginId'),tmpEmp,this.currAcid,this.mobileNo,formData).subscribe(

      (res)=>{

        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg']});
          this.otpDialog = true;

        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

      },
      (error)=>{

      });
  }

  pdfData: any;
  stockData: any[] = [];
  issuePrint(data) {
    this.issuePrintDialog = true;
    let stkId = data['NStkid'];
    this._manageStockService.issuePrint(stkId).subscribe((data) => {
      this.pdfData = data['data'];
      this.stockData = this.pdfData['StockDetail'];
      console.log(this.pdfData);
    });
  }

  generatePDF() {

    var element = document.getElementById('contentToConvert');
    //console.log(data);
    let options = {
      imageTimeout: 25000000000000000,
      background: "white",
      allowTaint: true,
      useCORS: false,
      height: 1500,
      width: 1060
    };
    setTimeout(() => {

      html2canvas(element, options).then(canvas => {
        // Few necessary setting options

        let imgData = canvas.toDataURL('image/png');

        let imgWidth = 195,
          pageHeight = 310,
          imgHeight = canvas.height * imgWidth / canvas.width,
          heightLeft = imgHeight,
          doc = new jspdf('p', 'mm', 'a4'),

          position = 0;

        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
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

  onHide() {
    this.issueDialog = false;
    this.empTableQty = [];
    this.issueForm.reset();
  }

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.selectBranch()
      }

    );

  }

  selectBranch() {
    this.selectedBranch = this.branchData[0];
    console.log(this.selectedBranch)

  }

  addIssueItem() {
    console.log('Hello4');
    //console.log('reached.......');
    const formValues = this.issueForm.value;
    // console.log(formValues);

    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");

    let formData = {};
    let issueTo = formValues['issueTo'];

    console.log(this.stockDetailCustomer);
      formData['nEmpid'] = null;
      formData['nAcid'] = formValues['cCustomer'];
      formData['stockDetail'] = this.stockDetailCustomer;
    formData['cTrType'] = "I";
    formData['dStkDate'] = this.pDate;
    formData['nJobid'] = formValues['nJobid'];
    formData['issueTo'] = formValues['issueTo'];
    formData['cCustomer'] = formValues['cCustomer'];
    formData['nUserid'] = userId;
    formData['nBranchid'] = branchId;


    console.log(formData);
    this._manageStockService.addIssue(formData).subscribe(
      res => {
        this.response = res;
        console.log('Issue Stock', res);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
        }
        if (this.response['status'] == 204) {
          console.log('Error')
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

        this.issueForm.reset();
      }
    );
  }
  currApproveItemQty;
  currItem;
  currItemIndex;
  showSerializedErrorMsg:boolean = false;
  AddSerializedValidation(){

    if(this.serializedVal.length > this.currApproveItemQty){
      this.showSerializedErrorMsg = true;
      return;
    }else{
      this.showSerializedErrorMsg = false;
      this.empTableQty[this.currItemIndex]['cSerialNo'] = this.serializedVal.join(",");
      this.serializedDialog = false;
     // this.saveButtonEnabled = true;
      //this.empTableQty[this.currItemIndex]
    }
  }
  jobModel;
  jobNumber;
  itemName;
  addSerialized(items,index){
    console.log(items);
    this.itemName = items['itemName'];
    this.jobNumber = this.jobModel['cJobNo']
    this.serializedVal = [];
    this.serializedDialog = true;
    let catId = 127;
    let stcType = 'R';
    this.currApproveItemQty = items['approveItemQty'];
    this.currItemIndex = index;
    this.currItem = items;
    let branchId = items['nBranchid'];
    let itemId = items['nItemid'];
    this._manageStockService.getSerialized(catId,itemId,stcType,branchId).subscribe((res) => {
      this.serialized = res['data'];
      console.log(this.serialized);
    })
  }

}
