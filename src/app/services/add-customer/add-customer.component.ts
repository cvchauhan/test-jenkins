import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit, OnDestroy, OnChanges{
  customerForm:FormGroup;
  branchDataId:any;
  userDataId:any;
  filteredGroups:any = [];
  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {
    //this.branchDataId = localStorage.getItem("branchId");
    const branchId  = localStorage.getItem('branchId');
    if(branchId){
      this.branchDataId = branchId;
    }
    this.userDataId = localStorage.getItem("empID");
  }
  id:any;
  mobileNumber:any = null;
  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges')
  }
  ngOnInit(): void {
    console.log(this.config.data.id);
    this.customerForm = this.fb.group({
      groupName:['CUSTOMERS'],
      nSchid:[18],
      cLedgerNm:[null, [Validators.required]],
      nBranchid:[this.branchDataId],
      cDisplayNm:[null],
      nUserid:[this.userDataId],
      nMobile:[null],
      addresses:this.fb.array([this.createItem()])
    });
    setTimeout(() => {
      this.getCustomerGroups();
    }, 10);
    this.customerForm.get('cLedgerNm').valueChanges.subscribe(res =>{
      if(res){
        this.customerForm.get('cDisplayNm').setValue(res)
      }
    });
    this.customerForm.get('nMobile').valueChanges.subscribe(res =>{
      if(res){
        // this.mobileNumber = res;
        this.formArray.at(0).get('cMobile').setValue(res)
      }
    })
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }
  onSubmitCustomer(){
    if(this.customerForm.invalid){
      // alert('Invalid')
      // console.log(this.customerForm.value)
      return
    }else{
      // console.log(this.customerForm.value);
      this.addCustomer(this.customerForm.value)
    }
  }
  addCustomer(data){
    this.servicesService.addLedger(data).subscribe((res) => {
      console.log(res)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer add successfuly' });
      this.ref.close('Close');
    }, (error) => {

    });
  }
  getCustomerGroups(){
    this.servicesService.getGroupLedger().subscribe((res:any) => {
      if(res){
        console.log(res)
        this.filteredGroups.push(...res.data);
      }
    });
  }
  selectGroup(event, custGroup:Dropdown){
    const selectedOption = custGroup.selectedOption;
    console.log(event, selectedOption)
  }
  createItem() {
    return this.fb.group({
      cLatLong: [''],
      cContactPerson: ['', [Validators.required]],
      cMobile: [null],
      cAddress1:['', [Validators.required]],
      cPin:[''],
      nState:[''],
      nDistrict:[''],
      nCity:['']
    })
  }
  get formArray() {
    return <FormArray>this.customerForm.get("addresses") as FormArray;
  }
  addItem() {
    this.formArray.push(this.createItem());
  }
  deleteItem(index: number) {
    this.formArray.removeAt(index);
  }
  getLatLong(event){
    let address = event.split(')');
    if(address[0] != ''){
      this.formArray.at(0).get('cLatLong').setValue(event)
    }else{
      this.formArray.at(0).get('cLatLong').setValue(null)
    }
    
  }
  

}
