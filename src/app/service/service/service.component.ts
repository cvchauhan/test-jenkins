import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceDesignService } from '../service-design.service';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  products = [{ name: 'Gitanjli' }];
  usersId: any;
  editServiceRes: any;
  comboFormGroup: FormGroup;
  sParrentNoRes: any;
  public currentAddData: string = '';
  public categoryName: string = 'Service Category';
  catgId: any;
  skillsId: any;
  globalcategId: any;
  filter: any;
  // invalidDates: Date;
  minimumDate = new Date();

  invalidDates: Array<Date>;

  msgs: Message[] = [];

  position: string;
  getData: any;
  branchData: any;
  sTableList: any[];
  serviceFormGroup: FormGroup;
  addService: any;
  submit = false;
  response: any;
  displayBasic: boolean;
  display: boolean;
  editServiceButton: boolean = false;
  eDateshow: boolean = false;
  editCancelButton: boolean = false;
  searchService: any;
  categoriesData: any[] = [];
  constructor(
    private fb: FormBuilder,
    private getService: ServiceDesignService,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeeService : EmployeeService
  ) {
    // this.defaultDate.setHours(10);
    // this.defaultDate.setMinutes(15)
  }

  ngOnInit(): void {
   // this.categoriesData = JSON.parse(localStorage.getItem('FILLCODEDATA'));
    
    this.getServiceCategoryComboF();
    this.getSkillsTypeComboF();
    this.serviceFormF();
    this.getbranchLocationF();
    this.tableListF();
    this.comboPopupFormF();
    this.primeNGConfig.ripple = true;
  }

  public sSkills: any[] = [];
  public serviceCategores: any[] = [];
  public sCategory: boolean = false;
  public skillsType: any[] = [];
  public skillsT: boolean = false;

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayBasic = false;
  }
  serviceFormF() {
    this.serviceFormGroup = this.fb.group({
      nSrvCtgid: new FormControl('', [Validators.required]),
      dStartDt: new FormControl('', [Validators.required]),
      srvCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(7),
      ]),
      cSrvName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]),
      cAppliedBr: new FormControl('', [Validators.required]),
      cSkillType: new FormControl('', [Validators.required]),
      nUserid: new FormControl(this.usersId),
      dEndDt: new FormControl(''),
      nSrvid: new FormControl(''),
    });
  }
  get formControl() {
    return this.serviceFormGroup.controls;
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    // return [day, month, year].join('-');
    return [year, month, day].join('-');
  }

  //  Service category & Mapping Skills Type
  getServiceCategoryComboF() {
    this.employeeService.getctgData(11).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element, ind) => {
      if (element['categoryName'] == 'Service Category') {
        this.catgId = element['ctgID'];
        this.serviceCategores.push({
          name: element['codeName'],
          code: element['serialNo'],
          category: element['categoryName'],
        });
        // console.log('service Category', this.serviceCategores);
      }
      // if (element["categoryName"] == "Skills Type") {
      //   this.skillsId = element['ctgID'];
      //   this.skillsType.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
      //   console.log('this is skiils type', this.skillsType);
      // }
    });
     })
   

    //  this.getService.getData().subscribe(
    //    res=>{
    //      this.getData=res['data'];
    //      console.log(this.getData);
    //      this.getData.forEach((element)=>{
    //       if(element["categoryName"] == "Service Category"){
    //         this.catgId=element['ctgID'];
    //         this.serviceCategores.push({"name":element['codeName'], "serialNo":element['serialNo'], "code":element["codeID"], 'ctgID':element['ctgID']});
    //         console.log('This is service serviceCategores data',this.serviceCategores);
    //       }
    //       if(element["categoryName"] == "Skills Type"){
    //         this.skillsId=element['ctgID'];
    //         this.skillsType.push({"name":element['codeName'], "serialNo":element['serialNo'], "code":element["codeID"],'ctgID':element['ctgID'], "category":element["categoryName"]});
    //         console.log('this is skiils type',this.skillsType);
    //       }
    //     });
    //     this.sCategory = true;
    //     this.skillsT =true;
    //    }
    //  )
  }

  //  Mapping Skills Type Data
  getSkillsTypeComboF() {
    this.employeeService.getctgData(5).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element, int) => {
        if (element['categoryName'] == 'Skills Type') {
          this.skillsId = element['ctgID'];
          this.skillsType.push({
            name: element['codeName'],
            serialNo: element['serialNo'],
            code: element['codeID'],
            ctgID: element['ctgID'],
            category: element['categoryName'],
          });
        }
        this.skillsT = true;
      });
     })
    
  }

  //  get Branch and Location
  getbranchLocationF() {
    const empID = localStorage.getItem('empID');
    this.getService.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
      console.log('This is Branch location', this.branchData);
    });
  }
  // table List
  tableListF() {
    this.getService.getServiceTable().subscribe((res) => {
      this.sTableList = res['data'];
      console.log('this is table data', this.sTableList);
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
    return this.sTableList
      ? this.first === this.sTableList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.sTableList ? this.first === 0 : true;
  }
  // End Pagingnation

  // EditService(service:any){
  //   this.editCancelButton=true;
  //   console.log('this is patch Data',service)
  //   console.log(this.skillsType);
  //   const sCategory = this.serviceCategores.filter(e => e.name == service['cSrvCategory']);
  //   const sBranch = this.branchData.filter(e => e.txt == service['appliedBr']);

  //   const popSkillsValues = [];
  //   const cSkillValues = service['skillType'].split(",");
  //   console.log(service);
  //   cSkillValues.forEach(ele=>{
  //     this.skillsType.forEach((el,ind)=>{
  //       if (ele==el['name']){
  //         popSkillsValues.push(el);
  //       }
  //     });
  //   });

  //   const branchValue =[];
  //   const bBranch = service['appliedBr'].split(",");
  //   bBranch.forEach(element=>{
  //     this.branchData.forEach((el,ind)=>{
  //       if (element == el['txt']){
  //         branchValue.push(el);
  //       }
  //     });
  //   });
  //   // this.serviceFormGroup.get("nSrvCtgid").patchValue(sCategory[0]);

  //   this.editServiceButton=true
  //   this.eDateshow=true
  //   this.serviceFormGroup.patchValue({
  //     nUserid:service['nUserid'],
  //     nSrvid:service['nSrvid'],
  //     cSrvName:service['cSrvName'],
  //     srvCode:service['srvCode'],
  //     cAppliedBr:branchValue,
  //     nSrvCtgid: sCategory[0],
  //     cSkillType:popSkillsValues,
  //     dStartDt:new Date(service['dStartDt'])
  //   })
  // };

  editServiceF(service: any) {
    this.editCancelButton = true;
    this.editServiceButton = true;
    this.eDateshow = true;
    this.getService.editServiceById(service).subscribe((res) => {
      this.editServiceRes = res['data'];
      console.log('edit', this.editServiceRes)
      console.log('this is patch Data', this.editServiceRes);
      console.log(this.skillsType);
      const sCategory = this.serviceCategores.filter(
        (e) => e.name == this.editServiceRes['cSrvCategory']
      );
      const sBranch = this.branchData.filter(
        (e) => e.txt == this.editServiceRes['appliedBr']
      );
      const popSkillsValues = [];
      const cSkillValues = this.editServiceRes['skillType'].split(',');
      console.log(service);
      cSkillValues.forEach((ele) => {
        this.skillsType.forEach((el, ind) => {
          if (ele == el['name']) {
            popSkillsValues.push(el);
          }
        });
      });

      const branchValue = [];
      const bBranch = this.editServiceRes['appliedBr'].split(',');
      bBranch.forEach((element) => {
        this.branchData.forEach((el, ind) => {
          if (element == el['txt']) {
            branchValue.push(el);
          }
        });
      });
      // this.serviceFormGroup.get("nSrvCtgid").patchValue(sCategory[0]);
      if(this.editServiceRes){
        this.serviceFormGroup.patchValue({
          nUserid: this.editServiceRes['nUserid'],
          nSrvid: this.editServiceRes['nSrvid'],
          cSrvName: this.editServiceRes['cSrvName'],
          srvCode: this.editServiceRes['srvCode'],
          cAppliedBr: branchValue,
          nSrvCtgid: sCategory[0],
          cSkillType: popSkillsValues,
          dStartDt: new Date(this.editServiceRes.dStartDt),
          dEndDt:this.editServiceRes.dEndDt != null ? new Date(this.editServiceRes.dEndDt) : null
        });
      }
      
    });
  }

  submitServiceF(form: any) {
    console.log('this is form value', form.value);
    const formValues = this.serviceFormGroup.value;
    let formData = {};
    let branchValues: any[] = [];
    let skillTypeValues: any[] = [];
    let userId = localStorage.getItem('loginId');
    this.usersId = userId;
    let nUserid = 1;
    if (this.editServiceButton === true) {
      formValues['cAppliedBr'].forEach((elem) => {
        branchValues.push(elem['val']);
      });
      formValues['cSkillType'].forEach((elem) => {
        skillTypeValues.push(elem['serialNo']);
      });
      formData['nSrvid'] = formValues['nSrvid'];
      formData['nSrvCtgid'] = formValues['nSrvCtgid']['code'];
      formData['dStartDt'] = this.formatDate(formValues['dStartDt']);
      formData['dEndDt'] = this.formatDate(formValues['dEndDt']);
      formData['srvCode'] = formValues['srvCode'];
      formData['cSrvName'] = formValues['cSrvName'];
      formData['cAppliedBr'] = branchValues.toString();
      formData['cSkillType'] = skillTypeValues.toString();
      formData['nUserid'] = this.usersId;
      // let cSkillType = [];
      // formValues['cSkillType'].forEach(element =>{
      //   if(element.hasOwnProperty('serialNo')){
      //     cSkillType.push(element.serialNo);
      //   }
      // });
      // formData['cSkillType'] = cSkillType.toString()
      this.getService.editService(formData).subscribe((res) => {
        this.response = res;
        console.log('this is edit response', res);
        if (this.response['status'] == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update Successfull',
          });
          this.serviceFormGroup.reset();
          this.eDateshow = false;
          this.editCancelButton = false;
          this.tableListF();
          this.editServiceButton = false;
        }
        if (this.response['status'] == 204) {
          console.log('oops not update');
          this.messageService.add({
            severity: 'error',
            summary: this.response.errorMessage,
            detail: 'Not Update',
          });
        }
      });
    } else {
      formValues['cAppliedBr'].forEach((elem) => {
        branchValues.push(elem['val']);
      });

      formValues['cSkillType'].forEach((elem) => {
        skillTypeValues.push(elem['serialNo']);
      });

      formData['nSrvCtgid'] = formValues['nSrvCtgid']['code'];
      formData['dStartDt'] = this.formatDate(formValues['dStartDt']);
      formData['srvCode'] = formValues['srvCode'];
      formData['cSrvName'] = formValues['cSrvName'];
      formData['cAppliedBr'] = branchValues.toString();
      formData['cSkillType'] = skillTypeValues.toString();
      formData['nUserid'] = this.usersId;
      console.log('start date',formData['dStartDt']);
      this.getService.serviceAdd(formData).subscribe((res) => {
        this.response = res;
        console.log('this is res', res);
        if (this.response['status'] == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success....',
            detail: 'Added Successfull...',
          });
          this.editCancelButton = false;
          this.serviceFormGroup.reset();
          this.tableListF();
        }
        if (this.response['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({
            severity: 'error',
            summary: this.response.errorMessage,
            detail: 'Not Added',
          });
        }
      });
    }
  }

  resetServiceF() {
    this.serviceFormGroup.reset();
    this.editCancelButton = false;
    this.editServiceButton = false;
    this.eDateshow = false;
  }
  // service Add Data

  // Edit Service
  editS() {
    this.editServiceButton = true;
  }
  // delete Service list data

  delServiceF(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.getService.deleteSeviceById(id).subscribe((res) => {
          this.response = res;
          console.log(res);
          if (this.response['status'] == 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Deleted Successfully',
            });
            this.tableListF();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({
              severity: 'error',
              summary: this.response.errorMessage,
              detail: 'Not Deleted Successfully',
            });
          }
        });
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You Have Canceled',
        });
      },
    });
  }
  // searchin & filtering Service
  // Popup On service
  showComboDialog(popupType: string, catgId: any) {
    this.currentAddData = popupType;
    this.globalcategId = catgId;
    // console.log(catgId)
    switch (popupType) {
      case 'Service Category':
        this.categoryName = 'Service Category';
        break;
      case 'Skills Type':
        this.categoryName = 'Skills Type';
        break;
      default:
        this.categoryName = 'Service Category';
        break;
    }
    this.displayBasic = true;
  }

  sParrentNoF(id: number) {
    // let evt =id
    //console.log(id, 'this is parentid');
    if (id) {
      this.getService.parentId(id).subscribe((res) => {
        this.sParrentNoRes = res['data'];
        //console.log(this.sParrentNoRes);
      });
    } else {
      this.sParrentNoRes = null;
    }
  }
  // End Popup On service
  comboPopupFormF() {
    this.comboFormGroup = this.fb.group({
      nCtgId: new FormControl(5),
      cCodeName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      nParentSerialNo: new FormControl(''),
      // nAdmin: new FormControl(''),
      // nBranchId: new FormControl(''),
      nUserid: new FormControl(this.usersId),
    });
  }
  get contorlForm() {
    return this.comboFormGroup['controls'];
  }
  // submit Popup data
  submitComboPopupF(form: any) {
    console.log(this.globalcategId);
    const formValues = this.comboFormGroup.value;
    let formData = {};
    //formData['nCtgId'] = this.globalcategId;
    formData['nCtgId'] = 5;
    formData['cCodeName'] = formValues['cCodeName'];
    formData['description'] = formValues['description'];
    formData['nParentSerialNo'] = formValues['nParentSerialNo']['val'];
    formData['nAdmin'] = formValues['nAdmin'];
    formData['nBranchId'] = formValues['nBranchId'];
    formData['nUserid'] = this.usersId;
    this.getService.codeMaster(formData).subscribe((res) => {
      this.response = res;
      console.log(this.response);
      if (this.response['status'] == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Added Successfull',
        });
        this.serviceCategores.push({
          name: this.response['data']['cCodeName'],
          serialNo: this.response['data']['nSerialNo'],
          description: this.response['data']['description'],
          ctgID: this.response['data']['nCtgID'],
          codeID: this.response['data']['nCodeID'],
          categoryName: this.response['data']['cCategory'],
        });
        this.skillsType.push({
          name: this.response['data']['cCodeName'],
          serialNo: this.response['data']['nSerialNo'],
          code: this.response['data']['nCodeID'],
          ctgID: this.response['data']['nCtgID'],
          category: this.response['data']['cCategory'],
        });
        console.log('skill type', this.skillsType);
        console.log(this.serviceCategores);
        this.comboFormGroup.reset();
        // this.serviceCategores.push(this.response['data']);
      } else if (this.response['status'] == 204) {
        this.messageService.add({
          severity: 'error',
          summary: 'OOPS',
          detail: `This ${this.categoryName} Name already available`,
        });
        this.comboFormGroup.reset();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'OOPS',
          detail: 'Something went wrong',
        });
      }
    });
  }
}
