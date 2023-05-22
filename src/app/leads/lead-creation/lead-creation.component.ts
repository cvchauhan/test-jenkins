import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-lead-creation',
  templateUrl: './lead-creation.component.html',
  styleUrls: ['./lead-creation.component.scss']
})
export class LeadCreationComponent implements OnInit {
  leadlist =  [
      {'SrNo':1,'Service':'AS','Name':'Ram','Contact':'9851237155','Remarks':'ICU'},
      {'SrNo':2,'Service':'HS','Name':'Laxman','Contact':'9851237155','Remarks':'ICU'},
      {'SrNo':3,'Service':'AS','Name':'Ram','Contact':'9851237155','Remarks':'ICU'},
    ];
    leadInfoForm:FormGroup;
   // pagingnation
   first = 0;
   rows = 10;
   sTableList: any[];
   showModalBox:boolean = false;

  constructor(private fb : FormBuilder) 
  {
  }
  ngOnInit(): void {
    this.leadInfoForm = this.fb.group({
      serId:[null],
      userName:[null],
      userMobile:[null],
      location:[null],
      remark:[null]
    })
  }

  onSubmit(){
  }
  
  addLeadData(){
    this.showModalBox = true;
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
