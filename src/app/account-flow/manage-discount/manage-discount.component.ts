import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-manage-discount',
  templateUrl: './manage-discount.component.html',
  styleUrls: ['./manage-discount.component.css']
})
export class ManageDiscountComponent implements OnInit {

  branchData: any;
  products: [];

  constructor(private accountservice:AccountService) { }

  ngOnInit(): void {
    this.BranchLocation();
  }

  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.accountservice.getBranch(empID).subscribe(
        res => {
            this.branchData = res['data'];
            // console.log('This is Branch location',this.branchData);
        }
    );
  }

}
