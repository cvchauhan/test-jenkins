import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem, PrimeNGConfig, MessageService } from "primeng/api";
import { CodeMasterService } from 'src/app/shared-services/code-master.service';
import { EmployeeService } from '../employee/employee.service';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-salary-structure',
  templateUrl: './salary-structure.component.html',
  styleUrls: ['./salary-structure.component.css']
})
export class SalaryStructureComponent implements OnInit {
  products = [
    { name: 'Gitanjli' }
  ]
  displayBasic: boolean;
  displaySalaryBasic: boolean;
  displaySalaryStructure: boolean;
  displayAllownce:boolean;
  salStructureForm:FormGroup;
  departMentCatId = 12;
  Options: any[];
  value1: string = "Gross salary";
  salStructureTable:any[] = [];

  selectedValue: string;
  // pagingnation
  first = 0;
  rows = 10;
  sTableList: any[];
  salaryBased: any[];
  salaryStatus: any[];
  dateValue: Date;
  calFrequency: any[];
  onAttendance: any[];
  calMethod: any[];
  departmentData: any[] = [];
  parentDesigData: any[] = [];
  values: string[];
  effectiveStartDate;
  nproducts = [
    { sid: 1, payhead_type: "Employee1", payhead: "HRA1", display_name: 'Sales-PA1', calculate_method: "Computed Value1" },
    { sid: 2, payhead_type: "Employee2", payhead: "HRA2", display_name: 'Sales-PA2', calculate_method: "Computed Value2" },
    { sid: 3, payhead_type: "Employee3", payhead: "HRA3", display_name: 'Sales-PA3', calculate_method: "Computed Value3" }
  ]


  constructor(
    private primeNGConfig: PrimeNGConfig, 
    private router : Router,
    private fb: FormBuilder, 
    private codeMasterService: CodeMasterService, 
    private hrService: HrService, 
    private messageService: MessageService,
    private empService:EmployeeService
    ) {
    this.Options = [{ label: 'Gross salary', value: 'Gross salary' }, { label: 'Basic Salary', value: 'Basic Salary' }];
    this.salaryBased = [];
    // this.salaryStatus = [
    //   { id: 1, 'name': "Active" },
    //   { id: 2, 'name': "Inactive" }
    // ];
    // this.calFrequency = [
    //   { id: 1, 'name': "Monthly" },
    //   { id: 2, 'name': "Quarterly"},
    //   { id: 3, 'name': "Yearly"}
    // ];
    // this.onAttendance = [
    //   { id: 1, 'name': "Yes" },
    //   { id: 2, 'name': "No"}
    // ];
    // this.calMethod = [
    //   { id: 1, 'name': "Computed Value" },
    //   { id: 2, 'name': "User Defined Value"},
    //   { id: 3, 'name': "Fixed Value"}
    // ];
  }

  ngOnInit(): void {
    this.initializeSalStructureForm();
    this.loadDepartmentData();
    this.loadPayHeadData();
    this.loadSalStructure();
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displaySalaryBasic = false;
    this.displaySalaryStructure = false;
    this.displayAllownce = false;
  }

  parentDesigF(departmentCatgId) {
    console.log(departmentCatgId);
    this.hrService.parentDesig(departmentCatgId).subscribe(
      res => {
        this.parentDesigData = res['data'];
        console.log('this is parrent designation', this.parentDesigData);
      }
    );
  }
  isEditButton:boolean = false;
  editSalId(salId,product){
    // console.log(product['cApplyDept'].split(","));
    let deptV = product['cApplyDept'].split(",");
    const deptVal = [];
    deptV.forEach(element => {
      this.departmentData.forEach((el, ind) => {
        if (element == el['serialNo']) {
          deptVal.push(el['serialNo']);
        }
      });
    });

    this.isEditButton = true;
    // let basedOn
    console.log(this.salaryBased)
    let basedOn = this.salaryBased.filter(
      (e) => e.nPayhid == product['nBasedOn']
    );

    console.log('data', this.salaryBased)

    this.salStructureForm.patchValue({
      "nSalid":product['nSalid'],
      "dEffectDt":new Date(product['dEffectDt']),
      "cSalStructure":product['cSalStructure'],
      "nBasedOn":basedOn[0],
      "cApplyDept":deptVal
    })
  }

  loadDepartmentData() {
    this.departmentData = [];
    this.codeMasterService.getCatData(this.departMentCatId, 0).subscribe((data) => {
      let tmpData = data['data'];
      tmpData.forEach((element) => {
        this.departmentData.push({ serialNo: element['serialNo'], codeID: element['codeID'], ctgID: element['ctgID'], categoryName: element['categoryName'], codeName: element['codeName'], parentSerialNo: element['parentSerialNo'], parentCodeName: element['parentCodeName']});
      });
    }, (error) => {
      console.log(error);
    });
    // this.categoriesData.forEach((element) => {
    //   if (element['categoryName'] == 'Department') {
    //     this.categoryId = element['ctgID'];
    //     this.departmentData.push({ serialNo: element['serialNo'], codeID: element['codeID'], ctgID: element['ctgID'], categoryName: element['categoryName'], codeName: element['codeName'], parentSerialNo: element['parentSerialNo'], parentCodeName: element['parentCodeName'] });
    //   }
    // });
  }
  initializeSalStructureForm(){
    this.salStructureForm = this.fb.group({
      nSalid:[0],
      dEffectDt: ['', [Validators.required]],
      cSalStructure: ['', [Validators.required]],
      nBasedOn: [''],
      cApplyDept: ['', [Validators.required]],
      cApplyDesig: [''],
      cDisplayNm: ['']

    });
  }

  onSelectDate(evt){

  }
  submitSalStr(salStrForm){
   // console.log(salStrForm);
    let salStructureFormValues = salStrForm.value;
    let tmpObj = {};
    tmpObj['dEffectDt'] = new Date(salStructureFormValues['dEffectDt']).toISOString();
    tmpObj['cSalStructure'] = salStructureFormValues['cSalStructure'];
    tmpObj['nBasedOn'] = salStructureFormValues['nBasedOn']['nPayhid'];
    tmpObj['cApplyDept'] = salStructureFormValues['cApplyDept'].toString();
    tmpObj['cApplyDesig'] = salStructureFormValues['cApplyDesig'];
    tmpObj['cDisplayNm'] = salStructureFormValues['cSalStructure'];
    tmpObj['nSalid'] = salStructureFormValues['nSalid'];
    this.hrService.addSalStructure(tmpObj).subscribe((res)=>{

      if (res['status'] == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Added Successfully',
        });
        this.loadSalStructure();
        this.salStructureForm.reset();
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Fail',
          detail: res['errorMessage'],
        });
      }
    },(err)=>{});
    //console.log(tmpObj);
  }
  loadPayHeadData(){
    this.empService.getSalaryStructure().subscribe((res) =>{
      console.log('Emp', res)
    })
    this.hrService.getBasedOn().subscribe((res)=>{
      console.log('res',res)
      this.salaryBased = res['data'];
    },(err)=>{});
  }
  showBasicDialog() {
    this.displayBasic = true;
  }

  showSalaryDialog() {
    this.displaySalaryBasic = true;
  }

  onItemChange(item) {
    console.log(item);
  }

  loadSalStructure(){
    this.hrService.getSalStructureList().subscribe((res:any)=>{
      if(res.data != null){
        this.salStructureTable = res.data
      }
      //this.salStructureTable = res['data'];
     // console.log(res);
    },(err)=>{});
  }

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

  salaryStructureDetail() {
    //this.displaySalaryStructure = true;
    this.router.navigate(['hr','salary-structure-details']);
  }
  computedAllowance(){
    this.displayAllownce = true;
  }

}
