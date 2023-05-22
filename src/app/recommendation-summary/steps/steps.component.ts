import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AssesmentSharedService } from 'src/app/shared-services/assesment-shared.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  constructor(private assesmentService: AssesmentSharedService) { }

  ngOnInit() {
    this.items = [{
            label: 'Assessment',
        },
        {
            label: 'Recommendation',
        },
        {
            label: 'Medicine',
        },
        {
            label: 'Summary',
        }
    ];
    //this.getAssesmentData();

  }
  changeActiveIndex(event){
    this.activeIndex = event;
  }



}
