import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ambulance-assignment',
  templateUrl: './ambulance-assignment.component.html',
  styleUrls: ['./ambulance-assignment.component.scss']
})
export class AmbulanceAssignmentComponent implements OnInit {
  jobAmbulanceAssignmentlist =  [{'SrNo':1,'JobNo':'2020061504','JobDate':'15-06-2020',
  'Vehicle Type':'ICU','Services':'GDA','Customer':'Aam Singh/9856487155','Assigned':'Tam Singh/9856487155',
  'Status':'Trip not Started'},
  {'SrNo':1,'JobNo':'2020061451','JobDate':'15-06-2020',
  'Vehicle Type':'VAN','Services':'Amb-Nursing','Customer':'Takam Singh/9856487155','Assigned':'Makam Singh/9856487155',
  'Status':'Trip Started'}];

  serviceAvailablelist=[
    {'Type':'Vehicle','Vehicle Number':'TATA RJ 27 ER 1234','Travelled sofar':'1500 KM','Driver':'Aam Singh 9829245612'},
    {'Type':'VAN','Vehicle Number':'TATA RJ 27 ER 1454','Travelled sofar':'582 KM','Driver':''}
  ];
  serviceRequirmentlist=[
    {'Requirment Type':'Vehicle','Particulars':'Par'},
    {'Requirment Type':'VAN','Particulars':''}
  ];
  serviceAvailableStafflist=[
    {'Staff':'Laxman Singh','Mobile':'9829456123'},
    {'Staff':'Tan Singh','Mobile':'9829147123'}
  ]
  serviceAssignmentlist=[
    {'Requirment Type':'Vehicle','Assigned To':'TATA RJ 27 ER 1234-Aam Singh','Mobile':'9829150824'}
    ,{'Requirment Type':'Amb-Nursing','Assigned To':'Man Singh','Mobile':'9829780824'}
  ]
  job:any;
  jobambulancevehicleDialog:Boolean;
  submitted:Boolean;
  assignmentvehicleInfoForm=this.fb.group({
    JobNo:['',Validators.required],
    JobDate:['',Validators.required],
    Customer:['',Validators.required],
    VehicleType:[''],
    Remarks:[''],
    StaffRequirment:['']
  });
  assignmentstaffInfoForm=this.fb.group({
    JobNo:['',Validators.required],
    JobDate:['',Validators.required],
    Customer:['',Validators.required],
    VehicleType:[''],
    Remarks:[''],
    StaffRequirment:['']
  });

  constructor(private fb:FormBuilder) {
    this.job={'SrNo':1,'JobNo':'2020061504','JobDate':'15-06-2020','Vehicle Type':'ICU','Services':'GDA','Customer':'Aam Singh/9856487155',
    'Assigned':'Tam Singh/9856487155','Status':'Trip not Started','Remarks':'Aam Singh',
    'Staff Requirment':'AMB-Nursing AMB-GDA'};
   }
  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {

  }

  openAmbulanceVehicleAssignment() {
    this.submitted = false;
    this.jobambulancevehicleDialog = true;
  }
  hideAmbulanceVehicleAssignmentDialog(){
      this.jobambulancevehicleDialog = false;
  }
  saveAmbulanceVehicleAssignmentDialog(){
      this.jobambulancevehicleDialog = false;
  }
  openAmbulanceStaffAssignment() {
    this.submitted = false;
    this.jobambulancevehicleDialog = true;
  }
  hideAmbulanceVehicleStaffDialog(){
    this.jobambulancevehicleDialog = false;
  }
  saveAmbulanceVehicleStaffDialog(){
      this.jobambulancevehicleDialog = false;
  }
  saveAmbulanceStaffAssignmentDialog(){

  }
}
