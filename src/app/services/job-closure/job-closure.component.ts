import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ManageStockService } from 'src/app/stock-flow/managestock.service';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-job-closure',
  templateUrl: './job-closure.component.html',
  styleUrls: ['./job-closure.component.css']
})
export class JobClosureComponent implements OnInit {

  branchData: any;
  branchId;
  jobClouserData:any[] = [];
  rows = 15;
  viewDisplay: boolean = false;
  jobModel;
  jobData:any[]=[];
  jobListTableData:any[] = [];
  statusData:any[] = [
    {name:'Pending',code:'P'},
    {name:'Approved',code:'A'},
    {name:'Unapproved',code:'U'}
  ];
  statusId;
  selectedChallans:any[]=[];

  constructor(
    private servicesService: ServicesService,
    private _manageStockService: ManageStockService,
    private messageservice: MessageService
  ) { }

  ngOnInit(): void {
    this.BranchLocation();
    this.statusId = this.statusData[0]['code'];
  }

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
      this.branchId = this.branchData[0]['val'];
      this.viewData();
    });
  }

  showDialog(){
    this.viewDisplay = true;
  }

  jobId;
  accId;
  searchJobIssueData(event) {
    let q = event.query;
    let branchId= 1
    this._manageStockService.loadJobData(q,this.branchId).subscribe((res) => {
        this.jobData = res['data'];
        this.jobId = this.jobData[0]['nJobid'];
        this.accId = this.jobData[0]['nAcid'];
        // console.log(this.accId);
        console.log(this.jobData);
        setTimeout(() => {
          this.getJobClouser();
        }, 3000);
       
    }, (err) => { });
  }

  getJobClouser(){
    this.servicesService.getJobClouserByJobId(this.jobId).subscribe((res) => {
      this.jobListTableData = res['data'];
      //console.log(this.jobListTableData)
    })
  }

  onAddSelection(){
    let userId = localStorage.getItem('empID');
    let formData = [];
    this.selectedChallans.forEach((item,index) => {
      let data = {};
      data['njCloseid'] = 0;
      data['nJobid'] = this.jobId;
      data['cJobNo'] = null;
      data['nJobdid']= item['nJobdId'];
      data['dTargetDate'] = null;
      data['cClosedby'] = 'S';
      data['nAcid'] = this.accId;
      data['accountName'] = null;
      data['nUserid'] = userId;
      data['userName'] = null;
      data['dCreateDate'] = new Date();
      data['nApproveid'] = 0;
      data['approverName'] = null;
      data['dApproveDate'] = null;
      data['cStatus'] = 'P';
      data['closedby'] = null;
      data['nItemid'] = item['nItemId'];
      data['nSrvSkillid'] = item['nsrvSkillId'];
      data['itemName'] = item['cItemName'];
      data['skillName'] = item['cSkillName'];
      data['cSerialNo'] = item['cSerialNo'];
      data['nQty'] = item['nQty'];
      formData.push(data)
    });

    this.servicesService.addClouserData(formData).subscribe((res) => {
      this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
      this.jobData = [];
      this.jobListTableData = [];
      this.viewDisplay = false;
      this.viewData();
      formData=[]
    })
    console.log(formData);
  }

  viewData = () => this.servicesService.getJobClosure(this.statusId,this.branchId)
    .subscribe((data) => {this.jobClouserData = data['data'];});
    
  
    sendJobApproval(data){
      let closureId = data['njCloseid'];
      let statusId = 'U';
      this.servicesService.sendJobForApproval(closureId,statusId).subscribe((res) => {
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
        this.viewData();
      })
    }

    onHide(){
      this.jobData = [];
      this.jobModel=''
      this.jobListTableData = [];
      this.viewDisplay = false;
    }

    deleteJob(job){
      let userId = localStorage.getItem('empID');
      job['userId'] = userId;
      this.servicesService.deleteJobClosure(job).subscribe((res)=>{
          if(res && res['status']==200){
            this.messageservice.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
            this.viewData();
          }
      })
    }

}
