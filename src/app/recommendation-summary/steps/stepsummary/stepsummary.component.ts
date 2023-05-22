import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepsummary',
  templateUrl: './stepsummary.component.html',
  styleUrls: ['./stepsummary.component.css']
})
export class StepsummaryComponent implements OnInit {
  user;
  equipment;
  medicine;

  constructor() { }

  ngOnInit(): void {
    this.user = [
      {"check": "", "service": "", "skills": "", "frequency": "", "repeats": "", "cheduled": ""},
    ]
    this.equipment = [
      {"s_no": "", "description": "", "security": "","price": ""},
    ]
    this.medicine = [
      {"s_no": "", "medicine": "", "type": "","qty": "","price": ""},
    ]
  }

}
