import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';
import { ServicesService } from '../services.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { AddPatientComponent } from '../add-patient/add-patient.component';

@Component({
  selector: 'app-job-view-customer-ledger',
  templateUrl: './job-view-customer-ledger.component.html',
  styleUrls: ['./job-view-customer-ledger.component.css']
})
export class JobViewCustomerLedgerComponent implements OnInit, OnDestroy, OnChanges {

  
  @Input() display: boolean;
  @Input() serviveJobId: any = null;
  @Input() serviveJobStatus: any = null;
  @Input() processOfJob: any = null;
  @Output() displayChange = new EventEmitter();
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
    editstatus:'N'
  };
  jobManageForm:FormGroup;
  serviceSkillsForm:FormGroup;
  serviceItemForm:FormGroup;
  servicePointsForm:FormGroup;
  jobApprovalForm:FormGroup;
  serviceData:any = [];
  billingMode:any = [];
  billingModeFilterData:any = [];
  filteredGroups:any;
  patientData:any=[];
  addressData:any = [];
  srvSkillsData:any = [];
  rateData:any = [];
  servicePointList:any = [];
  pointRateUnitList:any = [];
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
  srvType:any = [];
  sSkillsItemData:any =[];
  servicePointData:any = [];
  servicePointRateData:any = [];
  filteredCustomers:any = [];
  serviceTypeList:any = [];
  stepForm:number = 1;
  selecetedCustomer:number = null;
  formData:any ={
    srvItems:[],
    srvSkills:[],
    srvPoints:[],
    consumableItems:[]
  }
  branchId:any = null;
  selectedService:any = null;
  bodyPayLoad:Object = null;
  getSkillDiscount:number = 0;
  isSkillItemMinOne:boolean = false;
  serviceItemData:any = [];
  setPointName:string = 'Service Point';
  setEqueName:string = 'Machine';
  paymentModeList:any = [
    {
      id:1,
      name:'Prepaid',
      value:'A'
    },
    {
      id:2,
      name:'Cash on Delivery',
      value:'E'
    }
  ];
  permittedData:any = [
    {
      id:1,
      name:'Not Permitted',
      value:'N'
    },
    {
      id:2,
      name:'Permitted',
      value:'Y'
    },
  ]
  jobApprovalView:boolean = true;
  totalServingDays:number = 0;
  totalPayableAmount:number = 0;
  totalClinicalSecAmount:number = 0;
  totalClinicalActualSecAmount:number = 0;

  totalEquipmentSecAmount:number = 0;
  totalActualEquipmentSecAmount:number = 0;
  totalPayableEquipmentSecAmount:number = 0;
  totalSupportItemSecAmount:number = 0;
  totalPayableAmountData:number = 0;
  totalinstallationCharge:number = 0;
  servicePointsFormDisabled:boolean = false;
  isDisableProcesurItem:boolean = false;
  timeStartDefalt:any = '08:00';
  addCustomerModalBox:boolean = false;
  customerAccountId:any = null;
  getJobNumber:any = null;
  jobView:boolean = false;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private codeMasterService: CodeMasterService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService
  ) {
    const branchId  = localStorage.getItem('branchId');
    if(branchId){
      this.branchId = branchId;
    }
  }

  ngOnInit(): void {
    //console.log(this.config.data);
   this.jobManageForm = this.fb.group({
    nAdvanceAmt:[0],
    srvName:[null, [Validators.required]],
    nSrvid:[null],
    dJobDate:['', [Validators.required]],
    nBillMode:[null, [Validators.required]],
    cMobile:[null],
    dJobSrvEnd:[''],
    nAcid:[null],
    nJobid:[0],
    cCustNm:[null],
    cAddress:[null, [Validators.required]],
    nUserid:[null],
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
      nHour: [null],
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
      cStatus:[''],
      editstatus: ['N']
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
      nSrvPointid: [null, [Validators.required]],
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
      cStatus:[''],
      editstatus: ['N']
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
      nRateName: [null, [Validators.required]],
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
      cStatus:[''],
      editstatus: ['N']
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

    setTimeout(() => {
      this.servicedropdownF();
      this.getCustomerData();
    }, 10);
   
    this.jobManageForm.get('dJobDate').valueChanges.subscribe(item =>{
      const days = moment(item, "DD-MM-YYYY").add(15, 'days').toDate();
      this.jobManageForm.get('dJobSrvEnd').setValue(new Date(days));
      this.serviceItemForm.get('dJobSrvEnd').setValue(moment(item).format("DD-MM-YYYY"));
    })
    this.serviceSkillsForm.get('nDiscRatePer').valueChanges.subscribe(item =>{
     //const rateValue =  this.serviceSkillsForm.get('nadRate').value;
     const rateValue = this.getSkillDiscount
      const calculation = rateValue*item/100;
      const setData = rateValue - calculation;
      this.serviceSkillsForm.get('nDiscRateAmt').setValue(calculation);
      this.serviceSkillsForm.get('nadRate').setValue(setData);
    });
   // console.log(this.serviveJobId, this.serviveJobStatus)
    if(this.serviveJobId != null && this.serviveJobStatus != null){
      const status = this.serviveJobStatus.charAt(0);
      this.setValueDefalt.cStatus = status;
      this.getJobDetails(this.serviveJobId, status);
      
    }
    if(this.config.data != null){
      //console.log(this.config.data)
      const status = this.config.data.cStatus.charAt(0);
      this.setValueDefalt.cStatus = status;
      this.processOfJob = this.config.data.processOfJob;
      this.serviveJobId  = this.config.data.servId;
      this.jobView = this.config.data.jobView == true ? true:false;
      //console.log(status)
      setTimeout(() => {
        this.getJobDetails(this.config.data.servId, status);
      }, 10);
    }
    if(this.processOfJob == 'jobapproval'){
      this.jobApprovalView = true;
      this.stepForm = 5;
    }else{
      this.jobApprovalView = false;
      this.stepForm = 1;
    }
    // this.jobApprovalForm.get('nDeliveryCharge').valueChanges.subscribe(res =>{
    //   console.log('nDeliveryCharge',res);
    //   let total = this.totalPayableAmountData + this.totalinstallationCharge + Number(res);
    //   this.jobApprovalForm.get('nAdvanceAmt').setValue(total)
    // })
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

  getJobDetails(id, status){
    this.codeMasterService.getJobDetails(id, status).subscribe((res:any) =>{
      const jobDetails = res.data;
      //console.log(jobDetails)
      const formObj ={
        nAdvanceAmt: jobDetails.nAdvanceAmt,
        nSrvid: jobDetails.nSrvid,
        srvName: jobDetails.srvName,
        dJobDate: new Date(jobDetails.dJobDate),
        nBillMode: jobDetails.nBillMode,
        cMobile: jobDetails.cMobile,
        dJobSrvEnd: new Date(jobDetails.dJobSrvEnd),
        nAcid: jobDetails.nAcid,
        nJobid: jobDetails.nJobid,
        cCustNm: jobDetails.cCustNm,
        cAddress: jobDetails.cAddress,
        nUserid: jobDetails.nUserid,
        nBranchId: jobDetails.nBranchId,
        selfAssigned: jobDetails.selfAssigned,
        nAddrid: jobDetails.nAddrid,
        nDeliveryCharge: jobDetails.nDeliveryCharge,
        nPatientid: jobDetails.nPatientid,
        CItemDelivery: jobDetails.CItemDelivery,
        patient:jobDetails.patient,
        billMode:jobDetails.billMode,
        nPJobdid:jobDetails.nPJobdid,
        cStatus:jobDetails.cStatus,
      }
      const jobApprovalForm = {
        nTotalService:jobDetails.nTotalService,
        nTotalSecurity:jobDetails.nTotalSecurity,
        nAdvanceAmt:jobDetails.nAdvanceAmt,
        itemDelivery:jobDetails.itemDelivery,
        nDeliveryCharge:jobDetails.nDeliveryCharge,
        modeOfPaymentD:jobDetails.modeOfPaymentD,
        cStatus:jobDetails.cStatus,
        nPitemid:jobDetails.nPitemid
      }

      if(jobDetails){
        this.customerAccountId = jobDetails.nAcid;
        this.getJobNumber = jobDetails.cJobNo;
        this.selectedService = jobDetails.nSrvid;
        this.setValueDefalt.nJobid = jobDetails.nJobid;
        this.setValueDefalt.cStatus = jobDetails.cStatus;
        this.jobManageForm.patchValue(formObj);
        this.jobApprovalForm.patchValue(jobApprovalForm);
        this.jobApprovalForm.patchValue(formObj);
        this.servicePointsForm.get('nJobid').setValue(jobDetails.nJobid);
        this.serviceSkillsForm.get('nJobid').setValue(jobDetails.nJobid)
        if(jobDetails.nBillMode == 125){
          this.isDisableProcesurItem = true;
        }else{
          this.isDisableProcesurItem = false;
        }

        if(jobDetails.srvItems.length > 0){
          this.jobApprovalForm.get('itemDelivery').setValue('P')
        }else{
          this.jobApprovalForm.get('itemDelivery').setValue('N')
        }
        if(jobDetails.srvItems.length > 0){
          this.formData.srvItems = jobDetails.srvItems.map(v => ({...v, editstatus: 'E'}));
        }
        if(jobDetails.srvSkills.length > 0){
          this.formData.srvSkills = jobDetails.srvSkills.map(v => ({...v, editstatus: 'E'}));
        }
        if(jobDetails.srvPoints.length > 0){
          this.formData.srvPoints = jobDetails.srvPoints.map(v => ({...v, editstatus: 'E'}));
        }
        if(jobDetails.consumableItems.length > 0){
          this.formData.consumableItems = jobDetails.consumableItems.map(v => ({...v, editstatus: 'E'}));
        }
        this.getPatient()
        this.getServiceSkills();
      }
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
getCustomerData(){
  this.servicesService.getCustomerList(this.branchId).subscribe((res:any) =>{
      this.filteredGroups = res.data;
      this.filteredCustomers = res.data;
    }  
  );
}
getPatient(){
  this.servicesService.loadPatientDataList(this.customerAccountId).subscribe((res:any) => {
            //this.patientData = res['data'];
            //(res)
            if(res){
              this.patientData = res.data;
            }
        }, (err) => { });
}
// filterCustomer(event){
//   let filtered: any[] = [];
//   let query = event.query;
//   for (let i = 0; i < this.filteredGroups.length; i++) {
//     let customer = this.filteredGroups[i];
//     if (customer?.cDisplayNm.toLowerCase().indexOf(query.toLowerCase()) == 0) {
//       filtered.push(customer);
//     }
//   }
//   this.filteredCustomers = filtered;
// }
selectCustomer(event, dd:Dropdown){
  const selectOption = dd.selectedOption;
  if(selectOption){
    this.selecetedCustomer = selectOption.nAcid;
    const getUserDetails = selectOption.addresses[0]
    this.loadPatientData('');
    this.getAddress(selectOption.nAcid)
    this.jobManageForm.get('nAcid').setValue(selectOption.nAcid);
    this.customerAccountId = selectOption.nAcid;
    // this.jobManageForm.get('nBranchId').setValue(selectOption.nBranchId);
    this.jobManageForm.get('nUserid').setValue(selectOption.nUserid);
    this.jobManageForm.get('cMobile').setValue(getUserDetails.cMobile);
    this.getPatient()
  }
  this.jobManageForm.get('patient').setValue(null);
  this.jobManageForm.get('cAddress').setValue(null);
 
}

selectPatient(event, patientSelect:Dropdown){
  const selectOption = patientSelect.selectedOption;
  if(selectOption){
    this.jobManageForm.get('nPatientid').setValue(selectOption.nPatientid);
  }
}
loadPatientData(query?) {
  this.servicesService.loadPatientData(query, this.selecetedCustomer).subscribe((res:any) => {
      this.patientData = res.data;
  }, (err) => { });
}
getAddress(customer) {
  this.servicesService.getAddress(customer).subscribe((res:any) => {
      this.addressData = res.data;
  });
}
selectService(event, nSrvid:Dropdown){
  this.selectedService = event.value;
  const selectedOption = nSrvid.selectedOption;
  if(selectedOption){
    this.selectedService = selectedOption.val;
    this.jobManageForm.get('nSrvid').setValue(selectedOption.val);
  }
  const careData =  this.billingModeFilterData.find(item => item.serialNo === 310);
  if(nSrvid.selectedOption.srvCtg == 'INTERNAL SERVICE'){
    this.jobManageForm.get('nBillMode').setValue(careData.serialNo);
  }else{
    this.jobManageForm.get('nBillMode').setValue(null);
  }
  //this.jobManageForm.get('nSrvid').setValue(event.value?.val);
}
selectBillMode(event){
  const data = { name: 'Service Point', code: 'P' }
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
getServiceSkills(){
  //this.serviceId
  //this.dateToSend
  const date = moment(this.jobManageForm.get('dJobDate').value).format("YYYY-MM-DD");
  this.servicesService.unitId(this.selectedService, date, this.branchId).subscribe((res:any) => {
    this.srvSkillsData = res.data.srvSkills;
    this.serviceTypeList = res.data.srvItems;
    this.servicePointList = res.data.srvPoints;
  })
}
seleceAddress(event, cAddress:Dropdown){
  const selectedOption = cAddress.selectedOption;
  if(selectedOption){
    this.jobManageForm.get('nAddrid').setValue(selectedOption.nAddrid);
  }

}
selectServiceSkill(event, srvSkillItem:Dropdown){
  const optionData = srvSkillItem.selectedOption;
  if(optionData){
    this.serviceSkillsForm.get('nSrvSkillid').setValue(optionData.nSrvSkillID);
    this.getRateUnit(optionData.svrSkillRate)
  }
  //this.serviceSkillsForm
  //this.serviceSkillsForm.get('srvSkill').setValue(event.value.srvSkillName) 
}
getRateUnit(data){
  const rateData = [];
  data?.forEach(item =>{
    let setData = {
      nRate:item.nRate,
      nRateID:item.nRateID,
      nRentUnit:item.nRentUnit,
      nSale:item.nSale,
      nSaleUnit:item.nSaleUnit,
      nSecurity:item.nSecurity,
      nSkillID:item.nSkillID,
      rentUnitName:item.rentUnitName,
      saleUnitName:item.saleUnitName,
      name:`${item.nRate}-${item.rentUnitName}`
    }
    rateData.push(setData)
  }); 
  this.rateData = rateData;
}
selectUnitRate(event, unitRate:Dropdown){
  const selectOtion = unitRate.selectedOption;
  if(selectOtion){
    this.getSkillDiscount = selectOtion.nRate;
    this.serviceSkillsForm.get('nRateId').setValue(selectOtion.nRateID);
    this.serviceSkillsForm.get('rate').setValue(selectOtion.nRate);
    this.serviceSkillsForm.get('unitName').setValue(selectOtion.rentUnitName);
    this.serviceSkillsForm.get('nadRate').setValue(selectOtion.nRate);
  }
}
selectFrequency(event, frequencyName:Dropdown){
  const selectOtion = frequencyName.selectedOption;
  if(selectOtion){
    if(selectOtion.code == 'D'){
      this.serviceSkillsForm.get('nFrqQty').setValue(1)
    }else if(selectOtion.code == 'O'){
      this.serviceSkillsForm.get('nFrqQty').setValue(0)
    }else if(selectOtion.code == 'M'){
      this.serviceSkillsForm.get('nFrqQty').setValue(1)
    }
  }
}
matchFrequency(code){
 const find =  this.manageService.find(item => item.code == code);
 return find;
}

selectScheduledMode(event, timeType:Dropdown){
  const checkData = timeType.selectedOption;
  if(checkData.name == 'Custom'){
    this.serviceSkillsForm.get('dStartTm').setValue('08:00');
  }else{
    this.serviceSkillsForm.get('dStartTm').setValue(checkData.name);
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
    this.getMachineRateUnit(selectOption.svrItemRate)
  }
  
}
getMachineRateUnit(data){
  const rateData = [];
  data?.forEach(item =>{
    let setData = {
      nRate:item.nRate,
      nRateID:item.nRateID,
      nRentUnit:item.nRentUnit,
      nSale:item.nSale,
      nSaleUnit:item.nSaleUnit,
      nSecurity:item.nSecurity,
      nSkillID:item.nSkillID,
      rentUnitName:item.rentUnitName,
      saleUnitName:item.saleUnitName,
      name:`${item.nRate}-${item.rentUnitName}`,
    }
    rateData.push(setData)
  });
  this.servicePointRateData = rateData;
}
selectRateUnit(event, skillItemRate:Dropdown){
  const selectOption2 = skillItemRate.selectedOption;
  if(selectOption2){
    this.serviceItemForm.get('rate').setValue(selectOption2.nRate);
    this.serviceItemForm.get('unit').setValue(selectOption2.rentUnitName);
    this.serviceItemForm.get('nRateId').setValue(selectOption2.nRateID);
    this.serviceItemForm.get('nADSecurity').setValue(selectOption2.nSecurity);
    this.serviceItemForm.get('nSecurity').setValue(selectOption2.nSecurity);
    this.serviceItemForm.get('nADSecurity').setValue(selectOption2.nSecurity);
    this.serviceItemForm.get('unitName').setValue(selectOption2.rentUnitName);
    this.serviceItemForm.get('nadRate').setValue(selectOption2.nRate);
  }
}



  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
  onClose(){
    this.displayChange.emit(false);
  }
  showCustomerDialog(){
  }
  showPatientDialog(){
  }
  backForm(){
    this.stepForm--;
  }
  editJob(){
    this.stepForm = 1;
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
      const total = this.totalPayableAmountData + this.totalinstallationCharge
      this.jobApprovalForm.get('nAdvanceAmt').setValue(total)
    }, 200);
    
  }
  onSubmitJobManage(){
    if(this.jobManageForm.invalid){
      return
    }else{
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
  deleteServiceSkills(index, item){
    console.log(item)
    if(item.editstatus == 'N'){
      this.formData.srvSkills.splice(index, 1);
    }else{
      this.formData.srvSkills = this.formData.srvSkills.map(v =>v.nJobdid == item.nJobdid ? { ...v, editstatus: 'D' }: v)
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

  
  deleteServiceItem(index, item){
    if(item.editstatus == 'N'){
      this.formData.srvItems.splice(index, 1);
      this.formData.consumableItems.filter(x => x.nDayOfMonth === item.nDayOfMonth).forEach(x => this.formData.consumableItems.splice(this.formData.consumableItems.indexOf(x), 1));
    }else{
      this.formData.srvItems = this.formData.srvItems.map(v =>v.nDayOfMonth == item.nDayOfMonth ? { ...v, editstatus: 'D' }: v)
      this.formData.consumableItems = this.formData.consumableItems.map(v =>v.nDayOfMonth == item.nDayOfMonth ? { ...v, editstatus: 'D' }: v);
    }
  }
  deleteServiceItemOld(index, item){

  }

  amountCalculation(price, disc, index){
    let calcData;
    calcData = Number(price)*Number(disc)/100;
   let total = price - calcData;
    return total;
  }
  discountCalculation(price, disc, index){
    let calcData;
    calcData = Number(price)*Number(disc)/100;
   let total = price - calcData;
   let data ={
    nadRate:total,
    nDiscPerAmt:calcData
   }
    return data;
  }
  servItemDiscount(event, rate, rowIndex){
    let calcData;
    calcData = Number(rate)*Number(event)/100;
    let total = rate - calcData;
    this.formData.srvItems[rowIndex].nadRate = total;
    this.formData.srvItems[rowIndex].nDiscRateAmt = calcData;
  }
  servnSecurityDiscount(event, rate, rowIndex){
    let calcData;
    calcData = Number(rate)*Number(event)/100;
    let total = rate - calcData;
    this.formData.srvItems[rowIndex].nADSecurity = total;
    this.formData.srvItems[rowIndex].nDiscAmtSec = calcData;
  }
  servSupportingDiscount(event, rate, rowIndex){
    let calcData;
    calcData = Number(rate)*Number(event)/100;
    let total = rate - calcData;
    this.formData.consumableItems[rowIndex].nadRate = total;
    this.formData.consumableItems[rowIndex].nDiscRateAmt = calcData;
  }

  submitForm(){
    let formDataJob  = this.jobManageForm.value;
    let configData  = this.jobApprovalForm.value;
    formDataJob.dJobDate =  moment(formDataJob.dJobDate).format('YYYY-MM-DD');
    formDataJob.dJobSrvEnd =  moment(formDataJob.dJobSrvEnd).format('YYYY-MM-DD');
    let target:any = {};
    Object.assign(target, formDataJob, this.formData, configData);
    if(target){
      target.cStatus = 'R'
      if(this.serviveJobId != null){
        target.nJobid = this.serviveJobId
        this.JobMasterUpdate(target, 'update')
      }else{
        this.postFormDataInApi(target)
      }
    }
  }
  submitApprove(){
    let formDataJob  = this.jobManageForm.value;
    let configData  = this.jobApprovalForm.value;
    formDataJob.dJobDate =  moment(formDataJob.dJobDate).format('YYYY-MM-DD');
    formDataJob.dJobSrvEnd =  moment(formDataJob.dJobSrvEnd).format('YYYY-MM-DD');
    let target:any = {};
    Object.assign(target, formDataJob, this.formData, this.jobApprovalForm.value);
    if(target){
      if(this.serviveJobId != null){
        target.nJobid = this.serviveJobId;
        this.JobMasterUpdate(target, 'approve');
      }
    }
  }
  submitReject(){
    let target:any = {};
    Object.assign(target, this.jobManageForm.value, this.formData, this.jobApprovalForm.value);
    if(target){
      if(this.serviveJobId != null){
        target.nJobid = this.serviveJobId
        this.JobMasterUpdate(target, 'reject')
      }
    }
  }

  jobApproveApiCall(){
    const body ={
      nJobid:this.serviveJobId,
      cStatus:this.jobApprovalForm.get('cStatus').value
    }
    this.codeMasterService.updateJobApproval(body).subscribe((res:any) =>{
      //this.messageService.add({ severity: 'success', summary: 'Success', detail: res.errorMessage });
      this.onClose();
      this.ref.close('Close');
    }, (err:any) =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.errorMessage });
    })

  }


  postFormDataInApi(data){
    this.codeMasterService.addJob(data).subscribe((res:any) =>{
      this.onClose();
      this.ref.close('Close');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job Successfuly add' });
    }, (err:any) =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Job not add' });
    })
  }
  JobMasterUpdate(data, item){
    this.codeMasterService.addSrvtoJob(data).subscribe((res:any) =>{
      // if(item == 'approve'){
      //   this.jobApproveApiCall()
      // }
      //console.log(res)
      this.onClose();
      this.ref.close('Close');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job Successfuly update' });
    }, (err:any) =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Job not update' });
    })
  }
  selectServivePoints(event, servPoint:Dropdown){
    const selectedOption = servPoint.selectedOption;
    if(selectedOption){
      if(servPoint.selectedOption.svrPointRate){
        this.unitPointRateFunc(servPoint.selectedOption.svrPointRate)
      }
    }
  }
  unitPointRateFunc(data){
    const dataList = [];
    data?.forEach(item =>{
      let setData = {
        nRate:item.nRate,
        nRateID:item.nRateID,
        nRentUnit:item.nRentUnit,
        nSale:item.nSale,
        nSaleUnit:item.nSaleUnit,
        nSecurity:item.nSecurity,
        nSkillID:item.nSkillID,
        rentUnitName:item.rentUnitName,
        saleUnitName:item.saleUnitName,
        name:`${item.nRate}-${item.rentUnitName}`
      }
      dataList.push(setData)
    }); 
    this.pointRateUnitList = dataList;
  }

  selectPointRateUnit(event, pointRateUnit:Dropdown){
    const selectOption = pointRateUnit.selectedOption;
    if(selectOption){
      this.servicePointsForm.get('nSrvPointid').setValue(selectOption.nSkillID);
      this.servicePointsForm.get('rate').setValue(selectOption.nRate);
      this.servicePointsForm.get('unitName').setValue(selectOption.rentUnitName);
      this.servicePointsForm.get('unit').setValue(selectOption.rentUnitName);
      this.servicePointsForm.get('nRateId').setValue(selectOption.nRateID);
      this.servicePointsForm.get('nadRate').setValue(selectOption.nRate);
      this.servicePointsForm.get('nadSecurity').setValue(selectOption.nSecurity);
      this.servicePointsForm.get('nSecurity').setValue(selectOption.nSecurity);
      this.servicePointsForm.get('nSrvSkillid').setValue(selectOption.nSkillID);
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
  onSubmitJobApproval(){

  }
  deleteServicePoint(index){
    this.formData.srvPoints.splice(index, 1);
  }
  modeOfPayment(event, paymentMode:Dropdown){
    const selectedOption = paymentMode.selectedOption;
  }
  itemOfDelivery(event, itemOfDelivery:Dropdown){
    const selectedOption = itemOfDelivery.selectedOption;
  }
  differsDays(start, end){
    const startDate = moment(start, "DD.MM.YYYY");
    const endDate = moment(end, "DD.MM.YYYY");
    const dyas = endDate.diff(startDate, 'days');
    this.totalServingDays = dyas+1
   return this.totalServingDays;
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

  /*
  @ Add customer modal open
  */
  addCustomer(){
    const ref = this.dialogService.open(AddCustomerComponent, {
          data: {
              id: '51gF3'
          },
          header: 'Quick Ledger Creation',
          width: '60vw',
          styleClass:'customer-modal'
    });
    ref.onClose.subscribe((res:any) => {
        this.getCustomerData();
    });
  }
  addPatient(){
    const ref = this.dialogService.open(AddPatientComponent, {
          data: {
              id: '51gF3',
              nAcid:this.customerAccountId
          },
          header: 'Add Patient Info',
          width: '60vw',
          styleClass:'customer-modal'
    });
    ref.onClose.subscribe((res:any) => {
        this.getPatient();
    });
  }

  switchEdit(item){
    this.stepForm = item;
  }

  confirm(rowIndex, item, action) {
    this.confirmationService.confirm({
          message: 'Are you sure item delete?',
          accept: () => {
              console.log('Yes');
              if(action == 'serviceSkills'){
                this.deleteServiceSkills(rowIndex, item)
              }
              if(action == 'serviceItem'){
                this.deleteServiceItem(rowIndex, item)
              }
              
          },
          reject: () => {
             console.log('No')
          }
      });
  }

 




}
