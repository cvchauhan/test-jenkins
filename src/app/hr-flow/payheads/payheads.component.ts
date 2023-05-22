import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HrService } from '../hr.service';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ServicesService } from 'src/app/services/services.service';
import moment from 'moment';
import { Dropdown } from 'primeng/dropdown';
import { EmployeeService } from '../employee/employee.service';


@Component({
  selector: 'app-payheads',
  templateUrl: './payheads.component.html',
  styleUrls: ['./payheads.component.css']
})
export class PayheadsComponent implements OnInit {
  editResData: any;
  payHeadRes: any;
  payHeadType: any[] = [];
  payHeadId: any;
  editButton: boolean = false;
  payheadForms: FormGroup;
  public addDialog: boolean = false;
  tableData: any;
  position: string = "";
  response: any;
  filterData: any;
  categoriesData: any[] = [];
  search: string = '';
  public filteredGroups: any[];
  ledgerData:any[];
  selectedLedger:any;
  ledgerList:any = [];

  constructor(private fb: FormBuilder,
    private hrService: HrService,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: ServicesService,
    private employeeService: EmployeeService
  ) { }
  products = [
    { name: 'Gitanjli' },
  ]
  ngOnInit(): void {
    //this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    this.employeeService.getctgData(6).subscribe((res:any)=>{
      this.categoriesData = res.data
     })
   
    this.saveFormF();
    this.payTableListF();
   
    this.loadAccounts();
    this.getEmployeeBySrvSkills();
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.addDialog = false;
  }
  getEmployeeBySrvSkills() {
    const req = 22 ;
    const scheduleDate = moment().format('YYYY-MM-DD');
    this.service.getSkillIdData(req).subscribe((res:any) =>{
      console.log('skill id', res);
      const dataSelect = res.data[0];
      if(dataSelect){
        this.getLeaderCollection(dataSelect.nSerialNo, scheduleDate)
      }
    })
    
    
  }
  getLeaderCollection(srvSkillsId, scheduleDate){
    console.log(srvSkillsId, scheduleDate)
    this.service.getEmpBySrvSkill(srvSkillsId, scheduleDate).subscribe((res:any) => {
      this.ledgerList = res.data;
      console.log('Leader ', this.ledgerList)
    }, (error) => {
      console.log(error);
    });
  }



  selectLedger(event, leaderOption:Dropdown){
    console.log(event, leaderOption);
    const selectedOption = leaderOption.selectedOption;
    if(selectedOption){
      this.payheadForms.get('cNewLedger').setValue(selectedOption.empName);
    }
  }
  saveFormF() {
    this.payheadForms = this.fb.group({
      nHeadTypeid: new FormControl('', [Validators.required]),
      cPayHead: new FormControl('', [Validators.required]),
      cAccCode: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      cBrMap: new FormControl('Y'),
      nPayhid: new FormControl(''),
      cNewLedger: new FormControl('')
    });
  }
  get formControl() {
    return this.payheadForms['controls'];
  }

  addPayHeadF(form) {
    const formValues = this.payheadForms.value;
    const cBrMap = formValues['cBrMap'];
    const formData = {};
    if (this.editButton == true) {
      console.log(form.value);
      formData['nHeadTypeid'] = formValues['nHeadTypeid']['serialNo'];
      formData['cPayHead'] = formValues['cPayHead'];
      formData['cAccCode'] = formValues['cAccCode'];
      formData['cBrMap'] = formValues['cBrMap'];
      formData['nPayhid'] = formValues['nPayhid'];
      formData['cNewLedger'] = formValues['cNewLedger'];
      if (cBrMap) {
        formData['cBrMap'] = "y";
      }
      else {
        formData['cBrMap'] = "N";
      }
      this.hrService.editPayHead(formData).subscribe(
        res => {
          this.response = res;
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: this.response['message'], detail: 'Update Successfully' });
            this.editButton = false;
            this.payheadForms.reset();
            this.payTableListF();
          }
          else if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Update' });
          }
        }
      );
    }
    else {
      console.log(form.value);
      formData['nHeadTypeid'] = formValues['nHeadTypeid']['serialNo'];
      formData['cPayHead'] = formValues['cPayHead'];
      formData['cAccCode'] = formValues['cAccCode'];
      formData['cBrMap'] = formValues['cBrMap'];
      formData['cNewLedger'] = formValues['cNewLedger'];
      if (cBrMap) {
        formData['cBrMap'] = "y";
      }
      else {
        formData['cBrMap'] = "N";
      }
      this.hrService.addPayHead(formData).subscribe(
        res => {
          this.response = res;
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: this.response['message'], detail: 'Added Successfully' });
            this.payTableListF();
            this.payheadForms.reset();
          }
          else if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'OOPS Something Went Wromg' });
          }
        }
      );
    }
  }
  // edit payeheads

  // editPayHeadF(id:any){
  //   this.editButton=true;
  //   console.log(id);
  //   const payHeadType = this.payHeadType.filter(e=>e.name == id['headType'])
  //   this.payheadForms.patchValue({
  //     nPayhid:id['nPayhid'],
  //     nHeadTypeid:payHeadType[0],
  //     cPayHead:id['cPayHead'],
  //     cAccCode:id['cAccCode'],
  //     cBrMap:id['cBrMap']
  //   });
  // }
  editPayHeadF(id) {
    this.editButton = true;
    this.hrService.editPayHeadById(id).subscribe(
      res => {
        this.editResData = res['data'];
        console.log('data', this.editResData,);
        let payHeadType = null;
        let ledgerMap  = null;
        let branchWise = true;
        if(this.editResData){
          console.log;
          console.log(this.payHeadType, this.filteredGroups)
          payHeadType = this.payHeadType.find(e => e.serialNo == this.editResData['nHeadTypeid']);
          ledgerMap = this.ledgerList.find(e => e.nEmpId == this.editResData['cAccCode']);
          if(this.editResData['cBrMap']=='y'){
            branchWise = true;
          }
          else{
            branchWise = false;
          }
          this.payheadForms.patchValue({
            nPayhid: this.editResData['nPayhid'],
            nHeadTypeid: payHeadType,
            cPayHead: this.editResData['cPayHead'],
            cAccCode: ledgerMap.nEmpId,
            cBrMap: branchWise
          })
        }
        
        console.log(ledgerMap);
        
       
      }
    );
  }
  showDialog() {
    this.addDialog = true;
  }
  //  cancel or reset form
  resetPayheadF() {
    this.editButton = false;
    this.payheadForms.reset()
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
    return this.tableData ? this.first === (this.tableData.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.tableData ? this.first === 0 : true;
  }
  // End Pagingnation

  // payheads Table List
  payTableListF() {
    this.hrService.payTable().subscribe(
      res => {
        this.tableData = res['data'];
        console.log('this is table data', this.tableData);
      }
    );
  }
  // delete payheads table data

  // Delete Table Data
  deletePayHeadsF(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hrService.deletePay(id).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.payTableListF();
            }
            if (this.response['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Deleted Successfully' });
            }
          }
        )
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });
  }
  // Filter Table Data
  filterPayF() {
    this.hrService.searchPayHead(this.search).subscribe(
      res => {
        this.filterData = res['data'];
        console.log(this.filterData);
        this.tableData = this.filterData;
      }
    );
  }

  // get Pay Head Type Data
  getPayHeadTypeF() {
    this.categoriesData.forEach((element, ind) => {
      if (element["categoryName"] == "Pay Head Type") {
        this.payHeadId = element['ctgID'];
        this.payHeadType.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
        console.log('Pay Head Type',this.payHeadType)
      }
    });

    // this.hrService.getData().subscribe(
    //   res => {
    //     this.payHeadRes = res['data'];
    //     console.log(this.payHeadRes);
    //     this.payHeadRes.forEach((element) => {
    //       if (element["categoryName"] == "Pay Head Type") {
    //         this.payHeadId = element['ctgID'];
    //         this.payHeadType.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
    //         console.log('this is payHead type', this.payHeadType);
    //       }
    //     });
    //   }
    // )
  }

  loadAccounts(){
   let grpId= 15;
    this.hrService.getLedgerList(grpId).subscribe((res)=>{
      this.ledgerData = res['data'];
    },(err)=>{

    });
  }

  filterGroup(event) {
    let query = event.query;
    let filtered: any[] = [];
     for (let i = 0; i < this.ledgerData.length; i++) {
          let group = this.ledgerData[i];
          if (group.cDisplayNm.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(group);
          }
      }
      this.filteredGroups = filtered;
    }
}
