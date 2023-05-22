import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServicesService } from 'src/app/services/services.service';
import { ManageStockService } from 'src/app/stock-flow/managestock.service';

@Component({
  selector: 'app-item-pickup',
  templateUrl: './item-pickup.component.html',
  styleUrls: ['./item-pickup.component.css']
})
export class ItemPickupComponent implements OnInit {

  branchData: any;
  branchId: any = {};
  statusData = [
    {name: 'Pending',code:'P'},
    {name: 'Pickedup',code:'U'},
    {name: 'Approved',code:'A'}
  ];
  itemCategoryData = [
    {name: 'OK Condition',code:'O'},
    {name: 'Damaged',code:'D'},
  ];
  statusId;
  itemCategoryId;
  pickupData:any[] = [];
  rows = 15;
  viewDisplay:boolean = false;

  constructor(
    private _manageStockService: ManageStockService,
    private messageservice: MessageService,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    this.BranchLocation();
    this.statusId = this.statusData[0]['code'];
    this.itemCategoryId = this.itemCategoryData[0]['code'];
  }

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
      this.branchId = this.branchData[0]['val'];
      this.viewData();
    });
  }

  viewData(){
    this._manageStockService.getItemPickedData(this.statusId,this.branchId).subscribe((res) => {
      this.pickupData = res['data'];
     // console.log(this.pickupData);
    });
  }

  itemPickupApprove = [];
  jcloseId;
  approvedJob(data){
    this.itemPickupApprove = [];
    this.itemPickupApprove.push(data);
    this.viewDisplay = true;

    this.jcloseId = data['njCloseid'];
    console.log(this.itemPickupApprove)
  }

  public formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
  // jobApproved(){
  //   let approvedId = localStorage.getItem('empID');
  //   let approveDate = this.formatDate(new Date);
  //   this._manageStockService.approvedItem( this.jcloseId,approvedId,approveDate).subscribe((res) => {
  //     this.messageservice.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
  //     this.viewData();
  //     this.viewDisplay = false;
  //   });
  // }

  ApproveItemPickup(){
    let approvedId = localStorage.getItem('empID');
    let approveDate = this.formatDate(new Date);
    this._manageStockService.approvedItemPickup( this.jcloseId,approvedId,approveDate,this.itemCategoryId).subscribe((res) => {
      this.messageservice.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
      this.viewData();
      this.viewDisplay = false;
    });
  }

}
