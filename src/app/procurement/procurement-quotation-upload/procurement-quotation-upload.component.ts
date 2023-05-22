import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-procurement-quotation-upload',
  templateUrl: './procurement-quotation-upload.component.html',
  styleUrls: ['./procurement-quotation-upload.component.css']
})
export class ProcurementQuotationUploadComponent implements OnInit {
  products=[
    {name:'Gitanjli'}
  ]
  displayPop:boolean;
  // pagingnation
  first = 0;
  rows = 10;
  sTableList: any[];

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayPop = false;
  }

  openPop(){
    this.displayPop = true;
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
