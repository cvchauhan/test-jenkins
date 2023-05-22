import { Component, OnInit,HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ServiceDesignService } from '../service-design.service';

@Component({
  selector: 'app-vehicle-entry',
  templateUrl: './vehicle-entry.component.html',
  styleUrls: ['./vehicle-entry.component.css']
})
export class VehicleEntryComponent implements OnInit {
  products=[
    {name:'Gitanjli'}
  ]
  reactForm:FormGroup;
    // pagingnation
    first = 0;
    rows = 10;
    sTableList: any[];

    public holidayDialog: boolean = false;
    public vehicleForm: FormGroup;
    public isEdit: boolean = false;
    vehicleId:any;
    CategoryData=[];
    MakeData=[];
    modelData=[];
  constructor(private fb:FormBuilder,private service:ServiceDesignService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.addHolidayForm();
    this.getAllVehicle();
    this.getCategory();
    this.getMake();
    this.getModel();
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
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

openAddForm(): void {
  this.isEdit = false;
  this.holidayDialog = true;
  this.vehicleForm.reset();
}
// End Pagingnation
getAllVehicle(){
  this.service.getAllVehicleData().subscribe((res:any)=>{
    if(res){
      this.products  = res['data']
       console.log("res",res['data'])
    }

  })
}
getCategory(){
  this.service.getVehicleCategory(39).subscribe((res)=>{
    if(res){
      this.CategoryData= res['data'];
    }
  })
}
getMake(){
  this.service.getVehicleMake(40).subscribe((res)=>{
    if(res){
      this.MakeData= res['data'];
    }
  })
}
getModel(){
  this.service.getVehicleModel(41).subscribe((res)=>{
    if(res){
      this.modelData= res['data'];
    }
  })
}

addHolidayForm() {
  this.vehicleForm = this.fb.group({
    "nVehid": 0,
    "nVehCtgid":  ['',[Validators.required]],
    "cRegNo":  ['',[Validators.required]],
    "nMake":  ['',[Validators.required]],
    "nModel":  ['',[Validators.required]],
    "cShortNm":  ['',[Validators.required]],
    "nPartnerid": 0,
    "nMfgYear":  ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    "nKms": ['',[Validators.required,Validators.pattern("^[0-9]*$")]]
  });
}

get formControls() {
  return this.vehicleForm.controls;

}

editHoliday(holiday) {
  this.service.geVehicleById(holiday.nVehid).subscribe((response: any) => {
    if (response) {
      const data = response['data']
      this.vehicleForm.patchValue({
        "nVehCtgid":  data.nVehCtgid,
        "cRegNo":  data.cRegNo,
        "nMake":  data.nMake,
        "nModel":  data.nModel,
        "cShortNm":  data.cShortNm,
        "nPartnerid": 0,
        "nMfgYear":  data.nMfgYear,
        "nKms": data.nKms
      });
      this.vehicleId = data['nVehid'];

    }
  })
  this.isEdit = true;
  this.holidayDialog = true;

}

addEditTransportPoint(): void {
  const formData = this.vehicleForm.getRawValue();
  formData['nPartnerid'] =  0;
  formData['nVehid'] = this.isEdit ? this.vehicleId : 0;
  this.service.addUpdateVehicle(formData).subscribe((res: any) => {
    if (res) {
      this.showSuccess(res['message']);
      this.vehicleForm.reset();
      this.getAllVehicle();
      this.holidayDialog = false;
    }
  }, err => {

  })

}
showSuccess(succ) {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
}

showError(error) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
}
}
