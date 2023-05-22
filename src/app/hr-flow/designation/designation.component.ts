import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HrService } from '../hr.service';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  products = [
    { name: 'Gitanjli' },
  ];
  parrentdesingnationRes:any;
  desingByIdRes: any;
  departData:any;
  searchDesig: string = "";
  categoryId: any;
  departMentFormGroup: FormGroup;
  parentDesigData: any[] = [];
  categoriesData: any[] = [];
  departmentData: any[] = [];
  editButton: boolean = false;
  position: string;
  response: any;
  tableDta: any;
  departMentCatId = 12;
  designationForm: FormGroup;
  public departmentDialog: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private hrService: HrService,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private codeMasterService: CodeMasterService,
    private empService : EmployeeService
  ) { }

  ngOnInit(): void {
    //this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
   
    this.saveForm();
    this.desTableListF();
    this.loadDepartmentData();
    this.popupForm();
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.departmentDialog = false;
  }

  popupForm() {
    const userId = localStorage.getItem("empID");
    const branchId = localStorage.getItem("branchId");
    this.departMentFormGroup = this.formBuilder.group({
      nCtgId: new FormControl(this.departMentCatId),
      cCodeName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      nParentSerialNo: new FormControl(null),
      nAdmin: new FormControl(true),
      cBranchId: new FormControl(branchId),
      nUserid: new FormControl(userId)
    });
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
    return this.tableDta ? this.first === (this.tableDta.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.tableDta ? this.first === 0 : true;
  }
  // End Pagingnation

  // get dropdown Department Type Data
 loadDepartmentData() {
    this.departmentData = [];
    this.codeMasterService.getCatData(this.departMentCatId, 0).subscribe((data) => {
      let tmpData = data['data'];
      this.departData =tmpData;
      console.log(this.departData);
      tmpData.forEach((element) => {
        this.departmentData.push({ serialNo: element['serialNo'], codeID: element['codeID'], ctgID: element['ctgID'], categoryName: element['categoryName'], codeName: element['codeName'], parentSerialNo: element['parentSerialNo'], parentCodeName: element['parentCodeName']});
      });
       console.log('Department',this.departmentData)
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
  parentDesigF(event, catId?) {
    let departmentCatgId;
    let parentDesingData;
    if(event){
      departmentCatgId = event.value['serialNo'];
    }else{
      departmentCatgId = catId;
      let parentDesingnation = this.desingByIdRes['nParentid'];
      // console.log(this.parrentCategoryRes);
      parentDesingData = this.departData.filter(el=>el['serialNo'] == parentDesingnation);
    }
    // let departmentCatgId = event.value['serialNo'];
    this.hrService.parentDesig(departmentCatgId).subscribe(
      res => {
        this.parentDesigData = res['data'];
        console.log('this is parrent designation', this.parentDesigData);
        if(!event){
          let parentDesingObj = {"val":parentDesingData[0]['serialNo'].toString(),"txt":parentDesingData[0]['codeName']};
         // console.log(tmpObj);
         // console.log(parentData[0]);
          this.designationForm.patchValue({
            nParentid:parentDesingObj
          });
        }
      }
    );
  }

  // Parrent Designation
  editDesigF(desigId) {
    this.editButton = true;
    this.hrService.editDesingById(desigId).subscribe(
      res => {
        this.desingByIdRes = res['data'];
        console.log(desigId);
        this.parentDesigF(undefined, this.desingByIdRes['nDeptid']);
        const parentId = this.parentDesigData.filter(e => e.txt == this.desingByIdRes['parentDesignation']);
        // console.log('paredesig',parentId)
        const department = this.departmentData.filter(e => e.codeName == this.desingByIdRes['department']);
        this.designationForm.patchValue({
          cDesignation: this.desingByIdRes['cDesignation'],
          nDeptid: department[0],
          nParentid: parentId[0],
          nDesgid: this.desingByIdRes['nDesgid']
        });
      }

    );
  }


  saveForm() {
    this.designationForm = this.formBuilder.group({
      nDeptid: new FormControl('', [Validators.required]),
      //  rank: new FormControl('',[Validators.required]),
      cDesignation: new FormControl('', [Validators.required]),
      nParentid: new FormControl(''),
      nDesgid: new FormControl('')
    });
  }

  get formControl() {
    return this.designationForm['controls'];
  }

  get deptForm() {
    return this.departMentFormGroup['controls'];
  }

  //  onChangeParentDesignation(){
  //   let parentDesingnation = this.designationForm.get('nParentid').value;
  //   console.log('parent desingnation',parentDesingnation)
  //   if(parentDesingnation>=1){
  //     this.designationForm.get('nParentid').setValidators([Validators.required]);
  //     this.designationForm.get('nParentid').updateValueAndValidity();
  //     console.log(this.parentDesigData)
  //   }

  //   else{
  //     this.designationForm.get('nParentid').clearValidators();
  //     this.designationForm.get('nParentid').updateValueAndValidity();
  //   }

  //  }


  submitPopupF(form: any) {
    this.departmentData = [];
    const formValues = this.departMentFormGroup.value;
    this.codeMasterService.codeMaster(formValues).subscribe(
      res => {
        this.response = res;
        if (this.response['status'] == 200) {
          this.departmentDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
          this.departMentFormGroup.reset();

        }
        else if (this.response['status'] == 204) {
          this.departmentDialog = false;
          this.messageService.add({ severity: 'error', summary: 'OOPS', detail: `Department Name already available`});
          this.departMentFormGroup.reset();
        }
        else {
          this.departmentDialog = false;
          this.messageService.add({ severity: 'error', summary: 'OOPS', detail: 'Something went wrong'});
        }

        this.loadDepartmentData();
      }
    );
  }

  deptDialogF() {
    //this.popupForm();
    this.departmentDialog = true;
  }
  // Table list data
  desTableListF() {
    this.hrService.desigList().subscribe(
      res => {
        this.tableDta = res['data'];
        console.log('this is designation table data', this.tableDta);
      }
    );
  }

  //  Filter & Search Table data
  filterDesigF() {
    this.hrService.searchDesig(this.searchDesig).subscribe(
      res => {
        this.response = res['data'];
        this.tableDta = this.response;
      }
    );
  }
  //  save designation
  saveDesigF(form) {
    let formsValue = this.designationForm.value;
    let formData = {};
    if (this.editButton === true) {
      formData['nDeptid'] = formsValue['nDeptid']['serialNo'];
      formData['cDesignation'] = formsValue['cDesignation'];
      formData['nParentid'] = formsValue['nParentid']['val'];
      formData['nDesgid'] = formsValue['nDesgid'];
      console.log(formData)
      this.hrService.editDesignation(formData).subscribe(
        res => {
          this.response = res;
          console.log('this is add designation response', this.response);
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Added Successfull' });
            this.designationForm.reset();
            this.editButton = false;
            this.desTableListF();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added' });
          }
        }
      );
    }
    else {
      formData['nDeptid'] = formsValue['nDeptid']['serialNo'];
      formData['cDesignation'] = formsValue['cDesignation'];
      formData['nParentid'] = formsValue['nParentid']['val'];
      this.hrService.addDesig(formData).subscribe(
        res => {
          this.response = res;
          console.log('this is add designation response', this.response);
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Added Successfull' });
            this.designationForm.reset();
            this.desTableListF();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added' });
          }
        }
      );
    }
  }
  // Edit designation patch Data
  // editDesigF(desigId:any){
  //   console.log(desigId)
  //   this.editButton=true;
  //   const parentId = this.parentDesigData.filter(e =>e.txt == desigId['parentDesignation']);
  //   // console.log('paredesig',parentId)
  //   const department=this.departmentData.filter(e=> e.codeName == desigId['department'])
  //   this.designationForm.patchValue({
  //     cDesignation:desigId['cDesignation'],
  //     nDeptid:department[0],
  //     nParentid:parentId[0],
  //     nDesgid:desigId['nDesgid']
  //   })
  // }

  // cancel or reset designation form
  resetDesingnationF() {
    this.designationForm.reset();
    this.editButton = false;
  }
  // Delete Table Data
  deleteDesingTableF(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hrService.deletTableList(id).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.desTableListF();
            }
            if (this.response['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Deleted Successfully' });
            }
          }
        );
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });
  }

}
