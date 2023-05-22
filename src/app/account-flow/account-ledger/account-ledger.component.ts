import { Component, OnInit, HostListener } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-ledger',
  templateUrl: './account-ledger.component.html',
  styleUrls: ['./account-ledger.component.css']
})
export class AccountLedgerComponent implements OnInit {

  accounts:any[];
  products:any[];
  selectedAccounts:any;
  showAccountDetail:boolean = false;
  accountLedgerData:any={};
  moreAddressDialog:boolean = false;
  public filteredGroups: any[];

  first = 0;
  rows = 10;
  sTableList: any[];

  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
    this.loadAccounts();

  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.moreAddressDialog = false;
  }

  accountDetail(evt){
    console.log(evt['nAcid']);
    this.showAccountDetail = true;
    let acId =  evt['nAcid'];

    this.accountService.getAccountLedgerById(acId).subscribe(res=>{
      this.accountLedgerData = res['data'];

      console.log(this.accountLedgerData);

    });

   // console.log(this.selectedAccounts);
  }

  loadAccounts(){
    const branchId= localStorage.getItem("branchId");
    this.accountService.getAccountList(branchId).subscribe((res)=>{
      this.accounts = res['data'];
    },(err)=>{

    });
  }

  onGetCustomer()
  {
    const branchId= localStorage.getItem("branchId");
    this.accountService.getAccountList(branchId).subscribe((res)=>{
      this.accounts = res['data'];
    },(err)=>{

    });
  }

  showMoreAddress(){
    this.moreAddressDialog = true;
  }


  filterGroup(event) {
    let query = event.query;
    let filtered: any[] = [];
     for (let i = 0; i < this.accounts.length; i++) {
          let group = this.accounts[i];
          if (group.cDisplayNm.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(group);
          }
      }
      this.filteredGroups = filtered;
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

}
