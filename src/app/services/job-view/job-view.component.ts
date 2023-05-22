import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services.service';
import Utils from 'src/app/helpers/utils';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AccountService } from 'src/app/account-flow/account.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUpdateManageJobComponent } from '../add-update-manage-job/add-update-manage-job.component';
@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
})
export class JobViewComponent implements OnInit {
  @ViewChild('repeatsOn') repeatsOn: ElementRef;
  formDate: any = null;
  addressData: any[];
  public dJobDate: any;
  isChecked: boolean;
  billingMode: any[] = [];
  tmpSrvSkills: any[] = [];
  tmpSrvPoints: any[] = [];
  tmpSrvItems: any[] = [];
  manageUnitData: any;
  editButton: boolean = false;
  public formsGroup: FormGroup;
  public customerLoader: boolean = false;
  toDate: any;
  nJobId: number;
  showJobTable: boolean = false;
  serviceId: any;
  displayBasic: boolean = false;
  public manageJobDialog: boolean = false;
  nDeliveryCharge;
  rateData: any[] = [];
  addServiceKitButtonDisabled: boolean = true;
  callServicePointList: Boolean = false;
  showServiceSkillgroup: boolean = true;
  public frequencyV: any;
  public srvSkillsData: any[] = [];
  branchData: any;
  patientData: any;
  public jobService: any[] = [];
  showSkillSave: boolean = false;
  finalRepDay;
  serviceData: any;
  isTime: boolean = false;
  showNextFields: boolean = false;
  disableApproveReject: boolean = true;
  manageJobData: any[] = [];
  secDepositActual: any;

  public freqQty: number = 0;
  billMS;
  secDepositTotal: any;
  branchId: any = {};
  total = 0;
  editResponseById: any;
  globalRateData: any = null;
  customerTxt: string;
  servSkillModel: any;
  servicePointData: any[] = [];
  public manageService: any[];
  cusHeight: number;
  manageJobServiceHeader: string = "";
  stTime: any = null;
  minimumDate = new Date();
  disableBillingMode: boolean = false;
  showModeOfPaymentError: boolean = false;
  rateNotMandatory: boolean = false;
  invalidDates: Array<Date>;
  disableRate: boolean = false;
  jobApprovalData: any[] = [];
  showJobServiceKitError: boolean = false;
  modeOfPaymentD: any;
  isDisabledAllControls: boolean = true;
  itemDelivery = { "name": "Not Permitted", "val": "N" };
  itemDeliveryData: any = [
    { "name": "Permitted", "val": "Y" },
    { "name": "Not Permitted", "val": "N" },

  ];
  modeOfPayment = [
    { name: 'Prepaid', code: 'P' },
    { name: 'Cash on Delivery', code: 'C' }
  ];
  first = 0;
  customerData: any;
  public dateToSend: string;
  public endDateToSend: string;
  rows = 10;
  machineRateId: any;
  disableItemDeliveryDropdown: boolean = true;
  viewDisplay: boolean = false;
  currJobId: number = 0;
  public currentUser: any;
  btnTextCalculate: string = 'Calculate Service Advance';
  totalServiceAdvance: any = 0;
  public srvType: any[];
  discountRateSkill;
  discountRatePerSkill;
  currSrvSkillJobDid: number = 0;
  customerId;
  position: string;
  public filteredGroups: any[];
  constructor(
    private servicesService: ServicesService, 
    private fb: FormBuilder, 
    private accountService: AccountService,
    public dialogService: DialogService
    ) {
    this.srvType = [
      { name: 'Machine', code: '1' },
    ]
    this.manageService = [

      { name: 'Days', code: 'D' },
      { name: 'One Time', code: 'O' },
      { name: 'Monthly', code: 'M' },
    ]

  }

  ngOnInit(): void {
    this.BranchLocation();
    this.servicedropdownF();
    let d = new Date();
    this.dateToSend = this.formatDate(d);
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1));
    this.formDate = finalFromDate;
    this.toDate = new Date(finalDate);
    this.formsGroup = this.fb.group({
      nSrvid: new FormControl('', [Validators.required]),
      dJobDate: new FormControl(this.dJobDate, [Validators.required]),
      dJobEndDate: [],
      customer: [],
      patient: [],
      nAddress: [],
      endDate: new FormControl(''),

      nBillMode: new FormControl('', [Validators.required]),
      //  nSrvSkillid: new FormControl('', [Validators.required]),
      // nJobFrq: new FormControl('', [Validators.required]),
      nQty: new FormControl(''),
      nFrqQty: new FormControl(''),
      cWeekDys: new FormControl('', [Validators.required]),
      dStartTm: new FormControl(''),
      // dStartTm: new FormControl(this.dJobDate, [Validators.required]),
      dEndTm: new FormControl(''),
      cDayMonth: new FormControl(''),
      cweekly: new FormControl(''),
      cJobtype: new FormControl(''),
      cCustNm: new FormControl(''),
      cMobile: new FormControl('', [Validators.required, Validators.pattern("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$")]),
      cAddress: new FormControl('', [Validators.required]),
      nUserid: new FormControl('1'),
      cLatLong: new FormControl(''),
      nAcid: new FormControl('', [Validators.required]),

      serviceKitGroup: this.fb.group({
        nItemid: ['', [Validators.required]],
        servTypeD: [''],
        nRateId: ['', [Validators.required]],
        nRateNotId: [''],
        nHour: ['', [Validators.required]],
        nSrvSkillid: ['', [Validators.required]],
        nSrvPoint: [null],
        nJobFrq: ['', [Validators.required]],
        startTime: ['', [Validators.required]],
        jobDuration: ['', [Validators.required]],
        dayOfMonth: [0],
      }),
      nBranchId: new FormControl('', [Validators.required]),
      nJobid: new FormControl('')
    });

    setTimeout(() => {
      this.selectCustomerF("");
    }, 1000);
  }
  closePopUp() {
    this.manageJobDialog = false;

  }
  rejectJob() {
    let tmpData = { "nJobid": this.nJobId, "cStatus": "Z" };
    this.accountService.approveJob(tmpData).subscribe((data) => {
      //console.log(data);

      this.manageJobDialog = false;
      this.searchJobApproval();

    }, (err) => {

    });
  }

  searchJobApproval() {
    //console.log(this.formDate);
    let branchId = this.branchId.val;
    let frDate = Utils.formatDate(this.formDate);
    let toDate = Utils.formatDate(new Date(this.toDate));
    //console.log(toDate);

    this.accountService.getJobApprovaltable(branchId, frDate, toDate).subscribe(
      res => {
        //  console.log(res);
        this.jobApprovalData = res['data'];
        //console.log(this.jobApprovalData, 'Table Data');
      }
    );
  }
  servicedropdownF() {
    this.servicesService.getServiceData().subscribe(
      res => {
        this.serviceData = res['data'];
        //console.log('this is service dropdown', this.serviceData);
      }
    );
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

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
      this.branchId = this.branchData[0];
      // console.log('This is Branch location',this.branchData);
    });
  }

  searchManageJobF() {
    this.manageJobData = [];
    let tmpBranchId = this.branchId.val;
    console.log(this.branchId['val']);
    this.servicesService
      .jobViewData(
        Utils.formatDate(this.formDate),
        Utils.formatDate(this.toDate),
        this.branchId['val']
      )
      .subscribe((res) => {
        this.manageJobData = res['data'];
      });
  }
  disableInstDeliver: boolean = false;
  disableModeOfPayment: boolean = false;
  currentSrvCategory;
  jobData;
  // viewJob(data){
  //   this.viewDisplay = true;
  //   this.jobData = data;
  //   console.log(data)
  // }

  calcServiceAdvance(evt) {
    this.totalServiceAdvance = evt.target.value;

    //  this.total = this.total - evt.target.value;
    this.total = parseInt(this.secDepositTotal) + parseInt(this.totalServiceAdvance);
  }

  getTotal(secDepositTotal, totalInstallationCharges, nDeliveryCharge, totalServiceAdvance) {
    return Number(secDepositTotal) + Number(totalInstallationCharges) + Number(nDeliveryCharge) + Number(totalServiceAdvance);
  }
  getAddress() {
    this.servicesService.getAddress(this.customerId).subscribe(res => {
      this.addressData = res['data'];

      if (this.editButton) {

        const address = this.addressData.filter(e => e.nAddrid == this.editResponseById['nAddrid']);
        this.formsGroup.patchValue({
          nAddress: address[0]
        });
      }
      console.log(this.addressData['cAddress1']);
    });
  }
  loadPatientData() {
    this.servicesService.loadPatientData("", this.currentUser['nAcid']).subscribe((res) => {
      this.patientData = res['data'];
      //  console.log(this.patientData);
    }, (err) => { });

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
  onHideManageJobForm() {
    this.formsGroup.reset();
  }
  viewJob(id, custName, Jobno) {
    // this.isDisabledAllControls = true;
    // this.viewDisplay = true;
    this.manageJobServiceHeader = "Job View - " + custName + " - " + Jobno;
    this.manageJobDialog = true;
    this.customerLoader = true;
    this.editButton = true;
    this.nJobId = id;
    this.cusHeight = 1000;
    this.currJobId = id;
    this.tmpSrvItems = [];
    this.tmpSrvPoints = [];
    this.tmpSrvSkills = [];
    this.isChecked = false;
    this.discountRatePerSkill = "";
    this.discountRateSkill = "";
    this.machineRateId = "";

    this.selectCustomerF("");

    this.servicesService.editManageJobById(id).subscribe(
      res => {
        this.editResponseById = res['data'];
        //console.log(res['data']);
        this.currentSrvCategory = res['data']['srvCategory'];
        if (this.currentSrvCategory != 'EXTERNAL SERVICE') {
          this.disableModeOfPayment = true;
          this.rateNotMandatory = false;
        } else {
          this.disableModeOfPayment = false;
          this.rateNotMandatory = true;
        }
        this.tmpSrvItems = res['data']['srvItems'];
        this.tmpSrvPoints = res['data']['srvPoints'];
        this.tmpSrvSkills = res['data']['srvSkills'];
        this.nDeliveryCharge = this.editResponseById['nDeliveryCharge'];
        this.currSrvSkillJobDid = this.tmpSrvSkills.length > 0 ? this.tmpSrvSkills[0]['nJobdid'] : 0;
        this.totalServiceAdvance = res['data']['nAdvanceAmt'];
        // console.log(this.editResponseById);
        this.jobService = [];
        if (this.tmpSrvItems.length > 0) {
          this.tmpSrvItems.forEach((el, ind) => {
            el['ind'] = ind;
            this.jobService.push(el);
          });
        }
        if (this.tmpSrvPoints.length > 0) {
          this.tmpSrvPoints.forEach((el, ind) => {
            el['ind'] = ind;
            this.jobService.push(el);
          });
        }
        if (this.jobService.length > 0) {
          this.showJobTable = true;
        } else {
          this.showJobTable = false;
        }
        this.serviceId = this.editResponseById['nSrvid'];
        // console.log(this.customerData);
        //console.log('edit job approval response',this.editResponseById);
        const service = this.serviceData.filter(e => e.txt == this.editResponseById['srvName']);
        const billingMode = this.billingMode.filter(e => e.name == this.editResponseById['billMode']);
        const customer = this.customerData.filter(e => e.cLedgerNm == this.editResponseById['cCustNm']);
        this.customerId = customer[0]['nAcid'];
        this.getAddress();
        this.currentUser = customer[0];
        this.loadPatientData();
        setTimeout(() => {

          const patient = this.patientData.filter(e => e.cPatientNm == this.editResponseById['patient']);
          if (this.editResponseById['dJobSrvEnd'] == null) {
            this.formsGroup.patchValue({
              dJobDate: new Date(this.editResponseById['dJobDate']),
              nSrvid: service[0],
              nBillMode: billingMode[0],
              nAcid: this.currentUser['nAcid'],
              patient: patient[0],
              dJobEndDate: '',

            });
          } else {
            const date = new Date(this.editResponseById['dJobDate']);
            date.setDate(date.getDate() + 15);
            this.formsGroup.patchValue({
              dJobDate: new Date(this.editResponseById['dJobDate']),
              nSrvid: service[0],
              nBillMode: billingMode[0],
              nAcid: this.currentUser['nAcid'],
              patient: patient[0],
              // dJobEndDate: new Date(this.editResponseById['dJobSrvEnd']),
              dJobEndDate: date,
            });

            // this.endDateToSend = this.formatDate(new Date(this.editResponseById['dJobSrvEnd']));
            this.endDateToSend = this.formatDate(date);
          }
          this.jobService.forEach((elem, ind) => {
            if (elem['cSrvType'] == "Machine") {
              this.disableItemDeliveryDropdown = false;
            }
          });
          this.servCtg = service[0]['srvCtg'];
          this.proceed();
          this.updateTotalValues();
        }, 2000);
        // console.log(this.editResponseById['dJobSrvEnd'])
        // console.log(patient);



      }
    )


    setTimeout(() => {
      this.customerTxt = this.editResponseById['cCustNm'].toLowerCase();
      this.customerLoader = false;
      // console.log(this.editResponseById);
      // console.log(this.customerTxt);

    }, 5000);

  };
  selectCustomerF(val: string = "") {
    this.filteredGroups = [];
    //this.customerLoader = true;
    this.servicesService.selectCustomer(val, this.branchId['val']).subscribe(
      res => {
        this.customerData = res['data'];
        res['data'].forEach(element => {
          //console.log(element);
          this.filteredGroups.push(element.cLedgerNm.toLowerCase());

        });
        //console.log(this.filteredGroups);
        //this.customerLoader = false;
        //  this.filteredGroups = this.customerData;
        // console.log('this is select customer Data', this.customerData);
      }
    );
  }
  totalInstallationCharges = 0;
  updateTotalValues() {
    this.secDepositActual = 0;
    this.secDepositTotal = 0;
    this.totalInstallationCharges = 0;
    this.tmpSrvItems.forEach(element => {
      this.secDepositActual = this.secDepositActual + element['nSecurity'];
      this.secDepositTotal = this.secDepositTotal + element['nadSecurity'];
      if (element.hasOwnProperty('nInstallationCharge')) {
        this.totalInstallationCharges = Number(this.totalInstallationCharges) + Number(element['nInstallationCharge']);
      }

    });



  }
  servCtg: string;
  public totalDateDifference;
  proceed() {
    let noofdays;
    let toDate = moment(this.formsGroup.value['dJobEndDate']);
    let fromDate = moment(this.dateToSend);
    this.totalDateDifference = toDate.diff(fromDate, 'days') + 1;

    this.finalRepDay = this.totalDateDifference;


    // this.calcServiceAmount();
    this.showNextFields = true;
    let billModeSelectedObj = this.formsGroup.get('nBillMode').value;
    //  let servData = this.formsGroup.get('nSrvid').value;

    //  console.log(this.servCtg);
    this.billMS = (billModeSelectedObj != undefined) ? billModeSelectedObj['code'] : 0;

    if (this.billMS == 3) {
      this.showServiceSkillgroup = false;
    } else {
      this.showServiceSkillgroup = true;
    }


    // console.log(this.billingMode);
    if (this.billMS == 2) {
      let res = this.srvType.filter(e => e.name == "Service Point");
      if (res.length == 0) {
        this.srvType.push({ name: 'Service Point', code: '0' });
      }
      this.disableRate = true;


      // this.showServicePointCarePoint = true;
    } else {
      this.disableRate = false;
      let tmpInd = Utils.getIndexById(this.srvType, 'code', 0);
      // console.log(tmpInd);
      if (tmpInd) {
        this.srvType.splice(tmpInd, 1);
      }

      // this.srvType = Utils.removeByAttr(this.srvType,'code',1);
      //this.showServicePointCarePoint = false;
    }

    if (this.billMS == 4) {
      this.showSkillSave = true;
    } else {
      this.showSkillSave = false;
    }

    this.formsGroup.patchValue({
      serviceKitGroup: {
        nItemid: "",
        servTypeD: "",
        nSrvSkillid: "",
        nRateId: "",
        nRateNotId: "",
        nJobFrq: "",
        nSrvPoint: null,
        startTime: "",
        jobDuration: "",
        dayOfMonth: 0

      },
    });
    this.selectManageUnitF();
    if (this.callServicePointList) {
      // this.loadServicePoints();
    }
    if (this.jobService.length < 1) {
      this.disableInstDeliver = true;
    } else {
      this.disableInstDeliver = false;
    }

    // this.onChangeRate();
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }
  selectManageUnitF() {
    // let serviceId = evt.value.val;
    // let branchId=localStorage.getItem("branchId");
    let branchId = +this.branchId['val'];
    // console.log(this.branchId);
    this.servicesService.unitId(this.serviceId, this.dateToSend, branchId).subscribe(
      res => {
        this.manageUnitData = res['data'];
        this.srvSkillsData = res['data']['srvSkills'];
        this.servicePointData = res['data']['srvPoints'];

        if (this.editButton && this.tmpSrvSkills.length > 0) {
          let jobSkillsData = this.tmpSrvSkills[0];


          // console.log(this.rateData);
          const servSkillId = this.srvSkillsData.filter(e => e.nSrvSkillID == jobSkillsData['nSrvSkillid']);
          this.servSkillModel = servSkillId[0];
          // console.log(this.servSkillModel);

          this.serviceSkillChange();

        }
        //console.log('this is unit', this.srvSkillsData);
      }
    );
  }

  reset() {
    this.first = 0;
  }
  editedTime: any = null;
  serviceSkillChange() {
    //  console.log(this.servSkillModel);
    //this.customerLoader = true;
    let val = this.servSkillModel;
    let tmpData = val['svrSkillRate'];
    this.rateData = [];
    if (tmpData) {
      tmpData.forEach(element => {
        let tmpObj = {};

        tmpObj["unitId"] = element["nRentUnit"];
        tmpObj["rateId"] = element["nRateID"];
        tmpObj["name"] = element["nRate"] + "-" + element["rentUnitName"];
        this.rateData.push(tmpObj);
        // this.customerLoader = false;
      });
    }

    //console.log(tmpData)
    if (this.editButton && this.tmpSrvSkills.length > 0) {

      let jobSkillsData = this.tmpSrvSkills[0];
      const rateIdData = this.rateData.filter(e => e.rateId == jobSkillsData['nRateId']);
      this.globalRateData = rateIdData[0];

      this.discountRatePerSkill = this.tmpSrvSkills[0]['nDiscRatePer'];
      //this.discountRateSkill = this.tmpSrvSkills[0]['nDiscRateAmt'];
      this.discountRateSkill = this.tmpSrvSkills[0]['nadRate'];
      if (jobSkillsData['dStartTm']) {
        this.isChecked = true;
      }

      this.addServiceKitButtonDisabled = false;
      const freqD = this.manageService.filter(e => e.code == jobSkillsData['nJobFrq']);
      this.frequencyV = freqD[0];
      this.repeatsOn.nativeElement.value = jobSkillsData['nFrqQty'];
      if (jobSkillsData['dStartTm']) {
        // this.isChecked = true;
        let startTime = new Date();
        let tmpTime = jobSkillsData['dStartTm'].split(":");
        startTime.setHours(tmpTime[0]);
        startTime.setMinutes(tmpTime[1]);
        startTime.setSeconds(0o0);

        this.isTime = true;
        this.stTime = startTime;
      } else {
        this.isTime = false;
        this.stTime = null;
      }

      if (this.editResponseById['billMode'] != "MACHINE") {
        this.repeatFunc();
      }

      this.calcServiceAmount();


    }




  }
  get formControls() {
    return this.formsGroup.controls;
  }

  get serviceKitForm() {
    return this.formsGroup.controls.serviceKitGroup as FormGroup;
  }
  isLastPage(): boolean {
    return this.manageJobData
      ? this.first === this.manageJobData.length - this.rows
      : true;
  }
  calcServ() {
    if (this.btnTextCalculate == "Calculate Service Advance") {
      this.isDisabledAllControls = true;
      this.disableApproveReject = false;
      this.formsGroup.disable();
      this.btnTextCalculate = "Edit Calculate Service Advance";
    }
    else if (this.btnTextCalculate == "Edit Calculate Service Advance") {
      this.isDisabledAllControls = false;
      this.disableApproveReject = true;
      this.formsGroup.enable();
      this.btnTextCalculate = "Calculate Service Advance";
    }
  }
  calcServiceAmount() {
    //this.totalDateDifference = toDate.diff(fromDate, 'days') + 1;
    let totalServicePoint = 0;
    let totalMachineAmount = 0;
    this.finalRepDay = this.finalRepDay ? this.finalRepDay : 1;
    this.jobService.forEach((elem, ind) => {
      if (elem['cSrvType'] == 'Machine') {
        totalMachineAmount = totalMachineAmount + Number(elem['nadRate']);
      }
      else {
        totalServicePoint = totalServicePoint + Number(elem['nadRate']);
      }
    });

    if ((!this.discountRateSkill || Number.isNaN(this.discountRateSkill)) && this.globalRateData) {
      this.discountRateSkill = this.globalRateData.name.split("-")[0];
    }

    let finalMachineAm = totalMachineAmount * this.totalDateDifference;
    let totalSKillAmount = 0;
    if (this.discountRateSkill) {
      totalSKillAmount = (this.discountRateSkill + totalServicePoint) * this.finalRepDay;
    } else {
      totalSKillAmount = totalServicePoint * this.finalRepDay;
    }

    let finalServiceAdvanceAmount = finalMachineAm + totalSKillAmount;

    this.totalServiceAdvance = finalServiceAdvanceAmount;

  }
  showMonthRepeatError: boolean = false;
  repeatFunc() {
    let noofdays;
    let toDate = moment(this.formsGroup.value['dJobEndDate']);
    let fromDate = moment(this.dateToSend);
    this.totalDateDifference = toDate.diff(fromDate, 'days') + 1;

    this.finalRepDay = this.totalDateDifference;
    if (this.editResponseById['billMode'] != "MACHINE") {
      let evVal = this.repeatsOn ? this.repeatsOn.nativeElement.value : 0;
      let currFreq = this.frequencyV['code'];
      switch (currFreq) {
        case 'D':
          this.finalRepDay = Math.ceil(this.totalDateDifference / evVal);
          this.showMonthRepeatError = false;
          break;
        case 'M':
          let totalMonth = Math.ceil(this.totalDateDifference / 30);
          if (evVal > totalMonth) {
            this.showMonthRepeatError = true;
          } else {
            this.showMonthRepeatError = false;
          }
          this.finalRepDay = totalMonth;
          break;
        default:
          this.showMonthRepeatError = false;
          this.finalRepDay = 1;
          break;
      }


      //   console.log(evVal);
      if (evVal) {
        this.addServiceKitButtonDisabled = false;
      } else {
        this.addServiceKitButtonDisabled = true;
      }
      this.freqQty = evVal;

    }
  }
  isFirstPage(): boolean {
    return this.manageJobData ? this.first === 0 : true;
  }


  viewJobWithId(id, status, jobNumber){
    const ref = this.dialogService.open(AddUpdateManageJobComponent, {
          data: {
              servId: id,
              cStatus:status,
              jobNum:jobNumber,
              processOfJob:'jobapproval',
              jobView:true
          },
          header:`View Job #${jobNumber}`,
          width: '60vw',
          styleClass:'customer-modal'
    });
    ref.onClose.subscribe((res:any) => {
        //this.getPatient();
    });
  }



}
