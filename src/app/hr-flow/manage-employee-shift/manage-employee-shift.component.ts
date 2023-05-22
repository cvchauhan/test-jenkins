import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';

@Component({
  selector: 'app-manage-employee-shift',
  templateUrl: './manage-employee-shift.component.html',
  styleUrls: ['./manage-employee-shift.component.css']
})
export class ManageEmployeeShiftComponent implements OnInit {

  branchData: any;
  branchId: any = {};
  gender:any = [
    {gName: "Male",Code: "M"},
    {gName: "Female",code: "F"},
    {gName: "Other",code: "O"}
  ];
  genderId:any;
  department:any = [];
  deptId:any;
  shift:any = [];
  shiftId:any;
  departmentData: any[] = [];
  employeeShiftData:any[] = [];
  rows =12;

  constructor(private hrservice: HrService, private codeMasterService: CodeMasterService) { }

  ngOnInit(): void {
    this.BranchLocation();
    this.loadDepartmentData();
    this.getShift();
  }

  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.hrservice.getBranch(empID).subscribe((res) => {
      this.branchData = res['data'];
      this.branchId = this.branchData[0];
      // console.log('This is Branch location',this.branchData);
    });
  }

  loadDepartmentData() {
    this.departmentData = [];
    this.codeMasterService.getCatData(12, 0).subscribe((data) => {
      let tmpData = data['data'];
      // this.departData =tmpData;
      // console.log(this.departData);
      tmpData.forEach((element) => {
        this.departmentData.push({ serialNo: element['serialNo'], codeID: element['codeID'], ctgID: element['ctgID'], categoryName: element['categoryName'], codeName: element['codeName'], parentSerialNo: element['parentSerialNo'], parentCodeName: element['parentCodeName']});
      });
      // console.log('Department',this.departmentData)
    }, (error) => {
      console.log(error);
    });
  }

  getShift(){
    this.hrservice.getshift().subscribe((data)=>{
      this.shift = data['data'];
      this.shift.forEach((item,index)=>{
        this.shift[index]['shiftNameDate'] = `${item['cShiftName']} ${item['dStarttime']} ${item['dEndTime']}`;
      });
    });
    
  }

  view(){
    let dept;
    if(!this.deptId){
      dept = 0;
      
    } else {
      dept = this.deptId['serialNo'];
      
    }
    let brId;
    if(!this.branchId['val']){
      brId = 0;
    } else {
      brId = this.branchId['val'];
    }
    let sftid;
    if(!this.shiftId){
      sftid = 0;
    } else {
      sftid = this.shiftId['nShiftId'];
    }
   // console.log(this.branchId);
    this.hrservice.getEmployeeShift(sftid ,dept,brId).subscribe((data)=>{
      this.employeeShiftData =data['data'];
    });
  }

}
