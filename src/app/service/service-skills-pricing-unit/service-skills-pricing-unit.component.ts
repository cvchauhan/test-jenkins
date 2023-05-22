import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceDesignService } from '../service-design.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-service-skills-pricing-unit',
  templateUrl: './service-skills-pricing-unit.component.html',
  styleUrls: ['./service-skills-pricing-unit.component.css']
})
export class ServiceSkillsPricingUnitComponent implements OnInit {

  formGroup:FormGroup;
  unitData:any[] = [];
  currentUnitid:number;
  isEdit:boolean = false;
   // pagingnation
   first = 0;
   rows = 10;
   sTableList: any[];

  constructor(private fb:FormBuilder,private serviceDesign: ServiceDesignService,private messageService: MessageService, private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this.reactForm();
    this.getComboF();
  }

  getComboF() {
   // let tmpData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
   this.unitData = [];
   this.serviceDesign.getCategoryData().subscribe((res)=>{

    let tmpData = res['data'];
    tmpData.forEach((element) => {
     
       this.unitData.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"], "nHr": element['hr'] });
     
   });
   },(err)=>{
   
   });
  
    
  }

  reactForm(){
    this.formGroup=this.fb.group({
      cCodeName:new FormControl('',[Validators.required]),
      nHr:new FormControl('',[Validators.required]),
    })
  }
  get formControl(){
    return this.formGroup['controls']
  }

 
  editUnitDataF(data){
    this.isEdit = true;
  
    this.currentUnitid = data['serialNo'];
    this.formGroup.patchValue({
      "cCodeName":data['name'],
      "nHr":data['hr']
    });

  }

  onSubmit(){
    let formvalue = this.formGroup.value;
    let branchID = localStorage.getItem('branchId');
    let userID = localStorage.getItem('loginId');

    let formData = {};
    
    formData['nCtgId'] = 4;
    formData['cCodeName'] = formvalue['cCodeName'];
    formData['nHr'] = formvalue['nHr'];
    formData['description'] = "";
    formData['nParentSerialNo'] = null;
    formData['nAdmin'] = true;
    formData['nBranchId'] = branchID;
    formData['nUserid'] = userID;
    if(this.isEdit){
      
      formData['nSerialNo'] = this.currentUnitid;
      this.serviceDesign.updateUnitData(formData).subscribe(
        res => {
          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
            this.getComboF();
            this.formGroup.reset();
          }
          if (res['status'] == 204) {
            console.log('Error')
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          }
        }
      )
    }else{
      this.serviceDesign.codeMaster(formData).subscribe(
        res => {
          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
            this.getComboF();
            this.formGroup.reset();
          }
          if (res['status'] == 204) {
            console.log('Error')
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          }
        }
      )
    }
    

   

  }

  delUnitDataF(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceDesign.deleteUnit(id).subscribe(
          res => {
           
            if (res['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.getComboF();
            }
            if (res['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Deleted Successfully' });
            }
          }
        );
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });
  };

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

}
