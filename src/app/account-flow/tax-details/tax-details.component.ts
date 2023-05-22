import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import Utils from 'src/app/helpers/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StockService } from 'src/app/stock-flow/stock.service';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
@Component({
  selector: 'app-tax-details',
  templateUrl: './tax-details.component.html',
  styleUrls: ['./tax-details.component.css']
})
export class TaxDetailsComponent implements OnInit {
  popupTaxheader: string = '';
  displayTaxDetail: boolean = false;
  entryMode: any[];
  entryModeItem: any[];
  serviceData: any;
  sSkills: any[] = [];
  showItem: boolean = false;
  showService: boolean = false;
  categoriesData: any[] = [];
  catgId: any;
  itemId = null;
  srvId = null;
  srvSkill = null;
  srvmodeId = null;
  public purchaseDropdown: boolean = false;
  public saleseDropdown: boolean = false;
  public enableTaxRate: boolean = false;
  products: any[];
  cities: any[];
  taxDetailForm: FormGroup;
  taxDetailList: any[] = [];
  editTaxDetail: boolean = false;
  // pagingnation
  first = 0;
  rows = 10;
  sTableList: any[];
  public filteredGroups: any[];
  public filteredPurchase: any[];
  public filteredSales: any[];
  branchId;

  constructor(private accountservice: AccountService, private stockService:StockService, private empService: EmployeeService, private confirmationService: ConfirmationService, private fb: FormBuilder, private messageService: MessageService) {
    this.entryMode = [
      { name: 'Item', valName: 'I' },
      { name: 'Service', valName: 'S' }
    ]
  }

  taxTypeData: any[] = [];
  ngOnInit(): void {
    this.initializeTaxDetailForm();
    //this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    this.stockService.getFillDDLWithCodeByCtgParent(15).subscribe((res:any)=>{
      this.categoriesData = res.data
     })
    

    this.stockService.getFillDDLWithCodeByCtgParent(33).subscribe((res:any) =>{
      let data = res.data;
      this.taxTypeData = data;
       
    });


    // let taxTypeD = JSON.parse(localStorage.getItem('FILLCODEDATA'));
    // taxTypeD.forEach((elem, ind) => {
    //   if (elem['ctgID'] == 33) {
    //     this.taxTypeData.push(elem);
    //   }
    // });
    this.getTaxDetailList('');
    let id = 14;
    this.branchId = localStorage.getItem('branchId');
    this.accountservice.taxInputLedger(id,this.branchId).subscribe((res) => {
      this.filteredGroups = res['data'];
      console.log(this.filteredGroups);
    })
    let id1 = 16;
    this.accountservice.purchaseLedger(id1,this.branchId).subscribe((res) => {
      this.filteredPurchase = res['data'];
      console.log(this.filteredPurchase);
    })
    let id2 = 17;
    this.accountservice.salesLedger(id2,this.branchId).subscribe((res) => {
      this.filteredSales = res['data'];
      console.log(this.filteredSales);
    })
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayTaxDetail = false;
    this.editTaxDetail = false;
  }

  addTaxDetail() {
    this.isEdit = false;
    this.taxDetailForm.reset();
    this.displayTaxDetail = true;
  }

  onTaxType(evt) {
    let taxv = this.taxDetailForm.get('nTaxClass').value;
    let restax = 0;
    let res = this.taxTypeData.filter(e => e.serialNo == evt.value);
    if (res.length > 0) {
      if (res[0].codeName == 'CENTRAL') {
        this.enableTaxRate = true;
        restax = Number(taxv) / 2;
      }
      else if (res[0].codeName == 'STATE') {
        this.enableTaxRate = true;
        restax = Number(taxv) / 2;
      }
      else if (res[0].codeName == 'INTEGRATED') {
        this.enableTaxRate = true;
      }
      else if (res[0].codeName == 'CESS') {
        this.enableTaxRate = false;
      }
    }
    this.taxDetailForm.patchValue({
      nTaxRate: restax
    });
  }


  delTax(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountservice.deleteTax(id).subscribe(
          res => {

            if (res['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.getTaxDetailList('');
            }
            if (res['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Deleted Successfully' });
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


  public salesModes: any[] = [
    {
      "name": "Sales", "value": "S"
    }, {
      "name": "Rental", "value": "R"
    }
  ];


  initializeTaxDetailForm() {
    this.taxDetailForm = this.fb.group({
      dEffectDt: [],
      cSalesMode: [],
      nTaxClass: [],
      nTaxType: [],
      nTaxRate: [],
      cInputAccCode: [''],
      cOutputAccCode: [''],
      cHsn: [],
      cPurchaseLedger: [],
      cSalesLedger: []

    });
  };

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


  onSubmit() {
    let tmpObj = this.taxDetailForm.value;
    console.log(tmpObj);
    tmpObj['dEffectDt'] = this.formatDate(tmpObj['dEffectDt']);
    tmpObj['nItemid'] = this.itemId;
    tmpObj['nSrvid'] = this.srvId;
    tmpObj['nServiceSkill'] = this.srvSkill;
    // let tmpAccCode = tmpObj['cInputAccCode']['cAccCode'];
    // let tmpOutAccCode = tmpObj['cOutputAccCode']['cAccCode'];
    // tmpObj['cInputAccCode'] = (tmpAccCode != undefined) ? tmpAccCode.substr(tmpAccCode.length - 9) : "";
    // tmpObj['cOutputAccCode'] = (tmpOutAccCode != undefined) ? tmpOutAccCode.substr(tmpOutAccCode.length - 9) : "";

    // tmpObj['cPurchaseLedger'] = tmpObj['cPurchaseLedger'] ? tmpObj['cPurchaseLedger']['nSchid'] : null;
    // tmpObj['cSalesLedger'] = tmpObj['cSalesLedger'] ? tmpObj['cSalesLedger']['nSchid'] : null;
    let tmpAccCode = tmpObj['cInputAccCode']['cAccCode'];
    let tmpOutAccCode = tmpObj['cOutputAccCode']['cAccCode'];
    let tmpSalesLedger = tmpObj['cSalesLedger']['cAccCode'];
    let tmpPurchaseLedger = tmpObj['cPurchaseLedger']['cAccCode'];
    tmpObj['cInputAccCode'] = (tmpAccCode != undefined) ? tmpAccCode.substr(tmpAccCode.length - 9) : "";
    tmpObj['cOutputAccCode'] = (tmpOutAccCode != undefined) ? tmpOutAccCode.substr(tmpOutAccCode.length - 9) : "";
    tmpObj['cSalesLedger'] = (tmpSalesLedger != undefined) ? tmpSalesLedger.substr(tmpAccCode.length - 9) : "";
    tmpObj['cPurchaseLedger'] = (tmpPurchaseLedger != undefined) ? tmpPurchaseLedger.substr(tmpAccCode.length - 9) : "";
    if (this.isEdit) {
      // let tmpAccCode = tmpObj['cInputAccCode'];
      // let tmpOutAccCode = tmpObj['cOutputAccCode'];
      // tmpObj['cInputAccCode'] = (tmpAccCode != undefined) ? tmpAccCode.substr(tmpAccCode.length - 9) : "";
      // tmpObj['cOutputAccCode'] = (tmpOutAccCode != undefined) ? tmpOutAccCode.substr(tmpOutAccCode.length - 9) : "";
      tmpObj['nTaxid'] = this.editableTaxId;
      // tmpObj['cSalesLedger'] = tmpObj['cSalesLedger'];
      // tmpObj['cPurchaseLedger'] = tmpObj['cPurchaseLedger'];
      console.log(tmpObj);
      this.accountservice.updateTaxDetails(tmpObj).subscribe((res) => {

        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });

          this.taxDetailForm.reset();
          this.getTaxDetailList('');
          this.displayTaxDetail = false;
        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });

        }


      }, (err) => { });
    } else {
      // let tmpAccCode = tmpObj['cInputAccCode']['cAccCode'];
      // let tmpOutAccCode = tmpObj['cOutputAccCode']['cAccCode'];
      // tmpObj['cInputAccCode'] = (tmpAccCode != undefined) ? tmpAccCode.substr(tmpAccCode.length - 9) : "";
      // tmpObj['cOutputAccCode'] = (tmpOutAccCode != undefined) ? tmpOutAccCode.substr(tmpOutAccCode.length - 9) : "";
      // tmpObj['cSalesLedger'] = (tmpObj['cSalesLedger'] != undefined) ? tmpObj['cSalesLedger']['cAccCode'].substr(tmpAccCode.length - 9) : "";
      // tmpObj['cPurchaseLedger'] = (tmpObj['cPurchaseLedger'] != undefined) ? tmpObj['cPurchaseLedger']['cAccCode'].substr(tmpAccCode.length - 9) : "";
      console.log(tmpObj);
      this.accountservice.addTaxDetails(tmpObj).subscribe((res) => {

        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });

          this.taxDetailForm.reset();
          this.getTaxDetailList('');
          this.displayTaxDetail = false;
        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });

        }


      }, (err) => { });
    }


  }

  get getTaxDetailForm() {
    return this.taxDetailForm['controls'];
  }
  enableBtn: boolean = false;
  salesDropdown: boolean = false;
  onEntryModeChange(evt) {
    console.log(evt.value)
    this.showItem = true;
    this.showService = false;
    this.enableBtn = false;

    if (evt.value == 'I') {
      this.accountservice.getEntryItemData().subscribe(
        res => {
          this.entryModeItem = res['data'];
          console.log(this.entryModeItem);
        }
      )
      this.salesDropdown = true;
    } else {
      this.showItem = false;
      this.showService = true;
      this.getServiceF();
      this.getComboF();
      this.salesDropdown = false;
    }
  }

  onchangeSelectedItem(e) {
    this.enableBtn = true;
    let resEntryMode = this.entryMode.filter(e => e.valName == this.srvmodeId);
    let resModeItem = this.entryModeItem.filter(e => e.nItemid == this.itemId);
    if (resEntryMode.length > 0 && resModeItem.length > 0) {
      this.popupTaxheader = "Tax Details - " + resEntryMode[0].name + " - " + resModeItem[0].cItemNm;
      this.getTaxDetailList(resModeItem[0].cItemNm);
    }
    else {
      this.popupTaxheader = "";
    }

  }
  onchangeSelectedService(e) {
    if (this.srvId != null && this.srvSkill != null) {
      this.enableBtn = true;
      let resEntryMode = this.entryMode.filter(e => e.valName == this.srvmodeId);
      let resServices = this.serviceData.filter(e => e.val == this.srvId);
      let ressSkills = this.sSkills.filter(e => e.serialNo == this.srvSkill);
      this.popupTaxheader = "Tax Details - " + resEntryMode[0].name + " - " + resServices[0].txt + " - " + ressSkills[0].name;
    }
    else {
      this.enableBtn = false;
      this.popupTaxheader = "";
    }
  }

  onchangeSelectedServiceSkills(e) {
    if (this.srvId != null && this.srvSkill != null) {
      this.enableBtn = true;
      let resEntryMode = this.entryMode.filter(e => e.valName == this.srvmodeId);
      let resServices = this.serviceData.filter(e => e.val == this.srvId);
      let ressSkills = this.sSkills.filter(e => e.serialNo == this.srvSkill);
      this.popupTaxheader = "Tax Details - " + resEntryMode[0].name + " - " + resServices[0].txt + " - " + ressSkills[0].name;
      this.getTaxDetailList(ressSkills[0].name);
    }
    else {
      this.enableBtn = false;
      this.popupTaxheader = "";
    }
  }

  onSalesMOde(evt) {
    this.taxDetailForm.patchValue({
      cInputAccCode: [''],
      cOutputAccCode: [''],
      cPurchaseLedger: [],
      cSalesLedger: []
    });
    console.log(evt.value);
    if (evt.value == 'S') {
      this.purchaseDropdown = false;
      this.saleseDropdown = false;
    } else if (evt.value == 'R') {
      this.purchaseDropdown = true;
      this.saleseDropdown = false;
    }
  }
  // service dropdown
  getServiceF() {
    this.accountservice.getServiceData().subscribe(
      res => {
        this.serviceData = res['data'];
        console.log('this is service dropdown', this.serviceData);
      }
    );
  };

  getComboF() {

    this.categoriesData.forEach((element) => {
      if (element["categoryName"] == "Service Skills") {
        this.catgId = element['ctgID'];
        this.sSkills.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
        //console.log('this is service skills', this.sSkills);
      }
    });
  };

  getTaxDetailList(val) {
    this.accountservice.getTaxDetailList(val).subscribe((res) => {
      this.taxDetailList = res['data'];
      this.purchaseDropdown = false;
      this.saleseDropdown = false;
    }, (err) => {

    });
  }

  isEdit: boolean = false;
  editableTaxId: number;
  editDetails(tax) {
    this.popupTaxheader = 'Edit Tax Details - '+tax.srvName+' - '+tax.serviceSkill+tax.itemName;
    // console.log(tax);
    this.editableTaxId = tax['nTaxid'];
    this.isEdit = true;
    this.displayTaxDetail = true;
    const formatedDate = new Date(tax.dEffectDt)
    this.taxDetailForm.controls['dEffectDt'].setValue(formatedDate);
    this.taxDetailForm.controls['nTaxClass'].setValue(tax.nTaxClass);
    this.taxDetailForm.controls['cHsn'].setValue(tax.cHsn);
    this.taxDetailForm.controls['nTaxRate'].setValue(tax.nTaxRate);
    let resInputTax = this.filteredGroups.filter(e => e.cAccCode.substr(e.cAccCode.length - 9) == tax.cInputAccCode);
    let resOutputTax = this.filteredGroups.filter(e => e.cAccCode.substr(e.cAccCode.length - 9) == tax.cOutputAccCode);
    this.taxDetailForm.controls['cInputAccCode'].setValue((resInputTax.length > 0) ? resInputTax[0] : '');
    this.taxDetailForm.controls['cOutputAccCode'].setValue((resOutputTax.length > 0) ? resOutputTax[0] : '');
    this.taxDetailForm.controls['nTaxType'].setValue(tax.nTaxType);
    this.taxDetailForm.controls['cSalesMode'].setValue(tax.cSalesMode);
    let resPurchaseLedger = this.filteredPurchase.filter(e => e.cAccCode.substr(e.cAccCode.length - 9) == tax.cPurchaseLedger);
    this.taxDetailForm.controls['cPurchaseLedger'].setValue((resPurchaseLedger.length > 0) ? resPurchaseLedger[0] : '');
    let resSalesLedger = this.filteredSales.filter(e => e.cAccCode.substr(e.cAccCode.length - 9) == tax.cSalesLedger);
    this.taxDetailForm.controls['cSalesLedger'].setValue((resSalesLedger.length > 0) ? resSalesLedger[0] : '');
    if (tax.cSalesMode == 'S') {
      this.purchaseDropdown = false;
      this.saleseDropdown = false;
    } else if (tax.cSalesMode == 'R') {
      this.purchaseDropdown = true;
      this.saleseDropdown = false;
    }
    let taxv = this.taxDetailForm.get('nTaxType').value;
    let res = this.taxTypeData.filter(e => e.serialNo == taxv);
    if (res.length > 0) {
      if (res[0].codeName == 'CENTRAL') {
        this.enableTaxRate = true;
      }
      else if (res[0].codeName == 'STATE') {
        this.enableTaxRate = true;
      }
      else if (res[0].codeName == 'INTEGRATED') {
        this.enableTaxRate = true;
      }
      else if (res[0].codeName == 'CESS') {
        this.enableTaxRate = false;
      }
    }
    console.log(this.taxDetailForm);
    // console.log(this.taxDetailForm.controls['dEffectDt'].setValue(tax.dEffectDt))
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

  filterGroup() {
    let id = 14;
    this.accountservice.taxInputLedger(id,this.branchId).subscribe((res) => {
      this.filteredGroups = res['data'];
      console.log(this.filteredGroups);
    })
  }

  filterPurchase() {
    let id = 16;
    this.accountservice.purchaseLedger(id,this.branchId).subscribe((res) => {
      this.filteredPurchase = res['data'];
      console.log(this.filteredPurchase);
    })
  }

  filterSales() {
    let id = 17;
    this.accountservice.salesLedger(id,this.branchId).subscribe((res) => {
      this.filteredSales = res['data'];
      console.log(this.filteredSales);
    })
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key);

    // if (event.key === KEY_CODE.RIGHT_ARROW && event.ctrlKey) {
    //   this.increment();
    // }

    // if (event.key === KEY_CODE.LEFT_ARROW && event.ctrlKey) {
    //   this.decrement();
    // }
  }

}
