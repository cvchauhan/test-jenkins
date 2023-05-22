import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-salary',
  templateUrl: './generate-salary.component.html',
  styleUrls: ['./generate-salary.component.css']
})
export class GenerateSalaryComponent implements OnInit {

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
