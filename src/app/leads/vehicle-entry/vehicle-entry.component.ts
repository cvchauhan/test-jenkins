import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-vehicle-entry',
  templateUrl: './vehicle-entry.component.html',
  styleUrls: ['./vehicle-entry.component.scss']
})
export class VehicleEntryComponent implements OnInit {
  vehiclelist = [{'VehicleId':1,'Type':'ICU','Status':'Available','Registration Number':'RJ 27 ER 12343'},
                 {'VehicleId':2,'Type':'ICU','Status':'Not-Available','Registration Number':'RJ 27 ER 1563'}, 
                 {'VehicleId':3,'Type':'VAN','Status':'Available','Registration Number':'RJ 27 ER 0343'}]
  vehicleForm = this.fb.group({
     TypeId:['', Validators.required],
     RegistrationNumber:['', Validators.required]
   }); 

   // pagingnation
   first = 0;
   rows = 10;
   sTableList: any[];
   
  constructor(private fb : FormBuilder) { }
  ngOnInit(): void {
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {

  }

  onSubmit(){}

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
