import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  private menuId: number;
  constructor(private route: ActivatedRoute) { }
  reportMenuData: any[] = JSON.parse(localStorage.getItem("reportMenu"));


  ngOnInit(): void {
    
  }

}
