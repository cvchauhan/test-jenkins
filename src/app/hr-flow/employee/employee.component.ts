import { Component, Input, OnChanges, OnInit, HostListener, AfterViewInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { nameValidator } from './name.validatior'

import { EmpSharedService } from 'src/app/shared-services/emp-shared.service';
import { AccessInfoComponent } from './access-info/access-info.component';
import { KycComponent } from './kyc/kyc.component';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft'
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [MessageService, AccessInfoComponent, KycComponent],
})

export class EmployeeComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('codeNamePopUp') codeNamePopUp: ElementRef;
  //@ViewChild('acesschild') acesschild:AccessInfoComponent;
  @ViewChild(AccessInfoComponent) acesschild;
  @ViewChild(KycComponent) kycchild;
  public index = 0;
  isEmptabValid: boolean = false;
  subscription: Subscription;
  public categoriesData: any[] = [];
  public currentAddData: string = "";
  public parentType: string = "State";
  public districtCatId = 9;
  public tehSilCatId = 10;
  public villageCatId = 14;
  public isTabUpdated: boolean = false;


  public typesOfStateData: any[] = [
    { "name": 'district', "code": 1, "category": 'District' },
    { "name": 'city', "code": 2, "category": 'City' },
    { "name": 'village', "code": 3, "category": 'Village' }
  ];

  public typesOfRelationsData: any[] = [
    { "name": 'S/O', "code": 1 },
    { "name": 'D/O', "code": 2 },
    { "name": 'W/O', "code": 3 }
  ];

  public parentData: any[] = [


  ];
  public districtWithoutParent: any = [];
  public cityWithoutParent: any = [];
  public states: any[] = [];
  public currentStates: any[] = [];
  public blocks: any[] = [];
  public currentBlocks: any[] = [];
  public villages: any[] = [];
  public currentVillages: any[] = [];

  public cities: any[] = [];
  public currentCities: any[] = [];

  public bloodGroups: any[] = [];
  public martialStatusD: any[] = [];
  public departmentsData: any[] = [];
  public religionsData: any[] = [];
  public firstTabData: any = {};
  public showSecondTab: boolean = false;
  public uploadedFiles: any[] = [];
  public stateData: any[] = [];
  public showStates: boolean = false;
  public showCities: boolean = false;
  public showBlocks: boolean = false;
  public showBloodGroups: boolean = false;
  public showVillages: boolean = false;
  public showMartialStatus: boolean = false;
  submitted = false;
  displayBasic: boolean;
  displayModal: boolean;
  isParentCategory: boolean = false;

  epsParentData: any[] = [];

  public jdate = new Date();
  public currentAddress;
  public pincodec;
  public disabledNomineeAdd: boolean = true;
  public selectedState;
  public currChecked: boolean = true;
  public selectedDist;
  public selectedCity;
  public selectedVill;
  public labelName: string = "Next";
  nomineeRelations: any[] = [];
  nomineeRelationCatId = 30;
  public filteredGroups: any[];
  permanentAddressGroup: FormGroup;

  @Input() isChanged: boolean = false;


  public mobilenoAlreadyError: boolean = false;
  public emailAlreadyError: boolean = false;
  public isEmailDisable: boolean = false;
  public isMobDisable: boolean = false;
  public relationDialog: boolean = false;
  @ViewChild('phone') phone: ElementRef;
  employeeInfoForm: FormGroup;
  public genderDropdown: any[] = [
    { "name": 'Male', "code": 'M' },
    { "name": 'Female', "code": 'F' },
    { "name": 'Other', "code": 'O' }
  ];
  public relationLabel: string = 'Father Name';
  public relationType: boolean = true
  constructor(private empSharedService: EmpSharedService, private employeeService: EmployeeService, private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, private codeMasterService: CodeMasterService) {
  }

  InitialForm() {
    this.employeeInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), nameValidator]],
      middleName: [''],
      relathinc: [''],
      lastName: [''],
      empCode: [0],
      nEmpid: [0],
      fatherName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), nameValidator]],
      motherName: [''],
      cNomineeName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), nameValidator]],
      CNomRelation: [''],
      nNomAge: [''],
      epsStartDate: [null],
      epsParent: [null],
      epsEndDate: [null],
      permanentAddressGroup: this.fb.group({
        permanentAddress: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]],
        state: ['', [Validators.required]],
        district: ['', [Validators.required]],
        city: ['', [Validators.required]],
        village: ['']
      }),
      currentAddressGroup: this.fb.group({
        currentAddress: ['', [Validators.required]],
        pincodec: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]],
        statec: ['', [Validators.required]],
        districtc: ['', [Validators.required]],
        cityc: ['', [Validators.required]],
        villagec: ['']
      }),
      dob: ['', [Validators.required]],
      mobile1: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      mobile2: [''],
      email: [''],  // [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
      bloodGroup: ['', [Validators.required]],
      maritialStatus: [''],
      religion: [''],
      gender: [''],
      jdate: ['', [Validators.required]],
      cRegNo: [''],
      valDate: ['']
    });
  }


  getAlltheDistricts() {
    this.employeeService.getctgData(9).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {

        if (elem["categoryName"] == "District") {

          this.districtWithoutParent.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"] });
        }
      });
    })





  }


  hide(el) {
    el.hide()
  }
  showSuccess(succ) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
  }

  showError(error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }

  addCatData(codenameVal) {

    let catId = this.currentCatId;
    let codeName = codenameVal;
    let parentSerialNo = this.parentSerNo;
    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");

    let tmpObj = { "nCtgId": catId, "cCodeName": codeName, "description": "", "nParentSerialNo": parentSerialNo, "nAdmin": true, "nBranchId": branchId, "nUserid": userId }

    this.employeeService.addCodeMaster(tmpObj).subscribe((data) => {
      // console.log("codemaster Data", data);

      if (data['status'] == 200) {
        this.showSuccess(data['message']);

        this.codeNamePopUp.nativeElement.value = "";
        // setTimeout(()=>{
        //   this.displayBasic = false;
        // },1000);

      } else {
        this.showError(data['errorMessage']);
      }

      this.employeeService.getCatData(this.currentCatId, this.parentSerNo).subscribe((data) => {
        let tmpData = data['data'];
        let tmpArr = [];
        tmpData.forEach(element => {
          let tmpObj = {};
          tmpObj["name"] = element['codeName'];
          tmpObj["code"] = element["serialNo"];
          tmpObj["category"] = element["categoryName"];
          tmpArr.push(tmpObj);
        });

        switch (this.currentCatId) {
          case 9:
            this.cities = tmpArr;
            break;

          case 10:
            if (this.parentSerNo == this.currentPermanentDistCode) {
              this.blocks = tmpArr;
            }

            break;
          case 14:
            this.villages = tmpArr;
            break;
          default:
            break;
        }
        if (this.currentCatId == 9) {
          this.cities = tmpArr;
        }
        console.log(data);
      }, (error) => {
        console.log(error);
      });
      this.displayBasic = false;
    })




  }
  getAllTheDepartments() {
    this.employeeService.getctgData(12).subscribe((res: any) => {      
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {
        if (elem["ctgID"] == 12) {
          this.departmentsData.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"] });
        }
      });
    })

    console.log(this.departmentsData);
  }
  getReligions() {
    this.employeeService.getctgData(23).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {
        if (elem["categoryName"] == "RELIGION") {
          this.religionsData.push({ "name": elem['codeName'], "code": elem["codeID"], "category": elem["categoryName"] });
        }
      });
    })


  }

  getAlltheCities() {
    this.employeeService.getctgData(10).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {
        if (elem["categoryName"] == "City") {
          this.cityWithoutParent.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"] });
        }
      });
    })



  } ''

  public selectedType: any;
  showBasicDialog(addType) {
    this.currentAddData = addType;
    switch (addType) {
      case "District":
        this.parentType = "State";
        this.selectedType = { "name": 'district', "code": 1, "category": 'District' };
        this.parentData = this.states;
        this.currentCatId = 9;

        break;
      case "Tehsil":
        this.parentType = "District";
        this.selectedType = { "name": 'city', "code": 2, "category": 'City' };
        this.parentData = this.cities;
        this.currentCatId = 10;
        break;
      case "Village":
        this.parentType = "Tehsil";
        this.selectedType = { "name": 'village', "code": 3, "category": 'Village' };
        this.parentData = this.blocks;
        this.currentCatId = 14;
        break;
      default:
        this.parentType = "State";
        this.selectedType = { "name": 'district', "code": 1, "category": 'District' };
        this.parentData = this.states;
        break;
    }

    console.log(this.parentType);
    this.displayBasic = true;


  }

  getParentSerialNo(evt) {
    this.parentSerNo = evt['value']['code'];
    //console.log(evt);
  }
  public currentCatId: any = 9;
  public parentSerNo: any;
  // public codeNamePopUp: string;
  getType(evt) {
    let typeVal = +evt.value.code;
    // console.log(typeVal);
    switch (typeVal) {
      case 1:
        this.parentType = "State";
        this.currentAddData = "District";
        this.currentCatId = 9;
        break;
      case 2:
        this.parentType = "District";
        this.currentAddData = "Tehsil";
        this.currentCatId = 10;
        this.getAlltheDistricts();
        this.parentData = this.districtWithoutParent;
        break;
      case 3:
        this.parentType = "Tehsil";
        this.currentAddData = "Village";
        this.currentCatId = 14;
        this.getAlltheCities();
        this.parentData = this.cityWithoutParent;
        break;
      default:
        this.currentAddData = "District";
        this.parentType = "State";
        break;
    }

    console.log(this.parentType);

  }


  ngOnInit(): void {
    this.InitialForm();
    this.loadNomineeRelationData();
    // this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));    
    this.getAllTheDepartments();
    this.getEpsDropdownData();
    this.loadCategoriesData();


  }
  ngAfterViewInit() {
  }

  ngOnChanges(): void {
    this.getEmpData();
  }

  ngAfterContentChecked() {
    // let EmpId = localStorage.getItem("EmpId");
    // let Addcount = localStorage.getItem("Addcount");
    // if (EmpId == null && Addcount == "1") {
    //   localStorage.removeItem("Addcount");
    //   localStorage.setItem("AddcountAgain", "1");
    //   this.InitialForm();
    //   this.loadNomineeRelationData();
    //   this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    //   this.getEpsDropdownData();
    //   this.loadCategoriesData();
    // }
    // else
    // {
    //   localStorage.setItem("AddcountAgain", "2");
    // }
  }




  onChangeRelation(evt) {
    console.log(evt.value['name']);
    if (evt.value['name'] == 'W/O') {
      this.relationLabel = 'Husband Name';
      this.relationType = false;
    } else {
      this.relationLabel = 'Father Name';
      this.relationType = true;
    }
  }

  parentEventHandlerFunction() {
    this.InitialForm();
    this.employeeInfoForm.patchValue({
    });
    this.loadNomineeRelationData();
    // this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));

    this.getEpsDropdownData();
    this.loadCategoriesData();
    // this.empSharedService.updateFormItem(this.firstTabData);
    this.acesschild.accessForm();
    this.kycchild.kyvForm();
  }
  addNomineeRelation(relationShipName) {
    let nomineeRelationCtgId = 30;
    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");
    let tmpObj = { "nCtgId": nomineeRelationCtgId, "cCodeName": relationShipName, "description": "", "nParentSerialNo": null, "nAdmin": true, "nBranchId": branchId, "nUserid": userId };
    this.codeMasterService.codeMaster(tmpObj).subscribe((res) => {
      if (res['status'] == 200) {
        this.showSuccess(res['message']);

        this.codeNamePopUp.nativeElement.value = "";
        // setTimeout(()=>{
        //   this.displayBasic = false;
        // },1000);

      } else {
        this.showError(res['errorMessage']);
      }


      this.codeMasterService.getCatData(nomineeRelationCtgId, 0).subscribe((data) => {
        let tmpData = data['data'];
        this.nomineeRelations = tmpData;


      }, (error) => {

      });
      this.relationDialog = false;

    }, (error) => { })
  }
  updateNomineeRelationButton(evt) {
    if (evt.target.value.length > 1) {
      this.disabledNomineeAdd = false;
    } else {
      this.disabledNomineeAdd = true;
    }
    // console.log(evt.target.value);
  }

  loadCategoriesData(): void {

    // console.log(this.categoriesData);
    // this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    this.employeeService.getctgData(8).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {

        if (elem["categoryName"] == "State") {

          this.states.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
        }
        this.currentStates = this.states;

      });
    })
    console.log(this.states);



    this.showStates = true;
    // console.log(this.states[0]);
    // let stateName = this.states[0]['name'];
    //this.getDistrictBasedOnState(stateName);
    this.getBloodGroups();
    this.getMartialStatusData();
    this.getReligions();
    this.getAllTheDepartments();
    this.getAlltheDistricts();
    console.log(this.departmentsData);


  }

  onStateChange(evt, typeOfData) {
    if (typeOfData == "permanent") {
      this.cities = [];
      this.blocks = [];
      this.villages = [];
    } else {
      this.currentCities = [];
      this.currentBlocks = [];
      this.currentVillages = [];

    }
    //console.log(evt);
    let stateName = evt['name'];

    this.getDistrictBasedOnState(stateName, typeOfData, 9, evt['code']);
  }

  onDistChange(evt, typeOfData) {
    if (typeOfData == "permanent") {
      this.cities = [];
      this.blocks = [];
      this.villages = [];
    } else {

      this.currentBlocks = [];
      this.currentVillages = [];
      this.getBlocksBasedOnDist(undefined, 'current', evt['name'], evt['code']);
    }
    //console.log(evt);
    // let stateName = evt['name'];


    // this.getBlocksBasedOnDist(stateName, typeOfData,9,evt['code']);
  }

  onBlockChange(evt, typeofBlock) {
    console.log(evt);
    let parentSn;
    let blockName;
    if (typeofBlock === 'autopermanent') {
      parentSn = evt['code'];
      blockName = evt['name'];
    }

    else {
      parentSn = evt.value ? evt.value['code'] : evt['code'];
      blockName = evt.value ? evt.value['name'] : evt['name'];
    }

    if (typeofBlock == "permanent") {
      this.villages = [];

    } else {
      this.currentVillages = [];
    }


    this.getVillageBasedOnBlock(blockName, typeofBlock, parentSn);
  }


  getDistrictBasedOnState(stateName, typeOfDist, ctgId?, parentSn?,) {
    this.employeeService.getctgData(9).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {        
        if (elem["categoryName"] == "District" && elem["parentCodeName"] == stateName) {
          if (typeOfDist == "permanent") {
            this.cities.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
          }
        }
      });
    })


    if (typeOfDist == "current") {
      this.codeMasterService.getCatData(this.districtCatId, parentSn).subscribe((res) => {
        let cityData = res['data'];

        if (cityData) {
          cityData.forEach((elem, ind) => {
            {
              this.currentCities.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
            }
          });
        }
      }, (error) => {

      });
    }

    if (!this.showCities) {
      this.showCities = true;
    }

  }

  currentPermanentDistCode: number;
  getBlocksBasedOnDist(evt, typeOfBlock, diName?, distCode?) {
    let parentSn;
    if (evt && typeOfBlock !== 'permanent') {
      parentSn = evt.value['code'];
      this.currentPermanentDistCode = parentSn;
    } else if (evt && typeOfBlock === 'permanent') {
      parentSn = evt['code'];
      this.currentPermanentDistCode = parentSn;
    } else {
      parentSn = distCode;
    }

    if (typeOfBlock == "permanent") {
      this.blocks = [];
      this.villages = [];
    } else {
      this.currentBlocks = [];
      this.currentVillages = [];
    }


    let distName;
    if (!evt) {
      distName = diName;
    } else if (typeOfBlock === 'permanent') {
      distName = evt.name;
    } else {
      distName = evt.value.name;
    }
    this.employeeService.getctgData(10).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {

        if (elem["categoryName"] == "City" && elem["parentCodeName"] == distName) {
          if (typeOfBlock == "permanent") {
            this.blocks.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
          }

          else {
            //this.currentBlocks.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID":elem['ctgID'] });
          }
        }
      });


    })


    // console.log(parentSn);


    if (typeOfBlock == "current") {
      this.codeMasterService.getCatData(this.tehSilCatId, parentSn).subscribe((res) => {

        let tehData = res['data'];
        if (tehData) {
          tehData.forEach((elem, ind) => {

            {
              this.currentBlocks.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
            }



          });
        }
        //this.currentBlocks = res['data'];
      }, (error) => {

      });
    }



    if (!this.showBlocks) {
      this.showBlocks = true;
    }

  }




  getVillageBasedOnBlock(blockName, typeOfVillage, parentSn?) {
    this.employeeService.getctgData(14).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {
        if (elem["categoryName"] == "Village" && elem["parentCodeName"] == blockName) {
          if (typeOfVillage == "permanent" || typeOfVillage == "autopermanent") {
            this.villages.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
          }

          else {
            this.currentVillages.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
          }
        }
      });

    })



    if (typeOfVillage == "current") {
      this.codeMasterService.getCatData(this.villageCatId, parentSn).subscribe((res) => {
        let villageData = res['data'];
        if (villageData != null) {
          villageData.forEach((elem, ind) => {
            {
              this.currentVillages.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID": elem['ctgID'] });
            }
          });
        }
        // this.currentBlocks = res['data'];
      }, (error) => {

      });
    }


    if (!this.showBlocks) {
      this.showBlocks = true;
    }

  }


  getState(event, typeOfState) {
    let categoryId = event.value['ctgID'];
    let parentSn = event.value['code'];

    if (typeOfState == "permanent") {
      this.cities = [];
      this.blocks = [];
      this.villages = [];

      let stateName = event.value['name'];
      this.getDistrictBasedOnState(stateName, "permanent", categoryId, parentSn);

    } else {

      // console.log(event);
      this.currentCities = [];
      this.currentBlocks = [];
      this.currentVillages = [];

      let stateName = event.value['name'];
      this.getDistrictBasedOnState(stateName, "current", categoryId, parentSn);

    }




  }

  getBloodGroups() {
    this.employeeService.getctgData(21).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {
        if (elem["categoryName"] == "BLOOD GROUP") {
          this.bloodGroups.push({ "name": elem['codeName'], "code": elem["codeID"], "category": elem["categoryName"] });
        }
      });
    })


    if (!this.showBloodGroups) {
      this.showBloodGroups = true;
    }
  }

  getMartialStatusData() {
    this.employeeService.getctgData(22).subscribe((res: any) => {
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {
        if (elem["categoryName"] == "MARITAL STATUS") {
          this.martialStatusD.push({ "name": elem['codeName'], "code": elem["codeID"], "category": elem["categoryName"] });
        }
      });
    })


    if (!this.showMartialStatus) {
      this.showMartialStatus = true;
    }
  }

  onBasicUploadAuto(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    // console.log("File upload successfully");

  }
  get f() {
    return this.employeeInfoForm['controls'];
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

  updateIndex(evt) {
    this.index = evt;
    console.log(evt);
  }

  getBirth(evt) {
    console.log(evt)
    const formValues = this.employeeInfoForm.value;
    let formData = {};
    formData['dBirthDt'] = this.formatDate(formValues['dob']);
    console.log(formData['dBirthDt'])
  }

  onNomineeRelationChange(evt) {
    console.log(evt);
  }

  public epsDateCheck: boolean = false;
  checkTwoDates(evt) {
    let epsDate = this.employeeInfoForm.value['epsStart'];
    if (epsDate <= evt) {
      this.epsDateCheck = true;
    } else {
      this.epsDateCheck = false;
    }
  }

  onSubmit() {
    const formValues = this.employeeInfoForm.value;
    //console.log(formValues);
    let formData = {};
    formData['cFirstNm'] = formValues['firstName'];
    formData['cMiddleNm'] = formValues['middleName'];
    formData['cLastNm'] = formValues['lastName'];
    formData['nEmpid'] = formValues['nEmpid'];
    formData['dJoinDate'] = this.formatDate(formValues['jdate']);
    formData['dBirthDt'] = this.formatDate(formValues['dob']);
    formData['cGender'] = formValues['gender'];
    formData['nEPSParentid'] = formValues['epsParent'] ? formValues['epsParent']['values'] : null;
    formData['dEPSStartDt'] = formValues['epsStartDate'] ? formValues['epsStartDate']['values'] : null;
    formData['dEPSEndDt'] = formValues['epsEndDate'] ? formValues['epsEndDate']['values'] : null;
    formData['cFatherName'] = formValues['fatherName'];
    formData['cMotherName'] = formValues['motherName'];
    formData['cAddressPer'] = formValues['permanentAddressGroup']['permanentAddress'] != undefined ? formValues['permanentAddressGroup']['permanentAddress'] : null;
    formData['nStatePer'] = formValues['permanentAddressGroup']['state'] != undefined ? formValues['permanentAddressGroup']['state']['code'] : null;
    formData['nDistrictPer'] = formValues['permanentAddressGroup']['district'] != undefined ? formValues['permanentAddressGroup']['district']['code'] : null;
    formData['nTehsilPer'] = formValues['permanentAddressGroup']['city'] != undefined ? formValues['permanentAddressGroup']['city']['code'] : null;
    formData['nVillagePer'] = formValues['permanentAddressGroup']['village'] != undefined ? formValues['permanentAddressGroup']['village']['code'] : null;
    formData['nPinPer'] = formValues['permanentAddressGroup'] != undefined ? formValues['permanentAddressGroup']['pincode'] : null;
    formData['cAddressCur'] = formValues['currentAddressGroup'] != undefined ? formValues['currentAddressGroup']['currentAddress'] : null;
    formData['nStateCur'] = formValues['currentAddressGroup']['statec'] != undefined ? formValues['currentAddressGroup']['statec']['code'] : null;
    formData['nDistrictCur'] = formValues['currentAddressGroup']['districtc'] != undefined ? formValues['currentAddressGroup']['districtc']['code'] : null;
    formData['nTehsilCur'] = formValues['currentAddressGroup']['cityc'] != undefined ? formValues['currentAddressGroup']['cityc']['code'] : null;
    formData['nVillageCur'] = formValues['currentAddressGroup']['villagec'] != undefined ? formValues['currentAddressGroup']['villagec']['code'] : null;
    formData['nPinCur'] = formValues['currentAddressGroup'] != undefined ? formValues['currentAddressGroup']['pincodec'] : null;
    formData['latLongCur'] = '12.00 25.20';
    formData['cMobile1'] = formValues['mobile1'] != undefined ? formValues['mobile1'] : null;
    formData['cMobile2'] = formValues['mobile2'] != undefined ? formValues['mobile2'] : null;
    formData['cEmail'] = formValues['email'] != undefined ? formValues['email'] : null;
    formData['cBloodGroup'] = formValues['bloodGroup'] != undefined ? formValues['bloodGroup']['name'] : null;
    formData['cMaritalStatus'] = formValues['maritialStatus'] != undefined ? formValues['maritialStatus']['name'] == "MARRIED" ? "M" : "S" : null;
    formData['cReligion'] = formValues['religion'] != undefined ? formValues['religion']['name'] : null;
    formData['cRelation'] = formValues['relathinc'] != undefined ? formValues['relathinc']['name'] : null;
    formData['nNomRelation'] = formValues['CNomRelation'] != undefined ? formValues['CNomRelation']['serialNo'] : null;
    formData['cNomineeName'] = formValues['cNomineeName'] != undefined ? formValues['cNomineeName'] : null;
    formData['nNomAge'] = formValues['nNomAge'] != undefined ? formValues['nNomAge'] : null;
    formData['dBirthDt'] = formValues['dob'] != undefined ? this.formatDate(formValues['dob']) : null;
    formData['cRegNo'] = formValues['cRegNo'] != undefined ? formValues['cRegNo'] : null;

    this.firstTabData = formData;
    this.empSharedService.updateFormItem(this.firstTabData);

    this.index = 2;
    console.log(this.index);
    console.log('info form data get data', formValues['permanentAddressGroup']['state']['code'])
    console.log('info form data set data', formData['nStatePer'])
    console.log('form complete data', formData)

    // formData['cPAN'] = formValues['pan'];
    // formData['cPFNumber'] = formValues['pfnumber'];
    // formData['cGratuity'] = formValues['gratuity'];
    // formData['nKYCid'] = '859632147';
    // formData['cKYC'] = 'C:\\fakepath\\Screenshot (57).png';
    // formData['cKYCImage'] = null;
    // formData['cPANImage'] = 'C:\\fakepath\\Screenshot (58).png';
    // formData['cPoliceVerifyImage'] = 'C:\\fakepath\\Screenshot (57).png';
    // formData['cPhoto'] = 'C:\\fakepath\\Screenshot (68).png';
    // formData['cSrvSkill'] = "";
    // formData['nBranchid'] = 1;
    // formData['cEmployType'] = "";
    // formData['nDepartment'] = 85;

    // formData['nRoleid'] = 0;
    // formData['cSalAcCode'] = "";
    // formData['dLeaveDate'] = "1900-01-01";
    // formData['cUserName'] = 'lavlesh';

    // formData['cPassword'] = "";
    // formData['cDeviceID'] = "";
    // formData['bStatus'] = true;
    // formData['cLoginStatus'] = 'N';

    // formData['nLoginUser'] = 1;
    // formData['userPerm'] = [{ "nMenuId": 3, "cPermission": "Q" }, { "nMenuId": 4, "cPermission": "N,E,D,Q" }, { "nMenuId": 5, "cPermission": "Q" }, { "nMenuId": 6, "cPermission": "N,E,D,Q" }, { "nMenuId": 7, "cPermission": "N,E,D,Q" }, { "nMenuId": 8, "cPermission": "N,E,D,Q" }];

    //console.log(formData);

    // for (let el in this.employeeInfoForm.controls) {
    //   if (this.employeeInfoForm.controls[el].errors) {
    //     console.log(el)
    //   }
    // }


    // this.submitted = true;
    // if (this.employeeInfoForm.invalid) {
    //   return false
    // }
    // //console.warn(this.employeeInfoForm.value);
    // this.employeeService.addEmployeeInfo(this.employeeInfoForm.value).subscribe((data) => {
    //   console.log("Employee Data", data)
    // })
  }



  // current address same as permanent address
  sameAddress(e) {
    console.log(e.target)
    // this.currentCities = this.cities;
    // this.currentBlocks = this.blocks;
    // this.currentVillages = this.villages;
    const formValues = this.employeeInfoForm.value;
    // let permanentAddressName = formValues['permanentAddressGroup']['permanentAddress'];
    // let permanentPin = formValues['permanentAddressGroup']['pincode'];
    // let permanentState = formValues['permanentAddressGroup']['state'];
    // let permanentDist = formValues['permanentAddressGroup']['district'];
    // let permanentCity = formValues['permanentAddressGroup']['city'];
    // let permanentVillage = formValues['permanentAddressGroup']['village'];
    // this.employeeInfoForm.patchValue({
    //   currentAddressGroup: {
    //     currentAddress: permanentAddressName,
    //     pincodec:permanentPin,
    //     statec: permanentState,
    //     districtc:permanentDist,
    //     cityc: permanentCity,
    //     villagec: permanentVillage
    //   },
    // });
    //let permanentAddressState = formValues[]
    console.log(formValues)
    if (e.target.checked) {
      this.currChecked = false;
      let permanentAddressName = formValues['permanentAddressGroup']['permanentAddress'];
      let permanentPin = formValues['permanentAddressGroup']['pincode'];
      let permanentState = formValues['permanentAddressGroup']['state'];
      let permanentDist = formValues['permanentAddressGroup']['district'];
      let permanentCity = formValues['permanentAddressGroup']['city'];
      let permanentVillage = formValues['permanentAddressGroup']['village'];
      this.employeeInfoForm.patchValue({
        currentAddressGroup: {
          currentAddress: permanentAddressName,
          pincodec: permanentPin,
          statec: permanentState,
          districtc: permanentDist,
          cityc: permanentCity,
          villagec: permanentVillage
        },
      });
    } else {
      this.currChecked = true;
      this.currentAddress = '';
      this.pincodec = '';
      this.selectedState = '';
      this.selectedDist = '';
      this.selectedCity = '';
      this.selectedVill = '';
    }
  }
  // openNext() {
  //   this.index = (this.index === 3) ? 0 : this.index + 1;
  //   if(this.index === 0){
  //     this.labelName = "Next";
  //   } else if(this.index === 1){
  //     this.labelName = "Next";
  //   } else {
  //     this.labelName = "Save";
  //   }
  // }

  getEmpData() {
    let empVal = this.empSharedService.empValues;

  }


  getEpsDropdownData() {

    this.codeMasterService.getEpsData().subscribe((data) => {
      let tmpData = data['data'];
      this.epsParentData = tmpData;
      // this.nomineeRelations = tmpData;

      // console.log(tmpData);
    }, (error) => {

    });
  }

  editedEmpData;
  getEmpDataU(evt) {    
    this.editedEmpData = evt;
    let mD = evt['cMaritalStatus'];
    let mName;
    console.log(this.states);
    if (mD == "M") {
      mName = "MARRIED";
    } else if (mD == "S") {
      mName = "SINGLE";
    } else {
      mName = "DIVORCEE";
    }
    const bloodGroup = this.bloodGroups.filter(e => e.name == evt['cBloodGroup'].trim());
    const relationOf = this.typesOfRelationsData.filter(e => e.name == evt['cRelation']);

    const nomineeRelationOf = this.nomineeRelations.filter(e => e.serialNo == evt['nNomRelation']);
    const religion = this.religionsData.filter(e => e.name == evt['cReligion']);
    const maritalSt = this.martialStatusD.filter(e => e.name == mName);
    const stateDP = this.states.filter(e => e.name == evt['statePer']);

    this.getDistrictBasedOnState(evt['statePer'], 'permanent', this.districtCatId, evt['nStatePer']);
    //this.getDistrictBasedOnState(evt['statePer'],'current',this.districtCatId, evt['nStatePer']);
    console.log(this.cities);


    this.getBlocksBasedOnDist(undefined, 'permanent', evt['districtPer'], evt['nDistrictPer']);
    this.getBlocksBasedOnDist(undefined, 'current', evt['districtPer'], evt['nDistrictCur']);
    this.getVillageBasedOnBlock(evt['tehsilPer'], 'permanent', evt['nTehsilPer']);
    this.getVillageBasedOnBlock(evt['tehsilCur'], 'current', evt['nTehsilCur']);


    this.getDistrictBasedOnState(evt['stateCur'], 'current', this.districtCatId, evt['nStateCur']);
    const stateDC = this.currentStates.filter(e => e.name == evt['stateCur']);
    let distDC;
    let tehDC;
    let villDC;
    let distDP;
    let villDP;
    let tehDP
    setTimeout(() => {

      distDC = this.currentCities.filter(e => e.name == evt['districtCur']);
      tehDC = this.currentBlocks.filter(e => e.name == evt['tehsilCur']);
      villDC = this.currentVillages.filter(e => e.name == evt['villageCur']);
      distDP = this.cities.filter(e => e.name == evt['districtPer']);
      villDP = this.villages.filter(e => e.name == evt['villagePer']);
      tehDP = this.blocks.filter(e => e.name == evt['tehsilPer']);


      this.employeeInfoForm.patchValue({
        currentAddressGroup: {
          districtc: distDC[0],
          cityc: tehDC[0],
          villagec: villDC[0]
        },
        permanentAddressGroup: {
          permanentAddress: evt['cAddressPer'],
          pincode: evt['nPinPer'],
          state: stateDP[0],
          district: distDP[0],
          city: tehDP[0],
          village: villDP[0]
        },
      });
    }, 3000);


    // this.getDistrictBasedOnState(evt['stateCur'],'current');

    // console.log(this.states);
    // console.log(stateDP[0]);

    this.employeeInfoForm.patchValue({
      firstName: evt['cFirstNm'],
      middleName: evt['cMiddleNm'],
      lastName: evt['cLastNm'],
      empCode: evt['cEmpcode'],
      nEmpid: evt['nEmpid'],
      fatherName: evt['cFatherName'],
      motherName: evt['cMotherName'],
      cNomineeName: evt['cNomineeName'],
      CNomRelation: nomineeRelationOf[0],
      nNomAge: evt['nNomAge'],
      mobile1: evt['cMobile1'],
      mobile2: evt['cMobile2'],
      email: evt['cEmail'],
      gender: evt['cGender'],
      bloodGroup: bloodGroup[0],
      maritialStatus: maritalSt[0],
      religion: religion[0],
      relathinc: relationOf[0],
      cRegNo: evt['cRegNo'],
      dob: new Date(evt['dBirthDt']),
      jdate: new Date(evt['dJoinDate']),

      currentAddressGroup: {
        currentAddress: evt['cAddressCur'],
        pincodec: evt['nPinCur'],
        statec: stateDC[0]
      },


    });
    // console.log(evt);
  }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {    
    if (event.key === KEY_CODE.RIGHT_ARROW && event.ctrlKey) {
      this.increment();
    }

    if (event.key === KEY_CODE.LEFT_ARROW && event.ctrlKey) {
      this.decrement();
    }
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.relationDialog = false;
    this.displayBasic = false;
  }



  updateTabData(evt) {
    this.index = 0;
    this.isTabUpdated = true;
  }
  checkNameVal(evt) {
    if (this.codeNamePopUp.nativeElement.value.length > 2 && this.parentSerNo) {
      this.isParentCategory = true;
    }
  }
  increment() {

    this.index++;
  }

  decrement() {
    this.index--;
  }

  checkMbNumber(event) {
    this.submitted = true;
    let mobileNo = event.target.value;

    this.isEmailDisable = true;
    if (mobileNo.length > 9) {
      this.employeeService.empInfoMob(mobileNo).subscribe(res => {
        let data = res['data'];
        if (res['status'] == 204) {
          this.mobilenoAlreadyError = true;
        } else {
          this.mobilenoAlreadyError = false;
        }
      });
    }
  }



  onKey(e: any) {
    const value = this.phone.nativeElement.value;
    if (e.which === 8) {
      return;
    }

    const len = value.length;
    // if (len === 4 || len === 8 || len === 12) {
    //   this.phone.nativeElement.value = value + ' ';
    // }

    if (len >= 10) {
      e.preventDefault();
    }
  }

  loadNomineeRelationData() {
    this.nomineeRelations = [];
    this.codeMasterService.getCatData(this.nomineeRelationCatId, 0).subscribe((data) => {
      let tmpData = data['data'];
      tmpData.forEach((element) => {
        this.nomineeRelations.push(element);
      });
      console.log(this.nomineeRelations);

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

  checkEmail(event) {
    this.isMobDisable = false;
    let email = event.target.value;
    console.log(email);
    if (email.length > 8) {
      this.employeeService.empInfoEmail(email).subscribe(res => {
        let data = res['data'];
        if (res['status'] == 204) {
          this.emailAlreadyError = true;
        } else {
          this.emailAlreadyError = false;
        }
      });
    }
  }
  addRelation() {
    this.relationDialog = true;
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  filterGroup(event, name, typeofaddress?) {
    let query = event.query;
    let filtered: any[] = [];

    if (name === 'states') {
      for (let i = 0; i < this.states.length; i++) {
        let group = this.states[i];
        if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(group);
        }
      }
    } else if (name === 'cities') {
      if (typeofaddress != 'current') {
        for (let i = 0; i < this.cities.length; i++) {
          let group = this.cities[i];
          if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(group);
          }
        }
      } else {

        for (let i = 0; i < this.currentCities.length; i++) {
          let group = this.currentCities[i];
          if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(group);
          }
        }
      }

    } else if (name === 'blocks') {
      if (typeofaddress != 'current') {
        for (let i = 0; i < this.blocks.length; i++) {
          let group = this.blocks[i];
          if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(group);
          }
        }
      } else {

        //  console.log(this.currentBlocks);
        for (let i = 0; i < this.currentBlocks.length; i++) {
          let group = this.currentBlocks[i];
          if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(group);
          }
        }
      }
    } else if (name === 'villages') {
      if (typeofaddress != 'current') {
        for (let i = 0; i < this.villages.length; i++) {
          let group = this.villages[i];
          if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(group);
          }
        }
      } else {
        for (let i = 0; i < this.currentVillages.length; i++) {
          let group = this.currentVillages[i];
          if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(group);
          }
        }
      }
    }
    this.filteredGroups = filtered;
    console.log(this.filteredGroups)
  }


}
