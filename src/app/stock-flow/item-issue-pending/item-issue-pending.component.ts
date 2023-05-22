import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { ServicesService } from 'src/app/services/services.service';
import { ManageStockService } from '../managestock.service';

@Component({
  selector: 'app-item-issue-pending',
  templateUrl: './item-issue-pending.component.html',
  styleUrls: ['./item-issue-pending.component.css']
})
export class ItemIssuePendingComponent implements OnInit {

  branchData: any;
  branchId: any = {};
  pendingTabelData: [] = [];
  pendingTabelData1: [] = [];
  rows = 15;
  issueDialog: boolean = false;
  issueForm: FormGroup;
  response: any;
  stockDetailCustomer: any[] = [];
  pDate: any;
  issue = [];
  showCustomerIssue: boolean = true;
  issueBranchId;
  jobData: any[] = [];
  public currAcid;
  customerData = [];
  public cMobileNumber: any;
  empTableQty: any[] = [];
  totalQtyEmp: number = 0;
  nJobid: number = 0;
  showGrid: boolean = false;
  saveButtonEnabled: boolean = false;
  showEmployeeIssue: boolean = false;
  showIssueEmpItems: boolean = false;
  isCustDelivery: boolean = false;
  deliveryDate;
  deliverBy;
  employeeData = [];
  showSerializedErr: boolean = false;
  currentOtpJobnAcId: any;
  mobileNo: string;
  newMobile:string
  otpDialog: boolean = false;
  otpValue: any;
  stockId;
  viewPendingDisplay: boolean = false;
  isDeliveryPermited: boolean = false;
  getOtpDetails:any = null;
  newEmpName= ''


  constructor(
    private servicesService: ServicesService,
    private _manageStockService: ManageStockService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
  ) {
    this.issueForm = this._formBuilder.group({
      cTrType: ['I'],
      dStkDate: [''],
      dDeliDate: [''],
      issueTo: [''],
      nAcid: [null],
      issueBranch: [null],
      nJobid: [''],
      nEmpid: [null],
      nDelivered: [null],
      nDeliveredBy: [null],
      Accountname:[null],
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

  ngOnInit(): void {
    this.BranchLocation();
    this.searchCustomerIssueData();
    this.getEmployeeBySrvSkills();

  }
  getEmployeeBySrvSkills() {
    const req = 30 ;
    const scheduleDate = moment().format('YYYY-MM-DD');
    this.servicesService.getSkillIdData(req).subscribe((res:any) =>{      
      if(res){
      const dataSelect = res.data[0];
      if(dataSelect){
        this.getLeaderCollection(dataSelect.nSerialNo, scheduleDate)
      }    }
    })
    
    
  }
  getLeaderCollection(srvSkillsId, scheduleDate){  
    this.servicesService.getEmpBySrvSkill(srvSkillsId, scheduleDate).subscribe((res:any) => {
      this.employeeData = res.data;            
      if(this.employeeData.length >0){
        this.issueForm.get('nDelivered').setValue(this.employeeData[0].nEmpId)
        this.issueForm.get('nDeliveredBy').setValue(this.employeeData[0].nEmpId)
        this.issueForm.get('nEmpid').setValue(this.employeeData[0].nEmpId)
        this.deliverBy = this.employeeData[0].nEmpId;
      }
    }, (error) => {
      console.error(error);
    });
  }



  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
      this.branchId = this.branchData[0]['val'];
      this.viewData();
    });
  }

  viewData() {
    this._manageStockService.getItemIssuePending(this.branchId).subscribe((res) => {
      this.pendingTabelData = res['data'];      
    });
  }

  showIssue(data) {    
    this.issueDialog = true;
    let branch = this.branchData.filter(e => e.val == data['nBranchId']);
    let jobno = data['CJobNo'];
    let jobid = data['nJobid'];
    this.nJobid = 0;
    this.nJobid = data['nJobid'];
    let issue = this.issue[0];    
    this.currAcid = data['nAcId'];
    this.deliveryDate = data['dJobDate'] ? this.formatDate(data['dJobDate']) : null;        
    this.onIssueChange(issue);
    this.getIssueJobno(jobid);
    this.getEmployeeBySrvSkills();
    this.issueForm.patchValue({
      dStkDate: new Date,
      issueTo: this.issue[0],
      issueBranch: branch[0],
      nJobid: data['CJobNo'],
      nAcid: data['Accountname'],
      nDelivered:data.nAcId,
      dDeliDate:new Date(data.dJobDate)
    });
    this.isDeliveryPermited = false;
    if (data['ItemDelivery'] === "Not Permitted") {
      this.isDeliveryPermited = true;
    }
    this.newMobile = data.Mobileno
  }

  onHide() {
    this.issueDialog = false;
    this.issueForm.reset()
  }

  viewPendingIssue(evt) {
    this.pendingTabelData1=evt.StockItems;
    this.viewPendingDisplay = true;
  }

  addIssueItem() {    
    const formValues = this.issueForm.value;    
    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");

    let formData = {};
    let issueTo = formValues['issueTo'];
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
    this._manageStockService.addIssue(formData).subscribe(
      res => {
        this.response = res;        
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
        }
        if (this.response['status'] == 204) {         
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

        this.issueForm.reset();
      }
    );
  }

  onSelectDate(event) {
    let d = new Date(event);
    this.pDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;    
  }

  onIssueChange(evt) {    
    if (evt.valName == 'C') {
      this.showCustomerIssue = true;
      this.showEmployeeIssue = false;
      this.showIssueEmpItems = false;
      this.isCustDelivery = true;
      this.searchCustomerIssueData();
    } else {
      this.showCustomerIssue = false;
      this.showEmployeeIssue = true;
      this.showIssueEmpItems = true;
      this.isCustDelivery = false;
    }
  }

  onIssueBranchChange(evt) {
    this.issueBranchId = evt.value;
  }

  searchJobIssueData(event) {
    let q = event.query;    
    let branch = this.issueForm.get('issueBranch').value;
    this._manageStockService.loadJobData(q, this.branchId).subscribe((res) => {
      this.jobData = res['data'];      
    }, (err) => { console.error(err) });    
  }

  searchCustomerIssueData() {
    let LedgerSearch = '';
    this._manageStockService.searchCustIssueData(LedgerSearch).subscribe(
      res => {
        this.customerData = res['data'];        
      }
    );
  }

  selectJob(evt) {   
    let jobid = evt['nJobid'];
    let custName = evt['cCustNm'];
    this.currAcid = evt['nAcid'];
    const fJob = this.customerData.filter(e => e.cLedgerNm == custName);
    this.issueForm.patchValue({ "nAcid": custName });
    this.getIssueJobno(jobid);
  }

  getIssueJobno(jobId) {    
    this.empTableQty = [];
    this._manageStockService.getJobNo(jobId).subscribe(
      res => {
        let tmpData = res['data'];
        this.cMobileNumber = tmpData[0]['addresses'][0]['cMobile'];
        //this.issueForm.patchValue({"nAcid":tmpData['cCustNm']});
        tmpData.forEach((element, index) => {
          let jobIssueNO = {};
          //let tmpQty = element['stockBalance'] < 1 ? 0 : 1;
          let tmpQty = 0;
          jobIssueNO['itemName'] = element['CItemNm'];
          jobIssueNO['nItemid'] = element['NItemid'];
          jobIssueNO['approveItemQty'] = element['ApproveItemQty'];
          jobIssueNO['customerInHand'] = element['CustomerInHand'];
          jobIssueNO['nJobdid'] = element['NJobdid'];
          jobIssueNO['stockBalance'] = element['StockBalance'];
          jobIssueNO['nBranchid'] = element['NBranchId'];
          jobIssueNO['nQty'] = tmpQty;
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
      
        // if(this.totalQtyEmp <1){
        //   this.saveButtonEnabled = false;
        // }else{
        //   this.saveButtonEnabled = true;
        // }
        this.showGrid = true;
        this.response = res;
        this.manageSaveButtonEnable();        
        // if (this.response['status'] == 200) {
        //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job no Match' });
        // }
        if (this.response['status'] == 204) {          
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

      }
    )
    //salert('HI')
  }

  manageSaveButtonEnable() {
    for (let i = 0; i < this.empTableQty.length; i++) {
      if (this.empTableQty[i].nQty > 0) {
        if (this.empTableQty[i].nQty > this.empTableQty[i].approveItemQty) {
          this.saveButtonEnabled = false;
          break;
        } else {
          this.saveButtonEnabled = true;
        }

      } else {
        continue;
        this.saveButtonEnabled = false;
      }
    }

  }

  onSelectDeliveryDate(event) {
    let d = new Date(event);
    this.deliveryDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;    
  }

  onChangeDeliverBy(evt, option:Dropdown) {    
    const selectedOption = option.selectedOption;    
    if(selectedOption){
      this.issueForm.get('nDelivered').setValue(selectedOption.nEmpId)
      this.issueForm.get('nDeliveredBy').setValue(selectedOption.nEmpId)
      this.newMobile = selectedOption.empMobile;
      this.newEmpName = selectedOption.empName;
      this.deliverBy = this.issueForm.get('nDelivered').value;      
    }
  }

  // autoPopulateEmpIssueData() {
  //   let LedgerSearch = '';
  //   let loginId = localStorage.getItem("loginId");
  //   this._manageStockService.autopopulateEmpIssueData(LedgerSearch, loginId).subscribe(
  //     res => {
  //       this.employeeData = res['data'];
  //       // this.cMobileNumber = this.employeeData[1]['cMobile1'];
  //     }
  //   );
  // }

  nQuanty(item, evt, ind) {
    let qtyVal = evt.target.value;
    if (qtyVal > item.approveItemQty) {
      this.empTableQty[ind]['qntyWrong'] = true;
      this.empTableQty[ind]['nQty'] = qtyVal;
      // this.saveButtonEnabled = false;
      //this.empTableQty[ind]['qty'] = 0;
    } else {
      this.empTableQty[ind]['qntyWrong'] = false;
      this.empTableQty[ind]['nQty'] = qtyVal;
    }

    this.manageSaveButtonEnable();
  }


  serializedVal: string[] = [];
  finalSerializedVal: string;
  onChangeSerialized(evt, item, index) {   
    this.serializedVal = evt['value'];

    this.finalSerializedVal = this.serializedVal.join(",");
    if (this.serializedVal.length > item.approveItemQty) {
      // this.showSerializedErrorMsg = true;
      this.empTableQty[index]['isError'] = true;
      this.empTableQty[index]['nQty'] = this.serializedVal.length;
      // this.saveButtonEnabled = false;
    } else {
      this.empTableQty[index]['isError'] = false;
      this.empTableQty[index]['nQty'] = this.serializedVal.length;
      this.empTableQty[index]['cSerialNo'] = this.finalSerializedVal;

    }

    this.manageSaveButtonEnable();


  }

  showOTPDialog() {
    let tmpEmpTable = [];
    this.empTableQty.forEach((elem, ind) => {
      if (elem['nQty'] > 0) {
        tmpEmpTable.push(elem);
      }
    });
    let existingFormValues = this.issueForm.value;    
    this.currentOtpJobnAcId = existingFormValues['nJobid']['nAcid'];
    this.mobileNo = this.cMobileNumber;    
    let formData = {};        
    formData['cTrType'] = existingFormValues['cTrType'] ? existingFormValues['cTrType'] : "I";
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nEmpid'] = existingFormValues['nEmpid'];
    formData['nAcid'] = this.currAcid;
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['stockDetail'] = tmpEmpTable;
    formData['dDeliveryDueDate'] = this.deliveryDate;
    formData['nDeliveredBy'] = this.deliverBy;
    formData['nJobid'] = this.nJobid;
    formData['cStkType'] = "R";    
    let tmpEmp = !this.isDeliveryPermited ? existingFormValues['nDeliveredBy'] :existingFormValues['nEmpid'] ;
    let tmpAcid = existingFormValues['nAcid'] ? existingFormValues['nAcid'] : 0;
    this.mobileNo = this.isDeliveryPermited ? this.mobileNo : this.newMobile
    this._manageStockService.sendOtp(localStorage.getItem('loginId'), tmpEmp, this.currAcid, this.mobileNo, formData).subscribe(
      (res:any) => {        
        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
          this.otpDialog = true;
          this.getOtpDetails = res.data;

        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

      });    
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

  validateOtp() {
    // this.mobileNo = '9015370897';
    let existingFormValues = this.issueForm.value;    
    let formData = {};

    formData['cTrType'] = existingFormValues['cTrType'];
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nEmpid'] = existingFormValues['nEmpid'];
    formData['nAcid'] = this.currAcid;
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['stockDetail'] = this.empTableQty;    
    let tmpEmp = existingFormValues['nEmpid'] ? existingFormValues['nEmpid'] : 0;
    let tmpAcid = this.currAcid;
    let otpId = this.getOtpDetails.id;
    this._manageStockService.validateOtp2(localStorage.getItem('loginId'), tmpEmp, tmpAcid, this.cMobileNumber, this.otpValue, otpId).subscribe(

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
          this.viewData();
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

}
