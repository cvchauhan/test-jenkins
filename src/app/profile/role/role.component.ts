import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  selectedrole: any = {};
  empID;
  EditdisplayBasic: boolean = false;
  isButtonVisible: boolean = false;
  roleForm: FormGroup;
  addroleForm: FormGroup;
  public currentAddData: string = "";
  cities: [];
  products: [{ name: 'Gitu' }];
  displayBasic: boolean;
  globalcategId: any;
  catgId: any;
  selectedPermission: any;
  position: string;
  public roleName: string = "Role";
  public roleId: any;

  public copyPermission: string = "Copy Permission from";
  roleRes: any;
  menueRes: any;
  public accessPortalList: any[] = [];
  public accessSelectMenu;
  public accessRoleDataGlobal: any[] = [];
  accessPData: any;
  public IsPermShow: boolean = false;
  public accessPortalList2: any[] = [];
  public accessPortalList3: any[] = [];
  public index: number;
  accessPermData: any[] = [];
  @Input() fTabData: any = {};

  constructor(private profileService: ProfileService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.getRoleF();
    this.getMenueF();
    this.rolePermissionF();
    this.accessPermission();
    this.addrolePermissionF();
    localStorage.removeItem('menu');
    localStorage.removeItem('reportMenu');
    localStorage.removeItem('appMenu');
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayBasic = false;
  }
  get f() {
    return this.addroleForm['controls'];
  }

  // Form Validation
  rolePermissionF() {
    this.roleForm = this.fb.group({
      cRoleName: new FormControl(''),
      nMenuid: new FormControl(''),
      cPermission: new FormControl(''),
    })
  }
  addrolePermissionF() {
    this.addroleForm = this.fb.group({
      nRoleId: new FormControl(''),
      cRoleName: new FormControl('', [Validators.required])
    })
  }

  showParentDropdown: boolean = true;
  showRowDialogF(popupType: string, catgId: any) {
    this.currentAddData = popupType;
    this.globalcategId = catgId;
    this.displayBasic = true;
  }
  // }

  // get Role dropdown data
  getRoleF() {
    this.profileService.roleCombo().subscribe(
      res => {
        this.roleRes = res['data'];
        console.log(this.roleRes);
      }
    )
  }
  // Get select Menue Dropdwon
  getMenueF() {
    this.profileService.selectMenue().subscribe(
      res => {
        this.menueRes = res['data'];
        console.log(this.menueRes)
      }
    )
  }

  EditRole() {
    this.addroleForm.patchValue({
      nRoleId: this.roleId,
      cRoleName: this.roleName
    })
    this.EditdisplayBasic = true;
    this.selectedPermission = [];
    this.profileService.getRoleByID(this.roleId).subscribe((res) => {
      if (res['status'] == 200) {
        this.selectedPermission = res['data']['rolePermissions'];
      } else {
        this.showError(res['errorMessage']);
      }
    }, (err) => {
    });
  }

  // accessPerRole(evt) {
  //   this.isButtonVisible = true;
  //   let empID = localStorage.getItem('empID');
  //   let roleName = evt.value.val;
  //   this.roleId = evt.value.val;
  //   this.roleName = evt.value.txt;
  //   if (this.roleId == 0) {
  //     this.isButtonVisible = false;
  //     this.accessPortalList = [];
  //     return;
  //   }
  //   //console.log(evt);
  //   this.profileService.getAccessInfoPortalList(roleName, 0).subscribe(response => {
  //     // this.accessPortalList
  //     let respData = response['data'];
  //     let tmpArr = [];
  //     respData.forEach((element, ind) => {
  //       element['submenu'].forEach((elem, index) => {
  //         let N = elem['cPermission'].includes('N') == true ? 'N' : '';
  //         let E = elem['cPermission'].includes('E') == true ? 'E' : '';
  //         let D = elem['cPermission'].includes('D') == true ? 'D' : '';
  //         let Q = elem['cPermission'].includes('Q') == true ? 'Q' : '';
  //         let cust = N + "," + E + "," + D + "," + Q;
  //         let CN = elem['selPermission'].includes('N') == true ? 'N' : '';
  //         let CE = elem['selPermission'].includes('E') == true ? 'E' : '';
  //         let CD = elem['selPermission'].includes('D') == true ? 'D' : '';
  //         let CQ = elem['selPermission'].includes('Q') == true ? 'Q' : '';
  //         let CPermission = CN + "," + CE + "," + CD + "," + CQ;

  //         let permissions = cust.split(",");
  //         let selPermission = CPermission.split(",");
  //         tmpArr = [];

  //         permissions.forEach(eleme => {
  //           let tmpObj = {};
  //           if (eleme != "") {
  //             if (eleme == CN) {
  //               tmpObj['permName'] = eleme;
  //               tmpObj['isChecked'] = true;
  //               tmpObj['isVisible'] = true;
  //               tmpArr.push(tmpObj);
  //             }
  //             else if (eleme == CE) {
  //               tmpObj['permName'] = eleme;
  //               tmpObj['isChecked'] = true;
  //               tmpObj['isVisible'] = true;
  //               tmpArr.push(tmpObj);
  //             }
  //             else if (eleme == CD) {
  //               tmpObj['permName'] = eleme;
  //               tmpObj['isChecked'] = true;
  //               tmpObj['isVisible'] = true;
  //               tmpArr.push(tmpObj);
  //             }
  //             else if (eleme == CQ) {
  //               tmpObj['permName'] = eleme;
  //               tmpObj['isChecked'] = true;
  //               tmpObj['isVisible'] = true;
  //               tmpArr.push(tmpObj);
  //             }
  //             else {
  //               tmpObj['permName'] = eleme;
  //               tmpObj['isChecked'] = false;
  //               tmpObj['isVisible'] = true;
  //               tmpArr.push(tmpObj);
  //             }
  //           }
  //           else {
  //             tmpObj['permName'] = eleme;
  //             tmpObj['isChecked'] = false;
  //             tmpObj['isVisible'] = false;
  //             tmpArr.push(tmpObj);
  //           }
  //         });

  //         // console.log(permissions);
  //         respData[ind]['submenu'][index]['mPermission'] = tmpArr;
  //       });
  //     });
  //     this.accessPortalList = respData;
  //     this.accessRoleDataGlobal = respData;

  //     //console.log(this.accessPortalList);
  //   });
  // }
  accessPerRole(evt) {
    this.IsPermShow = false;
    this.isButtonVisible = false;
    let n = Number(evt.value['val']);
    if (n > 0) {
      this.IsPermShow = true;
      localStorage.removeItem('menu');
      localStorage.removeItem('reportMenu');
      localStorage.removeItem('appMenu');
      this.isButtonVisible = true;
      this.empID = localStorage.getItem('EmpId');
      // let roleName=evt.value.val;
      let roleName;
      if (evt.value != undefined) {
        roleName = evt.value.val;
        this.empID = null;
      }
      else {
        roleName = 0;
      }
      if (this.empID == null) {
        this.empID = "0";
      }
      console.log(roleName);
      this.profileService.getAccessInfoPortalList(roleName, this.empID).subscribe(response => {
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
            // console.log(permissions);
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
            // console.log(permissions);
            respData['reportMenu'][ind]['submenu'][index]['mPermission'] = tmpArr;
          });
        });
        //this.accessPortalList2 = respData['reportMenu'];
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
            // console.log(permissions);
            respData['appMenu'][ind]['submenu'][index]['mPermission'] = tmpArr;
          });
        });
        //this.accessPortalList3 = respData['appMenu'];
        localStorage.setItem('appMenu', JSON.stringify(respData['appMenu']));
        console.log(this.accessPortalList);
        this.index = 0;
        console.log(this.accessPortalList2);
        console.log(this.accessPortalList3);
      });
    }
  }

  // get Data for Access Permission role
  accessPermission() {
    this.profileService.accessPerRole().subscribe(
      res => {
        this.accessPData = res['data']
        if (this.accessPData.length > 0) {
          const selectedroleValue = this.accessPData.filter(e => e.val == this.roleId);
          this.selectedrole = selectedroleValue != null ? selectedroleValue[0] : null;
          //console.log('This is ReportingTo',this.accessPData)
        }
      }
    )
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
  public appendingPermissions(accList, perm, isChecked) {
    // console.log(isChecked);
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
        tmpObj["nRolePerID"] = accList['nRolePerID'];
        tmpObj["nRoleID"] =(this.selectedrole!=undefined)? this.selectedrole['val']:0;
        tmpObj["nMenuId"] = accList['nMenuId'];
        let tmpArr = [];
        tmpArr.push(perm);
        tmpObj["cPermission"] = tmpArr.toString();
        this.accessPermData.push(tmpObj);
      }
    } else {

      // console.log(accList['nMenuId']);
      // console.log(perm);
      // console.log(isChecked);
      let index = this.accessPermData.findIndex(x => x.nMenuId === accList['nMenuId'] && x.cPermission === perm['permName']);
      this.accessPermData.splice(index, 1);
      // console.log(index);
    }
    console.log(this.accessPermData);

  }

  // get f() {
  //   return this.addroleForm['controls'];
  // }


  changePerm(evt, accList, permObj) {
    let perm = permObj['permName'];
    // console.log(perm);

    this.appendingPermissions(accList, perm, evt.checked);

    this.fTabData['userPerm'] = this.accessPermData;
    //console.log(this.accessPermData);
  }
  changePerm2(evt, accList, permObj) {
    let perm = permObj['permName'];
    // console.log(perm);

    this.appendingPermissions(accList, perm, evt.checked);

    this.fTabData['userPerm'] = this.accessPermData;
    //console.log(this.accessPermData);
  }
  changePerm3(evt, accList, permObj) {
    let perm = permObj['permName'];
    // console.log(perm);

    this.appendingPermissions(accList, perm, evt.checked);

    this.fTabData['userPerm'] = this.accessPermData;
    //console.log(this.accessPermData);
  }


  showSuccess(succ) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
  }

  // show Error Message
  showError(error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }

  savePermissions() {
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
    let tmpObj = {};
    tmpObj['nRoleId'] = (this.selectedrole!=undefined)? this.selectedrole['val']:0;
    tmpObj['cRoleName'] = (this.selectedrole!=undefined)? this.selectedrole['txt']:"";
    tmpObj['rolePermissions'] = this.accessPermData;
    this.profileService.saveAccessPerRole(tmpObj).subscribe((res) => {


      if (res['status'] == 200) {

        this.showSuccess(res['message']);


      } else {
        this.showError(res['errorMessage']);
      }

    }, (err) => {

    });
    console.log(tmpObj);
  }
  accesMenu(evt) {
    // console.log(evt);
    let currInd;
    let evtMenuId = evt['value']['nMenuid'];

    this.accessSelectMenu = evt.value['cMenuTitle'];
    // this.accessRoleDataGlobal= this.accessPortalList;


    this.accessRoleDataGlobal.forEach((elem, index) => {
      //console.log(elem);
      if (elem['nMenuId'] == evtMenuId) {
        currInd = index;
      }
    });

    this.accessPortalList = [];
    this.accessPortalList.push(this.accessRoleDataGlobal[currInd]);


  }
  onChangePermission(evt) {
    console.log(evt.value);
    if (evt.value != undefined) {
      this.selectedPermission = [];
      this.profileService.getRoleByID(evt.value.val).subscribe((res) => {
        if (res['status'] == 200) {
          this.selectedPermission = res['data']['rolePermissions'];
        } else {
          this.showError(res['errorMessage']);
        }
      }, (err) => {
      });
    }
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
    console.log(this.accessPortalList);


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
    console.log(this.accessPortalList2);


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
    console.log(this.accessPortalList3);


  }

  saveRole(val) {
    const formValues = this.addroleForm.value;
    let tmpObj = {};
    console.log(tmpObj);

    let formData = {};
    formData['cRoleName'] = formValues['cRoleName'];
    formData['rolePermissions'] = this.selectedPermission;

    if (val == 'Save') {
      formData['nRoleId'] = 0;
      this.profileService.saveRole(formData).subscribe((res) => {
        if (res['status'] == 200) {
          this.showSuccess(res['message']);
          this.displayBasic = false;
          this.getMenueF();
          this.roleForm.reset();
          this.addroleForm.reset();
          this.accessPermission();
        } else {
          this.showError(res['errorMessage']);
        }
      }, (err) => {
      });
    }
    else if (val == 'Edit') {
      formData['nRoleId'] = formValues['nRoleId'];
      this.profileService.EditRole(formData).subscribe((res) => {
        if (res['status'] == 200) {
          this.showSuccess(res['message']);
          this.displayBasic = false;
          this.getMenueF();
          this.roleForm.reset();
          this.addroleForm.reset();
          this.accessPermission();
          this.EditdisplayBasic = false;
        } else {
          this.showError(res['errorMessage']);
        }
      }, (err) => {
      });
    }
  }
}
