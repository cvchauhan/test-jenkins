import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import Utils from '../../helpers/utils';
import { ManageStockService } from '../managestock.service';
import { ServicesService } from 'src/app/services/services.service';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';

@Component({
  selector: 'app-stock-purchase',
  templateUrl: './stock-purchase.component.html',
  styleUrls: ['./stock-purchase.component.scss']
})
export class StockPurchaseComponent implements OnInit {
  formDate: any;
  toDate: any;
  stockItemTableRes: any[] = [];
  purchaseDialog: boolean = false;
  purchaseForm: FormGroup;
  currItem: any;
  rows = 15;
  isEditStockPurchase: boolean = false;
  public showSn: boolean = false;
  purchaseTableQty: any[] = [];
  sowPurchaseTable: boolean = false;
  items = [];
  editResponseById: any;
  pDate: any;
  selectedBranch: any = {};
  selectedBranchPopup: any = {};
  selectedVendorPopup: any = {};
  branchData: any;
  modeData: any = {};
  vendorData: any[];
  customerData = [];
  stocksType = [];
  selectedStock: any = {};
  stockUnitData: any = [];
  entryModeData: any = [];
  response: any;
  public defaultDate: any;
  public defaultInvoiceDate: any;
  stockid: any;


  constructor(private _manageStockService: ManageStockService, private messageService: MessageService, private confirmationService: ConfirmationService,
    private fb: FormBuilder, private servicesService: ServicesService,private employeeService: EmployeeService) {
    this.purchaseForm = this.fb.group({
      cTrType: ['P'],
      dStkDate: [],
      nEmpid: [''],
      nAcid: [''],
      cPonumber: [''],
      cInvoiceNo: [''],
      dInvoiceDate: [''],
      nJobid: [''],
      userName: [''],
      entryMode: [''],
      purchaseStockDetail: this.fb.group({
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
    });
  }
  stockType() {
    this.stocksType = [
      { name: 'Rent', val: 'R' },
      { name: 'Sale', val: 'S' },
      { name: 'Internal Use', val: 'I' }
    ]

  }

  ngOnInit(): void {
    localStorage.removeItem('branchData');
    this.stockType();
    this.selectStock();
    this.populateStockUnit();
    this.getItemList();
    this.BranchLocation();
    this.getVendorname();
    this.getDefaultDate();
    this.bindEntryMode();
  }

  bindEntryMode() {
    this.entryModeData = [
      { txt: 'CHALLAN', val: 'C' },
      { txt: 'INVOICE', val: 'I' }
    ]
    if (this.entryModeData.length > 0) {
      this.modeData = this.entryModeData[0];
    }
  }

  getDefaultDate() {
    let d = new Date();
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.formDate = finalFromDate;
    this.toDate = new Date(finalDate);
    this.defaultDate = d;
    this.defaultInvoiceDate = d;
  }

  filterManageItem() {
    this.branchData =JSON.parse(localStorage.getItem('branchData'));
    let selBranch = this.branchData.filter(e => e.txt == this.selectedBranch['txt']);
    let transType = 'P';
    let Status = 'P';
    this._manageStockService.StockTransList(Utils.formatDate(this.formDate), Utils.formatDate(this.toDate), transType, selBranch[0]['val'], Status).subscribe(
      res => {
        this.stockItemTableRes = res['data'];
      }
    )
  }
  editStockPurchaseJob(id, Status) {
    //this.bindEntryMode();
    this.selectedVendorPopup = {}
    this.stockid = id;
    this.getDefaultDate();
    this.getVendorname();
    this.isEditStockPurchase = true;
    this._manageStockService.StockByID(id).subscribe(
      res => {
        this.editResponseById = res['data'];
        this.branchData = JSON.parse(localStorage.getItem('branchData'));
        const branchData = this.branchData.filter(e => e.val == this.editResponseById['nBranchid']);
        
        if (branchData.length > 0) {
          this.selectedBranchPopup = branchData[0];
        }
        const filvendorData = this.vendorData.filter(e => e.nAcid == this.editResponseById['nAcid']);
        if (filvendorData.length > 0) {
          this.selectedVendorPopup = filvendorData[0];
          // this.purchaseForm.get('nAcid').setValue(this.editResponseById['nAcid']);
        }
        let modeData1 = this.entryModeData.filter(e => e.txt == Status.trim());
        if (modeData1.length > 0) {
          this.modeData = modeData1[0];
        }
        let ChallanInvoice;
        if(this.editResponseById['cInvoiceNo']!=""  && this.editResponseById['cInvoiceNo']!=null)
        {
          this.modeData = this.entryModeData[1];
          ChallanInvoice=this.editResponseById['cInvoiceNo'];
        }
        else if(this.editResponseById['cChallanNo']!="" && this.editResponseById['cChallanNo']!=null)
        {
          this.modeData = modeData1[0];
          ChallanInvoice=this.editResponseById['cChallanNo'];
        }
        this.purchaseForm.patchValue({
          dStkDate: new Date(this.editResponseById['dStkDate']),
          cInvoiceNo: ChallanInvoice,
          // nAcid: filvendorData[0]
          // entryMode:modeData1[0]
        });
        this.purchaseTableQty = this.editResponseById['stockDetail'];
        if (this.purchaseTableQty.length > 0) {
          this.sowPurchaseTable = true;
        }
        else {
          this.sowPurchaseTable = false;
        }
      }
    )
    setTimeout(() => {
      this.purchaseDialog = true;
    }, 200);
  }

  first = 0;
  next() {
    this.first = this.first + this.rows;
  };
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        localStorage.setItem('branchData', JSON.stringify(res['data']));
        this.selectBranch()
      });
  }

  selectBranch() {
    this.selectedBranch = this.branchData[0];
    this.selectedBranchPopup = this.branchData[0];
  }

  selectStock() {
    this.selectedStock = this.stocksType[0];
  }

  getVendorname() {
    let LedgerSearch = '';
    const branchId = localStorage.getItem('branchId');
    this._manageStockService.searchVendorStock(LedgerSearch, branchId).subscribe(
      res => {
        this.customerData = res['data'];
        this.vendorData = res['data'];
        console.log(res);
      }
    );
  }

  populateStockUnit() {
    // JSON.parse(localStorage.getItem("FILLCODEDATA"))
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

  addPopup() {
    this.isEditStockPurchase = false;
    this.purchaseDialog = false;
    this.purchaseDialog = true;
    this.purchaseTableQty = [];
    this.sowPurchaseTable = false;
    this.getDefaultDate();
    this.selectStock();
    this.branchData=JSON.parse(localStorage.getItem('branchData'));
    this.selectedBranchPopup = this.branchData[0];
    this.bindEntryMode();
  }

  editStockTrans() {

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

  addItemDetails() {
    let d = new Date();
    const pDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;

    let tmpStockDetail = this.purchaseForm.value;
    this.stockType();
    const Stock = this.stocksType.filter(
      book => book.val === tmpStockDetail['purchaseStockDetail']['cStkType']);
    let tmpObj = {};
    tmpObj['itemName'] = this.currItem['cItemNm'];
    tmpObj['nItemid'] = tmpStockDetail['purchaseStockDetail']['nItemid'];
    tmpObj['nQty'] = Number(tmpStockDetail['purchaseStockDetail']['nQty']);
    // tmpObj['nUnit'] = tmpStockDetail['purchaseStockDetail']['nUnit'];
    tmpObj['nRate'] = Number(tmpStockDetail['purchaseStockDetail']['nRate']);
    tmpObj['ncgst'] = tmpStockDetail['purchaseStockDetail']['ncgst'];
    tmpObj['nsgst'] = tmpStockDetail['purchaseStockDetail']['nsgst'];
    tmpObj['nigst'] = tmpStockDetail['purchaseStockDetail']['nigst'];
    tmpObj['nCess'] = tmpStockDetail['purchaseStockDetail']['nCess'];
    tmpObj['cSerialNo'] = tmpStockDetail['purchaseStockDetail']['cSerialNo'];
    tmpObj['stockDetail'] = (Stock != undefined) ? Stock[0].val : "";
    tmpObj['nBranchid'] = localStorage.getItem('branchId');
    tmpObj['nUserid'] = localStorage.getItem('loginId');
    tmpObj['cStkType'] = (Stock != undefined) ? Stock[0].val : "";
    tmpObj['stockType'] = (Stock != undefined) ? Stock[0].name : "";
    tmpObj['cDelStatus'] ="N";
    tmpObj['cItemCond'] = "O";
    tmpObj['nStkdid'] = 0;
    tmpObj['dCreateDate'] = pDate;
    tmpObj['nStkid'] = this.stockid;
    this.purchaseTableQty.push(tmpObj);
    //console.log('working');
    console.log(this.purchaseTableQty);
    this.sowPurchaseTable = true;
    this.purchaseForm.patchValue({
      purchaseStockDetail:{
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
      },

    })

  }

  getItemList() {
    this._manageStockService.ItemList().subscribe(
      res => {
        this.items = res['data'];
        console.log(this.items);
      }
    );
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

  onSelectDate(event) {
    let d = new Date(event);
    this.pDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
    //console.log(finalDate);
  }

  deleteJob(jobD, rowInd) {

    // let rInd = jobD['ind'];
    this.purchaseTableQty.splice(rowInd, 1);

  }

  onHide() {
    this.purchaseDialog = false;
    this.purchaseForm.reset();
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
    formData['nAcid'] = this.editResponseById.nAcid;
    formData['cPonumber'] = formValues['cPonumber'];
    formData['cInvoiceNo'] = formValues['cInvoiceNo'];
    formData['dInstDate'] = this.formatDate(formValues['dInvoiceDate']);
    formData['nJobid'] = null;
    formData['userName'] = this.editResponseById.UserName;
    formData['accName'] = this.selectedVendorPopup.cDisplayNm;
    formData['nUserid'] = userId;
    formData['nBranchid'] = (this.selectedBranchPopup!=null)?this.selectedBranchPopup.val:0;
    formData['transferType'] = this.editResponseById.transferType;
    // formData['cStkType'] = 'P';
    // formData['cStkType'] = this.purchaseTableQty;
    formData['stockDetail'] = this.purchaseTableQty;
    let resEntryMode = this.modeData?.val;
    if (resEntryMode == "C") {
      formData['cChallanNo'] = formValues['cInvoiceNo'];
      formData['cInvoiceNo'] = null;
    }
    else if (resEntryMode == "I") {
      formData['cInvoiceNo'] = formValues['cInvoiceNo'];
      formData['cChallanNo'] = null;
    }
    // [{
    //   cStkType: formValues['cStkType'],
    //   nItemid: formValues['nItemid'],
    //   nQty: formValues['nQty']
    // }]
    if (this.isEditStockPurchase == true) {
      formData['nStkid'] = this.stockid;
      this._manageStockService.EditPurchase(formData).subscribe(
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
          this.purchaseTableQty = [];
          this.sowPurchaseTable = false;
          // this.getDefaultDate();
          this.filterManageItem();
        }
      );
    }
    else {
      formData['nStkid'] = "0";
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
          this.purchaseTableQty = [];
          this.sowPurchaseTable = false;
          this.getDefaultDate();
          this.filterManageItem();
        }
      );
    }
    this.purchaseForm.reset();
    this.purchaseDialog = false;
    this.purchaseTableQty = [];
    this.sowPurchaseTable = false;
    this.getDefaultDate();
  }

  ChangeEntryMode(evt) {
    let modeData1 = this.entryModeData.filter(e => e?.val == evt.value);
    if (modeData1.length > 0) {
      this.modeData = modeData1[0];
    }
  }
  ChangeVendor(evt)
  {
    const filvendorData = this.vendorData.filter(e => e.nAcid == evt.value);
    if (filvendorData.length > 0) {
      this.selectedVendorPopup = filvendorData[0];
    }
  }
  ChangeBranch(evt)
  {
    this.branchData = JSON.parse(localStorage.getItem('branchData'));
    const branchData = this.branchData.filter(e => e.val == evt.value);
    if (branchData.length > 0) {
      this.selectedBranchPopup = branchData;
    }
  }

  approvalSend(item){
      const payload = {
        StockId: item.NStkid,
        Status: 'A'
      }

      this._manageStockService.stockStatusUpdate(payload).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data'].msg });

        this.getDefaultDate();
        this.filterManageItem();
      })
  }
}
