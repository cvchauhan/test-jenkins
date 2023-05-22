import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { ServiceDesignService } from '../service-design.service';

@Component({
  selector: 'app-service-skills-pricing',
  templateUrl: './service-skills-pricing.component.html',
  styleUrls: ['./service-skills-pricing.component.css']
})
export class ServiceSkillsPricingComponent implements OnInit {
  products = [
    { name: 'Gitanjli' },
  ];
  usersId:any;
  editByIdRes: any;
  editCancelButton: boolean = false;
  sParrentNoRes: any;
  displayBasic: boolean;
  catgId: any;
  unitId: any;
  public serviceCategores: any[] = [];
  serviceSkilPricePopupForm: FormGroup;
  public currentAddData: string = "";
  globalcategId: any;
  public categoryName: string = "Service Skills";

  minimumDate = new Date();
  searchBoxVal: string = "";
  invalidDates: Array<Date>;
  searchData: any;
  searchAll: any;
  defaultDate = new Date();
  position: string;
  getData: any;
  tableData:any[] = [];
  branchData: any;
  serviceData: any;
  sSkills: any[] = [];
  priceUnit: any[] = [];
  public pUnit: boolean = false;
  public skills: boolean = false;
  public labelForPopup: string = "";
  formsGroup: FormGroup;
  tData: any;
  sTableList: any[];
  response: any;
  editSPrice: boolean = false;
  categoriesData: any[] = [];
  constructor(private fb: FormBuilder,
    private getService: ServiceDesignService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeService : EmployeeService
  ) { };
  ngOnInit(): void {
    //this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    this.employeeService.getctgData(15).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.getComboF();
      console.log(this.categoriesData);
     })
   
    this.saveSpricingF();
    this.getBranchLocationF();
    this.getServicePDataF();
    this.getServiceF();
    this.getTableListF();
    this.comboPopupFormF();
   
  };

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayBasic = false;
  }

  public currentCatLabel: string = "";
  getParentCatName(catId) {
    //let categoryId = catId.toFixed(1);
    let catData = JSON.parse(localStorage.getItem('categoryData'));
    for (let i = 0; i < catData.length; i++) {
      if (catData[i]['nCtgID'] == catId) {
        // console.log('matched');
        this.currentCatLabel = catData[i]['cParentCategory']
        // this.currentCatLabel = this.categoriesData[i]['parentCategoryName'];
        // break;
      }
    };
    //console.log(categoryId);
  };

  servSkillData:any[] = [];
  globalServId;
  serviceChange(evt){
   // console.log(evt);
   this.tData = [];
   let tmpArr:any[] = [];
    let serviceId = +evt['value']['val'];
    this.globalServId = serviceId;
    this.getTableListF(this.globalServId,null,null);
    this.tableData.forEach((elem,ind)=>{
      if(elem['nSrvid'] == serviceId){
        tmpArr.push(elem);
      }
    });
    this.tData = tmpArr;
    this.servSkillData = tmpArr;

  }

  serviceSkillChange(evt){

    let tmpArr:any[] = [];
    let serviceSkillId = +evt['value']['serialNo'];
  //  console.log(serviceSkillId);
    this.getTableListF(this.globalServId,null,serviceSkillId);
    // this.servSkillData.forEach((elem,ind)=>{
    //   if(elem['nSrvSkillid'] == serviceSkillId){
    //     tmpArr.push(elem);
    //   }
    // });
    // this.tData = tmpArr;
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
  saveSpricingF() {
    this.formsGroup = this.fb.group({
      nUnit: new FormControl('', [Validators.required]),
      dDoe: new FormControl('', [Validators.required]),
      nSrvid: new FormControl('', [Validators.required]),
      nSrvSkillid: new FormControl('', [Validators.required]),
      cBranchid: new FormControl('', [Validators.required]),
      nRate: new FormControl('', [Validators.required]),
      nSrvrid: new FormControl(this.usersId)
    });
  };

  get formControls() {
    return this.formsGroup['controls'];
  };
  resetServicePoint() {
    this.formsGroup.reset();
    this.editSPrice = false;
    this.editCancelButton = false;
  };

  //  branch location dropdown
  getBranchLocationF() {
    const empID = localStorage.getItem('empID');
    this.getService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        // console.log('This is Branch location',this.branchData)
      }
    );
  };

  // service dropdown
  getServiceF() {
    this.getService.getServiceData().subscribe(
      res => {
        this.serviceData = res['data'].filter((elem)=>elem.srvCtg != "INTERNAL SERVICE");
        //console.log('this is service dropdown', this.serviceData);
      }
    );
  };
  // Service Skills Data
  getServicePDataF() {
    // this.getService.getData().subscribe(
    //   res=>{
    //     this.getData=res['data'];
    //     console.log('This is service data',this.getData);
    //     this.getData.forEach((element)=>{
    //      if(element["categoryName"] == "Service Skills"){
    //       this.catgId=element['ctgID'];
    //        this.sSkills.push({"name":element['codeName'], "serialNo":element['serialNo'], "code":element["codeID"],'ctgID':element['ctgID'], "category":element["categoryName"]});
    //      }
    //      if(element["categoryName"] == "Skills Price Unit"){
    //       this.unitId=element['ctgID'];
    //       this.priceUnit.push({"name":element['codeName'], "serialNo":element['serialNo'], "code":element["codeID"],'ctgID':element['ctgID'], "category":element["categoryName"]});
    //     }
    //    });
    //    this.skills=true;
    //    this.pUnit=true;
    //   }
    // )
  };

  getComboF() {
    this.categoriesData.forEach((element) => {
      
      if (element["categoryName"] == "Service Skills") {
        this.catgId = element['ctgID'];
        this.sSkills.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
      //  console.log('this is service skills', this.sSkills);
      }
    });
      this.employeeService.getctgData(4).subscribe((res:any)=>{
        let categoriesData = res.data
       categoriesData.forEach((element, ind) => {
          if (element["categoryName"] == "Skills Price Unit") {
            this.unitId = element['ctgID'];
            this.priceUnit.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
        //console.log('this is price unit', this.priceUnit);
          }
         
        });
       })
     
      this.pUnit = true;
      this.skills = true;

    
  };


  // Table data

  getTableListF(servId?,srvPointId?,servSkillId?) {
    let serviceId = servId? servId : null;
    let servicePointId  = srvPointId ? srvPointId : null;
    let serviceSkillId = servSkillId ? servSkillId : null;

    this.getService.getTable(serviceId,servicePointId,serviceSkillId,false).subscribe(
      res => {
        this.tableData = res['data'];
        this.tData = res['data'];
        //console.log('price', this.tData);
      }
    );
  };
  // pagingnation
  first = 0;
  rows = 10;
  next() {
    this.first = this.first + this.rows;
  };

  prev() {
    this.first = this.first - this.rows;
  };

  reset() {
    this.first = 0;
  };
  isLastPage(): boolean {
    return this.sTableList ? this.first === (this.sTableList.length - this.rows) : true;
  };

  isFirstPage(): boolean {
    return this.sTableList ? this.first === 0 : true;
  };
  // End Pagingnation

  // post data
  submitServiceSkillsPriceF(form) {
    let userId = localStorage.getItem("loginId");
    this.usersId =userId;
    console.log(form.value);
    const formValues = this.formsGroup.value;
   // formValues['nSrvrid']=this.usersId;
   // console.log('this is user Id',formValues);
    let formData = {};
    let branchValues: any[] = [];
    if (this.editSPrice === true) {
      formValues['cBranchid'].forEach((element) => {
        branchValues.push(element['val']);
      });
     // console.log(formData);
      formData['nSrvSkillid'] = formValues['nSrvSkillid']['serialNo'];
      formData['dDoe'] = this.formatDate(formValues['dDoe']);
      formData['nUnit'] = formValues['nUnit']['serialNo'];
      formData['nRate'] = formValues['nRate'];
      formData['nSrvid'] = formValues['nSrvid']['val'];
      // formData['cBranchid'] = formValues['cBranchid']['val'];
      formData['cBranchid'] = branchValues.toString();
      formData['nSrvrid'] = formValues['nSrvrid'];
      this.getService.editSkillsPrice(formData).subscribe(
        res => {
          this.response = res;
          console.log(res);
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successfull' });
            this.formsGroup.reset();
            this.editCancelButton = false;
            this.editSPrice = false;
            this.getTableListF();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Update' });
          }
          if (this.response['status'] == 400) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong' });
          }
        }
      );
    }
    else {
      formValues['cBranchid'].forEach((element) => {
        branchValues.push(element['val']);
      });
      formData['nSrvSkillid'] = formValues['nSrvSkillid']['serialNo'];
      formData['dDoe'] = this.formatDate(formValues['dDoe']);
      formData['nUnit'] = formValues['nUnit']['serialNo'];
      formData['nRate'] = formValues['nRate'];
      formData['nSrvid'] = formValues['nSrvid']['val'];
      // formData['cBranchid'] = formValues['cBranchid']['val'];
      formData['cBranchid'] = branchValues.toString();
      console.log(formData['dDoe']);
      this.getService.postData(formData).subscribe(
        res => {
          this.response = res;
          console.log(res);
          console.log(formData);
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
            this.formsGroup.reset();
            this.getTableListF();
            console.log('price', this.tData);
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Service Code Already Available' });
          }
          if (this.response['status'] == 400) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong' });
          }
        }
      );
    }
  }
  // editService(service:any){
  //   this.editCancelButton=true;
  //   console.log(service,'this is service id data')
  //   const nservice = this.ServiceData.filter(e => e.val == service['nSrvid'])
  //   // const sBranch = this.branchData.filter(e => e.txt == service['branchName']);
  //   const unit = this.priceUnit.filter(e=>e.serialNo == service['nUnit']);
  //   const serviceSkills = this.sSkills.filter(e => e.name == service['srvSkill']);
  //   // console.log(this.ServiceData.filter(e =>e.txt == service['nSrvid']));
  //   const branchValue =[];
  //   const bBranch = service['branchName'].split(",");
  //   bBranch.forEach(element=>{
  //     this.branchData.forEach((el,ind)=>{
  //       if (element == el['txt']){
  //         branchValue.push(el);
  //       }
  //     });
  //   });
  //   this.editSPrice=true
  //   this.formsGroup.patchValue({
  //     nSrvrid:service['nSrvrid'],
  //     nSrvid: nservice['0'],
  //     dDoe:new Date(service['dDoe']),
  //     nRate: service['nRate'],
  //     nUnit: unit['0'],
  //     cBranchid:branchValue,
  //     nSrvSkillid:serviceSkills['0']
  //   });
  // }

  editServiceSkillsPriceF(service) {
  //  console.log(service)
    this.editCancelButton = true;
    this.getService.editSpriceById(service).subscribe(
      res => {
        this.editByIdRes = res['data'];
        const nservice = this.serviceData.filter(e => e.val == this.editByIdRes['nSrvid']);
        // const sBranch = this.branchData.filter(e => e.txt == service['branchName']);
        const unit = this.priceUnit.filter(e => e.serialNo == this.editByIdRes['nUnit']);
        const serviceSkills = this.sSkills.filter(e => e.name == this.editByIdRes['srvSkill']);
        // console.log(this.ServiceData.filter(e =>e.txt == service['nSrvid']));
        const branchValue = [];
        const bBranch = this.editByIdRes['branchName'].split(",");
        bBranch.forEach(element => {
          this.branchData.forEach((el, ind) => {
            if (element == el['txt']) {
              branchValue.push(el);
            }
          });
        });
        this.editSPrice = true;
        this.formsGroup.patchValue({
          nSrvrid: this.editByIdRes['nSrvrid'],
          nSrvid: nservice['0'],
          dDoe: new Date(this.editByIdRes['dDoe']),
          nRate: this.editByIdRes['nRate'],
          nUnit: unit['0'],
          cBranchid: branchValue,
          nSrvSkillid: serviceSkills['0']
        });
      }
    );
  };


  // delete table data
  delServiceSkillPriceF(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.getService.deleteData(id).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.getTableListF();
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
  // filter Table Data
  serviceSkillsPriceFilterF() {
    console.log(this.searchBoxVal);
    if(this.searchBoxVal.length >= 3){
      this.getService.filterSkillsPrice(this.searchBoxVal).subscribe(
        res => {
          this.searchData = res['data'];
          this.tData = res['data'];
          this.searchAll = this.searchData;
          // if(this.tData.length==0){
          //   // message: 'No Data Found';
          //   setTimeout(()=>{
          //     this.getTableData(), 18000
          //   })
          // }
        }
      )
    } else {
      this.getTableListF();
    }
  }

  showParentDropdown: boolean = true;

  showComboDialog(popupType: string) {
    this.currentAddData = popupType;
    // this.globalcategId = catgId;
    console.log(popupType);
    switch (popupType) {
      case "Service Skills":
        this.globalcategId = 15;
        this.categoryName = "Service Skills";
        this.showParentDropdown = true;
        break;
      case "Skills Price Unit":
        this.categoryName = "Skills Price Unit";
        this.currentCatLabel = "Price Unit";
        this.globalcategId = 4;
        this.showParentDropdown = false;
        break;
      // default:
      //   this.categoryName = "Service Skills";
      //   break;
    }
    this.getParentCatName(this.globalcategId);
    this.displayBasic = true;
  }
  // End Popup On service
  comboPopupFormF() {
    this.serviceSkilPricePopupForm = this.fb.group({
      // nCtgId: new FormControl(this.catgId),
      cCodeName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      nParentSerialNo: new FormControl(''),
      // nAdmin: new FormControl(''),
      // cBranchId: new FormControl(''),
      nUserid: new FormControl('this.usersId')
    });
  };
  get contorlForm() {
    return this.serviceSkilPricePopupForm['controls'];
  };
  submitComboPopupF(form: any) {
    // let userId = localStorage.getItem("loginId");
    // this.usersId =userId;
    const formValues = this.serviceSkilPricePopupForm.value;
    formValues['nUserid']=this.usersId;
    let formData = {};
    console.log(form.value);
    formData['nCtgId'] = this.globalcategId;
    formData['cCodeName'] = formValues['cCodeName'];
    formData['description'] = formValues['description'];
    formData['nParentSerialNo'] = formValues['nParentSerialNo']['val'];
    formData['nAdmin'] = formValues['nAdmin'];
    formData['cBranchId'] = formValues['cBranchId'];
    formData['nUserid'] = formValues['nUserid'];
    this.getService.codeMaster(formData).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
          this.serviceCategores.push({ "name": this.response['data']['cCodeName'], "serialNo": this.response['data']['nSerialNo'], "description": this.response['data']["description"], 'ctgID': this.response['data']['nCtgID'], 'codeID': this.response['data']['nCodeID'], 'categoryName': this.response['data']['cCategory'] });
          this.sSkills.push({ "name": this.response['data']['cCodeName'], "serialNo": this.response['data']['nSerialNo'], "description": this.response['data']["description"], 'ctgID': this.response['data']['nCtgID'], 'codeID': this.response['data']['nCodeID'], 'categoryName': this.response['data']['cCategory'] });
          this.priceUnit.push({ "name": this.response['data']['cCodeName'], "serialNo": this.response['data']['nSerialNo'], "description": this.response['data']["description"], 'ctgID': this.response['data']['nCtgID'], 'codeID': this.response['data']['nCodeID'], 'categoryName': this.response['data']['cCategory'] });
          // console.log(this.serviceCategores);
          console.log(this.sSkills);
          this.serviceSkilPricePopupForm.reset();
          // this.serviceCategores.push(this.response['data']);
        }
        else if (this.response['status'] == 204) {
          this.messageService.add({ severity: 'error', summary: 'OOPS', detail: `This ${this.categoryName} Name already available` });
          this.serviceSkilPricePopupForm.reset();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'OOPS', detail: 'Something went wrong' });
        }
      }
    );
  };

  sParrentNoF() {
    let parentId = this.globalcategId;
    // console.log(id, 'this is parentid');
    if (parentId) {
      this.getService.parentId(parentId).subscribe(
        res => {
          this.sParrentNoRes = res['data'];
          console.log(this.sParrentNoRes);
        }
      );
    }
    else {
      this.sParrentNoRes = null;
    }
  };
}


