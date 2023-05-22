import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmpSharedService } from 'src/app/shared-services/emp-shared.service';
import { EmployeeService } from '../employee.service';
import { BRANCHMODEL } from 'src/app/interface';

@Component({
  selector: 'app-access-info',
  templateUrl: './access-info.component.html',
  styleUrls: ['./access-info.component.scss']
})
export class AccessInfoComponent implements OnInit, OnChanges {
  empID;
  @Output() tabIndex = new EventEmitter<number>();
  @Input() editEmpData: any;
  deptVal;
  products = [
    {}
  ];
  employmentType: any[] = [
    { name: 'Permanent', val: 'P' },
    { name: 'OnCall', val: 'O' }
  ]
  public index: number;
  @Input() fTabData: any = {};
  @Input() departMentData: any[] = [];
  getData: any
  branchData: BRANCHMODEL[] = [];
  salStructure: any[] = [];
  desigtData: any[] = [];
  reportingData: any[] = [];
  accessPermData: any[] = [];
  accessPData: any;
  showRoleTable: boolean = false;
  showRoleTable2: boolean = false;
  showRoleTable3: boolean = false;
  showUsernameAlreadyError: boolean = false;
  // public skills:boolean=false;
  public departments: any[] = [];
  public serviceSkills: any[] = [];
  public accessPortalList: any[] = [];
  public accessPortalList2: any[] = [];
  public accessPortalList3: any[] = [];
  public baseBranchData: any[] = [];
  // reactForm: FormGroup;
  reactForm = this.fb.group({
    sSkills: new FormControl(''),
    pBranch: new FormControl('', [Validators.required]),
    nBranchId: new FormControl('', [Validators.required]),
    empType: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    // shift: new FormControl('',[Validators.required]),
    reportTo: new FormControl('', [Validators.required]),
    // sStructure: new FormControl('', [Validators.required]),
    cScore: new FormControl(0, [Validators.required]),
    aPRole: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    wrkType: new FormControl(''),
    shifttype: new FormControl(''),
    salaryType: new FormControl(''),
  })
  employeeType;
  workType: any[] = [
    { name: "Field Staff", code: "FS" },
    { name: "Back Office", code: "BO" }
  ];
  shift: any[] = [];
  salaryStructure: any[] = [];
  isPermanent: boolean = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private empSharedService: EmpSharedService) { }

  ngOnInit(): void {
    // this.accessForm();
    // setTimeout(() => {
      this.getComboDataF();
      this.branchLocation();
      this.accessPermission();
      this.getShift();
      this.getSalaryStructure();
    // }, 1000);
  }

  ngAfterContentChecked() {
    // let EmpId = localStorage.getItem("EmpId");
    // let Addcount = localStorage.getItem("AddcountAgain");
    // if (EmpId == null && Addcount == "1") {
    //   localStorage.removeItem("AddcountAgain");
    //   this.accessForm();
    //   this.getComboDataF();
    //   this.branchLocation();
    //   this.accessPermission();
    //   this.getShift();
    //   this.getSalaryStructure();
    // }
  }


  accessForm() {
    this.reactForm = this.fb.group({
      sSkills: new FormControl(''),
      pBranch: new FormControl('', [Validators.required]),
      nBranchId: new FormControl('', [Validators.required]),
      empType: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      // shift: new FormControl('',[Validators.required]),
      reportTo: new FormControl('', [Validators.required]),
      // sStructure: new FormControl('', [Validators.required]),
      cScore: new FormControl(0, [Validators.required]),
      aPRole: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      wrkType: new FormControl(''),
      shifttype: new FormControl(''),
      salaryType: new FormControl(''),
    })

  }
  get formControl() {
    return this.reactForm['controls']
  }


  public appendingPermissions(accList, perm, isChecked) {    
    if (isChecked) {
      let tmpObj = {};
      let menuId = this.accessPermData.filter((el) => el.nMenuId == accList['nMenuId']);
      let menuIdE = menuId[0];
      if (menuIdE) {
        let permD = menuIdE['cPermission'].split(",");
        if (permD.indexOf(perm) == -1) {
          permD.push(perm);
        }
        this.accessPermData.forEach((el, ind) => {
          if (el["nMenuId"] == menuIdE['nMenuId']) {
            this.accessPermData[ind]['cPermission'] = permD.toString();
          }
        });
      } else {
        tmpObj["nMenuId"] = accList['nMenuId'];
        let tmpArr = [];
        tmpArr.push(perm);
        tmpObj["cPermission"] = tmpArr.toString();
        this.accessPermData.push(tmpObj);
      }
    } else {
      let index = this.accessPermData.findIndex(x => x.nMenuId === accList['nMenuId'] && x.cPermission === perm['permName']);
      this.accessPermData.splice(index, 1);      
    }    
  }

  changePerm(evt, accList, permObj) {
    let perm = permObj['permName'];    
    this.appendingPermissions(accList, perm, evt.checked);
    this.fTabData['userPerm'] = this.accessPermData;    
  }
  changePerm2(evt, accList, permObj) {
    let perm = permObj['permName'];    
    this.appendingPermissions(accList, perm, evt.checked);
    this.fTabData['userPerm'] = this.accessPermData;    
  }
  changePerm3(evt, accList, permObj) {
    let perm = permObj['permName'];    
    this.appendingPermissions(accList, perm, evt.checked);
    this.fTabData['userPerm'] = this.accessPermData;    
  }
  saveAccess(form) {
    if (this.accessPortalList.length > 0) {
      for (let i = 0; i < this.accessPortalList.length; i++) {
        let submenu = this.accessPortalList[i]['submenu'].length;
        if (submenu > 0) {
          for (let j = 0; j < this.accessPortalList[i]['submenu'].length; j++) {
            let nMenuId = this.accessPortalList[i]['submenu'][j]['nMenuId'];
            let mPermission = this.accessPortalList[i]['submenu'][j]['mPermission'].length;
            if (mPermission > 0) {
              for (let o = 0; o < mPermission; o++) {
                if (this.accessPortalList[i]['submenu'][j]['mPermission'][o]['isChecked'] == true && this.accessPortalList[i]['submenu'][j]['mPermission']['permName'] != "") {
                  let res = this.accessPermData.filter(e => e.cPermission == this.accessPortalList[i]['submenu'][j]['mPermission'][o]['permName'] && e.nMenuId == nMenuId);
                  if (res.length == 0 && this.accessPortalList[i]['submenu'][j]['mPermission'][o]['permName'] != "") {
                    this.appendingPermissions(this.accessPortalList[i]['submenu'][j], this.accessPortalList[i]['submenu'][j]['mPermission'][o]['permName'], true);
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.accessPortalList2.length > 0) {
      for (let i = 0; i < this.accessPortalList2.length; i++) {
        let submenu = this.accessPortalList2[i]['submenu'].length;
        if (submenu > 0) {
          for (let j = 0; j < this.accessPortalList2[i]['submenu'].length; j++) {
            let nMenuId = this.accessPortalList2[i]['submenu'][j]['nMenuId'];
            let mPermission = this.accessPortalList2[i]['submenu'][j]['mPermission'].length;
            if (mPermission > 0) {
              for (let o = 0; o < mPermission; o++) {
                if (this.accessPortalList2[i]['submenu'][j]['mPermission'][o]['isChecked'] == true && this.accessPortalList2[i]['submenu'][j]['mPermission']['permName'] != "") {
                  let res = this.accessPermData.filter(e => e.cPermission == this.accessPortalList2[i]['submenu'][j]['mPermission'][o]['permName'] && e.nMenuId == nMenuId);
                  if (res.length == 0 && this.accessPortalList2[i]['submenu'][j]['mPermission'][o]['permName'] != "") {
                    this.appendingPermissions(this.accessPortalList2[i]['submenu'][j], this.accessPortalList2[i]['submenu'][j]['mPermission'][o]['permName'], true);
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.accessPortalList3.length > 0) {
      for (let i = 0; i < this.accessPortalList3.length; i++) {
        let submenu = this.accessPortalList3[i]['submenu'].length;
        if (submenu > 0) {
          for (let j = 0; j < this.accessPortalList3[i]['submenu'].length; j++) {
            let nMenuId = this.accessPortalList3[i]['submenu'][j]['nMenuId'];
            let mPermission = this.accessPortalList3[i]['submenu'][j]['mPermission'].length;
            if (mPermission > 0) {
              for (let o = 0; o < mPermission; o++) {
                if (this.accessPortalList3[i]['submenu'][j]['mPermission'][o]['isChecked'] == true && this.accessPortalList3[i]['submenu'][j]['mPermission']['permName'] != "") {
                  let res = this.accessPermData.filter(e => e.cPermission == this.accessPortalList3[i]['submenu'][j]['mPermission'][o]['permName'] && e.nMenuId == nMenuId);
                  if (res.length == 0 && this.accessPortalList3[i]['submenu'][j]['mPermission'][o]['permName'] != "") {
                    this.appendingPermissions(this.accessPortalList3[i]['submenu'][j], this.accessPortalList3[i]['submenu'][j]['mPermission'][o]['permName'], true);
                  }
                }
              }
            }
          }
        }
      }
    }    
    setTimeout(() => {
      this.fTabData = this.empSharedService.formValues;      
      const formValues = this.reactForm.value;   
      console.log("formValues", formValues)   
      let branchValues: any[] = [];
      let skillTypeValues: any[] = [];

      formValues['pBranch'].forEach((elem) => {
        branchValues.push(elem['val']);
      });
      formValues['sSkills'].forEach((elem) => {
        skillTypeValues.push(elem['serialNo']);
      });


      this.fTabData['cSrvSkill'] = skillTypeValues.toString();
      this.fTabData['cBranchid'] = branchValues.toString();
      this.fTabData['cEmployType'] = formValues['empType']['val'];
      this.fTabData['nDepartment'] = formValues['department']['code'];
      this.fTabData['nDesigid'] = formValues['designation']['val'];
      this.fTabData['nBranchId'] = Number(formValues['nBranchId']['nBranchId']);
      // this.fTabData['nParentid'] = formValues['reportTo']['val'];
      this.fTabData['nParentid'] = null;
      // this.fTabData['nSalid'] = formValues['sStructure'];
      this.fTabData['nRoleid'] = formValues['aPRole'] != undefined ? formValues['aPRole']['val'] : "";      
      this.fTabData['cSalAcCode'] = "";
      this.fTabData['dLeaveDate'] = "1900-01-01";
      this.fTabData['cUserName'] = formValues['userName'];

      this.fTabData['cPassword'] = "";
      this.fTabData['cDeviceID'] = "";
      this.fTabData['bStatus'] = true;
      this.fTabData['cLoginStatus'] = 'N';

      this.fTabData['nLoginUser'] = 1;
      this.fTabData['userPerm'] = (this.showRoleTable == true) ? this.accessPermData : [];
      this.empSharedService.updateFormItem(this.fTabData);
      this.tabIndex.emit(3);
    }, 2000);

  }

  accessPerRole(evt) {
    this.empID = localStorage.getItem('EmpId');
    // let roleName=evt.value.val;
    let roleName;
    if (evt > 0) {
      roleName = evt;
      this.empID = 0;
    }
    else {
      roleName = 0;
    }
    if (this.empID == null) {
      this.empID = "0";
    }    
    this.employeeService.getAccessInfoPortalList(roleName, this.empID).subscribe(response => {
      // this.accessPortalList
      let respData = response['data'];
      let tmpArr = [];
      respData['menu'].forEach((element, ind) => {
        element['submenu'].forEach((elem, index) => {
          let N = elem['cPermission'].includes('N') == true ? 'N' : '';
          let E = elem['cPermission'].includes('E') == true ? 'E' : '';
          let D = elem['cPermission'].includes('D') == true ? 'D' : '';
          let Q = elem['cPermission'].includes('Q') == true ? 'Q' : '';
          let cust = N + "," + E + "," + D + "," + Q;
          let CN = elem['selPermission'].includes('N') == true ? 'N' : '';
          let CE = elem['selPermission'].includes('E') == true ? 'E' : '';
          let CD = elem['selPermission'].includes('D') == true ? 'D' : '';
          let CQ = elem['selPermission'].includes('Q') == true ? 'Q' : '';
          let CPermission = CN + "," + CE + "," + CD + "," + CQ;
          let permissions = cust.split(",");
          let selPermission = CPermission.split(",");
          tmpArr = [];

          permissions.forEach(eleme => {
            let tmpObj = {};
            if (eleme != "") {
              if (eleme == CN) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CE) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CD) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CQ) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = false;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
            }
            else {
              tmpObj['permName'] = eleme;
              tmpObj['isChecked'] = false;
              tmpObj['isVisible'] = false;
              tmpArr.push(tmpObj);
            }
          });          
          respData['menu'][ind]['submenu'][index]['mPermission'] = tmpArr;
        });
      });
      this.accessPortalList = respData['menu'];
      localStorage.setItem('menu', JSON.stringify(respData['menu']));
      respData['reportMenu'].forEach((element, ind) => {
        element['submenu'].forEach((elem, index) => {
          let N = elem['cPermission'].includes('N') == true ? 'N' : '';
          let E = elem['cPermission'].includes('E') == true ? 'E' : '';
          let D = elem['cPermission'].includes('D') == true ? 'D' : '';
          let Q = elem['cPermission'].includes('Q') == true ? 'Q' : '';
          let cust = N + "," + E + "," + D + "," + Q;
          let CN = elem['selPermission'].includes('N') == true ? 'N' : '';
          let CE = elem['selPermission'].includes('E') == true ? 'E' : '';
          let CD = elem['selPermission'].includes('D') == true ? 'D' : '';
          let CQ = elem['selPermission'].includes('Q') == true ? 'Q' : '';
          let CPermission = CN + "," + CE + "," + CD + "," + CQ;

          let permissions = cust.split(",");
          let selPermission = CPermission.split(",");
          tmpArr = [];

          permissions.forEach(eleme => {
            let tmpObj = {};
            if (eleme != "") {
              if (eleme == CN) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CE) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CD) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CQ) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = false;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
            }
            else {
              tmpObj['permName'] = eleme;
              tmpObj['isChecked'] = false;
              tmpObj['isVisible'] = false;
              tmpArr.push(tmpObj);
            }
          });          
          respData['reportMenu'][ind]['submenu'][index]['mPermission'] = tmpArr;
        });
      });
      // this.accessPortalList2 = respData['reportMenu'];
      localStorage.setItem('reportMenu', JSON.stringify(respData['reportMenu']));
      respData['appMenu'].forEach((element, ind) => {
        element['submenu'].forEach((elem, index) => {
          let N = elem['cPermission'].includes('N') == true ? 'N' : '';
          let E = elem['cPermission'].includes('E') == true ? 'E' : '';
          let D = elem['cPermission'].includes('D') == true ? 'D' : '';
          let Q = elem['cPermission'].includes('Q') == true ? 'Q' : '';
          let cust = N + "," + E + "," + D + "," + Q;
          let CN = elem['selPermission'].includes('N') == true ? 'N' : '';
          let CE = elem['selPermission'].includes('E') == true ? 'E' : '';
          let CD = elem['selPermission'].includes('D') == true ? 'D' : '';
          let CQ = elem['selPermission'].includes('Q') == true ? 'Q' : '';
          let CPermission = CN + "," + CE + "," + CD + "," + CQ;

          let permissions = cust.split(",");
          let selPermission = CPermission.split(",");
          tmpArr = [];

          permissions.forEach(eleme => {
            let tmpObj = {};
            if (eleme != "") {
              if (eleme == CN) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CE) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CD) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else if (eleme == CQ) {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = true;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
              else {
                tmpObj['permName'] = eleme;
                tmpObj['isChecked'] = false;
                tmpObj['isVisible'] = true;
                tmpArr.push(tmpObj);
              }
            }
            else {
              tmpObj['permName'] = eleme;
              tmpObj['isChecked'] = false;
              tmpObj['isVisible'] = false;
              tmpArr.push(tmpObj);
            }
          });          
          respData['appMenu'][ind]['submenu'][index]['mPermission'] = tmpArr;
        });
      });
      // this.accessPortalList3 = respData['appMenu'];
      localStorage.setItem('appMenu', JSON.stringify(respData['appMenu']));      
      this.index = 0;     
    });
  }

  onhandleChange(e) {
    this.index = e.index;
    // this.accessPerRole("0");
    if (this.index == 0) {
      if (this.accessPortalList.length == 0) {
        this.accessPortalList = JSON.parse(localStorage.getItem('menu'));
      }
    }
    if (this.index == 1) {
      if (this.accessPortalList2.length == 0) {
        this.accessPortalList2 = JSON.parse(localStorage.getItem('reportMenu'));
      }
    }
    if (this.index == 2) {
      if (this.accessPortalList3.length == 0) {
        this.accessPortalList3 = JSON.parse(localStorage.getItem('appMenu'));
      }
    }
  }

  getShift() {
    this.employeeService.getShift().subscribe((data) => {
      this.shift = data['data'];
    })
  }

  getSalaryStructure() {
    this.employeeService.getSalaryStructure().subscribe((data) => {
      this.salaryStructure = data['data'];
    });
  }

  // get api integration for combo
  getComboDataF() {
    //this.getData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    this.employeeService.getctgData(15).subscribe((res: any) => {
      this.getData = res.data
      this.getData.forEach((element) => {
        if (element["categoryName"] == "Service Skills" && element["ctgID"] == "15") {
          this.serviceSkills.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
        }
      })
    })


    // this.employeeService.getFillComboData().subscribe(
    //   res=>{
    //     this.getData=JSON.parse(localStorage.getItem("FILLCODEDATA"));    
    //     // this.getData.forEach((element)=>{
    //     //   if(element["categoryName"] == "Service Skills" && element["ctgID"]=="15"){
    //     //     this.serviceSkills.push({"name":element['codeName'], "serialNo": element['serialNo'], "code":element["codeID"],'ctgID':element['ctgID'], "category":element["categoryName"]});
    //     //   }
    //     // })
    //   }
    // )
  }
  // posting Branch
  //  get Branch and Location
  branchLocation() {
    const empID = localStorage.getItem('empID');
    this.employeeService.getBranch().subscribe(
      res => {
        this.branchData = res['data']        
      }
    )
  }
  // get Desingnation data
  designationF(deptId) {
    this.employeeService.designation(deptId).subscribe(
      res => {
        this.desigtData = res['data'];
        if (this.editEmpData) {
          const designation = this.desigtData.filter(e => e.txt == this.editEmpData['desigid']);
          this.reactForm.patchValue({
            designation: designation[0]
          });
          this.reportingToF(this.editEmpData['nDepartment'], this.editEmpData['nDesigid']);
        }        
      }
    )
  }
  // get Reportin to data
  reportingToF(dept, designationId) {
    this.employeeService.reportingTo(dept, designationId).subscribe(
      res => {
        this.reportingData = res['data'];        
        // if(this.editEmpData){
        //   const reportingt = this.reportingData.filter(e => e.txt == this.editEmpData['desigid']);

        //   this.reactForm.patchValue({
        //     designation: designation[0]
        //   });

        // }        
      }
    )
  }
  // get Data for Access Permission role
  accessPermission() {
    this.employeeService.accessPerRole().subscribe(
      res => {
        this.accessPData = res['data']        
      }
    )
  }

  ngOnChanges() {
    if (this.editEmpData) {   
      this.designationF(this.editEmpData['nDepartment']);
      const popSkillsValues = [];
      const cSkillValues = this.editEmpData['cSrvSkill'].split(",");
      cSkillValues.forEach(ele => {
        this.serviceSkills.forEach((el, ind) => {
          if (ele == el['serialNo']) {
            popSkillsValues.push(el);
          }
        });
      });

      const branchDataArr = [];
      const branchIdVal = this.editEmpData['branch'].split(",");

      branchIdVal.forEach(ele => {
        this.branchData.forEach((el, ind) => {
          if (ele == el['txt']) {
            branchDataArr.push(el);
          }
        });
      });

      // const srvSkill = this.serviceSkills.filter(e => e.serialNo == this.editEmpData['cSrvSkill']);
      if (this.editEmpData['nBranchId']) {
        let findbaseBranch = this.branchData.find(x => x.val == this.editEmpData['nBranchId']);
        this.baseBranchData = []
        if (findbaseBranch) {
          this.baseBranchData.push({
            "nBranchId": findbaseBranch.val,
            "txt" : findbaseBranch.txt
          });
        } 
      }      
      this.editEmpData['nBranchId'] = this.editEmpData['nBranchId'] ? this.editEmpData['nBranchId'] : 1;
      this.onPostBranchChange(branchDataArr);
      const branchId = this.branchData.filter(e => e.txt == this.editEmpData['branch']);
      const empType = this.employmentType.filter(e => e.val == this.editEmpData['cEmployType']);
      const selectedbranchId = this.baseBranchData.filter(e => e.nBranchId == this.editEmpData['nBranchId']);      
      const departMent = this.departMentData.filter(e => e.code == this.editEmpData['nDepartment']);
      const roleD = this.accessPData.filter(e => e.txt == this.editEmpData['roleid']);      
      this.reactForm.patchValue({
        sSkills: popSkillsValues,
        pBranch: branchDataArr,
        empType: empType[0],
        department: departMent[0],
        aPRole: roleD[0],
        userName: this.editEmpData['cUserName'],
        nBranchId: selectedbranchId ? selectedbranchId[0]: ''
      });
      this.empID = localStorage.getItem('EmpId');
      if (this.empID != null) {
        if (roleD.length > 0) {
          this.accessPerRole(roleD[0]['val']);
        }
        else {
          this.accessPerRole("0");
        }
      }
      else {
        this.accessPerRole("0");
        this.reactForm.patchValue({
          aPRole: roleD[0],
        });
      }
    }
    if (this.employeeType != undefined) {
      if (this.employeeType['name'] === 'Permanent') {
        this.isPermanent = true;
      }
    }   

  }
  onEmploymentChange(event) {
    if (event.value['name'] === 'Permanent') {
      this.isPermanent = true;
    } else {
      this.isPermanent = false;
    }
  }

  onDepartMentChange(evt) {    
    let deptVal = evt.value.code;
    this.deptVal = deptVal;
    this.designationF(deptVal);

  }
  onDesignationChange(evt) {
    let desVal = evt.value.val;
    this.reportingToF(this.deptVal, desVal);

  }

  changePermHeader(evt, menu, perm, ind) {
    this.accessPortalList[ind]['submenu'].forEach((elem, index) => {
      elem['mPermission'].forEach((elemt, inde) => {
        if (elemt['permName'] == perm) {
          if (evt.checked) {
            this.accessPortalList[ind]['submenu'][index]['mPermission'][inde]['isChecked'] = true;
            this.appendingPermissions(elem, perm, true);
          } else {
            this.accessPortalList[ind]['submenu'][index]['mPermission'][inde]['isChecked'] = false;
            this.appendingPermissions(elem, perm, false);
          }
        }
      });

    });    
  }
  changePermHeader2(evt, menu, perm, ind) {
    this.accessPortalList[ind]['submenu'].forEach((elem, index) => {
      elem['mPermission'].forEach((elemt, inde) => {
        if (elemt['permName'] == perm) {
          if (evt.checked) {
            this.accessPortalList2[ind]['submenu'][index]['mPermission'][inde]['isChecked'] = true;
            this.appendingPermissions(elem, perm, true);
          } else {
            this.accessPortalList2[ind]['submenu'][index]['mPermission'][inde]['isChecked'] = false;
            this.appendingPermissions(elem, perm, false);
          }
        }
      });

    });    
  }
  changePermHeader3(evt, menu, perm, ind) {
    this.accessPortalList3[ind]['submenu'].forEach((elem, index) => {
      elem['mPermission'].forEach((elemt, inde) => {
        if (elemt['permName'] == perm) {
          if (evt.checked) {
            this.accessPortalList3[ind]['submenu'][index]['mPermission'][inde]['isChecked'] = true;
            this.appendingPermissions(elem, perm, true);
          } else {
            this.accessPortalList3[ind]['submenu'][index]['mPermission'][inde]['isChecked'] = false;
            this.appendingPermissions(elem, perm, false);
          }
        }
      });
    });    
  }

  customizeCheck(evt) {
    if (evt.checked) {
      this.showRoleTable = true;
      this.showRoleTable2 = true;
      this.showRoleTable3 = true;
      // this.reactForm.patchValue({
      //   aPRole: 0

      // });

    } else {
      this.showRoleTable = false;
      this.showRoleTable2 = false;
      this.showRoleTable3 = true;
    }

  }
  // Check user eist or not
  public userexist;
  checkUsername(event) {
    let empId;
    if (
      localStorage.getItem('EmpId') != null || localStorage.getItem('EmpId') != undefined
    ) {
      empId = localStorage.getItem('EmpId');
    }
    else {
      empId = 0;
    }
    let username = event.target.value;
    if (username.length > 3) {
      this.employeeService.accessInfoUserExist(username, empId).subscribe(res => {
        let data = res['data'];
        if (res['status'] == 204) {
          this.showUsernameAlreadyError = true;
        } else {
          this.showUsernameAlreadyError = false;
        }        
      })
    }    
  }

  onPostBranchChange(branchData?: BRANCHMODEL[]) {
    const formValues = this.reactForm.value;
    this.baseBranchData = [];
    branchData = branchData ? branchData: this.branchData; 
    let pBrancharr = formValues['pBranch'] ? formValues['pBranch'] : branchData;
    pBrancharr.forEach((elem) => {
      this.baseBranchData.push({nBranchId:elem['val'], txt: elem['txt']});
    });
    
    let index = this.baseBranchData.findIndex(x=> x.nBranchId ==0);    
    if (index >= 0) {         
      this.baseBranchData = [];
      for (let i=1;i<branchData.length;i++) {        
        this.baseBranchData.push({nBranchId:branchData[i]['val'], txt: branchData[i]['txt']});
      }   
    } 
    console.log("this.baseBranchData", this.baseBranchData)       
  }

}
