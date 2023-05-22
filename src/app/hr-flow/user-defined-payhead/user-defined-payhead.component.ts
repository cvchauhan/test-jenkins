import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-defined-payhead',
  templateUrl: './user-defined-payhead.component.html',
  styleUrls: ['./user-defined-payhead.component.css']
})
export class UserDefinedPayheadComponent implements OnInit {

  date12: Date;
  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];
  selectedCityCode: string;
  products: [];

  constructor() { }

  ngOnInit(): void {
  }

}
