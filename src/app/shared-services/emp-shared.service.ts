import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpSharedService {

  formValues: any;
  empFormDataValues = new BehaviorSubject<any>({});
  empValues: any;
  empDataVal = new BehaviorSubject<any>({});


  

  constructor() { 

 
    this.empFormDataValues.next(this.formValues);



  }

  updateFormItem(vals) {
    this.formValues = vals;
    this.empFormDataValues.next(this.formValues);
    
  }

 

  updateEmpItem(vals) {
    this.empValues = vals;
    this.empDataVal.next(this.formValues);
    
  }


}
