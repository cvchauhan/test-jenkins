import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import Utils from 'src/app/helpers/utils';
import { AssesmentSharedService } from 'src/app/shared-services/assesment-shared.service';
import { RecommendationService } from '../recommendation.service';

@Component({
  selector: 'app-recommendation-summary',
  templateUrl: './recommendation-summary.component.html',
  styleUrls: ['./recommendation-summary.component.css']
})
export class RecommendationSummaryComponent implements OnInit {
  users;
  StatusHistory:any[] = [];
  serviceArr = [];
  selectedService;
  toDate;
  finalDate;
  branchId;
  branchData: any;
  branchD;
  userData;
  hideAdd: boolean = false;
  // status= [];
  select;
  StatusData:any[] = [
    {label: 'Pending', value: 'R'},
    {label: 'Punched', value: 'R'},
  ]
  selectedStatusData='Pending';
  fromDate;
  public jobService: any[] = [];

  constructor(
    private fb: FormBuilder,
    private recommendationService: RecommendationService,
    private assesmentService: AssesmentSharedService,
    private router: Router
     ) {
    }

    change($event: any){
     this.selectedStatusData = $event.value;
    }

  ngOnInit(): void {
        this.BranchLocation();
        let d = new Date();
        this.finalDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
        let newDate = new Date(d);
        let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
        this.fromDate = finalFromDate;
        this.toDate = new Date(this.finalDate);
  }


   //  get Branch and Location
   BranchLocation() {
    this.recommendationService.getBranch().subscribe(
        res => {
            this.branchData = res['data'];
            this.branchId = this.branchData[1];
            console.log('This is Branch location',this.branchId);
        }
    );

  }


getStatus(){
  this.recommendationService.getStatusTypeData(Utils.formatDate(this.fromDate), Utils.formatDate(this.toDate),this.selectedStatusData,this.branchD).subscribe((res)=>{
    this.userData = res['data'];
    },
  (err) => {

  });

}

summaryData(d){
  //console.log(d);
  this.assesmentService.updateAssesmentItem(d);
  this.router.navigate(['summary','steps']);

}

changeBranch(){
    this.hideAdd = true;
    console.log('change')
}


}
