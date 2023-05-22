import { Component, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ServicesService } from 'src/app/services/services.service';
import { ManageStockService } from '../managestock.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import Utils from '../../helpers/utils';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.component.html',
  styleUrls: ['./manage-transaction.component.scss']
})
export class ManageTransactionComponent implements OnInit {

  menuOptions: MenuItem[];
  trtypes = [];
  issue = [];
  purchaseDialog: Boolean;
  salesDialog: boolean;
  issueDialog: boolean;
  depositDialog: boolean;
  transferDialog: boolean;
  stockItemTableRes: any;
  stockItemForm: FormGroup;
  isCustomer: boolean = false;
  isCustDelivery: boolean = false;
  formDate: any;
  toDate: any;
  trType: any;

  purchaseTableQty: any[] = [];
  sowPurchaseTable: boolean = false;
  currItem: any;
  dStkDate: any;
  public defaultDate: any;
  issueBranchId;
  purchaseForm: FormGroup;
  issueForm: FormGroup;
  depositForm: FormGroup;
  transferForm: FormGroup;
  branchData: any;
  selectedBranch: any = {};
  stocksType = [];
  position: string;
  items = [];
  quantities = [];
  customerData = [];
  employeeData = [];
  stockDetail: FormArray;
  pDate: any;
  response: any;
  stockDetailCustomer: any[] = [];
  showIssueEmpItems: boolean = false;
  otpDialog: boolean = false;
  showCustomerIssue: boolean = true;
  showEmployeeIssue: boolean = false;
  showCustomerDeposit: boolean = true;
  showEmployeeDeposit: boolean = false;
  showCustomerDepositeTable: boolean = false;
  showEmployeeDepositeTable: boolean = false;
  stockUnitData: any = [];
  transferType = []

  itemlist =
    [

    ];

  purchaseItemlist =
    [

    ];
  serialized = [];
  issuePrintDialog: boolean = false;

  constructor(
    private _manageStockService: ManageStockService,
    private servicesService: ServicesService,
    private _formBuilder: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) {

    this.trtypes = [
      { name: 'Purchase', valName: 'P' },
      { name: 'Sales', valName: 'S' },
      { name: 'Issue', valName: 'I' },
      { name: 'Deposit', valName: 'D' },
      { name: 'Transfer', valName: 'T' }
    ]

    this.issue = [
      { name: 'Customer', valName: 'C' },
      { name: 'Employee', valName: 'E' }

    ]

    this.quantities = [
      { qty: 1 },
      { qty: 2 },
      { qty: 3 },
      { qty: 4 },
      { qty: 4 },
      { qty: 5 },
      { qty: 6 },
      { qty: 7 },
      { qty: 8 },
      { qty: 9 },
      { qty: 10 },
      { qty: 11 },
      { qty: 12 },
    ]

    this.stocksType = [
      { name: 'Rent', val: 'R' },
      { name: 'Sale', val: 'S' }
    ]

    this.transferType = [
      { name: 'Stock', valName: 'S' },
      { name: 'Branch', valName: 'B' },
    ]

  }


  showMenuPopup() {
    // console.log(this.trType);
    let pType = this.trType['valName'];
    switch (pType) {
      case "P":
        this.purchasePopUp();
        break;
      case "S":
        this.salesPopUp();
        break;
      case "I":
        this.issuePopUp();
        this.issueForm.reset();
        break;
      case "D":
        this.depositPopUp();
        break;
      case "T":
        this.transferPopUp();
        break;
      default:
        this.purchasePopUp();
        break;
    }
  }
  ngOnInit(): void {

    this.menuOptions = [
      { label: 'Purchase', command: () => { this.purchasePopUp(); } },
      { label: 'Sales', command: () => { this.salesPopUp(); } },
      { label: 'Issue', command: () => { this.issuePopUp(); } },
      { label: 'Deposit', command: () => { this.depositPopUp(); } },
      { label: 'Transfer', command: () => { this.transferPopUp(); } },
    ];
    //  this.getStockItemTableF();
    this.BranchLocation();
    this.getItemList();
    this.getVendorname();
    this.searchCustomerIssueData();
    this.initializePurchaseform();
    this.initializeIssueForm();
    this.initializeDepositForm();
    this.initializeTransferForm();
    this.autoPopulateEmpIssueData();
    this.populateStockUnit();

    let d = new Date();
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.formDate = finalFromDate;
    this.toDate = new Date(finalDate);
    this.defaultDate = d;
    this.commonDate = d;
    // this.purchaseForm.patchValue({
    //   cTrType : this.selectedBranch ,
    // });
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.purchaseDialog = false;
    this.salesDialog = false;
    this.issueDialog = false;
    this.otpDialog = false;
  }

  public commonDate;
  vendorData: any[];
  onTranChange() {
    // this.defaultDate = this.commonDate;
  }

  // get vendorname for purchase
  getVendorname() {
    let LedgerSearch = '';
    const branchId = localStorage.getItem('branchId');
    this._manageStockService.searchVendorStock(LedgerSearch,branchId).subscribe(
      res => {
        this.customerData = res['data'];
        this.vendorData = res['data'];
        console.log(res);
      }
    );
  }
  //  get Item List
  getItemList() {
    this._manageStockService.ItemList().subscribe(
      res => {
        this.items = res['data'];
        console.log(this.items);
      }
    );
  }
  //  get Branch and Location
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.selectBranch()
      }

    );

  }

  selectBranch() {
    this.selectedBranch = this.branchData[0];
    console.log(this.selectedBranch)

  }

  onSelectMethod(event, typ) {
    let d = new Date(event);
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    if (typ == "fromD") {
      this.formDate = finalDate;
    } else {
      this.toDate = finalDate;
    }
  }

  // Stock Item Tab Table Data
  filterManageItem() {
    // console.log(this.trType);
    let transType = this.trType['valName'];
    this._manageStockService.stockItemList(Utils.formatDate(this.formDate), Utils.formatDate(this.toDate), transType).subscribe(
      res => {
        this.stockItemTableRes = res['data'];
        console.log(this.stockItemTableRes);
      }
    )
  }

  initializePurchaseform() {

    this.purchaseForm = this._formBuilder.group({
      cTrType: ['P'],
      dStkDate: [],
      nEmpid: [''],
      nAcid: [''],
      cPonumber: [''],
      cInvoiceNo: [''],
      dInvoiceDate: [''],
      nJobid: [''],
      userName: [''],
      purchaseStockDetail: this._formBuilder.group({
        cStkType: [''],
        nItemid: [''],
        nQty: [''],
        nUnit: [''],
        nRate: [''],
        ncgst: [''],
        nsgst: [''],
        nigst: [''],
        nCess: [''],
        cSerialNo: [''],
        nBranchid: [''],
        nUserid: ['']
      })
    })
  }

  delStock(stockId) {

    // console.log('reached');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._manageStockService.delStock(stockId).subscribe(res => {


          if (res['status'] == 200) {
            this.filterManageItem();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });

          }
          if (res['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Deleted Successfully' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });

  }

  initializeIssueForm() {
    this.issueForm = this._formBuilder.group({
      cTrType: ['I'],
      dStkDate: [''],
      dDeliDate: [''],
      issueTo: [''],
      nAcid: [null],
      issueBranch: [null],
      nJobid: [''],
      nEmpid: [null],
      nDelivered: [null],
      createIssueItem: this._formBuilder.group({
        nItemid: [''],
        cSerialNo: [''],
        nQty: [''],
      }),
    })
  }

  initializeDepositForm() {
    this.depositForm = this._formBuilder.group({
      cTrType: ['D'],
      dStkDate: [''],
      issueTo: [''],
      nAcid: [null],
      nBranchid: [''],
      nJobid: [''],
      nEmpid: [''],
    });
  }

  initializeTransferForm() {
    this.transferForm = this._formBuilder.group({
      cTrType: ['T'],
      dStkDate: [''],
      frmStk: [''],
      toStk: [''],
      transferType: [''],
      nBranchid: [''],
      createTransferItem: this._formBuilder.group({
        nItemid: [''],
        cSerialNo: [''],
        nQty: [''],
        nRate: [''],
      })
    });
  }



  deleteJob(jobD, rowInd) {

    // let rInd = jobD['ind'];
    this.purchaseTableQty.splice(rowInd, 1);

  }

  addItemDetails() {
    let tmpStockDetail = this.purchaseForm.value;

    let tmpObj = {};
    tmpObj['itemName'] = this.currItem['cItemNm'];
    tmpObj['nItemid'] = tmpStockDetail['purchaseStockDetail']['nItemid'];
    tmpObj['nQty'] = tmpStockDetail['purchaseStockDetail']['nQty'];
    tmpObj['nUnit'] = tmpStockDetail['purchaseStockDetail']['nUnit'];
    tmpObj['nRate'] = tmpStockDetail['purchaseStockDetail']['nRate'];
    tmpObj['ncgst'] = tmpStockDetail['purchaseStockDetail']['ncgst'];
    tmpObj['nsgst'] = tmpStockDetail['purchaseStockDetail']['nsgst'];
    tmpObj['nigst'] = tmpStockDetail['purchaseStockDetail']['nigst'];
    tmpObj['nCess'] = tmpStockDetail['purchaseStockDetail']['nCess'];
    tmpObj['cSerialNo'] = tmpStockDetail['purchaseStockDetail']['cSerialNo'];
    tmpObj['stockDetail'] = tmpStockDetail['purchaseStockDetail']['cStkType'];
    tmpObj['nBranchid'] = localStorage.getItem('branchId');
    tmpObj['nUserid'] = localStorage.getItem('loginId');
    this.purchaseTableQty.push(tmpObj);
    //console.log('working');
    console.log(this.purchaseTableQty);
    this.sowPurchaseTable = true;
    this.purchaseForm.patchValue({
      cStkType: '',
      nItemid: '',
      nQty: '',
      nUnit: '',
      nRate: '',
      ncgst: '',
      nsgst: '',
      nigst: '',
      nCess: '',
      cSerialNo: '',
      nBranchid: '',
      nUserid: ''
    })
  }

  empTableQty: any[] = [];
  showGrid: boolean = false;
  addIssueDetails() {
    let tmpStockDetail = this.issueForm.value;
    let tmpObj = {};

    tmpObj['itemName'] = tmpStockDetail['createIssueItem']['nItemid']['cItemNm'];
    tmpObj['nItemid'] = tmpStockDetail['createIssueItem']['nItemid']['nItemid'];
    tmpObj['cSerialNo'] = tmpStockDetail['createIssueItem']['cSerialNo'];
    tmpObj["cStkType"] = "R",

      tmpObj['nQty'] = tmpStockDetail['createIssueItem']['nQty'];
    tmpObj['nBranchid'] = tmpStockDetail['nBranchid'];
    tmpObj['nUserid'] = localStorage.getItem('loginId');

    if (this.isCustomer) {
      tmpObj['nQty'] = 1;
    }
    this.empTableQty.push(tmpObj);
    this.showGrid = true;
    // console.log(this.empTableQty);
    //  console.log(tmpObj['itemName'])
    this.issueForm.patchValue({
      createIssueItem: {
        nItemid: [''],
        cSerialNo: [''],
        nQty: ['']
      }
    });
  }

  transferTable: any[] = [];
  showTranTable: boolean = false;
  addTransferDetails() {
    let tmpStockDetail = this.transferForm.value;
    //console.log(tmpStockDetail);
    let tmpObj = {};
    tmpObj['itemName'] = tmpStockDetail['createTransferItem']['nItemid']['cItemNm'];
    tmpObj['nItemid'] = tmpStockDetail['createTransferItem']['nItemid'];
    tmpObj['cSerialNo'] = tmpStockDetail['createTransferItem']['cSerialNo'];
    tmpObj["cStkType"] = "R",
      tmpObj['nQty'] = tmpStockDetail['createTransferItem']['nQty'];
    tmpObj['nRate'] = tmpStockDetail['createTransferItem']['nRate'];
    tmpObj['nBranchid'] = tmpStockDetail['nBranchid'];
    tmpObj['nUserid'] = localStorage.getItem('loginId');
    this.transferTable.push(tmpObj);
    //console.log(this.transferTable);

    // console.log(tmpStockDetail['createTransferItem']['nItemid'],tmpObj['nItemid'])
    this.showTranTable = true;
    this.transferForm.patchValue({
      createTransferItem: {
        nItemid: [''],
        cSerialNo: [''],
        nQty: [''],
        nRate: [''],
      }
    })
  }


  deliveryDate;
  deliverBy;
  resetFormArray() {
    this.purchaseForm.reset();
    this.stockDetail.clear();
  }

  onChangeDeliverBy(evt) {
    //console.log(evt.value);
    this.deliverBy = evt.value;

  }

  onSelectDate(event) {
    let d = new Date(event);
    this.pDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
    //console.log(finalDate);
  }

  onSelectDeliveryDate(event) {
    let d = new Date(event);
    this.deliveryDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
  }
  onHide() {
    this.purchaseDialog = false;
    this.purchaseForm.reset();
    this.salesDialog = false;
    this.issueDialog = false;
    this.issueForm.reset();
    this.depositDialog = false;
    this.depositForm.reset();
    this.transferDialog = false;
    this.transferForm.reset();
    this.trType = ''
  }


  addPurchaseItems() {
    const formValues = this.purchaseForm.value;
    // console.log(formValues);
    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");
    let stockDetails = this.purchaseForm.value.stockDetail;
    this.purchaseTableQty.forEach((element, index) => {
      this.purchaseTableQty[index]['nUserid'] = userId;
      this.purchaseTableQty[index]['nBranchid'] = branchId;
    });
    // console.log(userId);
    let formData = {};

    formData['cTrType'] = "P";
    formData['dStkDate'] = this.formatDate(this.defaultDate);
    formData['nEmpid'] = null;
    formData['nAcid'] = formValues['nAcid'];
    formData['cPonumber'] = formValues['cPonumber'];
    formData['cInvoiceNo'] = formValues['cInvoiceNo'];
    formData['dInvoiceDate'] = this.formatDate(formValues['dInvoiceDate']);
    formData['nJobid'] = null;
    formData['userName'] = null;
    formData['nUserid'] = userId;
    formData['nBranchid'] = branchId;
    // formData['cStkType'] = this.purchaseTableQty;
    formData['stockDetail'] = this.purchaseTableQty;

    // [{
    //   cStkType: formValues['cStkType'],
    //   nItemid: formValues['nItemid'],
    //   nQty: formValues['nQty']
    // }]

    this._manageStockService.addPurchase(formData).subscribe(
      res => {
        this.response = res;
        console.log('Purchase Stock', res);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
        }
        if (this.response['status'] == 204) {
          console.log('Error')
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }
        this.purchaseForm.reset();
      }
    );
    this.purchaseForm.reset();
    this.purchaseDialog = false;
    // this.purchaseForm.patchValue({
    //   dStkDate: '',
    //   nEmpid: '',
    //   nAcid: '',
    //   cPonumber: '',
    //   cInvoiceNo: '',
    //   dInvoiceDate: '',
    //   nJobid: '',
    //   userName: '',
    //   cStkType: '',
    //   nItemid: '',
    //   nQty: '',
    //   nUnit: '',
    //   nRate: '',
    //   ncgst: '',
    //   nsgst: '',
    //   nigst: '',
    //   nCess: '',
    //   cSerialNo: '',
    //   nBranchid: '',
    //   nUserid: '',

    // })
  }

  populateStockUnit() {
    //= JSON.parse(localStorage.getItem("FILLCODEDATA"))
    let unitData 
    this.employeeService.getctgData(28).subscribe((res:any)=>{
      unitData = res.data
      unitData.forEach(element => {
        if (element['ctgID'] == 28) {
          this.stockUnitData.push(element);
        }
      })
     })
    
    
  }

  mobileNo: string;
  saveButtonEnabled: boolean = true;
  showSerializedErr: boolean = false;
  public stockTypeIssue: string = "R";
  public errorChipsValues: string = "";
  addChips(evt, itemId, ind, approveQty) {
    //console.log(evt);

    let chipVal = evt['value'];
    let branchId = this.issueForm.get('issueBranch').value;
    this._manageStockService.validateSerialized(itemId, chipVal, branchId, this.stockTypeIssue).subscribe((res) => {
      let data = res['data'][0];
      if (!data['cStatus']) {
        this.saveButtonEnabled = false;
        this.errorChipsValues = this.errorChipsValues + "," + chipVal;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Serial No- ' + chipVal + ' is Invalid , please try something else' });
      } else {

        let tmpTableSrNo = this.empTableQty[ind]['cSerialNo'] ? this.empTableQty[ind]['cSerialNo'] : "";
        this.empTableQty[ind]['cSerialNo'] = tmpTableSrNo + "," + chipVal;
        let tmpString = tmpTableSrNo + "," + chipVal;
        let splittedString = tmpString.split(",");
        if ((splittedString.length - 1) > approveQty) {
          this.showSerializedErr = true;
          this.saveButtonEnabled = false;
        } else {
          this.showSerializedErr = false;
          this.saveButtonEnabled = true;
        }
      }


      let tmpTableSrNo = this.empTableQty[ind]['cSerialNo'] ? this.empTableQty[ind]['cSerialNo'] : "";
      console.log(tmpTableSrNo.length);
      if (tmpTableSrNo > 1) {
        this.saveButtonEnabled = true;


      } else {

        this.saveButtonEnabled = false;
      }

      if (tmpTableSrNo.length > 1) {
        let splittedString = tmpTableSrNo.split(",");

        if ((splittedString.length - 1) > approveQty) {
          this.showSerializedErr = true;
          this.saveButtonEnabled = false;
        } else {
          this.showSerializedErr = false;
          this.saveButtonEnabled = true;
        }
      }

      if (this.errorChipsValues.length > 2) {
        this.saveButtonEnabled = false;
      } else {
        this.saveButtonEnabled = true;
      }

    }, (error) => { });
  }

  removeChips(evt, itemId, ind, approveQty) {
    let chipVal = evt['value'];
    if (this.errorChipsValues.length > 1) {
      let slicedString = this.errorChipsValues;

      if (this.errorChipsValues[0] == ',') {
        slicedString = this.errorChipsValues.substring(1);
      }
      if (slicedString.endsWith(",")) {
        slicedString = slicedString.substring(0, slicedString.length - 1);
      }
      let splittedErrorChipsValue = slicedString.split(",");
      let indexOfRemovedVal = splittedErrorChipsValue.indexOf(chipVal);
      if (indexOfRemovedVal > -1) {
        splittedErrorChipsValue.splice(indexOfRemovedVal, 1);
      }
      this.errorChipsValues = splittedErrorChipsValue.join(",");
      //console.log(this.errorChipsValues);
      this.saveButtonEnabled = false;
    } else {
      this.saveButtonEnabled = true;
    }


    if (this.empTableQty[ind].hasOwnProperty('cSerialNo')) {
      let tmpString = this.empTableQty[ind]['cSerialNo'];
      let splittedString = tmpString.split(",");
      let findTmpStringIndex = splittedString.indexOf(evt.value);
      if (findTmpStringIndex > -1) {
        splittedString.splice(findTmpStringIndex, 1);
      }
      this.empTableQty[ind]['cSerialNo'] = splittedString.join(",");
      //  console.log(findTmpString);
      if ((splittedString.length - 1) > approveQty) {
        this.showSerializedErr = true;
        this.saveButtonEnabled = false;
      } else {
        this.showSerializedErr = false;
        this.saveButtonEnabled = true;
      }
    }

    if (this.errorChipsValues.length > 1) {
      this.saveButtonEnabled = false;
    } else {
      this.saveButtonEnabled = true;
    }
  }
  // isSaveEnabled:boolean = false;
  totalQtyEmp: number = 0;
  getIssueJobno(jobId) {
    //console.log(evt.target.value);

    this.empTableQty = [];
    this._manageStockService.getJobNo(jobId).subscribe(
      res => {
        let tmpData = res['data'];

        //this.issueForm.patchValue({"nAcid":tmpData['cCustNm']});
        tmpData.forEach((element, index) => {
          let jobIssueNO = {};
          let tmpQty = element['stockBalance'] < 1 ? 0 : 1;
          jobIssueNO['itemName'] = element['cItemNm'];
          jobIssueNO['nItemid'] = element['nItemid'];
          jobIssueNO['approveItemQty'] = element['approveItemQty'];
          jobIssueNO['customerInHand'] = element['customerInHand'];
          jobIssueNO['stockBalance'] = element['stockBalance'];
          jobIssueNO['nBranchid'] = this.issueForm.get('issueBranch').value;
          jobIssueNO['nQty'] = tmpQty;
          this.totalQtyEmp = this.totalQtyEmp + tmpQty;
          // this.mobileNo = tmpData['cMobile'];
          jobIssueNO['nUserid'] = localStorage.getItem('loginId');
          jobIssueNO['cSrlzd'] = element['cSrlzd'];
          if (element['cSrlzd'] && (element['stockBalance'] >= element['approveItemQty'])) {
            this.saveButtonEnabled = false;
          }


          this.empTableQty.push(jobIssueNO);
        });

        // if(this.totalQtyEmp <1){
        //   this.saveButtonEnabled = false;
        // }else{
        //   this.saveButtonEnabled = true;
        // }
        this.showGrid = true;
        this.response = res;
        // console.log('Issue job no', res);
        // if (this.response['status'] == 200) {
        //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job no Match' });
        // }
        if (this.response['status'] == 204) {
          console.log('Error')
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }
      }
    )
    //salert('HI')
  }

  removeIssueItem(nItemId) {
    this.empTableQty = Utils.removeByAttr(this.empTableQty, 'nItemid', nItemId);
  }

  addIssueItem() {
    console.log('Hello2');
    //console.log('reached.......');
    const formValues = this.issueForm.value;
    // console.log(formValues);

    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");

    let formData = {};
    let issueTo = formValues['issueTo'];

    if (issueTo === 'C') {
      console.log(this.stockDetailCustomer);
      formData['nEmpid'] = null;
      formData['nAcid'] = formValues['cCustomer'];
      formData['stockDetail'] = this.stockDetailCustomer;
    } else {

      let stockDetails = this.purchaseForm.value.stockDetail;
      stockDetails.forEach((element, index) => {
        stockDetails[index]['nUserid'] = userId;
        stockDetails[index]['nBranchid'] = branchId;
      });
      formData['nAcid'] = null;
      formData['nEmpid'] = formValues['nEmpid'];
      formData['stockDetail'] = stockDetails;
    }

    formData['cTrType'] = "I";
    formData['dStkDate'] = this.pDate;
    formData['nJobid'] = formValues['nJobid'];
    formData['issueTo'] = formValues['issueTo'];
    formData['cCustomer'] = formValues['cCustomer'];
    formData['nUserid'] = userId;
    formData['nBranchid'] = branchId;


    console.log(formData);
    this._manageStockService.addIssue(formData).subscribe(
      res => {
        this.response = res;
        console.log('Issue Stock', res);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
        }
        if (this.response['status'] == 204) {
          console.log('Error')
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

        this.issueForm.reset();
      }
    );
  }

  onIssueChange(evt) {
    console.log(evt.value)
    if (evt.value == 'C') {
      this.isCustomer = true;
      this.searchCustomerIssueData();
      this.showIssueEmpItems = false;
      this.showCustomerIssue = true;
      this.showEmployeeIssue = false;
      this.showCustomerDeposit = true;
      this.showEmployeeDeposit = false;
      this.isCustDelivery = true;
    } else {
      this.isCustomer = false;
      this.autoPopulateEmpIssueData();
      this.showIssueEmpItems = true;
      this.showCustomerIssue = false;
      this.showEmployeeIssue = true;
      this.showCustomerDeposit = false;
      this.showEmployeeDeposit = true;
      this.isCustDelivery = false;
    }
  }
  public cMobileNumber: any;
  searchCustomerIssueData() {
    let LedgerSearch = '';
    this._manageStockService.searchCustIssueData(LedgerSearch).subscribe(
      res => {
        this.customerData = res['data'];
        this.cMobileNumber = this.customerData[0]['addresses'][0]['cMobile']
        console.log(this.cMobileNumber);
      }
    );
  }
  jobData: any[] = [];
  jobModel: any;
  public filteredGroups: any[];
  filterJobs(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.jobData.length; i++) {
      let group = this.jobData[i];
      if (group.cJobNo.indexOf(query) == 0) {
        filtered.push(group.cJobNo);
      }
    }
    //  console.log('calling.....', filtered);
    this.filteredGroups = filtered;
  }

  itemChangePurchase(evt) {
    // console.log(this.items);
    // console.log(evt);

    const itm = this.items.filter(e => e.nItemid == evt['value']);

    this.currItem = itm[0];
    console.log(this.currItem);
    if (itm[0]['cSrlzd'] != 'N') {
      this.showSn = true;
    } else {
      this.showSn = false;
    }
    // console.log(itm);

  }

  public currAcid;
  public showSn: boolean = false;

  selectJob(evt) {
    //console.log(evt);
    // console.log(this.customerData);
    let jobid = evt['nJobid'];
    let custName = evt['cCustNm'];
    this.currAcid = evt['nAcid'];
    const fJob = this.customerData.filter(e => e.cLedgerNm == custName);
    // console.log(fJob);
    this.cMobileNumber = fJob[0]['addresses'][0]['cMobile'];
    this.issueForm.patchValue({ "nAcid": custName });


    this.getIssueJobno(jobid);

    //console.log(evt);


  }
  branchId: any;
  onIssueBranchChange(evt) {
    this.issueBranchId = evt.value;
  }
  searchJobIssueData(event) {
    let q = event.query;
    //  console.log(this.branchId);

    let branch = this.issueForm.get('issueBranch').value;
    this._manageStockService.loadJobData(q, this.issueBranchId).subscribe((res) => {
      this.jobData = res['data'];
    }, (err) => { });
    console.log(q);
  }


  autoPopulateEmpIssueData() {
    let LedgerSearch = '';
    let loginId = localStorage.getItem("loginId");
    this._manageStockService.autopopulateEmpIssueData(LedgerSearch, loginId).subscribe(
      res => {
        this.employeeData = res['data'];
        // this.cMobileNumber = this.employeeData[1]['cMobile1'];
        console.log(this.employeeData);
        // console.log(this.cMobileNumber);
      }
    );
  }


  depositTableQty: any[] = []
  getDepositJobNo(evt) {
    //console.log(evt.target.value);

    this.depositTableQty = [];
    this._manageStockService.getJobNo(evt.target.value).subscribe(
      res => {
        let tmpData = res['data'];
        console.log(tmpData)
        this.issueForm.patchValue({ "nAcid": tmpData['nAcid'] });
        tmpData['jobService'].forEach(element => {
          let jobIssueNO = {};
          jobIssueNO['itemName'] = element['item'];
          jobIssueNO['nItemid'] = element['nItemid'];
          jobIssueNO['cSerialNo'] = 0;
          jobIssueNO['cStkType'] = "R";
          jobIssueNO['nBranchid'] = this.issueForm.get('nBranchid').value;
          jobIssueNO['nQty'] = 0;
          jobIssueNO['nUserid'] = localStorage.getItem('loginId');



          this.depositTableQty.push(jobIssueNO);
        });
        //this.showGrid = true;
        this.response = res;
        // console.log('Issue job no', res);
        // if (this.response['status'] == 200) {
        //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job no Match' });
        // }
        if (this.response['status'] == 204) {
          console.log('Error')
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }
      }
    )
    //salert('HI')
  }

  qntyWrong: boolean = false;
  nQuanty(evt) {
    console.log(evt.key);
    // console.log(this.empTableQty);
    // console.log(this.empTableQty[0]['nQty']);
    if ((evt.key !== this.empTableQty[0]['nQty']) && (evt.key > this.empTableQty[0]['nQty'])) {
      this.qntyWrong = true;
    } else if (evt.key == '') {
      this.qntyWrong = false;
    }
  }

  addDepositItem() {
    const formValues = this.depositForm.value;
    console.log(formValues);
    let formData = {};

    let existingFormValues = this.depositForm.value;

    formData['cTrType'] = "D";
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nEmpid'] = existingFormValues['nEmpid'];
    formData['nAcid'] = existingFormValues['nAcid']['nAcid'];
    formData['nUserid'] = localStorage.getItem('loginId');
    if (this.isCustomer) {
      formData['stockDetail'] = this.depositTableQty;
    } else {
      formData['stockDetail'] = this.empDepositTabaleQty;
    }


    console.log(formData);
    this._manageStockService.addDeposit(formData).subscribe(
      res => {
        this.response = res;
        console.log('Deposit Stock', res);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
        }
        if (this.response['status'] == 204) {
          console.log('Error')
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.response['errorMessage'] });
        }
        this.depositForm.reset();
      }
    );

  }

  onDepositChange(evt) {
    console.log(evt.value);
    this.depositTableQty = [];
    if (evt.value == 'C') {
      this.isCustomer = true;

      this.showCustomerDeposit = true;
      this.showEmployeeDeposit = false;
      this.showCustomerDepositeTable = true;
      this.showEmployeeDepositeTable = false;

    } else {
      this.isCustomer = false;
      this.autoPopulateEmpIssueData();
      this.showCustomerDeposit = false;
      this.showEmployeeDeposit = true;
      this.showEmployeeDepositeTable = true;
      this.showCustomerDepositeTable = false;
    }
  }

  empDepositTabaleQty: any[] = [];
  onChangeEmpid(evt) {

    let empid = evt.value;
    console.log(empid)
    this._manageStockService.getEmpDepositData(empid).subscribe(res => {
      let tmpData = res['data'];
      tmpData.forEach(element => {
        let jobIssueNO = {};
        jobIssueNO['itemName'] = element['itemName'];
        jobIssueNO['nItemid'] = element['nItemid'];
        jobIssueNO['cSerialNo'] = element['cSerialNo'];
        jobIssueNO['cStkType'] = "R";
        jobIssueNO['nBranchid'] = element['nBranchid'];
        jobIssueNO['nQty'] = element['nQty'];
        jobIssueNO['nUserid'] = element['nUserid'];

        this.empDepositTabaleQty.push(jobIssueNO);
        console.log(this.empDepositTabaleQty)
      })
    })
  }




  public stockDetailsTransfer: any[] = [];
  addTransferItem() {
    // const formValues = this.transferForm.value;
    // console.log('t value',formValues);

    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");


    let formData = {};
    let existingFormValues = this.transferForm.value;
    // let stockDetails = existingFormValues['createTransferItem'];
    // stockDetails.forEach((element,index) => {
    //   stockDetails[index]['nUserid'] = userId;
    //   stockDetails[index]['nBranchid'] = branchId;
    // });



    formData['cTrType'] = existingFormValues['cTrType'];
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['transferType'] = existingFormValues['transferType'];
    formData['frmStk'] = existingFormValues['frmStk'];
    formData['toStk'] = existingFormValues['toStk'];
    formData['nUserid'] = userId;
    formData['nBranchid'] = branchId;
    formData['stockDetail'] = this.transferTable;

    console.log('t data', formData);
    this._manageStockService.addTransfer(formData).subscribe(
      res => {
        this.response = res;
        console.log('Transfer data 3', res);
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
        }
        if (this.response['status'] == 204) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }
        this.transferForm.reset();
      }
    );

  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  otpValue: any;
  stockId;
  validateOtp() {
    // this.mobileNo = '9015370897';
    let existingFormValues = this.issueForm.value;
    // console.log(existingFormValues);
    let formData = {};

    formData['cTrType'] = existingFormValues['cTrType'];
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nEmpid'] = existingFormValues['nEmpid'];
    formData['nAcid'] = existingFormValues['nJobid']['nAcid'];
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['stockDetail'] = this.empTableQty;
    console.log(formData);
    let tmpEmp = existingFormValues['nEmpid'] ? existingFormValues['nEmpid'] : 0;
    let tmpAcid = existingFormValues['nJobid'] ? existingFormValues['nJobid']['nAcid'] : 0;
    this._manageStockService.validateOtp(localStorage.getItem('loginId'), tmpEmp, tmpAcid, this.cMobileNumber, this.otpValue).subscribe(

      (res) => {

        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });

          this.otpDialog = false;

          this.stockId = res['data']['nStkid'];
          //   this._manageStockService.addIssue(formData).subscribe(
          //   res => {
          //     this.response = res;
          //     if (this.response['status'] == 200) {
          //       this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
          //       this.issueForm.reset();
          //     }
          //     if (this.response['status'] == 204) {
          //       //  this.messageService.add(this.response.errorMessage)
          //       this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          //     }
          //   }
          // );

          this.empTableQty = [];
          this.issueForm.reset();
          this.issueDialog = false;
          this.issueBranchId = null;
          window.location.reload();
        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

      },
      (error) => {

      }
    )



  }
  currentOtpJobnAcId: any;
  showOTPDialog() {
    // console.log(this.issueForm.value);
    // console.log(this.empTableQty);
    let existingFormValues = this.issueForm.value;
    this.currentOtpJobnAcId = existingFormValues['nJobid']['nAcid'];
    this.mobileNo = this.cMobileNumber;
    let formData = {};

    formData['cTrType'] = existingFormValues['cTrType'] ? existingFormValues['cTrType'] : "I";
    formData['dStkDate'] = this.formatDate(existingFormValues['dStkDate']);
    formData['nEmpid'] = existingFormValues['nEmpid'];
    formData['nAcid'] = existingFormValues['nJobid']['nAcid'];
    formData['nUserid'] = localStorage.getItem('loginId');
    formData['stockDetail'] = this.empTableQty;
    formData['dDeliveryDueDate'] = this.deliveryDate;
    formData['nDeliveredBy'] = this.deliverBy;
    formData['nJobid'] = existingFormValues['nJobid']['nJobid']
    formData['cStkType'] = "R";

    let tmpEmp = existingFormValues['nEmpid'] ? existingFormValues['nEmpid'] : 0;
    let tmpAcid = existingFormValues['nAcid'] ? existingFormValues['nAcid'] : 0;
    this._manageStockService.sendOtp(localStorage.getItem('loginId'), tmpEmp, this.currAcid, this.mobileNo, formData).subscribe(

      (res) => {

        if (res['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
          this.otpDialog = true;

        }
        if (res['status'] == 204) {
          //  this.messageService.add(this.response.errorMessage)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
        }

      },
      (error) => {

      }
    )





  }


  purchasePopUp() {
    this.purchaseDialog = true;
  }

  salesPopUp() {
    this.salesDialog = true;
  }

  issuePopUp() {
    this.initializeIssueForm();
    this.issueDialog = true;
    this.issueBranchId = null;
  }

  depositPopUp() {
    this.depositDialog = true;
  }

  transferPopUp() {
    this.transferDialog = true;
  }

  pdfData: any;
  stockData: any[] = [];
  issuePrint() {
    this.issuePrintDialog = true;
    //this.stockId
    this._manageStockService.issuePrint(this.stockId).subscribe((data) => {
      this.pdfData = data['data'];
      console.log(this.stockData = this.pdfData['stockDetails']);
    });
  }

  generatePDF() {

    var element = document.getElementById('contentToConvert');
    //console.log(data);
    let options = {
      imageTimeout: 25000000000000000,
      background: "white",
      allowTaint: true,
      useCORS: false,
      height: 1500,
      width: 1200
    };
    setTimeout(() => {

      html2canvas(element, options).then(canvas => {
        // Few necessary setting options

        let imgData = canvas.toDataURL('image/png');

        let imgWidth = 195,
          pageHeight = 310,
          imgHeight = canvas.height * imgWidth / canvas.width,
          heightLeft = imgHeight,
          doc = new jspdf('p', 'mm', 'a4'),

          position = 0;

        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        let blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf' });
        let blobUrl = URL.createObjectURL(blobPDF);
        window.open(blobUrl);
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      });
    }, 3000);
  }

  editStockTrans(stkId){
    
  }

}
