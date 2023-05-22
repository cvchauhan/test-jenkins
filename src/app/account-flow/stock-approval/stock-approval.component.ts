import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Utils from 'src/app/helpers/utils';
import { ServicesService } from 'src/app/services/services.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-stock-approval',
  templateUrl: './stock-approval.component.html',
  styleUrls: ['./stock-approval.component.css']
})
export class StockApprovalComponent implements OnInit {

  formDate: any;
  toDate: any;
  public defaultDate: any;
  public defaultInvoiceDate: any;
  selectedBranch: any = {};
  selectedBranchPopup: any = {};
  selectedVendorPopup: any = {};
  branchData: any;
  rows = 15;
  editResponseById: any;
  first = 0;
  stockid: any;
  vendorData: any[];
  customerData = [];
  stocksType = [];
  selectedStock: any = {};
  stockUnitData: any = [];
  items = [];
  statusData:any = [
     { name : 'PENDING',value : 'A'},
     { name : 'APPROVED',value : 'V'}
  ]
  public showSn: boolean = false;
  isEditStockPurchase: boolean = false;
  purchaseDialog: boolean = false;

  selectedStatus:any = this.statusData[0];
  purchaseForm: FormGroup;
  modeData: any = {};
  entryModeData: any = [];
  purchaseTableQty: any[] = [];
  sowPurchaseTable: boolean = false;

  stockApprovalItemTableRes: any[] = [];
  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private servicesService: ServicesService,
    private fb: FormBuilder
  ) {
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

  ngOnInit(): void {
    this.BranchLocation();
    this.getDefaultDate();
    this.getVendorname();
    this.stockType();
    this.selectStock();
    this.populateStockUnit();
    this.getItemList();

    setTimeout(() => {
      this.filterManageItem();
    }, 2000);
  }

  stockType() {
    this.stocksType = [
      { name: 'Rent', val: 'R' },
      { name: 'Sale', val: 'S' },
      { name: 'Internal Use', val: 'I' }
    ]

  }

  populateStockUnit() {
    let unitData = JSON.parse(localStorage.getItem("FILLCODEDATA"))
    unitData.forEach(element => {
      if (element['ctgID'] == 28) {
        this.stockUnitData.push(element);
      }
    })
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

  selectStock() {
    this.selectedStock = this.stocksType[0];
  }

  getVendorname() {
    let LedgerSearch = '';
    const branchId = localStorage.getItem('branchId');
    this.accountService.searchVendorStock(LedgerSearch, branchId).subscribe(
      res => {
        this.customerData = res['data'];
        this.vendorData = res['data'];
        console.log(res);
      }
    );
  }

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        localStorage.setItem('branchData', JSON.stringify(res['data']));
        this.selectBranch()
      });
  }

  getItemList() {
    this.accountService.ItemList().subscribe(
      res => {
        this.items = res['data'];
        console.log(this.items);
      }
    );
  }

  onHide() {
    this.purchaseDialog = false;
    this.purchaseForm.reset();
  }


  selectBranch() {
    this.selectedBranch = this.branchData[0];
    this.selectedBranchPopup = this.branchData[0];
  }

  editStockPurchaseJob(id, Status) {
    //this.bindEntryMode();
    this.stockid = id;
    this.getDefaultDate();
    this.isEditStockPurchase = true;
    this.purchaseDialog = true;
    this.accountService.StockByID(id).subscribe(
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
        }
        let modeData1 = this.entryModeData.filter(e => e.txt == Status.trim());
        if (modeData1.length > 0) {
          this.modeData = modeData1[0];
        }
        let ChallanInvoice;
        if(this.editResponseById['cInvoiceNo']!=""  && this.editResponseById['cInvoiceNo']!=null)
        {
          this.modeData = modeData1[1];
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
          nAcid: filvendorData[0]
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
  }

  filterManageItem(){
    this.branchData =JSON.parse(localStorage.getItem('branchData'));
    let selBranch = this.branchData.filter(e => e.txt == this.selectedBranch['txt']);
    debugger
    let transType = 'P';
    let Status =  this.selectedStatus.value;
    this.accountService.StockTransList(Utils.formatDate(this.formDate), Utils.formatDate(this.toDate), transType, selBranch[0]['val'], Status).subscribe(
      res => {
        this.stockApprovalItemTableRes = res['data'];
      }
    )
  }

  statusUpdate(status){
    const payload = {
      StockId: this.stockid,
      Status: status
    }

    this.accountService.stockStatusUpdate(payload).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data'].msg });

      this.onHide();
      this.getDefaultDate();
      this.filterManageItem();
    })
  }
}
