import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-availability',
  templateUrl: './vehicle-availability.component.html',
  styleUrls: ['./vehicle-availability.component.scss']
})
export class VehicleAvailabilityComponent implements OnInit {
  vehiclelist=[{'Type':'ICU','Registration Number':'RJ27 ER 12343','Status':'Avaiable','Remarks':''}
               ,{'Type':'ICU','Registration Number':'RJ27 TR 1543','Status':'Maintenance','Remarks':''}
               ,{'Type':'VAN','Registration Number':'RJ27 ER 0543','Status':'Available','Remarks':''}]
  vehicleavailabityDialog:Boolean;
  submitted:Boolean;
  vehicleInfoForm = this.fb.group({
    VehicleType:[''],
    VehicleRegistrationNumber:['RJ 27 ER 1234'],
    StatusId:['', Validators.required],
    Remarks:['']
   });
  constructor(private fb : FormBuilder) { }
  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.vehicleavailabityDialog = false;
  }
  openVehicleUpdate(){
    this.submitted=false;
    this.vehicleavailabityDialog=true;
  }
  saveDialog(){
    this.vehicleavailabityDialog=false;
  }
  cancelDialog(){
    this.vehicleavailabityDialog=false;
  }
  onSubmit(){}
}
