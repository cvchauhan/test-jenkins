import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceDesignService } from '../service-design.service';

@Component({
  selector: 'app-vehicle-pricing',
  templateUrl: './vehicle-pricing.component.html',
  styleUrls: ['./vehicle-pricing.component.css']
})
export class VehiclePricingComponent implements OnInit {
  products=[
    {name:'Gitanjli'}
  ]
  branchData:any
  formGroup:FormGroup
  constructor(private fb:FormBuilder, private service:ServiceDesignService) { }

  ngOnInit(): void {
    this.reactForm()
    this.BranchLocation()
  }
reactForm(){
  this.formGroup=this.fb.group({
    types:new FormControl('',[Validators.required]),
    reg:new FormControl('',[Validators.required]),
    bLocation:new FormControl('', [Validators.required]),
    eFrom:new FormControl('', [Validators.required]),
    price:new FormControl('',[Validators.required]),
    unit:new FormControl('', [Validators.required])
  })
}
get formControl(){
  return this.formGroup['controls']
}
//  get Branch and Location
BranchLocation(){
  const empID = localStorage.getItem('empID');
  this.service.getBranch(empID).subscribe(
    res=>{
      this.branchData=res['data']
      console.log('This is Branch location',this.branchData)
    }
  )
}

}
