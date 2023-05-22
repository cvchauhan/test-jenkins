import { Component, OnInit } from '@angular/core';
import { ManageStockService } from '../managestock.service';
import Utils from '../../helpers/utils';


@Component({
  selector: 'app-stock-sales',
  templateUrl: './stock-sales.component.html',
  styleUrls: ['./stock-sales.component.css']
})
export class StockSalesComponent implements OnInit {

  formDate: any;
  toDate: any;
  trType: any;
  defaultDate: any;
  stockItemTableRes:any[] = [];
  salesDialog:boolean = false;

  constructor(
    private _manageStockService: ManageStockService,
  ) { }

  ngOnInit(): void {
  }

  filterManageItem() {
    // console.log(this.trType);
    let transType = 'S';
    this._manageStockService.stockItemList(Utils.formatDate(this.formDate), Utils.formatDate(this.toDate), transType).subscribe(
      res => {
        this.stockItemTableRes = res['data'];
        //console.log(this.stockItemTableRes);
      }
    )
  }

  addPopup(){
    this.salesDialog = true;
  }

  onHide(){
    this.salesDialog = false;
  }

}
