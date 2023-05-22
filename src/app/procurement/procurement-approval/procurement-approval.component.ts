import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-procurement-approval',
  templateUrl: './procurement-approval.component.html',
  styleUrls: ['./procurement-approval.component.scss']
})
export class ProcurementApprovalComponent implements OnInit {
  procurementlist=[{'SNo':1,'Request ID':'2020051501','Request Date':'01-04-2020','TAT':10,'Department':'Services','Procu. Period':'30 Days','Item Count':'3','Item Quantity':100,'ATC(Rs.)':10000.00,'Status':'Pending'}
                   ,{'SNo':2,'Request ID':'2020051502','Request Date':'01-04-2020','TAT':10,'Department':'Services','Procu. Period':'3 Days','Item Count':'3','Item Quantity':100,'ATC(Rs.)':1000.00,'Status':'Approved'} 
                   ,{'SNo':3,'Request ID':'2020051503','Request Date':'01-04-2020','TAT':10,'Department':'Services','Procu. Period':'120 Days','Item Count':'3','Item Quantity':100,'ATC(Rs.)':258000.00,'Status':'Pending'} 
                   ,{'SNo':4,'Request ID':'2020051504','Request Date':'01-04-2020','TAT':10,'Department':'Services','Procu. Period':'20 Days','Item Count':'3','Item Quantity':100,'ATC(Rs.)':40300.00,'Status':'Pending'} 
                   ,{'SNo':5,'Request ID':'2020051505','Request Date':'01-04-2020','TAT':10,'Department':'Services','Procu. Period':'30 Days','Item Count':'3','Item Quantity':100,'ATC(Rs.)':100000.00,'Status':'Rejected'} 
                  ];  
  procurementdisplayPopup:Boolean;
  submitted:Boolean;
  procumentitemlist=[
    {'SNo':1,'Type':'Existing','Items':'AirBed','Quantity':20,'ATCrs':20000},
    {'SNo':2,'Type':'Existing','Items':'Oxygen Cyclinder','Quantity':10,'ATCrs':1000},
    {'SNo':3,'Type':'Existing','Items':'ICU Ambulance','Quantity':2,'ATCrs':250000},
    {'SNo':4,'Type':'Existing','Items':'NewAmbulance-Normal','Quantity':10,'ATCrs':60000},
    {'SNo':5,'Type':'New','Items':'Dialysis Machine','Quantity':5,'ATCrs':500000}
  ];
  procurmentInfoForm = this.fb.group({
    ProcurmentId:['',Validators.required],
    RequirementBackground:['',Validators.required],
    RequirmentwithinDays:[''],
    StatusId:[''],
    Remarks:['']
   });                
  constructor(private fb : FormBuilder) { }
  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.procurementdisplayPopup = false;
  }


  procurmentApprovePopup()
  {
    this.procurementdisplayPopup=true;
    this.submitted=false;
  }
  procurmentApproveSubmit(){
    this.procurementdisplayPopup=false;
  }
  procurmentApprovePrint(){
    this.procurementdisplayPopup=false;
  }
  procurmentApproveCancel(){
    this.procurementdisplayPopup=false;
  }
}
