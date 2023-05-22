import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { ManageStockService } from '../managestock.service';

@Component({
  selector: 'app-stock-query',
  templateUrl: './stock-query.component.html',
  styleUrls: ['./stock-query.component.css']
})
export class StockQueryComponent implements OnInit {

  stockCategoriesData: any = [];
  stockType: any = [
    { name: 'Rental', code: 'R' },
    { name: 'Sale', code: 'S' },
    { name: 'Internal Use', code: 'I' }
  ]
  viewModeType: any = [
    { name: 'Summary', code: 'S' },
    { name: 'Detail', code: 'D' },
  ]
  items = [];
  branchData: any;
  stockCatId;
  stockTypeId;
  viewModeTypeId;
  itemId;
  branchId;
  inHandData: any = [];
  stockPositionData: any = [];
  rows = 15;

  constructor(
    private _manageStockService: ManageStockService,
    private messageservice: MessageService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.viewModeTypeId = this.viewModeType[0]
    this.stockTypeId = this.stockType[0]
    console.log(this.stockTypeId)
    this.populateStockCategories();
    this.getItemList();
    this.BranchLocation();
  }

  populateStockCategories() {
    let categoryData
    this.employeeService.getctgData(3).subscribe((res:any)=>{
      categoryData = res.data
      categoryData.forEach(element => {
        if (element['ctgID'] == 3) {
          this.stockCategoriesData.push(element);
        }
      });
     })

    
   
    this.stockCatId = this.stockCategoriesData[0];
  }

  getItemList() {
    this._manageStockService.ItemList().subscribe(
      res => {
        this.items = res['data'];
        // console.log(this.items);
      }
    );
  }

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this._manageStockService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.branchId = this.branchData[0];
      }
    );
  }

  onInhandView() {
    // console.log(this.branchId)
    //console.log(this.itemId)
    if (!this.stockCatId) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Stock category is mandtory' });
      return
    }
    if (!this.stockTypeId) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Stock type is mandtory' });
      return
    }
    if (!this.branchId) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Branch is mandtory' });
      return
    }

    let item;
    if (!this.itemId) {
      item = 0;
    } else {
      item = this.itemId;
    }
    if (this.viewModeTypeId.code == "D") {
      this._manageStockService.getStockInHand(this.stockCatId['serialNo'], item, this.stockTypeId['code'], this.branchId['val']).subscribe(
        res => {
          this.inHandData=[];
          this.inHandData = res['data'];
          console.log(this.inHandData);
        }
      )
    }
    else if (this.viewModeTypeId.code == "S") {
      this._manageStockService.getSummaryInHand(this.stockCatId['serialNo'], item, this.stockTypeId['code'], this.branchId['val']).subscribe(
        res => {
          this.inHandData=[];
          this.inHandData = res['data'];
          console.log(this.inHandData);
        }
      )
    }
  }

  onPositionView() {
    if (!this.stockCatId) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Stock category is mandtory' });
      return
    }
    if (!this.stockTypeId) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Stock type is mandtory' });
      return
    }
    if (!this.branchId) {
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Branch is mandtory' });
      return
    }

    let item;
    if (!this.itemId) {
      item = 0;
    } else {
      item = this.itemId;
    }
    this._manageStockService.getStockPosition(this.stockCatId['serialNo'], item, this.stockTypeId['code'], this.branchId['val']).subscribe(
      res => {
        this.stockPositionData = res['data'];
        console.log(this.inHandData);
      }
    )
  }
}
