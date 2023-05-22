import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { CommonService } from 'src/app/shared-services/local-storage.service';
import { MenuSharedService } from 'src/app/shared-services/menu-shared.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  otpDialog: boolean = false;
  public showcheckmobile: boolean = false;
  public showcheckUserName: boolean = false;
  otpValue: any;
  MobileNo: any;
  UserName: any;
  public customerDialog: boolean = false;
  public MobileinError: string = "";
  public UserNameinError: string = "";
  public IsEnabledButton: boolean = false;
  OtpId: any;
  public show: boolean = false;
  public showErrorMsg: boolean = false;
  public loginError: string = "";
  public formsGroup: FormGroup;
  public bChangePassword: boolean = false;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['']
  });


  constructor(private messageService: MessageService, private employeeService: EmployeeService, private fb: FormBuilder, private loginService: LoginService, private router: Router, private menuSharedServices: MenuSharedService) { }

  ngOnInit(): void {
    this.loadCategoryParentCategoryData();
    this.formsGroup = this.fb.group({
      mobileno: ["", Validators.required],
      username: ["", Validators.required]
    })
  }

  hidePassword() {
    this.show = false;
  }

  CheckMobileno(evt) {
    if (evt.target.value == "") {
      this.showcheckmobile = true;
      this.MobileinError = "Please Enter MobileNo";
    }
    else if (evt.target.value.length != 10) {
      this.showcheckmobile = true;
      this.MobileinError = "Please Enter Correct MobileNo";
    }
    else {
      this.showcheckmobile = false;
      this.MobileinError = "";
    }
    this.checkEnablebutton();
  }
  get formControls() {
    return this.formsGroup.controls;
  }

  CheckUserName(evt) {
    if (evt.target.value == "") {
      this.showcheckUserName = true;
      this.UserNameinError = "Please Enter UserName";
    }
    else {
      this.showcheckUserName = false;
      this.UserNameinError = "";
    }
    this.checkEnablebutton();
  }

  checkEnablebutton() {
    let username = this.formControls['username'].value;
    let mobileno = this.formControls['mobileno'].value;
    if (username != "" && mobileno != "" && this.UserNameinError == "" && this.MobileinError == "") {
      this.IsEnabledButton = true;
    }
    else {
      this.IsEnabledButton = false;
    }
  }

  SendOtp() {
    this.UserName = this.formControls['username'].value;
    this.MobileNo = this.formControls['mobileno'].value;
    if (this.MobileNo != "" && this.MobileinError == "") {
      this.employeeService.SendOTPResetPassword(this.UserName, this.MobileNo).subscribe(
        (res) => {
          if (res['status'] == 200) {
            this.OtpId = res['data']['id'];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
            this.otpDialog = true;
          }
          if (res['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          }
        },
        (error) => {

        });

    }
    else {
      return;
    }
  }
  ShowDialogForgot() {
    this.customerDialog = true;
  }

  loadCategoryParentCategoryData() {
    this.employeeService.getCategoryParentCategoryData().subscribe((res) => {
      localStorage.setItem("categoryData", JSON.stringify(res['data']));

    }, (error) => {

    });
  }
  validateOtp() {
    this.employeeService.ConfirmOTPResetPassword(this.MobileNo, this.otpValue, this.OtpId).subscribe(
      (res) => {
        if (res['result']['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res['result']['data']['msg'] });
          this.customerDialog = false;
          this.otpDialog = false;
        }
        if (res['result']['status'] == 204) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res['result']['data']['msg'] });
        }
      },
      (error) => {

      });
  }

  showPassword() {
    this.show = true;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value


    // console.warn(this.loginForm.value);

    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((d) => {
      if (d['status'] == 200) {
        let data = d['data'];
        let token = data["tokenNo"];
        let menus = data['menu'];
        let empID = data['nEmpid'];
        let empName = data['empName'];
        let roleName = data['cRoleName'];
        this.bChangePassword = data['bChangePassword'];
        let branchId = data['cBranchID'] ? data['cBranchID'] : 1;
        localStorage.setItem("loginId", empID);

        if (this.bChangePassword == true) {
          localStorage.setItem("menuData", JSON.stringify(menus));
          localStorage.setItem("reportMenu", JSON.stringify(data['reportMenu']));
          // this.menuSharedServices.updateMenuItem(menus);
          localStorage.setItem("token", token);

          localStorage.setItem("empID", empID);
          localStorage.setItem("loginId", empID);
          localStorage.setItem("roleName", roleName);
          localStorage.setItem("empName", empName);
          localStorage.setItem("branchId", branchId);
          localStorage.setItem("reqServiceSkill", data.cSrvSkill);
          localStorage.setItem("branchList", JSON.stringify(data.branch));


          console.log(menus);
          this.loadFillDCode();
        }
        else {
          this.router.navigate(['change-password']);
        }
      } else {

        this.showErrorMsg = true;
        this.loginError = d['errorMessage'];

      }

    }, (err) => {

    });
  }

  loadFillDCode() {
    this.router.navigate(['dashboard']);

    // this.employeeService.getCategoryData().subscribe((data) => {

    //   let tmpData = JSON.stringify(data['data']);
    //   localStorage.setItem("FILLCODEDATA", tmpData);

      

    // }, (error) => {
    //   console.log(error);
    // });

  }



}
