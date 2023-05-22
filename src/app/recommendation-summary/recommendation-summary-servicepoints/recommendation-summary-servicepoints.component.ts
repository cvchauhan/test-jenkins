import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendation-summary-servicepoints',
  templateUrl: './recommendation-summary-servicepoints.component.html',
  styleUrls: ['./recommendation-summary-servicepoints.component.css']
})
export class RecommendationSummaryServicepointsComponent implements OnInit {
  service;
  equipment;
  medicine;

  constructor() { }

  ngOnInit(): void {
    this.service = [
      {"s_no": "", "service": "", "skills": "", "point": "", "duration": "", "price": "", "frequency": "", "repeats": "", "schedule": "" },
    ]
    this.equipment = [
      {"s_no": "", "description": "", "security": "","price": ""},
    ]
    this.medicine = [
      {"s_no": "", "medicine": "", "type": "","qty": "","price": "","action": ""},
    ]
      }
    }
