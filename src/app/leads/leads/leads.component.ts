import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA,HostListener } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  leadlist =  [
    {'SrNo':1,'LeadId':'20201001','LeadDate':'03-04-2020',
  'Service':'AS','Name':'Aam','Contact':'9851237155','Remarks':'ICU',
  'Status':'Pending'},
    {'SrNo':2,'LeadId':'20201861','LeadDate':'03-04-2020',
  'Service':'AS','Name':'Sham','Contact':'9800237155','Remarks':'ICU',
  'Status':'Job Created'},
    {'SrNo':3,'LeadId':'20201891','LeadDate':'03-04-2020',
     'Service':'AS','Name':'Jham','Contact':'9800127155','Remarks':'ICU',
     'Status':'Rejected'}
];
  submitted:Boolean;
  leadASDialog:Boolean;
  leadHCDialog:Boolean;
  leadasupdateInfoForm = this.fb.group({
    LeadId:[''],
    ServiceId:['',Validators.required],
    EnquirerName:[''],
    EnquirerDetail:[''],
    Location:[''],
    ContactPerson:[''],
    ContactDetail:[''],
    Remarks:[''],
    VehicleTypeId:[''],
    ServiceTypeId:['']
   });
   leadhcupdateInfoForm = this.fb.group({
    RequirementinBackground:[''],
    ProcurementwithinDays:[''],
    LeadId:[''],
    ServiceId:['',Validators.required],
    EnquirerBy:[''],
    EnquirerPhone:new FormControl('', [Validators.required, Validators.pattern("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$")]),
    ServiceLocation:[''],
    ContactPerson:[''],
    ContactMobile:new FormControl('', [Validators.required, Validators.pattern("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$")]),
    Remarks:[''],
    VehicleTypeId:[''],
    ServiceTypeId:['']
   });
  constructor(private fb : FormBuilder) { }
  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.leadASDialog = false;
    this.leadHCDialog = false;
  }

  openLeadASUpdate(){
    this.submitted=true;
    this.leadASDialog=true;
  }
  onleadHCSubmit(){
    this.leadASDialog=false;
  }
  rejectedDialog(){
    this.leadASDialog=false;
  }
  cancelDialog(){
    this.leadASDialog=false;
  }
  openLeadHCUpdate(){
    this.submitted=true;
    this.leadHCDialog=true;
  }
  saveleadhcDialog(){
    this.leadHCDialog=false;
  }
  onleadASSubmit(){
    this.leadHCDialog=false;
  }
}
