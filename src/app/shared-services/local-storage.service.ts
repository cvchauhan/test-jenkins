import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
categoryValue: any;
categoryDataValues = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { 
    this.categoryDataValues.next(this.categoryValue);

  }

  updateCategoryVal(vals) {
    this.categoryValue = vals;
    this.categoryDataValues.next(this.categoryValue);
    
  }


}