import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
// import { AddCustomerComponent } from '../add-customer/add-customer.component';
// import { AddPatientComponent } from '../add-patient/add-patient.component';
import { ServicesService } from 'src/app/services/services.service';
@Component({
  selector: 'app-service-package',
  templateUrl: './service-package.component.html',
  styleUrls: ['./service-package.component.css']
})
export class ServicePackageComponent implements OnInit {
  @Input() processOfJob: any = null;
  stepForm:number = 1;
  setValueDefalt:any = {
    nJobFrq: 'D',
    nFrqQty: 1,
    cWeekDys: 0,
    dStartTm: '08:00',
    nJobdid: 0,
    nJobid: 0,
    nadRate: 0,
    timeType: "08:00",
    nItemid:0,
    cStatus:null,
  };
  AddPatient: boolean = false;
  billingModeDisable:boolean = true;
  isDisableProcesurItem:boolean = false;
  jobManageForm:FormGroup;
  serviceItemForm:FormGroup;
  userId: string;
  branchId:any = null;
  srvSkillsData:any = [];
  totalPayableAmount:number = 0;
  totalPayableAmountData:number;
  totalinstallationCharge:number
  jobApprovalView:boolean = true;
  isEditMode:boolean = false;
  timeStartDefalt:any = '08:00';
  listOfDiagnosis:any = [];
  CustomerList:any = []
  jobView:false;
  serviceData:any = [];
  billingMode:any = [];
  servicePointsFormDisabled:boolean = false;
  isSkillItemMinOne:boolean = false;

  totalServingDays:number = 0;


  billingModeFilterData:any = []
  manageService:any = [
    { name: 'Days', code: 'D' },
    { name: 'One Time', code: 'O' },
    { name: 'Monthly', code: 'M' },
  ];
  StartTimeddl:any = [
    { name: '08:00', code: '08:00' },
    { name: '20:00', code: '20:00' },
    { name: 'Custom', code: 'Custom' },
  ];
  typeOfService:any = [
    { name: 'Machine', code: 'M' }
  ]
  formData:any ={
    srvItems:[],
    srvSkills:[],
    srvPoints:[],
    consumableItems:[]
  }
  setEqueName:string = 'Machine';
  setPointName:string = 'Service Point';

  totalEquipmentSecAmount:number = 0;
  totalActualEquipmentSecAmount:number = 0;

  totalClinicalSecAmount:number = 0;
  totalClinicalActualSecAmount:number = 0;
  totalPayableEquipmentSecAmount:number = 0;

  servicePointList:any = [];
  patientForm:FormGroup;
  servicePointsForm:FormGroup;
  serviceTypeList:any = [];
  jobApprovalForm:FormGroup;
  serviceSkillsForm:FormGroup;
  selectedService:any = null;
  customerAccountId:any = null;

  packageId:any = null;
  constructor(  private fb: FormBuilder,
    private servicesService: ServicesService,
    private codeMasterService: CodeMasterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {
    // const branchId  = localStorage.getItem('branchId');
    // if(branchId){
    //   this.branchId = branchId;
    // }
    this.userId = localStorage.getItem('empID')
  }

  ngOnInit(): void {
    this.jobManageForm = this.fb.group({
      nAdvanceAmt:[0],
      srvName:[null, [Validators.required]],
      nSrvid:[null],
      security:[0],
      package:[null,[Validators.required]],
      dJobDate:[new Date()],
      mrp:[0],
      nBillModeName:[null],
      nBillMode:[null, [Validators.required]],
      cMobile:[null],
      nAcid:[null],
      nJobid:[0],
      nUserid:[ this.userId],
      nBranchId:[this.branchId],
      selfAssigned:[false],
      nAddrid:[null],
      nDeliveryCharge:[''],
      nPatientid:[null],
      CItemDelivery:['N'],
      patient:[null],
      billMode:[null],
      nPJobdid:[''],
      cStatus:['']
      });
      this.serviceSkillsForm = this.fb.group({
        nJobdid: [0],
        nJobid: [0],
        nItemid: [0],
        nSrvSkillid: [null],
        nRateId: [null],
        nJobFrq: ['D', [Validators.required]],
        unitName:[null],
        nFrqQty: [1],
        cWeekDys: ['0'],
        dStartTm:[this.timeStartDefalt],
        dEndSrvDt: [null],
        nHour: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.max(12)]],
        nDiscRatePer: [null],
        nDiscRateAmt: [null],
        nadRate: [0],
        nDiscPerSec: [null],
        nDiscAmtSec: [null],
        nADSecurity: [null],
        srvSkill: [null, [Validators.required]],
        RateUnitName: [null],
        FrequencyName: [null],
        rate:[null],
        timeType:[this.timeStartDefalt, [Validators.required]],
        cStatus:['']
      });
      this.serviceItemForm = this.fb.group({
        nJobdid: [0],
        nJobid: [0],
        nItemid: [0],
        rate: [null],
        unit: [null],
        cSrvType: [this.setEqueName],
        nSrvSkillid: [null],
        nRateId: [null],
        nRateName: [null],
        nSkillID: [null],
        nFrqQty: [null],
        cWeekDys: ['0'],
        nHour: [null],
        nDiscRateAmt: [0],
        nSrvPointid: [null],
        nadRate: [0],
        nDiscRatePer: [0],
        nADSecurity: [null],
        nDiscPerSec: [null],
        nDiscAmtSec: [null],
        nSecurity: [null],
        rentUnitName:[null],
        secTotal: [null],
        srvSkill: [null, [Validators.required]],
        type: ['item'],
        cSrvPointNm: [''],
        dJobSrvEnd: [null],
        ind: [0],
        item:[null],
        nInstallationCharge:[null],
        cInstallation:['N'],
        unitName:[null],
        nPitemid:[null],
        cStatus:['']
      });
      this.servicePointsForm = this.fb.group({
        nJobid: [0],
        nJobdid: [0],
        nItemid: [0],
        rate: [0],
        unit: [null],
        cSrvType: [this.setPointName],
        nSrvSkillid: [null],
        nRateId: [0],
        nFrqQty: [0],
        cWeekDys: ['0'],
        nHour: [0],
        nDiscRateAmt: [0],
        nSrvPointid: [null],
        nadRate: [0],
        nDiscRatePer: [0],
        nDayOfMonth: [0],
        nadSecurity: [0],
        nDiscPerSec: [0],
        nDiscAmtSec: [0],
        security: [null],
        secTotal: [null],
        srvSkill: [null],
        type: ['item'],
        cSrvPointNm: [null, [Validators.required]],
        dJobSrvEnd: [null],
        ind: [0],
        name:[null],
        nSecurity:[0],
        unitName:[null],
        nInstallationCharge:[null],
        cStatus:['']
      });

      this.jobApprovalForm = this.fb.group({
        nTotalService:[null],
        nTotalSecurity:[null],
        nAdvanceAmt:[0],
        itemDelivery:['N'],
        nDeliveryCharge:[0],
        modeOfPaymentD:['A'],
        cStatus:[null],
        nPitemid:[null]
      });

      this.patientForm = this.fb.group({
        nAcid:[''],
        cPatientNm: ['', [Validators.required]],
        nAge: ['', [Validators.required]],
        cSex: ['', [Validators.required]],
        nDiagnosis: ['', [Validators.required]],
        nHeight: ['', [Validators.required, Validators.min(0),Validators.max(10)]],
        nWeight: ['', [Validators.required, Validators.min(1),Validators.max(400)]],
        dDoa:[null],
        groupName:['CUSTOMERS'],
        nSchid:[18],
        cLedgerNm:[''],
        nBranchid:[this.branchId],
        nJobid:[null],
        cDisplayNm:[''],
        nHospitalid:[null],
        cDoctor:[''],
        nMobile:[''],
        addresses:this.fb.array([this.createItem()])
    })

      this.servicedropdownF();


      this.branchId = this.config.data.branchId;
      if(this.config.data.nPackid){
        this.stepForm = 5;
        this.isEditMode = true;
        setTimeout(() => {
          this.getPackageDetails(this.config.data.nPackid);
        }, 500);
      }
  }

  nextForm(item){
    this.stepForm = item;
    if(item ===1){
      this.onSubmitJobManage();
    }
    if(item ===2){
      this.getServiceSkills();
    }
    setTimeout(() => {
      const total = this.totalPayableAmount + this.totalinstallationCharge

      this.jobApprovalForm.get('nAdvanceAmt').setValue(total)
    }, 200);
  }
  backForm(){
    this.stepForm--;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.processOfJob == 'jobapproval'){
      this.jobApprovalView = true;
      this.stepForm = 5;
    }else{
      this.jobApprovalView = false;
      this.stepForm = 1;
    }
  }

  getPackageDetails(packageId){
    this.servicesService.gGetPackItemforJob(packageId).subscribe((res:any) =>{
      const jobDetails = res.data;
      this.packageId = jobDetails.PackageMaster[0].nPackid;
      if(jobDetails){
        //console.log(jobDetails)
        const formObj ={
          package: jobDetails.PackageMaster[0].cPackageNm,
          mrp: jobDetails.PackageMaster[0].nMRP,
          security:jobDetails.PackageMaster[0].nMRP,
          nSrvid: (jobDetails.PackageMaster[0].nSrvid).toString(),
          srvName: jobDetails.PackageMaster[0].SrvName,
          dJobDate: jobDetails.dJobDate ? new Date(jobDetails.PackageMaster[0].dCreateDate) : new Date(),
          nBillMode: jobDetails.PackageMaster[0].nBillingMode,
          nBillModeName: this.billingModeFilterData.find(bil=> bil.serialNo == jobDetails.PackageMaster[0].nBillingMode).codeName,
          nUserid: jobDetails.PackageMaster[0].nUserid,
          nBranchId: jobDetails.PackageMaster[0].nBranchId,
          cStatus:jobDetails.PackageMaster[0].cStatus,
        }

        if(jobDetails){
          this.selectedService = jobDetails.PackageMaster[0].nSrvid,
          this.setValueDefalt.cStatus = jobDetails.PackageMaster[0].cStatus,
          this.jobManageForm.patchValue(formObj);

          this.servicePointsForm.get('nJobid').setValue(jobDetails.nJobid);
          this.serviceSkillsForm.get('nJobid').setValue(jobDetails.nJobid);
          if(jobDetails.srvCategory == 'INTERNAL SERVICE'){
            this.billingModeDisable = true;
            this.serviceSkillsForm.get('nJobFrq').setValue('O');
            this.serviceSkillsForm.get('nFrqQty').setValue(0);
          }else{
            this.billingModeDisable = false;
            this.serviceSkillsForm.get('nJobFrq').setValue('D');
            this.serviceSkillsForm.get('nFrqQty').setValue(1);
          }
          if(jobDetails.PackageMaster[0].nBillingMode == 125){
            this.isDisableProcesurItem = true;
          }else{
            this.isDisableProcesurItem = false;
          }

          this.formData.srvItems = jobDetails.srvItems;
          this.formData.srvSkills = jobDetails.srvSkills;
          this.formData.srvPoints = jobDetails.srvPoints;
        }
      }
    })
  }

  addPatientdata(){

    this.AddPatient = true
    setTimeout(() => {
      this.loadDiagnosisData();
      this.customerList();

        this.patientForm.get('nAcid').setValue(this.customerAccountId);

    }, 10);

  }
  onSubmitJobManage(){
    if(this.jobManageForm.invalid){
      return
    }else{
    }
  }
  getServiceSkills(){
    //this.serviceId
    //this.dateToSend
    const date = moment(this.jobManageForm.get('dJobDate').value).format("YYYY-MM-DD");
    this.servicesService.unitId(this.selectedService, date, this.branchId).subscribe((res:any) => {
      this.srvSkillsData = res.data?.srvSkills;
      this.serviceTypeList = res.data?.srvItems;
      this.servicePointList = res.data?.srvPoints;
    })
  }
  loadDiagnosisData() {
    this.servicesService.loadDiagnosisD().subscribe((res:any) => {
      console.log(res)
      if(res){
        this.listOfDiagnosis = res.data;
      }
    }, (err) => {

    });
}
customerList(){

  this.servicesService.CustomerList(this.branchId).subscribe((res:any) =>{
    if(res){
      this.CustomerList = res.data ;

    }
  })
}
createItem() {
  return this.fb.group({
    cLatLong: [''],
    cContactPerson: [''],
    cMobile: [''],
    cAddress1:[''],
    cPin:[''],
    nState:[''],
    nDistrict:[''],
    nCity:['']
  })
}
servicedropdownF() {
  this.servicesService.getServiceData().subscribe(
      res => {
          this.serviceData = res['data'];
      }
  );
  this.servicesService.GetBillingMode().subscribe((res:any) =>{
      this.billingMode = res.data;
      this.billingModeFilterData = this.billingMode;
    }
  );

}
selectService(event, nSrvid:Dropdown){
  this.selectedService = event.value;
  const selectedOption = nSrvid.selectedOption;
  if(selectedOption){
    this.selectedService = selectedOption.val;
    this.jobManageForm.get('srvName').setValue(selectedOption.txt);
  }
  const careData =  this.billingModeFilterData.find(item => item.serialNo === 310);
  if(nSrvid.selectedOption.srvCtg == 'INTERNAL SERVICE'){
    this.jobManageForm.get('nBillMode').setValue(careData.serialNo);
    this.serviceSkillsForm.get('nJobFrq').setValue('O');
    this.serviceSkillsForm.get('nFrqQty').setValue(0);

    this.billingModeDisable = true;
  }else{
    this.jobManageForm.get('nBillMode').setValue(null);
    this.serviceSkillsForm.get('nJobFrq').setValue('D');
    this.serviceSkillsForm.get('nFrqQty').setValue(1);
    this.billingModeDisable = false;
  }
  //this.jobManageForm.get('nSrvid').setValue(event.value?.val);
}
selectBillMode(event,bm){
  const data = { name: 'Service Point', code: 'P' }
  const selectedOption = bm.selectedOption;
  if(selectedOption){
    this.jobManageForm.get('nBillModeName').setValue(selectedOption.codeName);
  }
  if(event.value === 125){
    this.typeOfService.push(data);
    this.servicePointsFormDisabled = true;
    this.isDisableProcesurItem = true;
    this.formData.srvItems = [];
    this.formData.srvSkills = [];
    this.formData.srvPoints = [];
    this.formData.consumableItems = []
    if(this.formData.srvSkills.length == 0){
      this.isSkillItemMinOne = true;
    }else{
      this.isSkillItemMinOne = false;
      this.servicePointsFormDisabled = false;
    }
    this.serviceSkillsForm.reset();
    this.serviceItemForm.reset();
    this.servicePointsForm.reset();
    setTimeout(() =>{
      this.serviceSkillsForm.patchValue(this.setValueDefalt)
      this.serviceItemForm.patchValue(this.setValueDefalt)
      this.servicePointsForm.patchValue(this.setValueDefalt)
    }, 10);

  }else{
    const findIndex = this.typeOfService.indexOf(data);
    this.typeOfService.splice(findIndex, 1);
    this.isSkillItemMinOne = false;
    this.isDisableProcesurItem = false;
    this.formData.srvItems = [];
    this.formData.srvSkills = [];
    this.formData.srvPoints = [];
    this.formData.consumableItems = [];
    this.serviceSkillsForm.reset();
    this.serviceItemForm.reset();
    this.servicePointsForm.reset();
    setTimeout(() =>{
      this.serviceSkillsForm.patchValue(this.setValueDefalt)
      this.serviceItemForm.patchValue(this.setValueDefalt)
      this.servicePointsForm.patchValue(this.setValueDefalt)
    }, 10);
  }
}
selectServiceSkill(event, srvSkillItem:Dropdown){
  const optionData = srvSkillItem.selectedOption;
  if(optionData){
    this.serviceSkillsForm.get('nSrvSkillid').setValue(optionData.nSrvSkillID);
    //this.getRateUnit(optionData.svrSkillRate)
  }
  //this.serviceSkillsForm
  //this.serviceSkillsForm.get('srvSkill').setValue(event.value.srvSkillName)
}
selectFrequency(event, frequencyName:Dropdown){
  const selectOtion = frequencyName.selectedOption;
  this.serviceSkillsForm.get('nFrqQty').enable();
  if(selectOtion){
    if(selectOtion.code == 'D'){
      this.serviceSkillsForm.get('nFrqQty').setValue(1)
    }else if(selectOtion.code == 'O'){
      this.serviceSkillsForm.get('nFrqQty').setValue(0)
      this.serviceSkillsForm.get('nFrqQty').disable();
    }else if(selectOtion.code == 'M'){
      this.serviceSkillsForm.get('nFrqQty').setValue(1)
    }
  }
}
selectScheduledMode(event, timeType:Dropdown){
  const checkData = timeType.selectedOption;
  if(checkData.name == 'Custom'){
    this.serviceSkillsForm.get('dStartTm').setValue('08:00');
  }else{
    this.serviceSkillsForm.get('dStartTm').setValue(checkData.name);
  }
}
onSubmitServiceSkills(){
  if(this.serviceSkillsForm.invalid){
    return
  }else{
    this.isSkillItemMinOne = false;
    //console.log(this.serviceSkillsForm.value)
    this.formData.srvSkills.push(this.serviceSkillsForm.value);
    this.serviceSkillsForm.reset();
    setTimeout(() =>{
      this.serviceSkillsForm.patchValue(this.setValueDefalt)
    }, 10);
  }
}
selectServiveItem(event, srvSkill:Dropdown){
  const selectOption = srvSkill.selectedOption;
  //console.log(selectOption)
  if(selectOption){
    this.serviceItemForm.get('nItemid').setValue(selectOption.nItemID);
    this.serviceItemForm.get('nSkillID').setValue(selectOption.nSkillID);
    this.serviceItemForm.get('item').setValue(selectOption.itemName);
    this.serviceItemForm.get('nSecurity').setValue(selectOption.nSecurity);
    this.serviceItemForm.get('rentUnitName').setValue(selectOption.rentUnitName);
    this.serviceItemForm.get('cInstallation').setValue(selectOption.cInstallation);
    this.serviceItemForm.get('nPitemid').setValue(selectOption.nSkillID);
   // this.getMachineRateUnit(selectOption.svrItemRate)
  }

}
selectServivePoints(event, servPoint:Dropdown){
  const selectedOption = servPoint.selectedOption;
  if(selectedOption){
    if(servPoint.selectedOption.svrPointRate){
      this.servicePointsForm.patchValue({
        nSrvPointid: selectedOption.nSrvPintID
      })
     // this.unitPointRateFunc(servPoint.selectedOption.svrPointRate)
    }
  }
}
onSubmitKitPoint(){
  if(this.servicePointsForm.invalid){
    return
  }else{

    this.formData.srvPoints.push(this.servicePointsForm.value);
    this.servicePointsForm.reset();
    setTimeout(() =>{
      this.servicePointsForm.patchValue(this.setValueDefalt);
    }, 10);
  }
}
onSubmitServiceItem(){
  if(this.serviceItemForm.invalid){
    return
  }else{
    //console.log(this.serviceItemForm.value)
    let data = this.serviceItemForm.value;
    data.nDayOfMonth = this.formData.srvItems.length + 1;
    data.cStatus = this.setValueDefalt.cStatus;
    data.nJobid = this.setValueDefalt.nJobid;
    //console.log(this.setValueDefalt.cStatus)
    this.formData.srvItems.push(data);
    const dataGet:any = this.serviceItemForm.value;
    this.addEquipmentData(dataGet.nItemid, data.nDayOfMonth)
    this.serviceItemForm.reset();
    setTimeout(() =>{
      this.serviceItemForm.patchValue(this.setValueDefalt)
    }, 10)
  }
  //console.log(this.formData.srvItems)
}
addEquipmentData(data, daysMonth){
  const body ={
    nItemId:data,
    EffectDt: moment(this.jobManageForm.get('dJobDate').value).format('YYYY-MM-DD'),
    BranchId: this.branchId
  }
  this.codeMasterService.getGroupItems(body).subscribe((res:any) =>{
    const data = res.data?.SrvItems;
    if(data){
      this.addItemSupportList(data, daysMonth, body.nItemId)
      //this.serviceItemData.push(...data);
    }

  })
}
//add consumableItems automatically
addItemSupportList(data, daysMonth, itemId){
  //console.log(data)
 const dataList = []
  data.forEach(element =>{
    const itemData ={
      nItemid:element.nItemID,
      itemName:element.itemName,
      cInstallation:element.cInstallation,
      cIsConsumable:element.cIsConsumable,
      nSkillID:element.nSkillID,
      nRateID:element.nRateID,
      nRate:element.nRate,
      nRentUnit:element.nRentUnit,
      rentUnitName:element.rentUnitName,
      nSaleUnit:element.nSaleUnit,
      saleUnitName:element.saleUnitName,
      nSale:element.nSale,
      nSecurity:element.nSecurity,
      nBranchid:element.nBranchid,
      total:element.nRate,
      discount:0,
      supportItem:true,
      nPitemid:itemId,
      rate:element.nRate,
      item:element.itemName,
      nDiscRatePer:0,
      nJobdid: 0,
      nJobid: this.setValueDefalt.nJobid != 0 ? this.setValueDefalt.nJobid : 0,
      nadRate: element.nRate,
      nDayOfMonth:daysMonth,
      nDiscRateAmt:0,
      nDiscPerSec : 0,
      nDiscAmtSec : 0,
      nadSecurity : 0,
      cStatus:this.setValueDefalt.cStatus != null ? this.setValueDefalt.cStatus : null,
      npJobdId:0,
      editstatus:'N'
    }
    dataList.push(itemData)
  })
  this.formData.consumableItems.push(...dataList);
  //console.log(this.formData.consumableItems)
}
matchFrequency(code){
  const find =  this.manageService.find(item => item.code == code);
  return find;
 }

 deleteServiceSkills(rowInd) {
  this.formData.srvSkills.splice(rowInd, 1);
  // if (this.formData.srvSkills.length > 0) {
  //     this.showServiceSkillsTable = true;
  // } else {
  //     this.showServiceSkillsTable = false;
  // }
 }

 deleteServicePoint(index){
  this.formData.srvPoints.splice(index, 1);
 }

 deleteServiceItem(index, item){
  this.formData.srvItems.splice(index, 1);
  this.formData.consumableItems.filter(x => x.nDayOfMonth === item.nDayOfMonth).forEach(x => this.formData.consumableItems.splice(this.formData.consumableItems.indexOf(x), 1));
 }

 submitForm(){
     const payload = {};
     let d = new Date();
     const pDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;


     payload['nPackid'] = this.packageId ? this.packageId : 0;
     payload['cPackageNm'] = this.jobManageForm.value.package;
     payload['nmrp'] = this.jobManageForm.value.mrp;
     payload['nBillMode'] = this.jobManageForm.value.nBillMode;
     payload['nUserid'] = this.jobManageForm.value.nUserid;
     payload['nBranchId'] = this.branchId;
     payload['nSecurityDeposit'] = this.jobManageForm.value.security;
     payload['nSrvid'] = this.jobManageForm.value.nSrvid;
     payload['dCreatedate'] = pDate;
     let packageDetail:any = [];

     this.formData.srvSkills.forEach(element => {
          packageDetail.push({
            nPackdetailid: 0,
            nPackid: 0,
            nSrvSkillid: element.nSrvSkillid,
            nItemid: 0,
            nSrvPointid: 0,
            nJobFrq: element.nJobFrq,
            nFrqQty: element.nFrqQty,
            nDayOfMonth: 0,
            dStartTm: element.dStartTm,
            nUserid: this.jobManageForm.value.nUserid,
            dCreatedate: pDate,
            nHour:element.nHour
          })
     });
     this.formData.srvPoints.forEach(element => {
      packageDetail.push({
        nPackdetailid: 0,
        nPackid: 0,
        nSrvSkillid: 0,
        nItemid: 0,
        nSrvPointid: element.nSrvPointid,
        nJobFrq: null,
        nFrqQty: 0,
        nDayOfMonth: 0,
        dStartTm: null,
        nUserid: this.jobManageForm.value.nUserid,
        dCreatedate: pDate
      })
     });
     this.formData.srvItems.forEach(element => {
      packageDetail.push({
        nPackdetailid: 0,
        nPackid: 0,
        nSrvSkillid: 0,
        nItemid: element.nItemid,
        nSrvPointid: 0,
        nJobFrq: null,
        nFrqQty: 0,
        nDayOfMonth: 0,
        dStartTm: null,
        nUserid: this.jobManageForm.value.nUserid,
        dCreatedate: pDate
      })
     });

     payload['packageDetail'] = packageDetail;

     this.servicesService.packageMasterAddEdit(payload).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Service Message', detail:res['data'].msg});
        this.ref.close('res');
     })
 }

totalSkillsPrice(data){
  let totalPrice:number = 0;
  let totalSquerty:number = 0;
  data.forEach(element =>{
     const price = element.rate - (element.rate*element.nDiscRatePer/100);
     let skillAddition = price*(this.totalServingDays/element.nFrqQty)
     totalPrice += skillAddition;
  })
  this.totalPayableAmount = totalPrice;
  return totalPrice;
}
totalEquipmentPrice(data){
  let totalPrice:number = 0;
  let totalSquerty:number = 0;
  let totalActualSquerty:number = 0;
  let totalinstallationCharge:number = 0;
  data.forEach(element =>{
     const price = element.rate - (element.rate*element.nDiscRatePer/100);
     let skillAddition = price*this.totalServingDays;
     totalPrice += skillAddition;
     const totalSeu = element.nSecurity - (element.nSecurity*element.nDiscPerSec/100);
     totalSquerty += totalSeu;
     totalActualSquerty += Number(element.nSecurity);
     totalinstallationCharge += Number(element.nInstallationCharge);
  })
  this.totalPayableAmount = totalPrice;
  this.totalEquipmentSecAmount = totalSquerty;
  this.totalActualEquipmentSecAmount = totalActualSquerty;
  this.totalinstallationCharge = totalinstallationCharge;
  return totalPrice;
}

totalSupportingPrice(data){
  let totalPrice:number = 0;
  let totalSquerty:number = 0
  data.forEach(element =>{
     const price = element.rate - (element.rate*element.nDiscRatePer/100);
     totalPrice += price;
  })
  this.totalPayableAmount = totalPrice;
  return totalPrice;
}
totalClinicalProcedures(data){
  let totalPrice:number = 0;
  let totalSquerty:number = 0;
  let totalActualSquerty:number = 0;
  data.forEach(element =>{
     const price = element.rate - (element.rate*element.nDiscRatePer/100);
     let skillAddition = price*this.totalServingDays;
     totalPrice += skillAddition;
     const totalSeu = element.nSecurity - (element.nSecurity*element.nDiscPerSec/100);
     totalSquerty += totalSeu;
     totalActualSquerty += element.nSecurity;
  })
  this.totalClinicalSecAmount = totalSquerty;
  this.totalClinicalActualSecAmount = totalActualSquerty;
  return totalPrice;
}

totalPayableAddition(skill, equ, supp, clin){
  const total = skill+equ+supp+clin
  this.totalPayableAmountData = total;
  this.jobApprovalForm.get('nTotalService').setValue(total);
  return total;
}

actualSecurityDeposit(item1, item2,){
  return item1+item2;
}
payableSecurityDeposit(item1, item2,){
  const total = item1+item2
  this.jobApprovalForm.get('nTotalSecurity').setValue(total);
  this.totalPayableEquipmentSecAmount = total;
  let totalAdd = this.totalPayableAmountData + this.totalinstallationCharge;
  //this.jobApprovalForm.get('nAdvanceAmt').setValue(totalAdd)
  return total;
}

editJob(){
  this.stepForm = 1;
}

amountCalculation(price, disc, index){
  let calcData;
  calcData = Number(price)*Number(disc)/100;
 let total = price - calcData;
  return total;
}

}
