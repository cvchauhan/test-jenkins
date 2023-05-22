import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuSharedService {

  menuItems: any[];
  menuItemValues = new BehaviorSubject<any[]>([]);

  

  constructor() { 

    this.menuItems;
    this.menuItemValues.next(this.menuItems);



  }

  updateMenuItem(vals) {
    this.menuItems = vals;
    this.menuItemValues.next(this.menuItems);
    
  }


}
