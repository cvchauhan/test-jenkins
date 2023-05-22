import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import Utils from 'src/app/helpers/utils';
import { ServicesService } from '../services.service';
import * as moment from 'moment';
import { CalendarOptions } from '@fullcalendar/angular';
import { CITIES, FIELDSTAFF, JOB_ASSIGN_STATUS, MANAGEJOB, MAN_RECRUITMENT, MONTHS_NAME, STARTTIMEDDL, TRANSPORTATIONDATA } from 'src/app/constant';
@Component({
  selector: 'app-job-assignment',
  templateUrl: './job-assignment.component.html',
  styleUrls: ['./job-assignment.component.css']
})
export class JobAssignmentComponent implements OnInit {
  public showEmpErrorMsg: boolean = false;
  public EmpinError: String = '';
  public showStartTimeErrorMsg: boolean = false;
  public StartTimeinError: String = '';
  public SelStartddl: any;
  public value: Date;
  public value1: Date;
  public priority: any[];
  public shift: any[];
  public manageJob = MANAGEJOB;
  public assignmentDialog: boolean = false;
  public shiftOption: any[];
  public eventLists = [];
  index = 0
  public StartTimeddl = STARTTIMEDDL;
  public formsGroup = this.fb.group({
    dJobDate: new Date(),
    jobNo: new FormControl(''),
    customer: new FormControl(''),
    shift: new FormControl(''),

  });
  JobScheduleDate: String = '';
  jobStartAssignmentData: any = null;
  public manRequirement: string;
  public sComponent: string;
  public assignJob: any[];
  // public editJobDialog: boolean = false;
  public editScheduleDialog: boolean = false;
  public dateValue: any;
  public jobStartTableData: any;
  public jobStatus: any;
  globalEmpData: any;
  EmpName: any;
  stTime: any;
  calenderData: any[] = [];
  public jobScheduleTableData: any;
  public RescheduleDialog: boolean = false;
  selectedValue: any;
  branchData: any;
  public IsStarTimeDisabled: boolean = false;
  cities = CITIES;
  manRecruitment = MAN_RECRUITMENT;
  fieldStaff = FIELDSTAFF;
  jobAssignStatus = JOB_ASSIGN_STATUS;
  monthNames = MONTHS_NAME;
  finalDate;
  Date;
  branchId;
  rows = 15;
  fullCalendar: boolean = false;
  shiftError: boolean = false;
  viewSrvPoint: boolean = false;
  filterData: string = "";
  searchData: any[] = [];
  displayLocation: boolean = false;
  position: string;
  serviceData: any = null;

  nEmpId: any = null;
  transportationData = TRANSPORTATIONDATA;
  transportation: any = null;
  nTransportPointId: any = null;
  skillId: any
  transportPointsData: any = [];
  allSkillsData: any = [];
  traineeEmpData: any = [];
  transportationTrainee: any;
  nTransportPointIdTrainee: any;
  trainees: any = []
  tempTraineeData = []
  traineeData = []
  isTraineeView: boolean = false;
  isAddForm: boolean = false;
  data: any;
  employeeData = []
  EmpId: any;
  ShiftId: any;
  staffData = [];
  staffId: any;
  datesArr = [];
  staffCalData = [];
  INITIAL_EVENTS = []
  calendarOptions: CalendarOptions;
  isCalendarLoad: boolean = false;
  timeValue: any = '08:00';
  isDisable: boolean = false;
  fcalJobNo: any;
  fcalCustomerName: any;
  fcalPatientName: any;
  constructor(private fb: FormBuilder, private service: ServicesService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.serviceData = localStorage.getItem('reqServiceSkill')
  }

  ngOnInit(): void {
    this.getStaff();
    let setTime = new Date();
    setTime.setHours(8);
    setTime.setMinutes(0);
    setTime.setSeconds(0);
    this.stTime = setTime;
    // this.assignJob = [
    //   {jno:this.jobStartAssignmentData['cJobNo'],pdate:this.formatDate(this.jobStartAssignmentData['UpdateDate']),stime:'11:00AM',service:'Home Care',customer:'Ram Singh /9867573934',assignto:'',assignon:'',status:'Assign',repeateat:''}
    // ];
    let d = new Date();

    this.finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    this.Date = new Date(this.finalDate);
    this.BranchLocation();
    //this.searchTableF();

    // offlinesearch on table
    // this.filterService.register('isPrimeNumber', (value, filter): boolean => {
    //   if (filter === undefined || filter === null || filter.trim() === '') {
    //     return true;
    //   }

    //   if (value === undefined || value === null) {
    //     return false;
    //   }

    //   return value.toString() === filter.toString();
    // });

    // this.filterService.filters['isPrimeNumber'](3);                      //true
    // this.filterService.filters['isPrimeNumber'](5);                      //true
    // this.filterService.filters['isPrimeNumber'](568985673);              //false
    this.getAllSkills();
    this.getTransportationPoints();
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    // this.editJobDialog = false;
    this.editScheduleDialog = false;
    this.allreset();
  }



  getEventItem(evt) {
    this.eventLists = evt;
    this.index = 1
  }




  assignJobD() {
    let finalStartingAt;
    if (this.stTime) {
      let startTime = new Date(this.stTime).toLocaleTimeString('en-US', {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      });
      finalStartingAt = startTime;
    } else {
      finalStartingAt = null;
    }
    if (finalStartingAt == null) {
      this.showStartTimeErrorMsg = true;
      this.StartTimeinError = "Please Select Start Time.";
    }

    if (this.showEmpErrorMsg == true || this.showStartTimeErrorMsg == true) {
      return;
    }

    // add trainee section
    let obj = {}
    this.tempTraineeData.forEach((ele) => {
      obj = {
        'nEmpid': ele.nEmpid,
        'transportation': ele.transportation,
        'nTransportPointId': ele.nTransportPointId
      }
      this.trainees.push(obj);
    },
    )
    let tmpData = [];
    let formData = {}
    this.employeeData.forEach((emp) => {
      formData = {
        "nJobdid": this.jobStartAssignmentData['nJobdid'],
        "nJSchid": emp.nJSchid ? emp.nJSchid : 0,
        "dStartDate": this.formatDate(this.Date),
        "dStartTm": emp.dStartTm,
        "dEndTm": "19:00",
        "nEmpid": emp.nEmpid,
        "nShiftId": this.ShiftId,
        "cJobResp": "U",
        "dRespDt": "",
        "cReason": "",
        "nAddrid": this.jobStartAssignmentData['addressDetail'][0]['nAddId'],
        "nUserid": localStorage.getItem('loginId'),
        "transportation": emp.transportation ? emp.transportation : '',
        "nTransportPointId": emp.nTransportPointId ? emp.nTransportPointId : '',
        "trainees": this.trainees
      };
      tmpData.push(formData);
    })
    let date: Date = new Date(this.Date);
    let FullDate = date.getDate() + '-' + this.monthNames[date.getMonth()] + '-' + date.getFullYear()
    this.confirmationService.confirm({
      message: '<h1>Job Assignment for JobNo [' + this.jobStartAssignmentData['cJobNo'] + '] on [' + FullDate + ']  at [' + finalStartingAt + '] ?</h1>',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.assignJob(tmpData).subscribe((res) => {
          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
            // this.editJobDialog = false;
            this.editScheduleDialog = false;
            this.getAssignJobData();
            this.tempTraineeData = [];
            this.employeeData = [];            
          }
          if (res['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Assigned' });
            this.tempTraineeData = []
          }
        }, (err) => {

        });
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You Have Canceled',
        });
      },
    });
  }

  multipleScheduleData: any[] = [];
  selectAllJob(evt) {
    if (evt.checked) {
      this.jobScheduleTableData.forEach((element, ind) => {

        this.jobScheduleTableData[ind]['isChecked'] = true;
        let LastAssignedToSplit = element['LastAssignedTo'].split('/');
        let EmpName = LastAssignedToSplit[0];
        let PhoneNo = LastAssignedToSplit[1];
        let formData = {
          "PhoneNo": PhoneNo, "EmpName": EmpName, "CPatientNm": element['CPatientNm'], "cJobNo": element['cJobNo'], "nJobdid": element['nJobdid'], "dStartDate": this.formatDate(this.Date), "dStartTm": element['dStartTm'], "dEndTm": element['dStartTm'], "nEmpid": element['LastAssignedEmpid'], "cJobResp": "U", "dRespDt": "", "cReason": "", "nAddrid": element['addressDetail'][0]['nAddId'], "nUserid": localStorage.getItem('loginId'), "transportation": null,
          "nTransportPointId": null, "trainees": []
        };
        this.multipleScheduleData.push(formData);

      });
    } else {
      this.jobScheduleTableData.forEach((element, ind) => {
        this.jobScheduleTableData[ind]['isChecked'] = false;
        this.multipleScheduleData = Utils.removeByAttr(this.multipleScheduleData, 'nJobdid', element['nJobdid']);
      });
    }
  }
  UnAssign(data) {

    if (data.cJobResp == 'UnAssign' || data.JOBSTATUS == 'UNASSIGNED') {
      return
    } else {
      let formData = [
        {
          "nJobdid": data.nJobdid,
          "dOnPlanDate": this.formatDate(this.Date),
        }
      ]

      this.confirmationService.confirm({
        message: '<h1>Do you want to Unassign [' + data.cJobNo + ']  ?</h1>',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.service.unAssignJob(formData).subscribe((res) => {
            if (res['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
              // this.editJobDialog = false;
              this.editScheduleDialog = false;
              this.getAssignJobData();
            }
            if (res['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Assigned' });
            }
          }, (err) => {

          });
        },
        reject: () => {
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
          this.messageService.add({
            severity: 'info',
            summary: 'Rejected',
            detail: 'You Have Canceled',
          });
        },
      });
    }
  }

  rescheduleJobDialog() {
    if (this.multipleScheduleData.length > 0) {
      this.RescheduleDialog = true;
      let date: Date = new Date(this.Date);
      this.JobScheduleDate = date.getDate() + '-' + this.monthNames[date.getMonth()] + '-' + date.getFullYear()
    }

    // this.service.assignJob(this.multipleScheduleData).subscribe((res) => {
    //   if (res['status'] == 200) {
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
    //     this.getAssignJobData();
    //   }
    //   if (res['status'] == 204) {
    //     console.log('Error')
    //     //  this.messageService.add(this.response.errorMessage)
    //     this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Assigned' });
    //   }
    // }, (err) => {

    // });

  }
  rescheduleJob() {
    this.service.assignJob(this.multipleScheduleData).subscribe((res) => {
      if (res['status'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
        this.multipleScheduleData = [];
        this.RescheduleDialog = false;
        this.getAssignJobData();
      }
      if (res['status'] == 204) {
        this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Assigned' });
      }
    }, (err) => {

    });
  }
  close() {
    this.multipleScheduleData = [];
    this.RescheduleDialog = false;
    this.getAssignJobData();
  }

  manageScJob(evt, element, ind) {
    if (evt.checked) {
      this.jobScheduleTableData[ind]['isChecked'] = true;
      let LastAssignedToSplit = element['LastAssignedTo'].split('/');
      let EmpName = LastAssignedToSplit[0];
      let PhoneNo = LastAssignedToSplit[1];
      let formData = {
        "PhoneNo": PhoneNo, "EmpName": EmpName, "CPatientNm": element['CPatientNm'], "cJobNo": element['cJobNo'], "nJobdid": element['nJobdid'], "dStartDate": this.formatDate(this.Date), "dStartTm": element['dStartTm'], "dEndTm": element['dStartTm'], "nEmpid": element['LastAssignedEmpid'], "cJobResp": "U", "dRespDt": "", "cReason": "", "nAddrid": element['addressDetail'][0]['nAddId'], "nUserid": localStorage.getItem('loginId'),
        "transportation": null, "nTransportPointId": null, "trainees": []
      };
      this.multipleScheduleData.push(formData);
    } else {
      this.jobScheduleTableData[ind]['isChecked'] = false;
      this.multipleScheduleData = Utils.removeByAttr(this.multipleScheduleData, 'nJobdid', element['nJobdid']);
    }
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

  empData: any[] = [];
  getEmployeeBySrvSkills(srvSkillsId, scheduleDate, editObj) {
    let scheduleDate1 = this.formatDate(this.Date);
    this.service.getEmpBySrvSkill(srvSkillsId, scheduleDate1).subscribe((res) => {
      this.empData = res['data'];
      this.employeeData = [];
      this.GetShiftData();
      if (editObj && editObj["JobSchId"]) {
        this.tempTraineeData = [];
        this.employeeData = [];
        this.transportation = '';
        this.nTransportPointId = ''
        this.EmpId = null;
        this.getSelectedEmployeeData(editObj);
      }
    }, (error) => {
      console.error(error);
    });
  }

  GetShiftData() {
    this.service.GetShiftData().subscribe((resData: any) => {
      if (resData && resData.data.length) {
        this.shiftOption = resData.data;
      }
    });
  }
  getSelectedEmployeeData(editObj: any) {
    this.service.GetJobAssignData(editObj).subscribe((res: any) => {      
      if (res && res.data.length) {
        let Regulardata = res.data[0].Regular;
        let traineesdata = res.data[0].trainees;
        for (let index = 0; index < Regulardata.length; index++) {
          let arr = Regulardata[index]["dStartTm"].split(':');
          let ehour = parseInt(arr[0]) + 11;
          let emin = parseInt(arr[1]);
          let empIndex = this.empData.findIndex(ind => ind.nEmpId == Regulardata[index]["nEmpid"]);
          if (empIndex >= 0) {
            this.empData[empIndex]["disabled"] = true;
          }
          let obj = {
            "nEmpid": Regulardata[index]["nEmpid"],
            "empName": Regulardata[index]["EmpNm"],
            "nJSchid": Regulardata[index]["nJschid"],
            "nTransportPointId": Regulardata[index]["nTransportPointid"],
            "transportPointIdName": Regulardata[index]["transportPointIdName"],
            "transportation": Regulardata[index]["transportation"],
            "transportName": Regulardata[index]["TransportName"],
            "dStartTm": Regulardata[index]["dStartTm"],
            "endTime": `${ehour}:${emin}`
          }
          this.employeeData.push(obj);
        }
        for (let i = 0; i < traineesdata.length; i++) {
          let arr = traineesdata[i]["dStartTm"].split(':');
          let ehour = parseInt(arr[0]) + 11;
          let emin = parseInt(arr[1]);
          let obj = {
            "nEmpid": traineesdata[i]["nEmpid"],
            "empName": traineesdata[i]["EmpNm"],
            "nJSchid": traineesdata[i]["nJschid"],
            "nTransportPointId": traineesdata[i]["nTransportPointid"],
            "transportPointIdName": traineesdata[i]["transportPointIdName"],
            "transportation": traineesdata[i]["transportation"],
            "transportName": traineesdata[i]["TransportName"],
            "skillName": traineesdata[i]["Skillname"],
            "skillId": traineesdata[i]["SkillId"],
            "dStartTm": traineesdata[i]["dStartTm"],
            "endTime": `${ehour}:${emin}`
          }
          this.tempTraineeData.push(obj);
        }
      }
    }, (error) => {
      console.error(error);
    });
  }
  getAssignJobData() {
    this.allreset();
    this.getStartDate();
    this.getScheduleDate();
  }

  getStartDate() {

    let body = {
      BranchID: localStorage.getItem('branchId'),
      JobScheduleDt: this.formatDate(this.Date),
      SrvCtgid: 2,
      SkillId: this.serviceData
    }
    this.service.getAssignStartDataExternal(body).subscribe(
      (res) => {
        this.jobStartTableData = res['data'];
      }, err => { });
  }

  getScheduleDate() {
    let frmDate = this.formatDate(this.Date);
    let branchID = localStorage.getItem('branchId');
    let status = this.jobStatus;
    let body = {
      BranchID: localStorage.getItem('branchId'),
      JobScheduleDt: this.formatDate(this.Date),
      Status: this.jobStatus,
      srvcatid: 2,
      SkillId: this.serviceData
    }
    this.service.getAssignScheduleDataExternal(body).subscribe(
      (res) => {
        this.jobScheduleTableData = res['data'];
      },
      (err) => {

      });
  }

  showAssignDialog() {
    this.assignmentDialog = true;
  }

  submit() {
    console.log(this.formsGroup.value);
  }
  editAssignJob(job) { }


  getEmp(data, empName) {
    this.globalEmpData = data;
    this.EmpName = empName;
    if (this.globalEmpData == undefined || this.globalEmpData == null) {
      this.showEmpErrorMsg = true;
      this.EmpinError = "Please Select Employee.";
    }
    else {
      this.showEmpErrorMsg = false;
      this.EmpinError = "";
    }
  }
  // jobEditDialogStart(data) {
  //   this.jobStartAssignmentData = data;
  //   this.editJobDialog = true;
  //   this.getEmployeeBySrvSkills(this.jobStartAssignmentData['nSrvSkillid'], this.formatDate(this.dateValue));
  // }
  jobEditDialogDays(data) {
    this.employeeData = [];
    let changeObject = {
      nJSchid: data.nJSchid,
      nJobid: data.nJobid,
      nJobdid: data.nJobdid,
      DCreateDate: data.DCreateDate,
      cJobNo: data.cJobNo,
      nSrvid: data.nJSchid,
      srvName: data.srvName,
      nAcid: data.nAcid,
      cCustNm: data.CCustNm,
      cAddress: data.cAddress,
      cMobile: data.cMobile,
      cLatLong: data.cLatLong,
      cSrvType: data.cSrvType,
      nSrvSkillid: data.nSrvSkillid,
      nJobFrq: data.nJobFrq,
      nFrqQty: data.nFrqQty,
      cWeekDys: data.cWeekDys,
      dStartTm: data.dStartTm,
      nHour: data.dStartTm,
      dEndSrvDt: data.LastAssignedOn,
      nUpdateID: data.nUpdateID,
      dUpdateDate: data.dUpdateDate,
      srvSkill: data.srvSkill,
      unitID: data.unitID,
      unitName: data.unitName,
      nRateId: data.nRateId,
      rate: data.rate,
      NDiscRatePer: data.NDiscRatePer,
      NDiscRateAmt: data.NDiscRateAmt,
      nadRate: data.nadRate,
      cJobResp: data.cJobResp,
      nEmpid: data.nEmpid,
      employeeName: data.LastAssignedTo,
      nPatientId: data.NPatientid,
      cPatientNm: data.CPatientNm,
      nAge: data.nAge,
      cSex: data.cSex,
      diagnosis: data.diagnosis,
      BillingMode: data.BillingMode,
      JOBSTARTSTATUS: data.JOBSTARTSTATUS,
      addressDetail: data.addressDetail
    }
    this.jobStartAssignmentData = changeObject;

  }

  jobEditDialog(data, type) {
    let changeObject = {
      nJSchid: data.nJSchid,
      nJobid: data.nJobid,
      nJobdid: data.nJobdid,
      DCreateDate: data.DCreateDate,
      cJobNo: data.cJobNo,
      nSrvid: data.nJSchid,
      srvName: data.CSrvName,
      nAcid: data.nAcid,
      cCustNm: data.CCustNm,
      cAddress: data.cAddress,
      cMobile: data.cMobile,
      cLatLong: data.cLatLong,
      cSrvType: data.cSrvType,
      nSrvSkillid: data.nSrvSkillid,
      nJobFrq: data.nJobFrq,
      nFrqQty: data.nFrqQty,
      cWeekDys: data.cWeekDys,
      dStartTm: data.dStartTm,
      nHour: data.dStartTm,
      dEndSrvDt: data.LastAssignedOn,
      nUpdateID: data.nUpdateID,
      dUpdateDate: data.LastAssignedOn,
      srvSkill: data.Skills,
      unitID: data.unitID,
      unitName: data.unitName,
      nRateId: data.nRateId,
      rate: data.rate,
      NDiscRatePer: data.NDiscRatePer,
      NDiscRateAmt: data.NDiscRateAmt,
      nadRate: data.nadRate,
      cJobResp: data.cJobResp,
      nEmpid: data.nEmpid,
      employeeName: data.LastAssignedTo,
      nPatientId: data.NPatientid,
      cPatientNm: data.CPatientNm,
      nAge: data.nAge,
      cSex: data.cSex,
      diagnosis: data.diagnosis,
      BillingMode: data.BillingMode,
      JOBSTARTSTATUS: data.JOBSTARTSTATUS,
      addressDetail: data.addressDetail,

    }
    if (type == 'day') {
      this.jobStartAssignmentData = changeObject;
    } else {
      this.jobStartAssignmentData = data;
    }

    this.IsStarTimeDisabled = true;
    const s = this.StartTimeddl.filter(e => e.code == data['dStartTm']);
    this.SelStartddl = s[0];
    if (this.SelStartddl) {
      if (this.SelStartddl.name == '08:00') {
        let setTime = new Date();
        setTime.setHours(8);
        setTime.setMinutes(0);
        setTime.setSeconds(0);
        this.stTime = setTime;
        this.IsStarTimeDisabled = false;
      }
      if (this.SelStartddl.name == '20:00') {
        let setTime = new Date();
        setTime.setHours(20);
        setTime.setMinutes(0);
        setTime.setSeconds(0);
        this.stTime = setTime;
        this.IsStarTimeDisabled = false;
      }
    }
    let editObj = {
      JobSchId: data.nJSchid,
      Jobdid: data.nJobdid,
      PlanDate: this.formatDate(this.Date),
    }
    this.getEmployeeBySrvSkills(this.jobStartAssignmentData['nSrvSkillid'], this.formatDate(this.Date), editObj);
    this.editScheduleDialog = true;
  }

  selTime(evt: any) {
    let stTime1 = new Date(evt);
    let startHours = stTime1.getHours();
    let startMins = stTime1.getMinutes();
    stTime1.setHours(startHours);
    stTime1.setMinutes(startMins);
    stTime1.setSeconds(0);
    this.stTime = stTime1;
    if (this.stTime) {
      this.showStartTimeErrorMsg = false;
      this.StartTimeinError = "";
      return;
    }
    else {
      this.showStartTimeErrorMsg = true;
      this.StartTimeinError = "Please Select Start Time.";
      return;
    }
  }
  ChangeStartZone(evt: any) {
    if (evt.value.name == "Custom") {
      this.IsStarTimeDisabled = true;
      this.isDisable = false;
    }
    else {
      this.timeValue = evt.value.name;
      this.IsStarTimeDisabled = false;
    }
    this.onShiftSelect();
  }

  DailyScheduleEditDialog() {
    this.editScheduleDialog = true;
  }

  saveItemDeposit() { }
  saveItemDamaged() { }

  //  get Branch and Location
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.service.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.branchId = this.branchData[0];
      }
    );
  }

  getSrvPoints(srvPoint) {
    this.viewSrvPoint = true;
  }

  history(data) {
    this.fcalJobNo = data['cJobNo'];
    this.fcalCustomerName = data['CCustNm'];
    this.fcalPatientName = data['CPatientNm']
    const startOfMonth = moment(this.Date).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(this.Date).endOf('month').format('YYYY-MM-DD');
    const jobId = data['nJobdid'];

    this.service.getJobHistoryData(jobId, startOfMonth, endOfMonth).subscribe((res) => {
      this.calenderData = res['data'];
    }, (err) => { });
    this.fullCalendar = true;
  }
  closeCalendar() {
    this.fullCalendar = false;
  }

  searchTableF() {
    let empID = localStorage.getItem('empID');
    let roleName = "";
    this.service.getTablelList(roleName, empID).subscribe(
      res => {
        this.searchData = res['data'];
      });
  }

  customerData;
  lat;
  long;
  loadMap: boolean = false;
  showLocation(data) {
    let customerDatas = [];
    customerDatas.push(data);
    this.customerData = customerDatas[0];
    let latLong = this.customerData['addressDetail'][0]['LatLong'].split(',');
    this.displayLocation = true;
    this.lat = latLong[0];
    this.long = latLong[1];
    this.loadMap = true;
  }

  itemEventData(eventData) {
    console.log(eventData)
  }

  getAllSkills() {
    this.service.getAllSkills(15).subscribe((res: any) => {
      if (res && res.status == 200) {
        this.allSkillsData = res['data'];
      }
    })
  }
  getTransportationPoints() {
    this.service.getTransportpoint().subscribe((res: any) => {
      if (res && res.status == 200) {
        this.transportPointsData = res['data'];
      }
    })
  }

  onSkillChange(event, SkillId) {
    this.getEmployees(SkillId);
  }

  getEmployees(SkillId) {
    let scheduleDate1 = this.formatDate(this.Date);
    this.service.getEmpBySrvSkill(SkillId, scheduleDate1).subscribe((res) => {
      if (res) {
        this.traineeEmpData = res['data'];
      }
    }, (error) => {
      console.error(error);
    });
  }

  onElementChange(event) {
    this.trainees = []
    let obj = {}
    if (event.value.length) {
      event.value.forEach((e) => {
        obj = {
          "nEmpid": e
        }
        this.trainees.push(obj);
      })
    }
  }
  onTransportationChange(value) {
    let codeName = ''
    let EmpName = ''
    let transportPointIdName = ''
    let transportName = ''
    this.allSkillsData.forEach((ele) => {
      if (ele.serialNo == this.skillId) {
        codeName = ele.codeName
      }
    })
    this.traineeEmpData.forEach((ele) => {
      if (ele.nEmpId == this.nEmpId) {
        EmpName = ele.empName
      }
    })
    this.transportationData.forEach((ele) => {
      if (ele.val == this.transportationTrainee) {
        transportName = ele.name
      }
    })
    this.transportPointsData.forEach((ele) => {
      if (ele.nTransportPointId == this.nTransportPointIdTrainee) {
        transportPointIdName = ele.cTransportPointNm
      }
    })
    let obj = {
      "nEmpid": this.nEmpId,
      "empName": EmpName,
      "nTransportPointId": this.nTransportPointIdTrainee,
      "transportPointIdName": transportPointIdName,
      "transportation": this.transportationTrainee,
      "transportName": transportName,
      "skillId": this.skillId,
      "skillName": codeName
    }
    this.tempTraineeData.push(obj);
  }
  remove(value, flag) {
    console.log("this.traineeData", this.traineeData)
    if (flag) {
      let removeIndex = this.traineeData.findIndex(x => x.nEmpid == value.nEmpid);
      if (removeIndex >= 0) {
        this.traineeData.splice(removeIndex, 1)
      }
      // this.traineeData.forEach((ele, i) => {
      //   if (ele.nEmpid == value.nEmpid && ele.skillId == value.skillId) {
      //     if (ele.nTransportPointId == value.nTransportPointId) {
      //       this.traineeData.splice(i)
      //     }
      //   }
      // })
    } else {
      let removeIndex = this.tempTraineeData.findIndex(x => x.skillId == value.skillId && x.nEmpid == value.nEmpid);
      if (removeIndex >= 0) {
        this.tempTraineeData.splice(removeIndex, 1)
      }
      // this.tempTraineeData.forEach((ele, i) => {
      //   if (ele.nEmpid == value.nEmpid && ele.skillId == value.skillId) {
      //     if (ele.nTransportPointId == value.nTransportPointId) {
      //       this.tempTraineeData.splice(i)
      //     }
      //   }
      // })
    }

  }
  getAllTrainee(data) {
    this.service.getAllTrainee(data.nJSchid).subscribe((res) => {
      if (res) {
        this.traineeData = res['data']
      }
    })
  }

  manageTrainee(data) {
    if (!data.nJSchid) return
    this.data = data;
    this.isTraineeView = true;
    this.getAllTrainee(data);
  }

  addALLTrainee() {
    let data = {};
    let tempArr = [];
    this.traineeData.forEach((ele) => {
      data = {
        "nJobdid": this.data.nJobdid,
        "nAddrid": this.data.addressDetail[0]['nAddId'],
        "nEmpid": ele.nEmpid,
        "dOnPlanDate": this.formatDate(this.Date),
        "nUserid": localStorage.getItem('loginId'),
        "dStartTm": this.data.dStartTm,
        "Transportation": ele.transportation,
        "nTransportPointid": ele.nTransportPointId
      }
      tempArr.push(data)
    })
    this.service.manageTrainee(tempArr).subscribe((res) => {
      if (res && res['status'] == 200) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
        this.isTraineeView = false;
        tempArr = []
      } else {
        this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Assigned' });
      }
    })
  }
  openForm() {
    this.isAddForm = true;
  }
  addOneTrainee() {
    let codeName = ''
    let EmpName = ''
    let transportPointIdName = ''
    let transportName = ''
    this.allSkillsData.forEach((ele) => {
      if (ele.serialNo == this.skillId) {
        codeName = ele.codeName
      }
    })
    this.traineeEmpData.forEach((ele) => {
      if (ele.nEmpId == this.nEmpId) {
        EmpName = ele.empName
      }
    })
    this.transportationData.forEach((ele) => {
      if (ele.val == this.transportationTrainee) {
        transportName = ele.name
      }
    })
    this.transportPointsData.forEach((ele) => {
      if (ele.nTransportPointId == this.nTransportPointIdTrainee) {
        transportPointIdName = ele.cTransportPointNm
      }
    })
    let obj = {
      "nEmpid": this.nEmpId,
      "empName": EmpName,
      "nTransportPointId": this.nTransportPointIdTrainee,
      "transportPointIdName": transportPointIdName,
      "transportation": this.transportationTrainee,
      "transportName": transportName,
      "skillId": this.skillId,
      "skillName": codeName,
      "Empskills": codeName,
      "Employee": EmpName,
    }
    if (!this.traineeData) this.traineeData = []
    this.traineeData.push(obj);
    this.isAddForm = false;
    this.nTransportPointIdTrainee = ''
    this.transportationTrainee = ''
    this.skillId = ''
    this.nEmpId = ''
  }

  onAddEmployee(value) {
    let transportPointIdName = ''
    let transportName = ''
    let EmpName = ''
    this.transportationData.forEach((ele) => {
      if (ele.val == this.transportation) {
        transportName = ele.name
      }
    })
    this.transportPointsData.forEach((ele) => {
      if (ele.nTransportPointId == this.nTransportPointId) {
        transportPointIdName = ele.cTransportPointNm
      }
    })
    this.empData.forEach((ele) => {
      if (ele.nEmpId == this.EmpId) {
        EmpName = ele.empName
      }
    })
    let finalStartingAt
    let startTime = new Date(this.stTime).toLocaleTimeString('en-US', {
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    });
    finalStartingAt = startTime;
    let arr = this.timeValue.split(':');
    let ehour = parseInt(arr[0]) + 11;
    let emin = parseInt(arr[1])
    let obj = {
      "nEmpid": this.EmpId,
      "empName": EmpName,
      "nTransportPointId": this.nTransportPointIdTrainee,
      "transportPointIdName": transportPointIdName,
      "transportation": this.transportationTrainee,
      "transportName": transportName,
      "skillId": this.skillId,
      "dStartTm": this.timeValue,
      "endTime": `${ehour}:${emin}`
    }
    this.employeeData.push(obj);
    this.transportation = '';
    this.nTransportPointId = ''
    this.EmpId = null;
  }

  removeEmp(nEmpid: number) {
    let removeIndex = this.employeeData.findIndex(x => x.nEmpid == nEmpid);
    if (removeIndex >= 0) {
      this.employeeData.splice(removeIndex, 1)
    }
    let empIndex = this.empData.findIndex(ind => ind.nEmpId == nEmpid);
    if (empIndex >= 0) {
      this.empData[empIndex]["disabled"] = false;
    }
  }
  getStaff() {
    this.service.getStaff().subscribe((res) => {
      if (res) {
        this.staffData = res['data']
      }
    })
  }


  allreset() {
    this.skillId = null;
    this.nEmpId = '';
    this.EmpId = '';
    this.ShiftId = '';
    this.nTransportPointId = '';
    this.transportation = '';
    this.transportationTrainee = '';
    this.nTransportPointIdTrainee = null;
    this.tempTraineeData = [];
    this.employeeData = [];       
  }

  onStaffChange(value) {
    this.INITIAL_EVENTS = [];
    const startOfMonth = "2020-04-01";
    const date = new Date();
    const endOfMonth = this.formatDate(date);
    const empID = value.value;
    this.service.getEmployeeData(empID, startOfMonth, endOfMonth).subscribe((res) => {
      this.staffCalData = res['data'];
      this.datesArr = this.staffCalData[0]['Dates'];
      this.datesArr.forEach((elem, ind) => {
        if (elem.JobExecution.length) {
          let tmpObj = {
            title: elem['JobExecution'][0]['cJobno'] + " , " + elem['JobExecution'][0]['PatientName']
              + " , " + elem['JobExecution'][0]['dStartTm'] + " , " + elem['JobExecution'][0]['dEndtm'] + " , " + elem['JobExecution'][0]['CustName'],
            mobile: elem['JobExecution'][0]['CustMobile'],
            dstartDate: elem['JobExecution'][0]['dStartDate'],
            start: elem['AllDates'].replace(/T.*$/, ''),
            latLng: elem['JobExecution'][0]['cLatLong'],
            eventDate: elem['AllDates'].replace(/T.*$/, '')
          }
          this.INITIAL_EVENTS.push(tmpObj);
        }
      });
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: ''
        },
        eventClick: null,
        events: this.INITIAL_EVENTS
      };
      this.isCalendarLoad = true;
    }, (err) => { });
  }


  onSelect($event) {
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();
    this.timeValue = `${hour}:${min}`;
    // console.log("this.jobStartAssignmentData", this.jobStartAssignmentData)
    // let arr = this.jobStartAssignmentData.dStartTm.split(':');
    // let ehour = arr[0];
    // let emin = arr[1]
    // let time = `${ehour}:${emin}`

    // if (Number(hour) < Number(ehour)) {
    //   this.isDisable = true
    // } else {
    //   this.isDisable = false;
    // }
    this.onShiftSelect();
  }
  onShiftSelect() {
    if (this.ShiftId && this.timeValue) {
      let data = this.shiftOption.find(x => x.nShiftId == this.ShiftId);
      if (data) {
        let startTime = data.dStarttime.split(':');
        let endTime = data.dEndTime.split(':');
        let splitTime = this.timeValue.split(':');
        const dt = new Date();
        let dt2: number | Date;
        let tomorrow = new Date();
        tomorrow.setDate(dt.getDate() + 1);
        let dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
          parseInt(splitTime[0]), parseInt(splitTime[1]), parseInt("00"));
        let dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
          parseInt(startTime[0]), parseInt(startTime[1]), parseInt(startTime[2]));
        if (startTime > endTime) {
          dt2 = new Date(tomorrow.getFullYear(), tomorrow.getMonth(),
            tomorrow.getDate(), parseInt(endTime[0]), parseInt(endTime[1]), parseInt(endTime[2]));
        } else {
          dt2 = new Date(dt.getFullYear(), dt.getMonth(),
            dt.getDate(), parseInt(endTime[0]), parseInt(endTime[1]), parseInt(endTime[2]));
        }
        if ((dt3 >= dt1 && dt3 <= dt2)) {
          this.shiftError = false;
        } else {
          this.shiftError = true;
        }
      }
    }
  }

  closeDialog() {
    this.allreset();
  }
}
