import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-item-deposit',
  templateUrl: './item-deposit.component.html',
  styleUrls: ['./item-deposit.component.scss']
})
export class ItemDepositComponent implements OnInit {
  itemlist=
  [
     {'SNo':1,'VchNumber':202,'DepositDate':'20-05-2020','RefJobNumber':'20201508','Customer':'Aam Singh','ItemCount':5}
    ,{'SNo':2,'VchNumber':203,'DepositDate':'20-05-2020','RefJobNumber':'20206572','Customer':'Man Singh','ItemCount':1}
    ,{'SNo':3,'VchNumber':205,'DepositDate':'20-05-2020','RefJobNumber':'20206408','Customer':'Laxman Singh','ItemCount':5}
    ,{'SNo':4,'VchNumber':210,'DepositDate':'20-05-2020','RefJobNumber':'20201918','Customer':'Bharat Singh','ItemCount':3}
    ,{'SNo':5,'VchNumber':212,'DepositDate':'20-05-2020','RefJobNumber':'20206575','Customer':'Sita Singh','ItemCount':5}
  ];
  itemstocklist=[
                  {'ItemName':'AirBed','IssueQty':'2 nos','DepositQty':'','Damaged':''}
                 ,{'ItemName':'Oxygen Cyclinder','IssueQty':'2 nos','DepositQty':'','Damaged':''}
                 ,{'ItemName':'XYZ','IssueQty':'5 nos','DepositQty':'','Damaged':''}
                 ,{'ItemName':'BP Instrument','IssueQty':'3 nos','DepositQty':'','Damaged':''}
                ]
  itemremarklist=[
                   {'SNo':1,'Remarks':'Deposited'}
                  ,{'SNo':2,'Remarks':'Damaged'}
                  ,{'SNo':3,'Remarks':'Deposited'}
                  ,{'SNo':4,'Remarks':'Deposited'}
                 ]
  stockitem:any;
  item:any;
  itemDialog:Boolean;
  submitted:Boolean;
  CustomerList: string[];
  constructor() {
    this.item={'SNo':1,'VchNumber':202,'DepositDate':'20-05-2020','IssueDate':'20-05-2020','RefJobNumber':'20201508','Customer':'Aam Singh','Address1':'12,Panchwati','ItemCount':5,'ReceiverName':'Manik','ReceiverMobile':'7986871214' }
    this.stockitem={'SNo':1,'Remarks':'Deposited'}
  }
  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.itemDialog = false;
  }

  customerSearch(event) {
    this.CustomerList=['Anil Singh','Anuj Singh','Rajan Singh']
  }
  openItemDetail(){
    this.submitted=false;
    this.itemDialog=true;
  }
  saveItemDeposit(){
  }
  saveItemDamaged(){
  }
  saveDialog(){
    this.itemDialog=false;
  }
  printDialog(){
    this.itemDialog=false;
  }
  hideDialog(){
    this.itemDialog=false;
  }
}
