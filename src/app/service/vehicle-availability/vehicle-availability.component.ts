import { Component, OnInit, HostListener } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-vehicle-availability',
  templateUrl: './vehicle-availability.component.html',
  styleUrls: ['./vehicle-availability.component.css']
})
export class VehicleAvailabilityComponent implements OnInit {
  products=[
    {name:'Gitanjli'}
  ]

 
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
  }


  displayBasic2: boolean;

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayBasic2 = false;
  }

  showBasicDialog2() {
      this.displayBasic2 = true;
  }


}
