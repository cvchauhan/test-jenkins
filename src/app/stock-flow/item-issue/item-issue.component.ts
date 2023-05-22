import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-item-issue',
  templateUrl: './item-issue.component.html',
  styleUrls: ['./item-issue.component.scss']
})
export class ItemIssueComponent implements OnInit {
  itemissuependinglist=[{'SNo':1,'JobNumber':'20201508','Start Date':'20-05-2020','Assigned To':'Aam Singh','Item Count':5}
                    ,{'SNo':2,'JobNumber':'20201518','Start Date':'20-05-2020','Assigned To':'Bharat Singh','Item Count':2}
                    ,{'SNo':3,'JobNumber':'20201501','Start Date':'20-05-2020','Assigned To':'Shyam Singh','Item Count':8}
                     ,{'SNo':4,'JobNumber':'20201502','Start Date':'20-05-2020','Assigned To':'Ratan Singh','Item Count':13}
                     ,{'SNo':5,'JobNumber':'20201505','Start Date':'20-05-2020','Assigned To':'Chander Singh','Item Count':1}
                    ]
  itemissuevoucherlist=[{'SNo':1,'VchNumber':'202','Issue Date':'20-05-2020','RefJobNumber':'20201508','Customer':'Aam Singh','Item Count':1}
                        ,{'SNo':2,'VchNumber':'203','Issue Date':'20-05-2020','RefJobNumber':'20206572','Customer':'Aam Singh','Item Count':5}
                        ,{'SNo':3,'VchNumber':'205','Issue Date':'20-05-2020','RefJobNumber':'20205408','Customer':'Laxman Singh','Item Count':10}
                        ,{'SNo':4,'VchNumber':'210','Issue Date':'20-05-2020','RefJobNumber':'20201518','Customer':'Bharat Singh','Item Count':3}
                        ,{'SNo':5,'VchNumber':'212','Issue Date':'20-05-2020','RefJobNumber':'202015148','Customer':'Sham Singh','Item Count':6}
                      ]
  itemsearchlist=[{'SNo':1,'Event Date':'20-05-2020','Ref Number':202,'Event Name':'Issue to Job#20201508 to Aam Singh-9548752547'}
                  ,{'SNo':2,'Event Date':'20-05-2020','Ref Number':205,'Event Name':'Deposited by Job#20201959 to Kam Singh-9548752547'}
                  ,{'SNo':3,'Event Date':'20-05-2020','Ref Number':214,'Event Name':'Issued to Job#20201928 to Bharat Singh-9548752547'}          
                  ] 
                  
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
  item:any;
  stockitem:any;
  itemDialog:Boolean;
  submitted:Boolean;
  CustomerList: string[];
  constructor() {
    this.item={'SNo':1,'VchNumber':202,'DepositDate':'20-05-2020','IssueDate':'20-05-2020','RefJobNumber':'20201508','Customer':'Aam Singh','Address1':'12,Panchwati','ItemCount':5,'ReceiverName':'Manik','ReceiverMobile':'7986871214' }
    this.stockitem={'SNo':1,'Items':'AirBed'}
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
    this.itemDialog=true;
  }
  addItemDeposit(){}
  saveDialog(){
    this.itemDialog=false;
  }
  printDialog(){
    this.itemDialog=false;
  }
}
