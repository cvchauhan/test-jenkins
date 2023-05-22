import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-shift',
  templateUrl: './manage-shift.component.html',
  styleUrls: ['./manage-shift.component.css']
})
export class ManageShiftComponent implements OnInit {

  startTime;
  endTime;
  workingHours;
  shiftForm: FormGroup;
  shiftStatus:any[]=[
    {name: 'Active', code: "Y"},
    {name: 'Pending', code: "P"}
  ];
  shiftData:any[] = [];
  rows = 15;

  constructor(private hrservice: HrService, private codeMasterService: CodeMasterService, private fb: FormBuilder,private messageservice: MessageService) { }

  ngOnInit(): void {
    this.shiftForm = this.fb.group({
      sName: new FormControl(''),
      sTime: new FormControl(''),
      eTime: new FormControl(''),
      sHours: new FormControl(''),
      sStatus: new FormControl('')
    });    
    this.getAllShift();
    
    
  }

  onStartTime($event){
      let hours = $event.getHours();
      let minutes = $event.getMinutes();
      this.startTime = `${hours}:${minutes}`;
      console.log(this.startTime);
  }

  onEndTime($event){
    let hours = $event.getHours();
    let minutes = $event.getMinutes();
    this.endTime = `${hours}:${minutes}`;
    // console.log(this.endTime);
    const totalHours = moment.utc(moment(this.endTime, "HH:mm:ss").diff(moment(this.startTime, "HH:mm:ss"))).format("HH:mm");
    this.workingHours = totalHours;
    // console.log(totalHours)
  }

  onSubmit(){
    let formValue = this.shiftForm.value;
    let hours = parseInt(this.workingHours);
    let formData = {};

    let shours = this.startTime.getHours();
    let sminutes = this.startTime.getMinutes();
    this.startTime = `${shours}:${sminutes}`;

    let ehours = this.endTime.getHours();
    let eminutes = this.endTime.getMinutes();
    this.endTime = `${ehours}:${eminutes}`;

    let shftId;
    if(this.isEdit){
      shftId = this.editShiftId;
    } else {
      shftId = 0;
    }

    formData['nShiftid'] = shftId;
    formData['cShiftName'] = formValue['sName'];
    formData['dStarttime'] = this.startTime;
    formData['dEndTime'] = this.endTime;
    formData['nHour'] = hours;
    formData['cStatus'] = formValue['sStatus']['code'];

    this.hrservice.addShift(formData).subscribe((res) => {
      this.shiftForm.reset();
      this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Shift Added Successfully' });
      this.getAllShift();
    })

    console.log(formValue);
  }

  getAllShift(){
    this.hrservice.getshift().subscribe((data) => {
      this.shiftData = data['data'];
    });
  }

  isEdit:boolean = false;
  editShiftId;
  editShift(sftId){
    this.editShiftId = sftId;
    this.hrservice.getShiftById(sftId).subscribe((res) => {
      const shiftValue = res['data'];
      const status = this.shiftStatus.filter((e) => e.code == shiftValue['cStatus']);

      // start time formatebefore patch
      let finalStime;
      let startTime = new Date();
      let startTmpTime = shiftValue['dStarttime'].split(":");
      startTime.setHours(startTmpTime[0]);
      startTime.setMinutes(startTmpTime[1]);
      startTime.setSeconds(0o0);
      finalStime = startTime;
      
      // End time formatebefore patch
      let finalEtime;
      let endTime = new Date();
      let endTmpTime = shiftValue['dEndTime'].split(":");
      endTime.setHours(endTmpTime[0]);
      endTime.setMinutes(endTmpTime[1]);
      endTime.setSeconds(0o0);
      finalEtime = endTime;

      this.shiftForm.patchValue({
        sName :  shiftValue['cShiftName'],
        sTime : finalStime,
        eTime : finalEtime,
        sStatus : status[0],
        sHours:shiftValue['nHour']
      });

      this.isEdit = true;
    });
  }

}
