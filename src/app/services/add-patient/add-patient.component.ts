import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  CustomerList:any = []
  listOfDiagnosis:any = [];
  listOfGender:any = [
    {id:1, name:'Male', value:'M'},
    {id:2, name:'Female', value:'F'},
    {id:3, name:'Other', value:'O'}
  ]
  newCustomer:boolean=false;
  branchDataId
  patientForm:FormGroup;
  customerForm:FormGroup
  userDataId: any;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private servicesService: ServicesService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,

  ) {
   this.branchDataId = localStorage.getItem('branchId')
   this.userDataId = localStorage.getItem("empID")
  }

  ngOnInit(): void {
    console.log(this.config.data);
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
      nBranchid:[this.branchDataId],
      nJobid:[null],
      cDisplayNm:[''],
      nHospitalid:[null],
      cDoctor:[''],
      nMobile:[''],
      addresses:this.fb.array([this.createItem()])
  })
  this.customerForm = this.fb.group({
    groupName:['CUSTOMERS'],
    nSchid:[18],
    cLedgerNm:[null, [Validators.required]],
    nBranchid:[this.branchDataId],
    cDisplayNm:[null],
    nUserid:[this.userDataId],
    nMobile:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    addresses:this.fb.array([this.createItem()])
  });

    setTimeout(() => {
      this.loadDiagnosisData();
      this.customerList();
      if(this.config.data.nAcid != null){
        this.patientForm.get('nAcid').setValue(this.config.data.nAcid);
      }
    }, 10);

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
get m(){
  return this.customerForm.controls;
}
get f(){
  return this.patientForm.controls;
}
handleInput(event: any) {
  var charCode = event.which ? event.which : event.keyCode;
  console.log(charCode);
  if (
    (charCode >= 48 && charCode <= 57)
  ) {
    return true;
  }
  event.preventDefault();
  return false;
}
get formArray() {
  return <FormArray>this.patientForm.get("addresses") as FormArray;
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
customerList(){

  this.servicesService.CustomerList(this.branchDataId).subscribe((res:any) =>{
    if(res){
      this.CustomerList = res.data ;
      console.log(this.CustomerList);

    }
  })
}
addCustomer(){

this.config.data.header = "Add Customer"
this.newCustomer = true


}
saveCustomer(){
  if(this.customerForm.valid){
  this.servicesService.addLedger(this.customerForm.value).subscribe((res) => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer add successfuly' });
    this.newCustomer = false
  this.customerList();
  }, (error) => {

  });

}
}

  selectDiagnosis(event, selectItem:Dropdown){

  }
  onSubmitPatient(){
    if(this.patientForm.invalid){
      return
    }else{
      console.log(this.patientForm.value)
      this.addPatient(this.patientForm.value)
    }
  }
  addPatient(data){
    this.servicesService.addPatient(data).subscribe((res:any) => {
          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient add successfuly' });
            this.ref.close('Close');
          }
      }, (error) => {

    });
  }
  addDiagnosis(){

  }

}
