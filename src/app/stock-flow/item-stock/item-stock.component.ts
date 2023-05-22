import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { StockService } from '../stock.service';
import * as moment from 'moment';

@Component({
  selector: 'app-item-stock',
  templateUrl: './item-stock.component.html',
  styleUrls: ['./item-stock.component.scss']
})
export class ItemStockComponent implements OnInit {

  stockCategoriesData: any = [];
  stockUnitData: any = [];
  editResponse: any;
  serializedData: any;
  serializedEdit: any;
  editButton: boolean = false;
  stoctItem() { }
  stockItemForm = this.fb.group({
    nItmCtgid: ['', [Validators.required]],
    cItemNm: ['', [Validators.required]],
    cPrefix: [''],
    nUnit: ['', [Validators.required]],
    cSrlzd: ['', [Validators.required]],
    nItemid: [''],
    install: ['', [Validators.required]],
    consume: ['', [Validators.required]],
    itemGroup: [''],
    itemQty: [''],
    cSrvSkill: [''],
  });
  addPriceForm: FormGroup;


  get stockFormControl() {
    return this.stockItemForm['controls']
  }

  itemstockinhandlist = [
    { 'SNo': 1, 'Category': 'Commercial', 'Sub Category': 'Rental', 'Item': 'AirBed', 'Unit': 'nos', 'Quantity In Hand': 20 }
    , { 'SNo': 2, 'Category': 'Commercial', 'Sub Category': 'Sales', 'Item': 'AirBed', 'Unit': 'nos', 'Quantity In Hand': 200 }
    , { 'SNo': 3, 'Category': 'Commercial', 'Sub Category': 'Rental', 'Item': 'AirBed', 'Unit': 'nos', 'Quantity In Hand': 2 }
    , { 'SNo': 4, 'Category': 'Commercial', 'Sub Category': 'Rental', 'Item': 'AirBed', 'Unit': 'nos', 'Quantity In Hand': 4 }
    , { 'SNo': 5, 'Category': 'Commercial', 'Sub Category': 'Rental', 'Item': 'AirBed', 'Unit': 'nos', 'Quantity In Hand': 20 }
    , { 'SNo': 6, 'Category': 'Commercial', 'Sub Category': 'Rental', 'Item': 'Oxygen Cylinder', 'Unit': 'nos', 'Quantity In Hand': 20 }
    , { 'SNo': 6, 'Category': 'Non-Commercial', 'Sub Category': 'Rental', 'Item': 'Uniform-GDA', 'Unit': 'nos', 'Quantity In Hand': 50 }
  ];
  itemstockinlist = [
    { 'SNo': 1, 'Date': '15-05-2020', 'Challan Number': '12/20-21', 'Supplier': 'ABC Enterprises', 'Phone': '8574857450', 'Quantity': 26 }
    , { 'SNo': 2, 'Date': '06-09-2019', 'Challan Number': '121', 'Supplier': 'XYZ Corporation', 'Phone': '1234857450', 'Quantity': 2 }
    , { 'SNo': 3, 'Date': '06-09-2019', 'Challan Number': '121', 'Supplier': 'XYZ Corporation', 'Phone': '1234857450', 'Quantity': 2 }
    , { 'SNo': 3, 'Date': '06-09-2019', 'Challan Number': '121', 'Supplier': 'XYZ Corporation', 'Phone': '1234857450', 'Quantity': 2 }
    , { 'SNo': 3, 'Date': '06-09-2019', 'Challan Number': '121', 'Supplier': 'XYZ Corporation', 'Phone': '1234857450', 'Quantity': 2 }
    , { 'SNo': 3, 'Date': '06-09-2019', 'Challan Number': '121', 'Supplier': 'XYZ Corporation', 'Phone': '1234857450', 'Quantity': 2 }
    , { 'SNo': 3, 'Date': '06-09-2019', 'Challan Number': '121', 'Supplier': 'XYZ Corporation', 'Phone': '1234857450', 'Quantity': 2 }
  ];
  itemstocklist = [
    { 'SNo': 1, 'Items': 'AirBed', 'Units': 'nos', 'Category': 'Commercial' }
    , { 'SNo': 2, 'Items': 'Oxygen Cylinder', 'Units': 'nos', 'Category': 'Commercial' }
    , { 'SNo': 3, 'Items': 'ICU Ambulance', 'Units': 'nos', 'Category': 'Commercial' }
    , { 'SNo': 4, 'Items': 'Ambulance-Normal', 'Units': 'nos', 'Category': 'Commercial' }
    , { 'SNo': 4, 'Items': 'BP Instrument', 'Units': 'nos', 'Category': 'Non-Commercial' }
  ];
  substockitemlist = [];

  substockitemPricinglist = [];


  stockinDialog: Boolean;
  itemDialog: Boolean;
  submitted: Boolean;
  CustomerList: string[];
  item: any;
  showMRPError: boolean = false;
  position: string;
  stockItemTableRes: any;
  searchBox: string = "";
  searchResponse: any;
  response: any;
  categoriesData: any[] = [];
  stockCategores: any[] = [];
  catgId: any;
  unitId: any;
  units: any[] = [];
  serialized = [{ name: 'YES', val: 'Y' }, { name: 'NO', val: 'N' }];
  // item:any;
  serializedArr: any[] = [
    { name: 'Yes', key: 'Y' },
    { name: 'No', key: 'N' }
  ];

  Installation: any[] = [
    { name: 'Yes', key: 'Y' },
    { name: 'No', key: 'N' }
  ];

  consumable: any[] = [
    { name: 'Yes', key: 'Y' },
    { name: 'No', key: 'N' }
  ];

  selectedValue: string;
  priceinDialog: Boolean;

  SaleMrp: any[] = [];
  rental: any[] = [];
  itemGroupData: any[] = [];
  branchData: any = [];
  PriceItemId: any;
  displayTaxDetail: boolean = false;
  taxDetailForm: FormGroup;
  itemId = null;
  srvId = null;
  srvSkill = null;
  taxDetailList: any[] = [];
  taxTypeData: any[] = [];
  itemGroups: any[] = [];
  sSkills: any[] = [];

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    this.item = { 'Date': '', 'PONumber': '' }
  }
  ngOnInit(): void {
    //this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
   
    this.saleMRP();
      this.rentalMRP();
      this.getStockItemTableF();
    
    this.populateStockCategories();
    this.populateStockUnit();
   
    this.getBranchData();
    this.savePriceForm();
    this.initializeTaxDetailForm();
    this.loadItemGroup();
   // this.getServiceSkillsF();
   // this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
   this.employeeService.getctgData(33).subscribe((res:any)=>{
    let taxTypeD = res.data
    taxTypeD.forEach((elem, ind) => {
      if (elem['ctgID'] == 33) {
        this.taxTypeData.push(elem);
      }
    });
   })
   
    this.getTaxDetailList();
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.priceinDialog = false;
    this.displayTaxDetail = false;
  }


  loadItemGroup() {
    this.stockService.loadItemGroups().subscribe((data) => {
      // console.log(data);
      this.itemGroupData = data['data'];
    }, (err) => {

    });
  }
  showSuccess(succ) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
  }

  showError(error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }



  delPriceItem(priceId?) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.stockService.priceItemDelete(priceId).subscribe(
          res => {
            this.response = res;
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.itemStockPricingPopupF();
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
  // Edit Item Stock
  editItemStock(id) {
    this.editButton = true;
    this.stockService.itemStockEditById(id).subscribe(
      res => {
        const deptVal = [];
        this.editResponse = res['data'];
        if (this.editResponse['ItemParentIds'] != null) {
          let deptV = this.editResponse['ItemParentIds'].split(",");
          deptV.forEach(element => {
            this.itemGroupData.forEach((el, ind) => {
              if (element == el['nItemid']) {
                deptVal.push(el['nItemid']);
              }
            });
          });
        }
       const itemSkills = []
        if (this.editResponse['itemskillDetail'] != null) {
          let deptV = this.editResponse['itemskillDetail'];
          console.log(this.sSkills)
          deptV.forEach(element => {
            this.sSkills.forEach((el, ind) => {
              if (element.nSrvSkillId == el['serialNo']) {
                itemSkills.push(el);
              }
            });
          });
        }
        console.log('this is edit response', this.editResponse)
        const stockcategory = this.stockCategoriesData.filter(e => e.codeName == this.editResponse['itmCtg']);
        const units = this.stockUnitData.filter(e => e.codeName == this.editResponse['unit']);
        const installs = this.Installation.filter(e => e.key == this.editResponse['cInstallation']);
        const consumes = this.consumable.filter(e => e.key == this.editResponse['cIsConsumable']);
        const itemGroups = this.itemGroupData.filter(e => e.nItemid == this.editResponse['nItemid']);
        console.log('item group', itemGroups);
        if (this.editResponse['cSrlzd'] == "N") {
          this.serializedData = "No";
          this.serializedEdit = this.serializedArr.filter(e => e.name == this.serializedData);
          // console.log('this is serialized', this.serializedEdit);
        }
        else {
          this.serializedData = "Yes";
          this.serializedEdit = this.serializedArr.filter(e => e.name == this.serializedData);
          // console.log('this is serialized', this.serializedEdit);
          // this.editResponse['cSrlzd']=="Yes"
        }
        this.stockItemForm.patchValue({
          nItemid: this.editResponse['nItemid'],
          cItemNm: this.editResponse['cItemNm'],
          cPrefix: this.editResponse['cPrefix'],
          nItmCtgid: stockcategory[0],
          nUnit: units[0],
          cSrlzd: this.serializedEdit[0],
          itemQty: this.editResponse['nItemMinQty'],
          install: installs[0],
          consume: consumes[0],
          itemGroup: deptVal,
          cSrvSkill:itemSkills
        })
      }
    )
  }

  addStockItem(formValue) {
    if (formValue['nItemid'] != undefined && formValue['itemGroup'].length > 0) {
      if (formValue['itemGroup'].length > 0) {
        for (let i = 0; i < formValue['itemGroup'].length; i++) {
          if (formValue['itemGroup'][i] == formValue['nItemid']) {
            this.showError('Item Group and item Name is does not Same');
            return;
          }
        }
      }
    }
    const a: any[] = [];
    const itemSkillsList = []
    if(formValue['itemGroup'] == null){
      formValue['itemGroup'] = ''
    }
    if(formValue['cPrefix'] == null){
      formValue['cPrefix'] =''
    }
    if (formValue['itemGroup'] != null && formValue['itemGroup'].length > 0) {
      for (let i = 0; i < formValue['itemGroup'].length; i++) {
        a.push({
          nItemParentId: formValue['itemGroup'][i]
        });
      }
    }
    if ( formValue['cSrvSkill'] != null && formValue['cSrvSkill'].length > 0) {
      formValue['cSrvSkill'].forEach(element =>{
        itemSkillsList.push({
          nSrvSkillId: element.serialNo
        });
      })
    }
    console.log(a);
    let formData = {};
    if (this.editButton) {
      formData['nItemid'] = formValue['nItemid'],
      formData['nItmCtgid'] = formValue['nItmCtgid']['serialNo'];
      formData['nUnit'] = formValue['nUnit']['serialNo'];
      formData['cSrlzd'] = formValue['cSrlzd']['key'];
      formData['cItemNm'] = formValue['cItemNm'];
      formData['cPrefix'] = formValue['cPrefix'];
      formData['cInstallation'] = formValue['install']['key'];
      formData['cIsConsumable'] = formValue['consume']['key'];
      formData['nItemParentId'] = formValue['itemGroup']['nItemid'];
      formData['nItemMinQty'] = formValue['itemQty'];
      formData['itemGroupDetails'] = a;
      formData['itemSkills'] = itemSkillsList;
      
      this.stockService.itemEdit(formData).subscribe(
        res => {
          if (res['status'] == 200) {
            this.itemDialog = false;
            this.editButton = false;
            this.stockItemForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successfully' });
            this.getStockItemTableF();
          } else {
            this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Update Successfully' });
          }
        }, (error) => {

        });

      console.log(formData);

    }
    else {


      formData['nItmCtgid'] = formValue['nItmCtgid']['serialNo'];
      formData['nUnit'] = formValue['nUnit']['serialNo'];
      formData['cSrlzd'] = formValue['cSrlzd']['key'];
      formData['cItemNm'] = formValue['cItemNm'];
      formData['cPrefix'] = formValue['cPrefix'];
      formData['cInstallation'] = formValue['install']['key'];
      formData['cIsConsumable'] = formValue['consume']['key'];
      formData['nItemParentId'] = formValue['itemGroup']['nItemid'];
      formData['nItemMinQty'] = formValue['itemQty'];
      formData['itemGroupDetails'] = a;
      formData['itemSkills'] = itemSkillsList;
      this.stockService.stockItemAdd(formData).subscribe((data) => {
        if (data['status'] == 200) {
          this.itemDialog = false;
          this.stockItemForm.reset();
          this.showSuccess(data['message']);
          this.getStockItemTableF();
        } else {
          this.showError(data['errorMessage']);
        }
      }, (error) => {

      });
      // console.log(formData);
    }

    // console.log(formValue);
  }
  populateStockCategories() {
    // this.employeeService.getCategoryData().subscribe((data:any) => {
    //   console.log('cat', data);
    //   const categoryData = data;
    //   categoryData.forEach(element => {
    //     if (element['ctgID'] == 3) {
    //       this.stockCategoriesData.push(element);
    //     }
    //   });
    // })
    this.stockService.getFillDDLWithCodeByCtgParent(3).subscribe((res:any) =>{
      console.log('cat', res)
      this.stockCategoriesData = res.data;
    });
    this.stockService.getFillDDLWithCodeByCtgParent(15).subscribe((res:any) =>{
      console.log('cat', res)
      this.sSkills = res.data;
    })
    //let categoryData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    
  }



  loadItemGroups() {

  }

  isEditPrice: boolean = false;
  currIndexPrice: any;
  editPrice(ind, subItem) {
    this.isEditPrice = true;
    this.currIndexPrice = ind;
    const branchValue = [];
    const res = subItem['nBranchid'].toString();
    let bBranch = res.split(",");
    bBranch.forEach((element) => {
      this.branchData.forEach((el, ind) => {
        if (element == el['val']) {
          branchValue.push(el['val']);
        }
      });
    });
    this.addPriceForm.patchValue({
      "dEffectDt": new Date(subItem['dEffectDt']),
      "multiBranch": branchValue,
      "nSale": subItem['nSale'],
      "nSaleUnit": subItem['nSaleUnit'],
      "nRent": subItem['nRent'],
      "nRentUnit": subItem['nRentUnit'],
      "nSecurityAmt": subItem['nSecurityAmt'],
      "nPriceid": subItem['nPriceid']
    });
  }
  populateStockUnit() {
    this.employeeService.getctgData(28).subscribe((res:any)=>{
      let unitData = res.data
      unitData.forEach(element => {
        if (element['ctgID'] == 28) {
          this.stockUnitData.push(element);
        }
      })
     })
   
  }
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
    return this.stockItemTableRes ? this.first === (this.stockItemTableRes.length - this.rows) : true;
  };

  isFirstPage(): boolean {
    return this.stockItemTableRes ? this.first === 0 : true;
  };
  // End Pagingnation

  // Stock Item Tab Table Data
  getStockItemTableF() {
    this.stockService.stockItemList().subscribe(
      res => {
        this.stockItemTableRes = res['data'];
      }
    )
  }
  // Search Stock Item Tab Table Data
  searchStockItemTableList() {
    this.stockService.stockItemFilter(this.searchBox).subscribe(
      res => {
        this.searchResponse = res['data'];

        console.log(this.searchResponse);
        this.stockItemTableRes = this.searchResponse;
      }
    )
  }

  // Delete Stock Item Table Data
  deleteStockItemF(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.stockService.stockItemDel(id).subscribe(
          res => {
            this.response = res;
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.getStockItemTableF();
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
  };

  itemStockPopupF() {
    this.itemDialog = false;
    this.editButton = false;
    this.stockItemForm.reset();
    this.getStockItemTableF();
    // this.itemDialog = true;
  }
  //  Stock category & units Dropdown Data
  getStockItemComboF() {
    // let categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    this.employeeService.getctgData(3).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element, ind) => {
        if (element["categoryName"] == "Stock Category") {
          this.catgId = element['ctgID'];
          this.stockCategores.push({ "name": element['codeName'], "code": element["serialNo"], "category": element["categoryName"] });
          console.log('service Category', this.stockCategores);
        }
       
      });
     })
     this.employeeService.getctgData(4).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element, ind) => {
        if (element["categoryName"] == "Skills Price Unit") {
          this.unitId = element['ctgID'];
          this.units.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
          console.log('this is unit', this.units);
        }
       
      });
     })
   
    
  }


  openAddStockIn() {
    this.stockinDialog = true;
  }

  public itemName: string;
  onItemChange(item) {
    //console.log(item['cItemNm']);
    this.itemName = item['cItemNm'];
    this.PriceItemId = item.nItemid;
    //console.log(this.PriceItemId)
  }

  itemStockPricingPopupF() {
    this.savePriceForm();
    this.priceinDialog = true;
    this.stockService.getSubStockList(this.PriceItemId).subscribe(
      res => {
        this.substockitemlist = res['data'];
      }
    )
  }

  getBranchData() {
    const empID = localStorage.getItem('empID');
    this.stockService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        console.log('This is Branch location', this.branchData)
      }
    );
  
  };

  // get dropdown data for Ledger Type
  saleMRP() {
    this.employeeService.getctgData(28).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element) => {
        // console.log(element);
        if (element['ctgID'] == 28) {
          this.SaleMrp.push({ "serialNo": element["serialNo"], "codeID": element["codeID"], "ctgID": element["ctgID"], "codeName": element["codeName"], "parentSerialNo": element["parentSerialNo"] })
        }
      })
     })
   
    console.log(this.SaleMrp);
  };

  rentalMRP() {
    this.employeeService.getctgData(4).subscribe((res:any)=>{
      this.categoriesData = res.data
      this.categoriesData.forEach((element) => {
        // console.log(element);
        if (element['ctgID'] == 4) {
          this.rental.push({ "serialNo": element["serialNo"], "codeID": element["codeID"], "ctgID": element["ctgID"], "codeName": element["codeName"], "parentSerialNo": element["parentSerialNo"] })
        }
      })
     })
    
    console.log(this.rental);
  };

  savePriceForm() {
    this.addPriceForm = this.fb.group({
      nItemid: [''],
      nPriceid: [''],
      dEffectDt: [''],
      multiBranch: [''],
      nSale: [''],
      nRent: [''],
      nSaleUnit: [''],
      nRentUnit: [''],
      nSecurityAmt: ['']
    })
  }

  onclosePriceDialog() {
    this.isEditPrice = false;
  }
  onAddPrice() {
    const formValue = this.addPriceForm.value;


    if (!formValue['nSale'] && !formValue['nRent']) {
      this.showMRPError = true;
      return false;
    } else {
      this.showMRPError = false;
    }
    const formData = {};

    if (formValue['nSale'] == '') {
      console.log('blank');
    }
    
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['nItemid'] = this.PriceItemId;
    // formData['nPriceid'] = formValue['nPriceid'];
    formData['dEffectDt'] =  moment(formValue['dEffectDt']).format('YYYY-MM-DD') ;
    formData['multiBranch'] = formValue['multiBranch'].toString();
    formData['nSale'] = formValue['nSale'];
    formData['nSaleUnit'] = formValue['nSaleUnit'];
    formData['nRent'] = formValue['nRent'];
    formData['nRentUnit'] = formValue['nRentUnit'];
    formData['nSecurityAmt'] = formValue['nSecurityAmt'];
    if (this.isEditPrice) {
      formData['nPriceid'] = formValue['nPriceid'];
      this.stockService.updatePriceData(formData).subscribe(
        res => {

          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
            this.isEditPrice = false;
            this.itemStockPricingPopupF();
          }
          if (res['status'] == 204) {

            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          }
        });

    } else {
      formData['nPriceid'] = "0";
      this.stockService.addPriceData(formData).subscribe(
        res => {

          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
            this.itemStockPricingPopupF();
          }
          if (res['status'] == 204) {

            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          }
        });
    }
    this.addPriceForm.reset();

    this.addPriceForm.patchValue({
      nItemid: '',
      dEffectDt: '',
      multiBranch: '',
      nSale: '',
      nRent: '',
      nSaleUnit: '',
      nRentUnit: '',
      nSecurityAmt: ''
    });
    this.itemStockPricingPopupF();
    //console.log(formData);
  }

  ClearItemPrice() {
    this.isEditPrice = false;
    this.addPriceForm.reset();
    this.stockService.getSubStockList(this.PriceItemId).subscribe(
      res => {
        this.substockitemlist = res['data'];
      }
    )
  }

  initializeTaxDetailForm() {
    this.taxDetailForm = this.fb.group({
      dEffectDt: [],
      cSalesMode: [],
      nTaxClass: [],
      nTaxType: [],
      nTaxRate: [],
      cInputAccCode: [''],
      cOutputAccCode: [''],
      cHsn: []

    });
  };
  taxDetailPopupF() {
    this.displayTaxDetail = true;
  }

  onSubmit() {
    let tmpObj = this.taxDetailForm.value;
    tmpObj['dEffectDt'] = this.formatDate(tmpObj['dEffectDt']);
    tmpObj['nItemid'] = this.itemId;
    tmpObj['nSrvid'] = this.srvId;
    tmpObj['nServiceSkill'] = this.srvSkill;
    this.stockService.addTaxDetails(tmpObj).subscribe((res) => {

      if (res['status'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });

        this.taxDetailForm.reset();
        this.getTaxDetailList();
        this.displayTaxDetail = false;
      }
      if (res['status'] == 204) {
        //  this.messageService.add(this.response.errorMessage)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });

      }


    }, (err) => { });
  }

  get getTaxDetailForm() {
    return this.taxDetailForm['controls'];
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

  getTaxDetailList() {
    this.stockService.getTaxDetailList().subscribe((res) => {
      this.taxDetailList = res['data'];
    }, (err) => {

    });
  }

  public salesModes: any[] = [
    {
      "name": "Sales", "value": "S"
    }, {
      "name": "Rental", "value": "R"
    }
  ];

  // getServiceSkillsF() {
  //   this.categoriesData.forEach((element) => {
  //     if (element["categoryName"] == "Service Skills") {
  //       this.catgId = element['ctgID'];
  //       this.sSkills.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
  //       // console.log(this.sSkills);
  //     }
  //   });
  // };

}
