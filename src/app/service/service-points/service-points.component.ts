import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { element } from 'protractor';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { ServiceDesignService } from '../service-design.service';

@Component({
  selector: 'app-service-points',
  templateUrl: './service-points.component.html',
  styleUrls: ['./service-points.component.css']
})
export class ServicePointsComponent implements OnInit {
  servicePointFormGroup: FormGroup;
  comboFormGroup: FormGroup;
  products = [
    { name: 'Gitanjli' },
  ];
  usersId:any;
  editRes: any;
  editCancelButton = false;
  public serviceCategores: any[] = [];
  sParrentNoRes: any;
  catgId: any;
  displayBasic: boolean;
  globalcategId: any;
  searchBox: string = "";
  response: any;
  equipmentOptions: SelectItem[];
  selectedScopes: any[];
  selectedOptions: any;
  selectOptions: SelectItem[];
  equipData: any;
  serviceData: any;
  public skills: boolean = false;
  getData: any;
  public sSkills: any[] = [];
  tData: any;
  sTableList: any[];
  editButton: boolean = false;
  categoriesData: any[] = [];
  searchBoxVal: string = "";
  searchData: any;
  searchAll: any;
  constructor(private fb: FormBuilder,
    private service: ServiceDesignService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private employeeService : EmployeeService
  ) { };

  ngOnInit(): void {
   // this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
   this.employeeService.getctgData(15).subscribe((res:any)=>{
    this.categoriesData = res.data
   })
  
    this.getServiceSkillsF();
    this.servicePointFormGroupF();
    this.getEquipmentF();
    this.getServiceF();
    this.getServicePDataF();
    this.tableListF();
    this.comboPopupFormF();
   
  };

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayBasic = false;
  }

  servicePointFormGroupF() {
    this.servicePointFormGroup = this.fb.group({
      nSrvid: new FormControl('', [Validators.required]),
      cSrvPointNm: new FormControl('', [Validators.required]),
      cSrvSkill: new FormControl('', [Validators.required]),
      cItems: new FormControl(''),
      nSrvPointid: new FormControl(this.usersId)
    });
  };

  get formControls() {
    return this.servicePointFormGroup['controls'];
  };

  // Equipment dropdown Data
  getEquipmentF() {
    this.service.getEquipment().subscribe(
      res => {
        // console.log('this is Equipment',res);
        this.equipData = res['data'];
      }
    );
  };

  // service dropdown
  getServiceF() {
    this.service.getServiceData().subscribe(
      res => {
        this.serviceData = res['data'];
        console.log('this is service dropdown', this.serviceData);
      }
    );
  };
  // service Skills dropdown
  // Service Skills Data
  getServicePDataF() {
    // this.service.getData().subscribe(
    //   res=>{
    //     this.getData=res['data'];
    //     console.log('This is service data',this.getData);
    //     this.getData.forEach((element)=>{
    //      if(element["categoryName"] == "Service Skills"){
    //       this.catgId=element['ctgID'];
    //        this.sSkills.push({"name":element['codeName'], "serialNo": element['serialNo'], "code":element["codeID"],'ctgID':element['ctgID'], "category":element["categoryName"]});
    //        console.log(this.sSkills);
    //      } 
    //    });
    //   //  this.skills = true;
    //   }
    // );
  };

  getServiceSkillsF() {
    this.categoriesData.forEach((element) => {
      if (element["categoryName"] == "Service Skills") {
        this.catgId = element['ctgID'];
        this.sSkills.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
        // console.log(this.sSkills);
      }
    });
  };

  tableListF() {
    this.service.spoint().subscribe(
      res => {
        this.tData = res['data'];
        console.log('table data', this.tData);
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
  resetServicePoint() {
    this.servicePointFormGroup.reset();
    this.editButton = false;
    this.isEdit = false;
    
    this.editCancelButton = false;
  }
  // Submit Data
  isEdit = false;
  srvPointId;

  submitServicePointF(form: any) {
    let equipmentValue: any[] = [];
    let serviceSkillsValue: any[] = [];
    const formValues = this.servicePointFormGroup.value;
    let userId = localStorage.getItem("loginId");
    this.usersId =userId;
    if(this.isEdit){
      formValues['nSrvPointid']=this.srvPointId;
    }
    
    let formData = {};
    if (this.editButton === true) {
      const formValues = this.servicePointFormGroup.value;
      let formData = {};
      if(formValues['cItems']){
        formValues['cItems'].forEach(element => {
          equipmentValue.push(element['val']);
        });
      }
   
      formValues['cSrvSkill'].forEach(element => {
        serviceSkillsValue.push(element['serialNo']);
      });
      formData['nSrvid'] = formValues['nSrvid']['val'];
      formData['cSrvPointNm'] = formValues['cSrvPointNm'];
      formData['cItems'] = equipmentValue.toString();
      formData['cSrvSkill'] = serviceSkillsValue.toString();
      formData['nSrvPointid'] = formValues['nSrvPointid'];
      // let cItems = [];
      // formValues['cItems'].forEach(element => {
      //   if(element.hasOwnProperty('val')){
      //     cItems.push(element.val);
      //   }
      // });
      //  formData['cItems'] = cItems.toString();
      //  let cSrvSkill = [];
      //  formValues['cSrvSkill'].forEach(element =>{
      //    if(element.hasOwnProperty('serialNo')){
      //      cSrvSkill.push(element.serialNo)
      //    }
      //  })
      //  formData['cSrvSkill'] = cSrvSkill.toString()
      this.service.editSPoint(formData).subscribe(
        res => {
          this.response = res;
          console.log('this is edit point value', res);
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successful' });
            this.servicePointFormGroup.reset();
            this.editButton = false;
            this.tableListF();
            this.editCancelButton = false;
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Update' });
          }
        }
      );
    }
    else {
      if(formValues['cItems']){
        formValues['cItems'].forEach(element => {
          equipmentValue.push(element['val']);
        });
      }
    
      formValues['cSrvSkill'].forEach(element => {
        serviceSkillsValue.push(element['serialNo']);
      });
      formData['nSrvid'] = formValues['nSrvid']['val'];
      formData['cSrvPointNm'] = formValues['cSrvPointNm'];
      formData['cItems'] = equipmentValue.toString();
      formData['cSrvSkill'] = serviceSkillsValue.toString();
      // formData['cSrvSkill'] = formValues['cSrvSkill'][0]['serialNo'];
      // formData['cItems'] = formValues['cItems'][0]['val'];

      this.service.addSpoint(formData).subscribe(
        res => {
          this.response = res;
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
            this.tableListF();
            this.servicePointFormGroup.reset();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added' });
          }
        }
      );
    }
  };

  // Edit Data
  // editSpoint(sPoint:any){
  //   this.editCancelButton=true;
  //   // const sCategory = this.serviceCategores.filter(e => e.name == service['cSrvCategory']);
  //   const equipmentValue =[];
  //   const equipment = sPoint['items'].split(",");
  //   equipment.forEach(element=>{
  //     this.equipData.forEach((el,ind)=>{
  //       if (element == el['txt']){
  //         equipmentValue.push(el);
  //       }
  //     });
  //   });
  //   const serviceSkillValue = [];
  //   const serviceSkills = sPoint['srvSkill'].split(",");
  //   serviceSkills.forEach(element=>{
  //     this.sSkills.forEach((ele, el)=>{
  //       if(element==ele['name']){
  //       serviceSkillValue.push(ele);
  //       }
  //     })
  //   })
  //   const service = this.serviceData.filter(e =>e.txt == sPoint['cSrvName']);
  //   // this.reactForm.get("nSrvid").patchValue(service[0]);
  //   this.editButton=true
  //   this.reactForm.patchValue({
  //     // cItems:equipment['0'],
  //     cItems:equipmentValue,
  //     cSrvPointNm:sPoint['cSrvPointNm'],
  //     cSrvSkill:serviceSkillValue,
  //     nSrvid:service[0],
  //     nSrvPointid:sPoint['nSrvPointid']
  //   });
  // }


  editServicePointF(sPoint) {
    this.isEdit = true;
    this.srvPointId = sPoint;
    this.editCancelButton = true;
    this.editButton = true;
    this.service.editSpointById(sPoint).subscribe(
      res => {
        this.editRes = res['data'];
        const equipmentValue = [];
        const equipment = this.editRes['items'].split(",");
        equipment.forEach(element => {
          this.equipData.forEach((el, ind) => {
            if (element == el['txt']) {
              equipmentValue.push(el);
            }
          });
        });
        const serviceSkillValue = [];
        const serviceSkills = this.editRes['srvSkill'].split(",");
        serviceSkills.forEach(element => {
          this.sSkills.forEach((ele, el) => {
            if (element == ele['name']) {
              serviceSkillValue.push(ele);
            }
          })
        })
        const service = this.serviceData.filter(e => e.txt == this.editRes['cSrvName']);
        // // this.reactForm.get("nSrvid").patchValue(service[0]);
        this.servicePointFormGroup.patchValue({
          cItems: equipmentValue,
          // cItems: equipmentValue,
          cSrvPointNm: this.editRes['cSrvPointNm'],
          cSrvSkill: serviceSkillValue,
          nSrvid: service[0],
          nSrvPointid: this.editRes['nSrvPointid']
        });
      }
    );
  };

  //  For Delete table
  position: string
  delServicePointF(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteSPoint(id).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.tableListF();
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
  servicePointFilter() {
    this.service.filterServiePoint(this.searchBox).subscribe(
      res => {
        this.response = res['data'];
        this.tData = this.response;
        console.log(this.searchBox);
        console.log(this.tData);
      }
    );
  };

  showComboDialog(catgId: any) {
    this.globalcategId = catgId;
    // console.log(catgId)
    this.displayBasic = true;
  }

  sParrentNoF(id: number) {
    // let evt =id
    console.log(id, 'this is parentid');
    if (id) {
      this.service.parentId(id).subscribe(
        res => {
          this.sParrentNoRes = res['data'];
          console.log(this.sParrentNoRes);
        }
      )
    }
    else {
      this.sParrentNoRes = null;
    }
  };

  comboPopupFormF() {
    this.comboFormGroup = this.fb.group({
      // nCtgId: new FormControl(this.catgId),
      cCodeName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      nParentSerialNo: new FormControl(''),
      // nAdmin: new FormControl(''),
      // nBranchId: new FormControl(''),
      nUserid: new FormControl(this.usersId)
    });
  };
  get contorlForm() {
    return this.comboFormGroup['controls'];
  };

  submitComboPopupF(form: any) {
    // let userId = localStorage.getItem("loginId");
    // this.usersId =userId;
    const formValues = this.comboFormGroup.value;
    formValues['nUserid']=this.usersId;
    let formData = {};
    console.log(form.value);
    formData['nCtgId'] = this.globalcategId;
    formData['cCodeName'] = formValues['cCodeName'];
    formData['description'] = formValues['description'];
    formData['nParentSerialNo'] = formValues['nParentSerialNo']['val'];
    formData['nAdmin'] = formValues['nAdmin'];
    formData['nBranchId'] = formValues['nBranchId'];
    formData['nUserid'] = formValues['nUserid'];
    this.service.codeMaster(formData).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
          this.serviceCategores.push({ "name": this.response['data']['cCodeName'], "serialNo": this.response['data']['nSerialNo'], "description": this.response['data']["description"], 'ctgID': this.response['data']['nCtgID'], 'codeID': this.response['data']['nCodeID'], 'categoryName': this.response['data']['cCategory'] });
          this.sSkills.push({ "name": this.response['data']['cCodeName'], "serialNo": this.response['data']['nSerialNo'], "description": this.response['data']["description"], 'ctgID': this.response['data']['nCtgID'], 'codeID': this.response['data']['nCodeID'], 'categoryName': this.response['data']['cCategory'] });
          console.log(this.serviceCategores);
          this.comboFormGroup.reset();
          // this.serviceCategores.push(this.response['data']);  
        }
        else if (this.response['status'] == 204) {
          this.messageService.add({ severity: 'error', summary: 'OOPS', detail: `This Service Skills Name Already Available` });
          this.comboFormGroup.reset();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'OOPS', detail: 'Something went wrong' });
        }
      }
    );
  };

  // filter Table Data
  servicePointFilterF() {
    console.log(this.searchBoxVal);
    if(this.searchBoxVal.length >= 3){
      this.service.filterServiePoint(this.searchBoxVal).subscribe(
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
      this.tableListF();
    }
  }
}
