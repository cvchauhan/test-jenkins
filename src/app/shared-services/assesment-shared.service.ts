import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssesmentSharedService {


  assValues: any;
  assesmentDataVal = new BehaviorSubject<any>({});


  

  constructor() { 

 
    this.assesmentDataVal.next(this.assValues);



  }



  updateAssesmentItem(vals) {
    this.assValues = vals;
    this.assesmentDataVal.next(this.assValues);
    
  }


}
