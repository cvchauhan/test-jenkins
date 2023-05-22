import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { MapCommonComponent } from 'src/app/map-common/map-common/map-common.component';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-manage-ledger',
  templateUrl: './manage-ledger.component.html',
  styleUrls: ['./manage-ledger.component.css'],
})
export class ManageLedgerComponent implements OnInit {
  @ViewChild(MapCommonComponent) mapchild;
  sendToChild: string = '';
  products = [{ name: 'Gitanjli' }];
  ledgerStatus = [
    { name: 'Running', val: 'R' },
    { name: 'Closed', val: 'C' },
  ];
  userId: any;
  editLedgerRes: any;
  formDate: any;
  statusDate: any;
  branchdata: any[] = [];
  editStatus: boolean = false;
  editButton: boolean = false;
  distName: any;
  bankDetail: any[] = [];
  bankCode: any;
  branchID = 1;
  popFormGroup: FormGroup;
  getBankDist: any;
  sBank: any[] = [];
  codeID: any;
  getData: any;
  underData: any;
  ledgerForm: FormGroup;
  searchData: any;
  searchBox: string = '';
  response: any;
  sTableList: any[];
  sPopupTableList: any[];
  contactData: any[] = [];

  displayPosition: boolean;
  position: string;
  public categoriesData: any[] = [];
  tableData: any;
  state: any;
  states: any[] = [];
  districtName: any[] = [];
  cityName: any[] = [];
  branchData: any;
  branchId: any;
  bankData: any;
  public filteredGroups: any[];
  latLong: string = "24.588465 73.702278";
  country: string = '';
  State: string = '';
  District: string = '';
  City: string = '';
  latitude: String = '';
  longitude: string = '';
  Address: string = '';
  constructor(
    private primengConfig: PrimeNGConfig,
    private accountService: AccountService,
    private fb: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private codeMasterService: CodeMasterService,
    private empService :EmployeeService
  ) { }

  ngOnInit(): void {
    this.tableDataF();
    this.underF();
    this.manageLedgerF();
    // this.getBranchF();
   // this.categoriesData = JSON.parse(localStorage.getItem('FILLCODEDATA'));
   
  this.loadStates();
    this.getBankPDataF();
    this.branchId = localStorage.getItem('branchId');
    console.log(localStorage.getItem('branchId'));
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.displayPosition = false;
    this.displayBasic = false;
  }

  // Get Branch data
  getBranchF() {
    const empID = localStorage.getItem('empID');
    this.accountService.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
    });
  }



  getLatLng(evt) {
    if (evt.includes(')')) {
      var splitted = evt.split(")");

      if (splitted[0] != "") {
        this.Address = splitted[0];
        var addresssplitted = splitted[0].split(",");
        if (addresssplitted.length > 0) {
        }
      }
      else {
        this.Address = splitted[0];
      }
      this.latitude = splitted[1];
      this.longitude = splitted[2];
    }
    this.ledgerForm.patchValue({
      cAddress1: this.Address,
      latitude: this.latitude,
      longitude: this.longitude
    })
    console.log(this.ledgerForm.value);
  }
  // get Contact State list
  loadStates(): void {
    // console.log(this.categoriesData);
    this.empService.getctgData(9).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((elem, ind) => {

        if (elem['categoryName'] == 'State') {
          this.states.push({
            name: elem['codeName'],
            code: elem['serialNo'],
            category: elem['categoryName'],
            parentCodeName: elem['parentCodeName'],
          });
        }
        // console.log('this is states', this.states);
      });
     })

    
  }

  // Get District based On State
  // getDistrictBasedOnState(stateName) {
  //   console.log('state', stateName);
  //   this.categoriesData.forEach((element) => {
  //     if (element["categoryName"] == "District" && element["parentCodeName"] == stateName) {
  //       this.districtName.push({ "name": element['codeName'], "code": element["serialNo"], "category": element["categoryName"], "parentCodeName": element["parentCodeName"] });
  //       console.log('district', this.districtName);
  //     }
  //   })
  // }
  // getDistrictData(event, catId?) {
  //   console.log(event['code']);
  //   console.log(catId)
  //   let stateName;
  //   let parentData;
  //   if (event) {
  //     stateName = event.value ? event.value['name'] : '';
  //     console.log(stateName)
  //   } else {
  //     stateName = event['code'];
  //     let dist = this.editLedgerRes.addresses[0]['nDistrict'];
  //     console.log(dist);
  //     parentData = this.categoriesData.filter(el => el['serialNo'] == dist);
  //     console.log(dist);
  //     console.log('parent category data', parentData);
  //   }
  //   // let stateName = event.value['name'];
  //   this.getDistrictBasedOnState(stateName);
  //   console.log('district name', this.getDistrictBasedOnState(stateName));
  //   if (!event) {
  //     let district;
  //     if(parentData[0]){
  //       district = { "code": parentData[0]['serialNo'].toString(), "name": parentData[0]['codeName'] };
  //     }

  //     console.log(district);
  //     console.log(parentData[0]);
  //     const dist = this.districtName.filter(e => e.name == this.editLedgerRes.addresses[0]['district']);

  //     this.ledgerForm.patchValue({

  //       nDistrict: dist[0]
  //     });
  //   }
  // };

  // Get City/Tehsil Based on District

  getCityBasedOnDistrict(distName) {
    this.empService.getctgData(10).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element) => {
        // if (element["categoryName"] == "City" && element["parentCategoryName"] == distName) {}
        if (
          element['categoryName'] == 'City' &&
          element['parentCodeName'] == distName
        ) {
          this.cityName.push({
            name: element['codeName'],
            code: element['serialNo'],
            category: element['categoryName'],
            parentCodeName: element['parentCodeName'],
          });
        }
      });
  
    })
   
  }

  getCityctData(event, catId?) {
    // console.log(event);
    // console.log(catId);
    let cityName;
    let cityData;
    if (event) {
      cityName = event.value['name'];
      // console.log(cityName);
    } else {
      cityName = catId;
      let dist = this.editLedgerRes.addresses[0]['nCity'];
      // console.log(dist);
      cityData = this.categoriesData.filter((el) => el['serialNo'] == dist);
      // console.log(dist);
      // console.log('parent category data', cityData);
    }
    // let stateName = event.value['name'];
    this.getCityBasedOnDistrict(cityName);
    // console.log('city name', this.getCityBasedOnDistrict(cityName));
    if (!event) {
      let district;
      // console.log(cityData);
      if (cityData && cityData.length > 0) {
        district = {
          code: cityData[0]['serialNo'].toString(),
          name: cityData[0]['codeName'],
        };
      }

      const city = this.cityName.filter(
        (e) => e.name == this.editLedgerRes.addresses[0]['city']
      );
      // console.log('city name', city);
      this.ledgerForm.patchValue({
        nCity: city[0],
      });
    }
  }

  displayBasic: boolean;
  bankPopup() {
    this.displayBasic = true;
  }

  addLedgerModel() {
    this.displayPosition = true;
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

  // pagingnation for popup
  firsts = 0;

  row = 3;
  nexts() {
    this.firsts = this.firsts + this.row;
  }

  isContactEdit: boolean = false;
  currentContactIndex = null;
  editContact(data, ind) {
    console.log(data);
    this.selectedAddressData = data;
    this.isContactEdit = true;
    this.currentContactIndex = ind;
    this.patchContactValue();
    // console.log(data);
  }
  prevs() {
    this.firsts = this.firsts - this.row;
  }

  resets() {
    this.firsts = 0;
  }
  isLastPages(): boolean {
    return this.sPopupTableList
      ? this.firsts === this.sPopupTableList.length - this.row
      : true;
  }

  isFirstPages(): boolean {
    return this.sPopupTableList ? this.firsts === 0 : true;
  }
  // End Pagingnation

  // Get Manage Ledger table Data
  tableDataF() {
    this.accountService.ledgerTable(this.branchID).subscribe((res) => {
      this.tableData = res['data'];
      // console.log(this.tableData);
    });
  }

  // Delete Table Data

  delLedgerDataF(id: any) {
    // console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteLedgerById(id).subscribe((res) => {
          this.response = res;
          // console.log(res);
          if (this.response['status'] == 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Deleted Successfully',
            });
            this.tableDataF();
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

  filterLedgerTableF() {
    if (this.searchBox.length >= 3) {
      let branchId = localStorage.getItem("branchId");
      this.accountService.filterLedgerData(this.searchBox, branchId).subscribe((res) => {
        this.searchData = res['data'];
        this.tableData = res['data'];
        // console.log(this.searchBox);
        // console.log(this.tableData);
        // this.searchAll=this.searchData;
      });
    } else {
      this.tableDataF();
    }
  }

  // get under dropdown Data
  underF() {
    this.accountService.ledgerUnder().subscribe((res) => {
      this.underData = res['data'];
      // console.log(this.underData);
    });
  }
  // get Bank dropdown Data

  getBankPDataF() {
    this.empService.getctgData(17).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element) => {
        if (element['categoryName'] == 'Bank') {
          this.codeID = element['codeID'];
          this.sBank.push({
            name: element['codeName'],
            serialNo: element['serialNo'],
            code: element['codeID'],
            ctgID: element['ctgID'],
            category: element['categoryName'],
          });
        }
      });;
     })
   
    // console.log('search bank data', this.sBank);
  }

  // get District dropdown Data
  bankDistrictF(codeId) {
    // console.log('This is Bank Id', codeId);
    let bankId = codeId.value.code;
    this.bankCode = bankId;
    this.accountService.getBankDistrict(bankId).subscribe((res) => {
      this.getBankDist = res['data'];
      // console.log(this.getBankDist);
    });
  }
  //  get IFSC Code
  ifscCodeSearchF(districtName) {
    let dist = districtName.value.txt;
    this.distName = dist;
    // console.log(districtName);
    this.accountService
      .getIfscCode(this.bankCode, this.distName)
      .subscribe((res) => {
        this.bankDetail = res['data'];
        // console.log('this is IFSC data', this.bankDetail);
      });
  }

  ifscSave: any[] = [];
  bankId: any;

  // add data for Manage Ledger

  manageLedgerF() {
    this.ledgerForm = this.fb.group({
      nSchid: new FormControl('', [Validators.required]),
      cLedgerNm: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      nBranchid: new FormControl(''),
      cDisplayNm: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      cBankAc: new FormControl(''),
      nBankid: new FormControl(''),
      cIfsc: new FormControl(''),
      nUserid: new FormControl(''),
      cStatus: new FormControl('R'),
      nAcid: new FormControl(''),
      dStatusDate: new FormControl(),
      registration: new FormControl(),
      cLatLong: new FormControl(''),
      cContactPerson: new FormControl(''),
      cMobile: new FormControl('',[Validators.required]),
      cAddress1: new FormControl('',[Validators.required]),
      cPin: new FormControl(''),
      // cPin: new FormControl('',[Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
      nState: new FormControl(''),
      nDistrict: new FormControl(''),
      nCity: new FormControl(''),
      cEmail: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl('')
    });
  }

  get ledgerFormControls() {
    return this.ledgerForm['controls'];
  }
  SaveLedger(evt) {
    this.ledgerForm.patchValue({
      cDisplayNm: evt
    });
  }

  disableBankFields: boolean = true;
  disableGstFields: boolean = true;
  handleBank(evt) {
    if (evt.checked) {
      this.disableBankFields = false;
    } else {
      this.disableBankFields = true;
    }
  }

  handleGst(evt) {
    if (evt.checked) {
      this.disableGstFields = false;
    } else {
      this.disableGstFields = true;
    }
  }

  submitBankF(form) {
    //console.log(form.value);
    const formValues = this.ledgerForm.value;
    let formData = {};
    formValues['dStatusDate'] = this.formDate;
    this.userId = localStorage.getItem('loginId');
    formValues['nUserid'] = this.userId;
    if (this.editButton == true) {
      formData['nSchid'] = formValues['nSchid']['val'];
      formData['cLedgerNm'] = formValues['cLedgerNm'];
      formData['nBranchid'] = this.branchId;
      formData['cDisplayNm'] = formValues['cDisplayNm'];
      formData['cBankAc'] = formValues['cBankAc'];
      formData['nBankid'] = (formValues['nBankid'] != undefined) ? formValues['nBankid']['serialNo'] : "";
      formData['nJobFrq'] = formValues['nJobFrq'];
      formData['cIfsc'] = formValues['cIfsc'];
      formData['nUserid'] = formValues['nUserid'];
      formData['cStatus'] = null; //formValues['cStatus']['val'];
      formData['nAcid'] = formValues['nAcid'];
      formData['dStatusDate'] = formValues['dStatusDate'];
      formData['addresses'] = this.contactData;
      // formData['addresses'] = [ { "cLatLong": "31.04 23.20", "cContactPerson": "Shiv ram", "cMobile": "6549873212", "cAddress1": "Gulab Bagh", "cPin": "321654", "nState": 29, "nDistrict": 79, "nCity": 145, "cEmail": "shiv.ram@gm.com" }, { "cLatLong": "32.87 45.12", "cContactPerson": "Shiv ram", "cMobile": "9876543215", "cAddress1": "bohara ganesh ji", "cPin": "321654", "nState": 29, "nDistrict": 79, "nCity": 145, "cEmail": "shiv.ram@gm.com" } ]
      // formData['addresses']=[{ "cLatLong":formValues['cLatLong'], "cContactPerson":formValues['cContactPerson'], "cMobile":formValues['cMobile'], "cAddress1":formValues['cAddress1'], "cPin":formValues['cPin'], "nState":formValues['nState']['serialNo'], "nDistrict":formValues['nDistrict']['serialNo'], "nCity":formValues['nCity']['serialNo'], "cEmail":formValues['cEmail'] }]

      this.accountService.ledgerEdit(formData).subscribe((res) => {
        this.response = res;
        // console.log('Manage Job', res);
        if (this.response['status'] == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update Successfull',
          });
          this.ledgerForm.reset();
          this.tableDataF();
          this.contactData = [''];
          this.editStatus = false;
          this.editButton = false;
          this.statusDate = false;
        }
        if (this.response['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({
            severity: 'error',
            summary: this.response.errorMessage,
            detail: 'Not Update',
          });
        }
      });
    } else {
      formData['nSchid'] = formValues['nSchid']['val'];
      formData['cLedgerNm'] = formValues['cLedgerNm'];
      formData['nBranchid'] = this.branchId;
      formData['cDisplayNm'] = formValues['cDisplayNm'];
      formData['cBankAc'] = formValues['cBankAc'];
      formData['nBankid'] = formValues['nBankid']
        ? formValues['nBankid']['serialNo']
        : null;
      formData['nJobFrq'] = formValues['nJobFrq'];
      formData['cIfsc'] = formValues['cIfsc'];
      formData['nUserid'] = formValues['nUserid'];
      formData['addresses'] = this.contactData;
      // formData['addresses'] = [ { "cLatLong": "31.04 23.20", "cContactPerson": "Shiv ram", "cMobile": "6549873212", "cAddress1": "Gulab Bagh", "cPin": "321654", "nState": 29, "nDistrict": 79, "nCity": 145, "cEmail": "shiv.ram@gm.com" }, { "cLatLong": "32.87 45.12", "cContactPerson": "Shiv ram", "cMobile": "9876543215", "cAddress1": "bohara ganesh ji", "cPin": "321654", "nState": 29, "nDistrict": 79, "nCity": 145, "cEmail": "shiv.ram@gm.com" } ]
      // formData['addresses']=[{ "cLatLong":formValues['cLatLong'], "cContactPerson":formValues['cContactPerson'], "cMobile":formValues['cMobile'], "cAddress1":formValues['cAddress1'], "cPin":formValues['cPin'], "nState":formValues['nState']['serialNo'], "nDistrict":formValues['nDistrict']['serialNo'], "nCity":formValues['nCity']['serialNo'], "cEmail":formValues['cEmail'] }]

      this.accountService.manageLedgerAdd(formData).subscribe((res) => {
        this.response = res;
        console.log('Manage Job', res);
        if (this.response['status'] == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Added Successfull',
          });
          this.ledgerForm.reset();
          this.contactData = [''];
          this.tableDataF();
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

  close() {
    this.ledgerForm.reset();
  }

  NewAddContactF() {
    this.contactData = [];
    this.clearContactF();
  }

  clearContactF() {
    this.ledgerForm.get('cLatLong').reset();
    // this.ledgerForm.get('cDisplayNm').reset();
    this.ledgerForm.get('cContactPerson').reset();
    this.ledgerForm.get('cMobile').reset();
    this.ledgerForm.get('cAddress1').reset();
    this.ledgerForm.get('cPin').reset();
    this.ledgerForm.get('nState').reset();
    this.ledgerForm.get('nDistrict').reset();
    this.ledgerForm.get('nCity').reset();
    this.ledgerForm.get('cEmail').reset();
    this.ledgerForm.get('latitude').reset();
    this.ledgerForm.get('longitude').reset();
    this.setCurrentPosition();
    this.isContactEdit = false;
    this.mapchild.searchElementRef.nativeElement.value = "";
  }
  addContactF() {
    if (this.isContactEdit) {
      // console.log(this.contactData[this.currentContactIndex]);
      this.contactData[this.currentContactIndex]['cContactPerson'] =
        this.ledgerForm.value['cContactPerson'];
      this.contactData[this.currentContactIndex]['cDisplayNm'] =
        this.ledgerForm.value['cDisplayNm'];
      this.contactData[this.currentContactIndex]['cLatLong'] = this.latLong
      // this.ledgerForm.value['cLatLong'];
      this.contactData[this.currentContactIndex]['cMobile'] =
        this.ledgerForm.value['cMobile'];
      this.contactData[this.currentContactIndex]['cAddress1'] =
        this.ledgerForm.value['cAddress1'];
      this.contactData[this.currentContactIndex]['cPin'] =
        this.ledgerForm.value['cPin'];
      (this.contactData[this.currentContactIndex]['nState'] = this.ledgerForm
        .value['nState']
        ? this.ledgerForm.value['nState']['code']
        : null),
        (this.contactData[this.currentContactIndex]['nDistrict'] = this
          .ledgerForm.value['nDistrict']
          ? this.ledgerForm.value['nDistrict']['code']
          : null),
        (this.contactData[this.currentContactIndex]['nCity'] = this.ledgerForm
          .value['nCity']
          ? this.ledgerForm.value['nCity']['code']
          : null),
        (this.contactData[this.currentContactIndex]['cEmail'] =
          this.ledgerForm.value['cEmail']);

      this.contactData[this.currentContactIndex]['latitude'] =
        this.ledgerForm.value['latitude'];

      this.contactData[this.currentContactIndex]['longitude'] =
        this.ledgerForm.value['longitude'];
    } else {
      this.contactData.push({
        cLatLong: this.latLong,
        cContactPerson: this.ledgerForm.value['cContactPerson'],
        cDisplayNm: this.ledgerForm.value['cDisplayNm'],
        cMobile: this.ledgerForm.value['cMobile'],
        cAddress1: this.ledgerForm.value['cAddress1'],
        cPin: this.ledgerForm.value['cPin'],
        nState: this.ledgerForm.value['nState']
          ? this.ledgerForm.value['nState']['code']
          : null,
        nDistrict: this.ledgerForm.value['nDistrict']
          ? this.ledgerForm.value['nDistrict']['code']
          : null,
        nCity: this.ledgerForm.value['nCity']
          ? this.ledgerForm.value['nCity']['code']
          : null,
        cEmail: this.ledgerForm.value['cEmail'],
        latitude: this.ledgerForm.value['latitude'],
        longitude: this.ledgerForm.value['longitude']
      });
    }

    this.clearContactF();
    console.log(this.contactData);
  }
  removeContactF(i, doc) {
    // this.contactData.splice(i);
    this.contactData.forEach((item, index) => {
      if (item === doc) this.contactData.splice(index, 1);
    });
  }
  // get Bank District Data
  // change date
  onSelectMethod(event) {
    let d = new Date(event);
    // console.log(d);
    let finalDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    this.formDate = finalDate;
    // console.log(this.formDate);
  }

  private setCurrentPosition() {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.ledgerForm.patchValue({
    //       cAddress1: "",
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude
    //     })
    //     this.sendToChild=position.coords.latitude+")"+position.coords.longitude;
    //   });
    // }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.ShowLocation(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private ShowLocation(position: any): void {
    this.ledgerForm.patchValue({
      cAddress1: "",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    this.sendToChild = position.coords.latitude + ")" + position.coords.longitude;
  }
  // Edit Ledger
  selectedAddressData: any;
  patchContactValue() {
    // console.log(this.selectedAddressData);
    if (this.contactData.length > 0) {
      this.state = this.states.filter(
        (e) => e.code == this.selectedAddressData['nState']
      );
      this.onStateChange({ "name": (this.state[0] != undefined) ? this.state[0]['name'] : "", "code": (this.state[0]) ? this.state[0]['code'] : "" }, 'permanent')
      const dist = this.cities.filter(
        (e) => e.code == this.selectedAddressData['nDistrict']
      );

      const block = this.cityName.filter((e) => e.code == this.selectedAddressData['nCity']);
      let arraylatlong = (this.selectedAddressData['cLatLong'] != null) ? this.selectedAddressData['cLatLong'].split(" ") : "";
      this.sendToChild = arraylatlong[0] + ")" + arraylatlong[1];
      this.ledgerForm.patchValue({
        cContactPerson: this.selectedAddressData['cContactPerson'],
        // cDisplayNm: this.selectedAddressData['cDisplayNm'],
        cMobile: this.selectedAddressData['cMobile'],
        cAddress1: this.selectedAddressData['cAddress1'],
        cPin: this.selectedAddressData['cPin'],
        cEmail: this.selectedAddressData['cEmail'],
        nState: this.state[0],
        nDistrict: dist[0],
        nCity: block[0],
        nBankid: '',
        cBankAc: '',
        cIfsc: '',
        latitude: arraylatlong[0],
        longitude: arraylatlong[1]
      });
    } else {
      const branchId = this.sBank.filter(
        (e) => e.name == this.editLedgerRes['bank']
      );
      // console.log(branchId)

      // console.log(branchId);
      // this.ledgerForm.patchValue({
      //   nBankid: branchId[0],
      //   cBankAc: this.editLedgerRes['cBankAc'],
      //   cIfsc: this.editLedgerRes['cIfsc'],
      //   cContactPerson: "",
      //   cMobile: "",
      //   cAddress1: "",
      //   cPin: "",
      //   cEmail: "",
      //   nState: "",
      // })
    }
    console.log(this.ledgerForm.value);
  }
  stateName;
  stateIds
  editLedgerF(nAcid) {
    // console.log(nAcid)
    this.editStatus = true;
    this.editButton = true;
    // this.isContactEdit = true;
    this.currentContactIndex = 0;
    this.accountService.filterLedgerById(nAcid).subscribe((res) => {
      this.editLedgerRes = res['data'];
      this.stateName = (this.editLedgerRes['addresses'][0] != null) ? this.editLedgerRes['addresses'][0]['state'] : "";
      this.stateIds = (this.editLedgerRes['addresses'][0] != null) ? this.editLedgerRes['addresses'][0]['nState'] : "";
      let currDistName = (this.editLedgerRes['addresses'][0] != null) ? this.editLedgerRes['addresses'][0]['district'] : "";
      let currDistId = (this.editLedgerRes['addresses'][0] != null) ? this.editLedgerRes['addresses'][0]['nDistrict'] : "";

      this.getDistrictBasedOnState(this.stateName, 'permanent', this.districtCatId, this.stateIds);
      this.getCityBasedOnDistrict(currDistName);

      this.contactData = res['data']['addresses'];
      this.selectedAddressData = this.editLedgerRes.addresses[0];
      // setTimeout(()=>{
      //   this.patchContactValue();
      // },2000);


      // const city = this.cityName.filter(e => e.name == this.editLedgerRes.addresses[0]['city']);
      const editLedgerStatus = this.ledgerStatus.filter(
        (e) => e.name == this.editLedgerRes['cStatus']
      );
      // console.log(editLedgerStatus);
      let group = this.editLedgerRes['schNm'].split('-');
      const underGroup = this.underData.filter((e) => e.txt == group[0]);
      const branch = this.branchdata.filter(
        (e) => e.txt == this.editLedgerRes['nBranchid']
      );

      // console.log(this.editLedgerRes['nSchid']);
      // console.log(underGroup);
      this.ledgerForm.patchValue({
        nUserid: this.editLedgerRes['nUserid'],
        nAcid: this.editLedgerRes['nAcid'],
        cLedgerNm: this.editLedgerRes['cLedgerNm'],
        cDisplayNm: this.editLedgerRes['cDisplayNm'],
        nSchid: underGroup[0],
        cStatus: editLedgerStatus[0],
        // dStatusDate:this.editLedgerRes(new Date['dStatusDate']),
        nBranchid: branch[0],
      });
    });
  }

  editStatusDate(event) {
    let statusType = event.value['name'];
    console.log(statusType);
    switch (statusType) {
      case 'Running':
        this.statusDate = false;
        break;
      case 'Closed':
        this.statusDate = true;
        break;
    }
  }

  onChangeEvent(pdata) {
    console.log(pdata);
    this.bankData = pdata;
  }

  saveBank() {
    const bankName = this.sBank.filter((e) => e.name == this.bankData['cBank']);
    this.ledgerForm.patchValue({
      nBankid: bankName[0],
      cIfsc: this.bankData['cifsc'],
    });
    this.displayBasic = false;
    this.bankDetail = [''];
    console.log(this.bankData['cBank']);
  }
  // left district and city dependent Integration
  // left patch value of jobservice array

  filterUnderGroup(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.underData.length; i++) {
      let group = this.underData[i];
      if (group.txt.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredGroups = filtered;
  }

  filterState(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.states.length; i++) {
      let group = this.states[i];
      if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredGroups = filtered;
  }
  filterDistrict(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.districtName.length; i++) {
      let group = this.districtName[i];
      if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredGroups = filtered;
  }
  filterCity(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.cityName.length; i++) {
      let group = this.cityName[i];
      if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredGroups = filtered;
  }
  filterBank(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.sBank.length; i++) {
      let group = this.sBank[i];
      if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredGroups = filtered;
  }

  filterBranch(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.sBank.length; i++) {
      let group = this.sBank[i];
      if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredGroups = filtered;
  }

  // getLatLong(evt) {

  //   this.latLong = evt;
  //   // console.log('latest latlong',evt);
  // }

  // updated code same as employee for state,dist
  public cities: any[] = [];
  public currentCities: any[] = [];
  public blocks: any[] = [];
  public currentBlocks: any[] = [];
  public villages: any[] = [];
  public currentVillages: any[] = [];
  public districtCatId = 9;
  public tehSilCatId = 10;
  public villageCatId = 14;
  filteredDistricts = [];
  filteredBlocks = [];
  filteredGroupDistrict(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cities.length; i++) {
      let group = this.cities[i];
      let idx = group.name.toLowerCase().indexOf(query.toLowerCase());
      if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredDistricts = filtered;

  }

  filteredGroupBlocks(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.cityName.length; i++) {
      let group = this.cityName[i];
      let idx = group.name.toLowerCase().indexOf(query.toLowerCase());
      if (group.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(group);
      }
    }
    this.filteredBlocks = filtered;

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
    //console.log(this.filteredGroups);
  }

  onStateChange(evt, typeOfData) {
    if (typeOfData == 'permanent') {
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

  districtData: any = [];
  getDistrictBasedOnState(stateName, typeOfDist, ctgId?, parentSn?) {
    // console.log(this.categoriesData);
    this.categoriesData.forEach((elem, ind) => {
      if (
        elem['categoryName'] == 'District' &&
        elem['parentCodeName'] == stateName
      ) {

        if (typeOfDist == 'permanent') {

          this.cities.push({
            name: elem['codeName'],
            code: elem['serialNo'],
            category: elem['categoryName'],
            ctgID: elem['ctgID'],
          });
        }

        // {
        //   this.currentCities.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID":elem['ctgID'] });
        // }
      }
    });
    // console.log(this.cities);

    if (typeOfDist == 'current') {
      this.codeMasterService.getCatData(this.districtCatId, parentSn).subscribe(
        (res) => {
          let cityData = res['data'];
          this.districtData.push(cityData)
          if (cityData) {
            cityData.forEach((elem, ind) => {
              {
                this.currentCities.push({
                  name: elem['codeName'],
                  code: elem['serialNo'],
                  category: elem['categoryName'],
                  ctgID: elem['ctgID'],
                });
              }
            });
          }
          // alert(this.districtData)
          // console.log(this.districtData)
        },
        (error) => { }
      );
    }
    //console.log(this.cities);
    this.filteredDistricts = [...this.cities];
    console.log(this.filteredDistricts);
  }

  getState(event, typeOfState) {
    let categoryId = event.value['ctgID'];
    let parentSn = event.value['code'];

    if (typeOfState == 'permanent') {
      this.cities = [];
      this.blocks = [];
      this.villages = [];

      let stateName = event.value['name'];
      this.getDistrictBasedOnState(
        stateName,
        'permanent',
        categoryId,
        parentSn
      );
    } else {
      this.currentCities = [];
      this.currentBlocks = [];
      this.currentVillages = [];

      let stateName = event.value['name'];
      this.getDistrictBasedOnState(stateName, 'current', categoryId, parentSn);
    }
  }

  onDistChange(evt, typeOfData) {
    if (typeOfData == 'permanent') {
      this.cities = [];
      this.blocks = [];
      this.villages = [];
      this.getBlocksBasedOnDist(undefined, 'permanent', evt['name'], evt['code']);
    } else {
      this.currentBlocks = [];
      this.currentVillages = [];
      this.getBlocksBasedOnDist(undefined, 'current', evt['name'], evt['code']);
    }
    console.log(evt);
    // let stateName = evt['name'];

    // this.getBlocksBasedOnDist(stateName, typeOfData,9,evt['code']);
  }

  currentPermanentDistCode: number;
  getBlocksBasedOnDist(evt, typeOfBlock, diName?, distCode?) {
    this.cityName = [];
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

    if (typeOfBlock == 'permanent') {
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

    this.categoriesData.forEach((elem, ind) => {
      if (
        elem['categoryName'] == 'City' &&
        elem['parentCodeName'] == distName
      ) {
        if (typeOfBlock == 'permanent') {
          this.cityName.push({
            name: elem['codeName'],
            code: elem['serialNo'],
            category: elem['categoryName'],
            ctgID: elem['ctgID'],
          });
        } else {
          //this.currentBlocks.push({ "name": elem['codeName'], "code": elem["serialNo"], "category": elem["categoryName"], "ctgID":elem['ctgID'] });
        }
      }
    });

    // console.log(parentSn);

    if (typeOfBlock == 'current') {
      this.codeMasterService.getCatData(this.tehSilCatId, parentSn).subscribe(
        (res) => {
          let tehData = res['data'];
          if (tehData) {
            tehData.forEach((elem, ind) => {
              {
                this.currentBlocks.push({
                  name: elem['codeName'],
                  code: elem['serialNo'],
                  category: elem['categoryName'],
                  ctgID: elem['ctgID'],
                });
              }
            });
          }
          //this.currentBlocks = res['data'];
        },
        (error) => { }
      );
    }
  }

  onBlockChange(evt, typeofBlock) {
    console.log(evt);
    let parentSn;
    let blockName;
    if (typeofBlock === 'autopermanent') {
      parentSn = evt['code'];
      blockName = evt['name'];
    } else {
      parentSn = evt.value ? evt.value['code'] : evt['code'];
      blockName = evt.value ? evt.value['name'] : evt['name'];
    }

    if (typeofBlock == 'permanent') {
      this.villages = [];
    } else {
      this.currentVillages = [];
    }

    this.getVillageBasedOnBlock(blockName, typeofBlock, parentSn);
  }

  getVillageBasedOnBlock(blockName, typeOfVillage, parentSn?) {
    this.categoriesData.forEach((elem, ind) => {
      if (
        elem['categoryName'] == 'Village' &&
        elem['parentCodeName'] == blockName
      ) {
        if (typeOfVillage == 'permanent' || typeOfVillage == 'autopermanent') {
          this.villages.push({
            name: elem['codeName'],
            code: elem['serialNo'],
            category: elem['categoryName'],
            ctgID: elem['ctgID'],
          });
        } else {
          this.currentVillages.push({
            name: elem['codeName'],
            code: elem['serialNo'],
            category: elem['categoryName'],
            ctgID: elem['ctgID'],
          });
        }
      }
    });

    if (typeOfVillage == 'current') {
      this.codeMasterService.getCatData(this.villageCatId, parentSn).subscribe(
        (res) => {
          let villageData = res['data'];
          if (villageData != null) {
            villageData.forEach((elem, ind) => {
              {
                this.currentVillages.push({
                  name: elem['codeName'],
                  code: elem['serialNo'],
                  category: elem['categoryName'],
                  ctgID: elem['ctgID'],
                });
              }
            });
          }
          // this.currentBlocks = res['data'];
        },
        (error) => { }
      );
    }
  }
}
