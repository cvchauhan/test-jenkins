import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { MessageService } from 'primeng/api';
import { ChangePasswordService } from './change-password.service';
import { CustomvalidationService } from './customvalidation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public showoldPassword: boolean = false;
  public showoldPasswordErrorMsg: boolean = false;
  public oldPasswordinError: string = "";
  public shownewPasswordErrorMsg: boolean = false;
  public newPasswordinError: string = "";
  public showconfirmPasswordErrorMsg: boolean = false;
  public confirmPasswordinError: string = "";
  public isEnabled: boolean = false;
  response: any;
  public loginId;
  public shownewPassword: boolean = false;
  public showconfirmPassword: boolean = false;
  public formsGroup: FormGroup;
  constructor(private changePasswordservice: ChangePasswordService, private router: Router, private messageService: MessageService, private customValidator: CustomvalidationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginId = localStorage.getItem("loginId");
    this.formsGroup = this.fb.group({
      oldPassword: ["", Validators.required],
      newPasswod: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    },
      {
        validator: this.customValidator.MatchPassword('newPasswod', 'confirmPassword'),
      }
    );
  }
  checkOldPassword(evt) {
    console.log(evt.target.value);
    if (evt.target.value != "") {
      let jobRenDetail = {
        "userId": this.loginId,
        "password": evt.target.value,
      };
      this.changePasswordservice.CheckCurrentPassword(jobRenDetail).subscribe(
        res => {
          this.response = res;
          if (this.response == false) {
            this.showoldPasswordErrorMsg = true;
            this.oldPasswordinError = "Please Enter Correct Old Password";
            // this.formsGroup.controls['oldPassword'].setErrors({ incorrect: true, message: 'Please Enter Correct Old Password' });
          }
          else {
            this.showoldPasswordErrorMsg = false;
            this.oldPasswordinError = "";
            this.formsGroup.controls['oldPassword'].setErrors(null);

          }
          this.checkEnablebutton();
          // this.isValidOldPassword = this.response;
        }
      );
    }
    else {
      this.showoldPasswordErrorMsg = true;
      this.oldPasswordinError = "Old Password can't blank";
    }
    this.checkEnablebutton();
  }
  checkNewPassword(evt) {
    console.log(evt.target.value);
    if (evt.target.value == "") {
      this.shownewPasswordErrorMsg = true;
      this.newPasswordinError = "New Password can't blank";
    }
    else {
      this.shownewPasswordErrorMsg = false;
      this.newPasswordinError = "";
    }
    let newPass = this.formControls['newPasswod'].value;
    let confirmPass = this.formControls['confirmPassword'].value;
    if (newPass != "" && confirmPass != "") {
      if (newPass != confirmPass) {
        this.shownewPasswordErrorMsg = true;
        this.newPasswordinError = " Passwords doesnot match";
      }
      else {
        this.shownewPasswordErrorMsg = false;
        this.newPasswordinError = "";
      }
    }
    this.checkEnablebutton();
  }

  checkConfirmPassword(evt) {
    console.log(evt.target.value);
    if (evt.target.value == "") {
      this.showconfirmPasswordErrorMsg = true;
      this.confirmPasswordinError = "Confirm Password can't blank";
    }
    else {
      this.showconfirmPasswordErrorMsg = false;
      this.confirmPasswordinError = "";
    }
    let newPass = this.formControls['newPasswod'].value;
    let confirmPass = this.formControls['confirmPassword'].value;
    if (newPass != "" && confirmPass != "") {
      if (newPass != confirmPass) {
        this.shownewPasswordErrorMsg = true;
        this.newPasswordinError = " Passwords doesnot match";
        this.formsGroup.patchValue({
          newPasswod: ""
        });
      }
      else {
        this.shownewPasswordErrorMsg = false;
        this.newPasswordinError = "";
      }
    }
    this.checkEnablebutton();
  }

  get formControls() {
    return this.formsGroup.controls;
  }

  checkEnablebutton() {
    let oldPass = this.formControls['oldPassword'].value;
    let newPass = this.formControls['newPasswod'].value;
    let confirmPass = this.formControls['confirmPassword'].value;
    if (oldPass != "" && newPass != "" && confirmPass != "" && this.oldPasswordinError == "" && this.newPasswordinError == "" && this.confirmPasswordinError == "") {
      this.isEnabled = true;
    }
    else {
      this.isEnabled = false;
    }
  }

  ChangePassword() {
    let oldPass = this.formControls['oldPassword'].value;
    let newPass = this.formControls['newPasswod'].value;
    let confirmPass = this.formControls['confirmPassword'].value;
    if (oldPass != "" && newPass != "" && confirmPass != "" && this.oldPasswordinError == "" && this.newPasswordinError == "" && this.confirmPasswordinError == "") {
      const formValues = this.formsGroup.value;
      let formData = {};
      formData['userId'] = this.loginId;
      formData['password'] = formValues['newPasswod'];
      this.changePasswordservice.SetLoginPassword(formData).subscribe(
        res => {
          this.response = res;
          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data']['msg'] });
            localStorage.clear();
            this.router.navigate(["users/login"]);
          }
          if (res['status'] == 204) {
            //  this.messageService.add(this.response.errorMessage)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
            return;
          }
        }
      );
    }
    else {
      return;
    }
  }

  showOldPassword() {
    this.showoldPassword = true;
  }

  hideOldPassword() {
    this.showoldPassword = false;
  }
  showNewPassword() {
    this.shownewPassword = true;
  }

  hideNewPassword() {
    this.shownewPassword = false;
  }

  showConfirmPassword() {
    this.showconfirmPassword = true;
  }

  hideConfirmPassword() {
    this.showconfirmPassword = false;
  }

}
