import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import { ManageStockService } from 'src/app/stock-flow/managestock.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-job-closure-approval',
  templateUrl: './job-closure-approval.component.html',
  styleUrls: ['./job-closure-approval.component.css']
})
export class JobClosureApprovalComponent implements OnInit {

  branchData: any;
  branchId;
  jobClouserData: any[] = [];
  rows = 15;
  viewDisplay: boolean = false;
  jobModel;
  jobData: any[] = [];
  jobListTableData: any[] = [];
  statusData: any[] = [
    { name: 'Pending', code: 'P' },
    { name: 'Approved', code: 'A' },
    { name: 'Unapproved', code: 'U' }
  ];
  statusId;
  selectedChallans: any[] = [];
  disabledPickup: boolean = true;
  disabledCheckBox: boolean = true;
  targetDate = new Date;
  pickupDate;
  employeeData: any[] = [];
  pickupBy = '';

  constructor(
    private servicesService: ServicesService,
    private _manageStockService: ManageStockService,
    private messageservice: MessageService
  ) {

  }

  ngOnInit(): void {
    this.BranchLocation();
    this.statusId = this.statusData[2]['code'];
    this.getEmployeeData();
    this.getEmployeeBySrvSkills();
  }

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
      this.branchId = this.branchData[0]['val'];
      this.viewData();
    });
  }

  getEmployeeData = () => {
    let LedgerSearch = '';
    let loginId = localStorage.getItem("loginId");
    this._manageStockService.autopopulateEmpIssueData(LedgerSearch, loginId).subscribe((res) => {
      //this.employeeData = res['data']
    });
  }
  getEmployeeBySrvSkills() {
    const req = 23 ;
    const scheduleDate = moment().format('YYYY-MM-DD');
    this.servicesService.getSkillIdData(req).subscribe((res:any) =>{
      const dataSelect = res.data[0];
      if(dataSelect){
        this.getLeaderCollection(dataSelect.nSerialNo, scheduleDate)
      }
    })
    
    
  }
  getLeaderCollection(srvSkillsId, scheduleDate){
    console.log(srvSkillsId, scheduleDate)
    this.servicesService.getEmpBySrvSkill(srvSkillsId, scheduleDate).subscribe((res:any) => {
      this.employeeData = res.data;
    }, (error) => {
      console.log(error);
    });
  }

  serviceComponent;
  serviceType;
  jobClserId;
  approvedId;
  approvedJob(data) {
    const dataSelect = this.employeeData.find(item => item.nEmpid == data.nAcid)
    this.serviceComponent = data['itemName'];
    this.serviceComponent = data['skillName'];
    this.jobClserId = data['njCloseid'];
    this.targetDate = new Date(data['dCreateDate']);
    this.approvedId = data['nApproveid'];
    this.pickupBy = dataSelect ? dataSelect.nEmpid: this.employeeData[0].nEmpid;
    this.viewDisplay = true;
    if (data['nItemid'] > 0) {
      this.disabledCheckBox = false;
      this.serviceType = 'Machine';
    } else {
      this.disabledCheckBox = true;
      this.serviceType = 'Man';
    }
  }


  viewData = () => this.servicesService.getJobClosure(this.statusId, this.branchId)
    .subscribe((data) => { this.jobClouserData = data['data']; });


  checkboxChecked(event) {
    if (event.checked) {
      this.disabledPickup = false;
    } else {
      this.disabledPickup = true;
      this.pickupDate;
      this.employeeData = [];
    }
  }
  public formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  requestApproved() {
    this.approvedId = localStorage.getItem('empID');
    let pdate;
    if (!this.pickupDate) {
      pdate = '1900-01-01';
    } else {
      pdate = this.formatDate(new Date);
    }
    let pickup;
    if (!this.pickupBy) {
      pickup = 0;
    } else {
      pickup = this.pickupBy;
    }
    console.log(pdate);
    this.servicesService.approvedJobClosure(this.jobClserId, this.formatDate(this.targetDate), this.approvedId, pdate, pickup).subscribe((res) => {
      this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Approved Successfully!' });
      this.viewDisplay = false;
      this.viewData();
    });
  }

  sendJobApproval(data) {
    let closureId = data['njCloseid'];
    let statusId = 'U';
    this.servicesService.sendJobForApproval(closureId, statusId).subscribe((res) => {
      this.messageservice.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
      this.viewData();
    })
  }

  onHide() {
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
