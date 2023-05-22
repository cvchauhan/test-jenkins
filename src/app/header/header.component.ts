import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  HostListener,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { HeaderService } from '../headerservice/header.service';
import { CustomvalidationService } from '../change-password/customvalidation.service';
import { ServicesService } from '../services/services.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(window:click)': 'onClick()',
  },
})
export class HeaderComponent implements OnInit {
  @Input() headingText: string = '';
  navigation: MegaMenuItem[] = [];
  showMenu: boolean = true;
  showSubMenu = -1;

  profile: MenuItem[];
  profileToggle: boolean = false;
  navData: any[] = [];
  public userName:any;
  response: any;
  public roleName:any;
  public empName:any;
  public loginId:any;
  public customerDialog: boolean = false;
  public customerBranchId: boolean = false;
  public isValidOldPassword: boolean = false;
  public formsGroup: FormGroup;
  passwordMatch: boolean = false;
  selectedBranch;
  branchData: any = [];
  branchForm = this.fb.group({
    branchId: ['', Validators.required],
  });
  constructor(
    private customValidator: CustomvalidationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private headerservice: HeaderService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.navigation = this.headerservice.getNavbar();
    let mData = localStorage.getItem('menuData');
    this.userName = localStorage.getItem('userName');
    this.roleName = localStorage.getItem('roleName');
    this.empName = localStorage.getItem('empName');
    this.loginId = localStorage.getItem('loginId');
    let d = JSON.parse(mData);
    d.forEach((elem, ind) => {
      this.navData = d;
      //console.log(this.navData);
    });

    this.navigation = [
      {
        label: 'List',
        items: [
          [{ label: 'List', routerLink: ['/pagename'] }, { label: 'List' }],
        ],
      },
      {
        label: 'List 1',
        items: [[{ label: 'List 1' }, { label: 'List 1' }]],
      },
      {
        label: 'Custom Item',
        icon: 'custom-icon',
      },
    ];
    this.formsGroup = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPasswod: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        // matchPasswordError: [""],
      },
      {
        validator: this.customValidator.MatchPassword(
          'newPasswod',
          'confirmPassword'
        ),
      }
    );
  }

  get formControls() {
    return this.formsGroup.controls;
  }

  toggleProfile($event) {
    $event.stopPropagation();
    this.profileToggle = !this.profileToggle;
  }
  onClick() {
    this.profileToggle = false;
  }
  checkOldPassword(evt) {
    console.log(evt.target.value);

    let jobRenDetail = {
      userId: this.loginId,
      password: evt.target.value,
    };
    this.headerservice.CheckCurrentPassword(jobRenDetail).subscribe((res) => {
      this.response = res;
      if (this.response == false) {
        this.formsGroup.controls['oldPassword'].setErrors({
          incorrect: true,
          message: 'Please Enter Correct Old Password',
        });
      } else {
        this.formsGroup.controls['oldPassword'].setErrors(null);
      }
      // this.isValidOldPassword = this.response;
    });
  }

  ChangePassword() {
    const formValues = this.formsGroup.value;
    let formData = {};
    formData['userId'] = this.loginId;
    formData['password'] = formValues['newPasswod'];
    this.headerservice.SetLoginPassword(formData).subscribe((res) => {
      this.response = res;
      if (res['status'] == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res['data']['msg'],
        });
        this.customerDialog = false;
      }
      if (res['status'] == 204) {
        //  this.messageService.add(this.response.errorMessage)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res['errorMessage'],
        });
      }
    });
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'b' && event.ctrlKey) {
      this.ChangeBranchId();
    }
  }
  // outside click disable profile popup
  // outsideClicked(evt){
  //   if(evt.target.className === "profile_dropdown"){
  //     console.log("working")
  //     this.profileToggle = false
  //   }
  // }

  // onClickedOutside(e: Event) {
  //   console.log('Clicked outside:', e);
  //   this.profileToggle = false
  // }

  closeClick() {
    console.log('ffe');
    this.profileToggle = false;
    this.customerDialog = true;
  }

  ChangeBranchId() {
    this.profileToggle = false;
    this.customerBranchId = true;
    const empID = localStorage.getItem('empID');
    this.servicesService.getBranch(empID).subscribe((res: any): void => {
      if (res && res.data.length) {
        this.branchData = res['data'];
        this.branchData.splice(0, 1);
        let branchId = localStorage.getItem('branchId');
        this.branchForm.get('branchId').setValue(branchId);
      }
    });
  }

  ChangeBranch(event: { value: any }) {
    this.selectedBranch = event.value;
  }
  SaveChangeBranch() {
    this.customerBranchId = false;
    if (this.selectedBranch) {
      localStorage.setItem('branchId', this.selectedBranch);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Branch changed successfully',
      });
      this.branchForm.reset();
    }
  }
  logout() {
    localStorage.clear();
    let userToken = localStorage.getItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('FILLCODEDATA');
    localStorage.removeItem('menuData');
    localStorage.removeItem('branchId');
    this.router.navigate(['users/login']);
  }
  toogleNav() {
    this.showMenu = !this.showMenu;
  }
  navClick(index) {
    if (this.showSubMenu === index) {
      this.showSubMenu = -1;
    } else {
      this.showSubMenu = index;
    }
  }
}
