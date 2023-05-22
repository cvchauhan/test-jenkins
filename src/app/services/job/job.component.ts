import { Component, OnInit } from '@angular/core';
interface PriorityType {
  priority: string,
  code: string
}
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  priorities:PriorityType[];
  jobPendinglist =  [{'SrNo':1,'Priority':'NORMAL','JobNo':'2020061504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
  'Service':'As per Details','Customer':'ANIL SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'5000.00',
  'Status':'Pending'},
  {'SrNo':2,'Priority':'LOW','JobNo':'20200616504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
  'Service':'GDA','Customer':'RANISH SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'1000.00',
  'Status':'Not Assign'},
  {'SrNo':3,'Priority':'HIGH','JobNo':'20200561504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
  'Service':'As per Details','Customer':'JATIN SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'5000.00',
  'Status':'Assign but not Accepted'},
  {'SrNo':4,'Priority':'NORMAL','JobNo':'2045661504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
  'Service':'As per Details','Customer':'RATIN SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'4000.00',
  'Status':'Rejected'}
  ];
  jobAssignedlist =  [{'SrNo':1,'Priority':'NORMAL','JobNo':'2020061504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
    'Service':'As per Details','Customer':'ANIL SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'5000.00',
    'Status':'Assigned'},
    {'SrNo':2,'Priority':'LOW','JobNo':'20200616504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
    'Service':'GDA','Customer':'RANISH SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'1000.00',
    'Status':'Not Assign'},
    {'SrNo':3,'Priority':'HIGH','JobNo':'20200561504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
    'Service':'As per Details','Customer':'JATIN SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'5000.00',
    'Status':'Assign but not Accepted'},
    {'SrNo':4,'Priority':'NORMAL','JobNo':'2045661504','JobDate':'15-06-2020','Shift':'Morning(6-8)',
    'Service':'As per Details','Customer':'RATIN SINGH','Mobile':'9856487155','BillingMode':'Monthly','Amount':'4000.00',
    'Status':'Rejected'}
  ];
  constructor() { 
    this.priorities=[{code:'1',priority:'High'},{code:'2',priority:'Normal'},{code:'3',priority:'Low'}]
  }
  ngOnInit() {
  }
}
