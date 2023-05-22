import { Component, OnInit,HostListener } from '@angular/core';
import { RadioButton} from 'primeng/radiobutton';
@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.scss']
})
export class AmbulanceComponent implements OnInit {

  jobAmbulancelist =  [{'SrNo':1,'JobNo':'2020061504','JobDate':'15-06-2020',
  'Vehicle Type':'ICU','Services':'GDA','Customer':'Aam Singh/9856487155','Assigned':'Tam Singh/9856487155',
  'Status':'Trip not Started'},
  {'SrNo':1,'JobNo':'2020061451','JobDate':'15-06-2020',
  'Vehicle Type':'VAN','Services':'Amb-Nursing','Customer':'Takam Singh/9856487155','Assigned':'Makam Singh/9856487155',
  'Status':'Trip Started'}];
  job:any;
  submitted:Boolean;
  jobDialog:Boolean;
  serviceRequirmentlist=[{'Requirment Type':'Vehicle','Particulars':'ICU'},{'Requirment Type':'Amb-Nursing','Particulars':''}]
  serviceAvailablelist=[{'Type':'ICU','Vehicle Number':'RJ 27 ER 1234','Travelled so far':'1500 kms','Driver':''},{'Type':'VAN','Vehicle Number':'RJ 27 ER 1258','Travelled so far':'582 kms','Driver':''}]
  serviceAssignmentlist=[
    {'Requirment Type':'Vehicle','Assigned To':'TATA RJ 27 ER 1234-Aam Singh','Mobile':'9829150824'}
  ]
  constructor() {
    this.job={'SrNo':1,'JobNo':'2020061504','JobDate':'15-06-2020','Vehicle Type':'ICU','Services':'GDA','Customer':'Aam Singh/9856487155',
    'Assigned':'Tam Singh/9856487155','Status':'Trip not Started','Remarks':'Aam Singh',
    'Staff Requirment':'AMB-Nursing AMB-GDA'};
   }
  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.jobDialog = false;
  }

  openAssignment() {
    this.submitted = false;
    this.jobDialog = true;
  }
  hideDialog(){
      this.jobDialog = false;
  }
  saveDialog(){
      this.jobDialog = false;
  }
}
