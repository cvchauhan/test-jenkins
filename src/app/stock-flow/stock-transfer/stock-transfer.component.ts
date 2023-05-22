import { Component, OnInit } from '@angular/core';
import { ManageStockService } from '../managestock.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ServicesService } from 'src/app/services/services.service';
import Utils from '../../helpers/utils';
import { FormGroup ,FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.scss']
})
export class StockTransferComponent implements OnInit {

  formDate: any;
  toDate: any;
  trType: any;
  defaultDate: any;
  stockItemTableRes:any[] = [];
  transferDialog: boolean = false;
  transferForm: FormGroup;
  transferTable: any[] = [];
  response:any;
  dStkDate: any;
  pDate: any;
  transferType = [];
  branchData: any;
  selectedBranch: any = {};
  items = [];
  showTranTable: boolean = false;


  constructor(
    private _manageStockService: ManageStockService,
    private servicesService: ServicesService,
    private _formBuilder: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.BranchLocation();
    this.getItemList();

    let d = new Date();
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.formDate = finalFromDate;
    this.toDate = new Date(finalDate);
    this.defaultDate = d;

    this.transferType = [
      { name: 'Stock', valName: 'S' },
      { name: 'Branch', valName: 'B' },
    ];

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

  filterManageItem() {
    // console.log(this.trType);
    let transType = 'T';
    this._manageStockService.stockItemList(Utils.formatDate(this.formDate), Utils.formatDate(this.toDate), transType).subscribe(
      res => {
        this.stockItemTableRes = res['data'];
        //console.log(this.stockItemTableRes);
      }
    )
  }

  addTransferItem(){
    let userId = localStorage.getItem("loginId");
    let branchId = localStorage.getItem("branchId");


    let formData = {};
    let existingFormValues = this.transferForm.value;
   
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

  onSelectDate(event) {
    let d = new Date(event);
    this.pDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
    //console.log(finalDate);
  }

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

  getItemList() {
    this._manageStockService.ItemList().subscribe(
      res => {
        this.items = res['data'];
        console.log(this.items);
      }
    );
  }

  
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

  onHide(){
    this.transferDialog = false;
    this.transferForm.reset();
  }

  addPopup(){
    this.transferDialog = true;
  }
}
