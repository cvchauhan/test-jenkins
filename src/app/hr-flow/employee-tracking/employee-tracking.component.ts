import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-tracking',
  templateUrl: './employee-tracking.component.html',
  styleUrls: ['./employee-tracking.component.css']
})
export class EmployeeTrackingComponent implements OnInit {

  products: [];

  constructor() { }

  ngOnInit(): void {
  }

}
