import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-internal-job',
  templateUrl: './internal-job.component.html',
  styleUrls: ['./internal-job.component.css']
})
export class InternalJobComponent implements OnInit {

 
  jobEditDialog:boolean = false;
  commonThreeDialog:boolean = false;
  recommedValue:boolean = true;
  sevPointeDialog:boolean = false;
  machineDialog:boolean = false;
  internalJobData:any[];
  jobAssessment:any[];
  // pagingnation
  first = 0;
  rows = 10;
  sTableList: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.internalJobData = [
      {jno:'234455',jStartDate:'23-12-2020',service:'HOme Care',customer:'Ram Singh',assignedTo:'Sandeep',dataStatus:'Punched'}
    ];

    this.jobAssessment = [
      {servicepoint: 'Patient Condition'},
      {servicepoint: 'Injury Assessment'}
    ]
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.jobEditDialog = false;
    this.commonThreeDialog = false;
    this.sevPointeDialog = false;
    this.machineDialog = false;
  }


  editJobApproval(jid){
    this.jobEditDialog = true;
    console.log(jid);
  }

  // goToProductDetails(id) {
  //   this.router.navigate(['/edit-job', id]);
  //   console.log(id)
  // }

  commonDialog(){
    this.commonThreeDialog = true
  }
  showServPoint(){
    this.sevPointeDialog = true;
  }
  showMachine(){
    this.machineDialog = true;
  }

  next() {
    this.first = this.first + this.rows;
  }
  
  prev() {
    this.first = this.first - this.rows;
  }
  
  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.sTableList ? this.first === (this.sTableList.length - this.rows) : true;
  }
  
  isFirstPage(): boolean {
    return this.sTableList ? this.first === 0 : true;
  }
  // End Pagingnation
}
