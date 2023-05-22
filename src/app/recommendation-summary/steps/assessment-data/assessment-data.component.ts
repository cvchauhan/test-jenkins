import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AssesmentSharedService } from 'src/app/shared-services/assesment-shared.service';
import { RecommendationService } from '../../recommendation.service';

@Component({
  selector: 'app-assessment-data',
  templateUrl: './assessment-data.component.html',
  styleUrls: ['./assessment-data.component.css']
})
export class AssessmentDataComponent implements OnInit {
  users;
  serviceArr;
  statusArr;
  selectedService;
  patients;

  submitted: boolean = false;
  assesmentData:any;
  srvPointData:any[] = [];
  @Output() changeIndex = new EventEmitter<number>();
  constructor(private assesmentService: AssesmentSharedService,private recommendationService : RecommendationService) { }


  ngOnInit(): void {
    this.users = [
      {"s_no": "1", "Service_Point": "Potient Condition", "action": ""},
      {"s_no": "2", "Service_Point": "Injury Assessment", "action": ""},
      {"s_no": "3", "Service_Point": "", "action": ""},
      {"s_no": "4", "Service_Point": "", "action": ""},
      {"s_no": "5", "Service_Point": "", "action": ""},
    ],
    this.patients=[
      {"s_no": "1", "task": "task1","showInput":true},
      {"s_no": "2", "task": "task2","showInput":false},



    ]

    this.getAssesmentData();
  }
  nextPage() {
    this.changeIndex.emit(1);
    this.submitted = true;
  }

  getAssesmentData() {
    this.assesmentData = this.assesmentService.assValues;
   // console.log(this.assesmentData);
    this.getSrvPoints(this.assesmentData['nSrvid']);
    //console.log(empVal);

  }

  getSrvPoints(srvId){
    this.recommendationService.loadServicePoints(srvId).subscribe((res)=>{
      this.srvPointData = res['data'];
    },(err)=>{});
  }
}


