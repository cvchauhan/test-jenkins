import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Utils from 'src/app/helpers/utils';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-job-renewal',
  templateUrl: './job-renewal.component.html',
  styleUrls: ['./job-renewal.component.css']
})
export class JobRenewalComponent implements OnInit {
  formDate: any = null;
  minimumDate = new Date();
  position: string;
  rows = 15;
  branchData: any;
  JobRenewalData: any;
  branchId: any = {};
  JobRenewalForm: FormGroup;
  jobSrvDate: any = null;
  nJobdid: number = 0;
  response: any;
  viewJobRenewal: boolean = false;
  constructor(private servicesService: ServicesService, private _formBuilder: FormBuilder,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.BranchLocation();
    let d = new Date();
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    let newDate = new Date(d);
    let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
    this.formDate = new Date(finalDate);
    this.jobSrvDate = new Date(finalDate);
    this.JobRenewalForm = this._formBuilder.group({
      jobSrvDate: [''],
    });
  }
  onSelectMethod(event, typ) {
    let d = new Date(event);
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    this.formDate = new Date(finalDate);
  }
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.branchId = this.branchData[0];
        // console.log('This is Branch location',this.branchData);
      }
    );
  }

  OpenJobRenewal(data) {
    this.viewJobRenewal = true;
    this.nJobdid = 0;
    this.nJobdid = data['nJobdid'];
    this.minimumDate = new Date(data['JobEndDate']);
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  get jobRenewalForm() {
    return this.JobRenewalForm['controls']
  }

  addAJobRenewal(data) {
    let JobRenewalFormValues = data;
    let jobRenDetail = {
      "jobSrvDate": Utils.formatDate(JobRenewalFormValues['jobSrvDate']),
      "nJobdid": this.nJobdid,
    };
    this.servicesService.AddJobRenewal(jobRenDetail).subscribe(
      res => {
        this.response = res;
        if (this.response['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
          this.JobRenewalForm.reset();
          this.nJobdid = 0;
          let d = new Date();
          let newDate = new Date(d);
          this.jobSrvDate = newDate;
          this.searchJobRenewal();
          this.viewJobRenewal = false;
        }
        setTimeout(() => {
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response['errorMessage'], detail: res['data']['msg'] });
          }
        }, 5000);
      }
    );
  }
  searchJobRenewal() {
    let branchId = this.branchId.val;
    this.servicesService.GetJobRenewal(branchId, Utils.formatDate(this.formDate)).subscribe(
      res => {
        this.JobRenewalData = res['data'];
      }
    );
  }
  // pagingnation
  first = 0;
  next() {
    this.first = this.first + this.rows;
  };

  prev() {
    this.first = this.first - this.rows;
  };

  reset() {
    this.first = 0;
  };
  isLastPage(): boolean {
    return this.JobRenewalData ? this.first === (this.JobRenewalData.length - this.rows) : true;
  };

  isFirstPage(): boolean {
    return this.JobRenewalData ? this.first === 0 : true;
  };
  // End Pagingnation
}
