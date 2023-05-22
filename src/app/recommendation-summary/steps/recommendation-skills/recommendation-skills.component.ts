import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recommendation-skills',
  templateUrl: './recommendation-skills.component.html',
  styleUrls: ['./recommendation-skills.component.css']
})
export class RecommendationSkillsComponent implements OnInit {
  point;
  users;
  userr;
  user_name;
  selectedValue = 'SR';
  displayTaxDetail:boolean = false;
  displayAddEquipment:boolean = false;
  submitted: boolean = false;
  @Output() changeIndex = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
    this.users = [
      {"type": "External","service":"Home care","skills":"Nursing","price":"ritik"},
      {"type": "Internal","service":"Assessment","skills":"Assessment","price":"ritik"},
    ]
    this.userr = [
      {"equipment": "Oxygen Cylinder","s_deposit":"5000","rental":"500 pr day"}
    ]
    this.point = [
      {"service_points": "Drip Installation with care","service":"Home care service","skill":"Nursing-Cardiac","duration_hrs":"0.30 hrs","price_unit":""},
      {"service_points": "Injectible application","service":"Home care service","skill":"Nursing-General","duration_hrs":"1 hrs","price_unit":""},
    ]
    this.user_name = [
      {"equipment": "Oxygen Cylinder","s_deposit":"5000","rental":"500 pr day"}
    ]
  }
  onSubmit(){} 

  addTaxDetail(){
    this.displayTaxDetail = true;
  }
  addEquipment(){
    this.displayAddEquipment = true;
  }
  nextPage() {
    this.changeIndex.emit(2);
    this.submitted = true;
}
}
