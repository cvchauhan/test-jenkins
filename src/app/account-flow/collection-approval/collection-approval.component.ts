import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import { ServicesService } from 'src/app/services/services.service';
import { AccountService } from '../account.service';
import { INNERSTATUSDATA, STATUSDATA } from 'src/app/constant';

@Component({

  selector: 'app-collection-approval',
  templateUrl: './collection-approval.component.html',
  styleUrls: ['./collection-approval.component.css']
})
export class CollectionApprovalComponent implements OnInit {
  sBank: any[] = [];
  codeID: any;
  otpValue: any;
  otpDialog: boolean = false;
  public categoriesData: any[] = [];
  CODId: number = 0;
  formDate: any = null;
  toDate: any;
  OtpId: any;
  employeeData: any = [];
  manageJobData: any[] = [];
  empId: any;
  mobileNo: any;
  IsVisible: boolean = false;
  AssignEmpId: any;
  BankId: any;
  ImgURL: SafeResourceUrl;
  AssignEmpDate: any = null;
  statusData = STATUSDATA;
  innerStatusData = INNERSTATUSDATA;
  StatusId: any = {};
  InnerStatusId: any = {};
  first = 0;
  rows = 10;
  collection: any[] = [];
  ApproveitemList: any[] = [];
  response: any;
  viewAssignEmployeeCollection: boolean = false;
  viewApproveEmployeeCollection: boolean = false;
  EmpAssignForm: FormGroup;
  constructor(private accountservice: AccountService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.IsVisible = true;
    let d = new Date();
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1));
    this.formDate = finalFromDate;
    this.toDate = new Date(finalDate);
    this.AssignEmpDate = new Date(finalDate);
    this.getEmployeeBySrvSkills();
    this.selectStatus();
    this.selectInnerStatus();
    this.EmpAssignForm = this._formBuilder.group({
      AssignEmpId: ['', Validators.required],
      AssignEmpDate: [''],
    });
   // this.categoriesData = JSON.parse(localStorage.getItem('FILLCODEDATA'));
    this.getBankList();
  }
  getEmployeeBySrvSkills() {
    const req = 22 ;
    const scheduleDate = moment().format('YYYY-MM-DD');
    this.servicesService.getSkillIdData(req).subscribe((res:any) =>{
      console.log('skill id', res);
      const dataSelect = res.data[0];
      if(dataSelect){
        this.getLeaderCollection(dataSelect.nSerialNo, scheduleDate)
      }
    })
    
    
  }
  getLeaderCollection(srvSkillsId, scheduleDate){
    console.log(srvSkillsId, scheduleDate)
    this.servicesService.getEmpBySrvSkill(srvSkillsId, scheduleDate).subscribe((res:any) => {
      this.employeeData = res.data;
      console.log('Leader ', this.employeeData);
      
    }, (error) => {
      console.log(error);
    });
  }

  getBankList() {
    console.log('datra')
    let branchId = localStorage.getItem("branchId");
    this.accountservice.getBanks(branchId).subscribe((res:any) => {
      console.log('bank', res)
        this.sBank = res['data'];
        if(this.sBank){
          console.log(this.sBank);
          this.BankId = this.sBank != null ? this.sBank[0] : null;
        }
        

        // console.log('This is Branch location',this.branchData);
      }
    );
    // this.categoriesData.forEach((element) => {
    //   if (element['categoryName'] == 'Bank') {
    //     this.codeID = element['codeID'];
    //     this.sBank.push({
    //       name: element['codeName'],
    //       serialNo: element['serialNo'],
    //       code: element['codeID'],
    //       ctgID: element['ctgID'],
    //       category: element['categoryName'],
    //     });
    //   }
    // });
  }

  get empAssignControl() {
    return this.EmpAssignForm['controls']
  }

  selectStatus() {
    this.StatusId = this.statusData[1];
  }

  selectInnerStatus() {
    this.InnerStatusId = this.innerStatusData[0];

  }

  onSelectMethod(event, typ) {
    let d = new Date(event);
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    if (typ == 'fromD') {
      this.formDate = new Date(finalDate);
    } else {
      this.toDate = new Date(finalDate);
    }
  }
  OpenAssignEmp(data) {

    this.viewAssignEmployeeCollection = true;
    this.CODId = 0;
    this.CODId = data['ncodId'];

  }
  onSelectEmpDate(event) {
    let d = new Date(event);
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    this.AssignEmpDate = new Date(finalDate);
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

  onSelectMethodDate(event, ind) {
    let d = new Date(event);
    let resDate = this.formatDate(d);
    ind['dvrDate'] = event;
  }

  onSelectMethodStatus(event, ind) {
    let v = event.value;
    ind['Status'] = v.code;
    console.log(ind);
  }

  onSelectMethodBank(event, ind) {
    let v = event.value;
    ind['nBankAcId'] = v.code;
    console.log(ind);
  }

  // getEmployeeData() {
  //   let LedgerSearch = '';
  //   let loginId = localStorage.getItem("loginId");
  //   this.accountservice.getEmpData(LedgerSearch, loginId).subscribe(
  //     res => {
  //       this.employeeData = res['data'];
  //       // this.cMobileNumber = this.employeeData[1]['cMobile1'];
  //       console.log(this.employeeData);
  //       // console.log(this.cMobileNumber);
  //     }
  //   );
  // }

  onChangeDeliverBy(event) {
    this.empId = event.value;
    console.log(this.empId)
  }


  onChangeEmp(event) {
    this.AssignEmpId = event.value;
    console.log(this.empId)
  }

  view() {
    // console.log(this.formDate,this.toDate);
    if (!this.empId) {
      this.empId = 0;
    }
    if (!this.StatusId['code']) {
      this.StatusId['code'] = 0
    }

    console.log(this.ApproveitemList);
    this.accountservice.getCollection(this.empId, this.formatDate(this.formDate), this.formatDate(this.toDate), this.StatusId['code']).subscribe((data) => {
      this.collection = data['data'];
      if (this.StatusId['code'] == "C") {
        this.IsVisible = true;
      }
      else {
        this.IsVisible = false;
      }
    });

  }
  getTotalCost() {
    return this.collection.map(t => t.AmounttobeCollected).reduce((acc, value) => acc + value, 0);
  }
  getTotalCash() {
    return this.collection.map(t => t.cash).reduce((acc, value) => acc + value, 0);
  }
  getTotalBanktransfer() {
    return this.collection.map(t => t.banktransfer).reduce((acc, value) => acc + value, 0);
  }
  getTotalCheque() {
    return this.collection.map(t => t.cheque).reduce((acc, value) => acc + value, 0);
  }
  OpenImage(img) {
    if (img != null) {
      this.ImgURL = this.sanitizer.bypassSecurityTrustResourceUrl(img);
    }
    else {
      this.ImgURL = "";
    }
  }

  OpenApproveEmp(data) {
    console.log('aaaa', this.BankId)
    this.ImgURL = "";
    this.viewApproveEmployeeCollection = true;
    this.ApproveitemList = [];
    this.ApproveitemList = data['CODDetail'];
    this.empId = data['nEmpid'];
    this.mobileNo = data['empMobile'];
    let d = new Date();
    let formatDate = this.formatDate(d);
    this.ApproveitemList.forEach((element) => {
      element['dvrDate'] = formatDate;
      element['nBankAcId'] = this.BankId['nAcid'];
      element['Status'] = (this.innerStatusData.length > 0) ? this.innerStatusData[0].code : "";
      element['IsDisableBank'] = element['Type'] == 'CASH' ? true : false;
    });
    this.CODId = data['ncodId'];
    console.log(this.ApproveitemList);
  }

  ApproveEmployeeCollection() {
    let codDetail = {} = [];
    console.log(this.ApproveitemList);
    let count = 0;
    let Status = "R";
    this.ApproveitemList.forEach((element) => {
      if (element['Status'] == "A") {
        count = 1;
      }
    });
    if (count > 0) {
      Status = "A";
    }
    this.ApproveitemList.forEach((element) => {
      let temp = {};
      temp['NCODdid'] = element['nCODdid'];
      temp['NBankAcId'] = (element['Type'] != 'CASH') ? element['nBankAcId'] : "0";
      temp['DvrDate'] = element['dvrDate'];
      if (element['Status'] == 'A') {
        codDetail.push(temp);
      }
    });
    let loginId = localStorage.getItem("loginId");
    console.log(this.ApproveitemList);

    let formData = {};
    formData['nAcid'] = this.BankId['nAcid'];
    formData['mobile'] = this.mobileNo;
    formData['nEmpId'] = this.empId;
    formData['codId'] = this.CODId;
    formData['nApproveId'] = loginId;
    formData['status'] = 'A';
    formData['CODDetail'] = codDetail;

    this.accountservice.approveEmpCollection(formData).subscribe(
      res => {
        this.response = res;
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
          this.CODId = 0;
          this.view();
          this.OtpId = res['data']['id'];
          //this.viewApproveEmployeeCollection = false;
          this.otpDialog = true;
        }
        setTimeout(() => {
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response['errorMessage'], detail: res['data']['msg'] });
          }
        }, 5000);
      }
    );
  }
  validateOtp() {
    this.accountservice.validateOtp(this.empId, this.mobileNo, this.otpValue, this.OtpId).subscribe(
      (res) => {
        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
          this.CODId = 0;
          this.view();
          this.viewApproveEmployeeCollection = false;
          this.otpDialog = false;
        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }
      },
      (error) => {

      });
  }

  addAssignEmpCollection(EmpAssignForm) {
    let empAssignFormFormValues = EmpAssignForm;
    this.AssignEmpId = empAssignFormFormValues['AssignEmpId'].toString();
    this.AssignEmpDate = empAssignFormFormValues['AssignEmpDate'];
    this.accountservice.assignEmpCollection(this.CODId, this.AssignEmpId, this.formatDate(this.AssignEmpDate)).subscribe(
      res => {
        this.response = res;
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
          this.EmpAssignForm.reset();
          this.CODId = 0;
          let d = new Date();
          let newDate = new Date(d);
          this.AssignEmpDate = newDate;
          this.view();
          this.viewAssignEmployeeCollection = false;
        }
        setTimeout(() => {
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response['errorMessage'], detail: res['data']['msg'] });
          }
        }, 5000);
      }
    );
  }
}
