import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import * as uuid from 'uuid';
import { EmpSharedService } from 'src/app/shared-services/emp-shared.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { EmpSearchComponent } from '../search/emp-search.component'


@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss'],
  providers: [MessageService]
})
export class KycComponent implements OnInit {
  fileUuid = uuid.v4();
  public baseUrl = environment.baseUrl;
  @Input() fTabData: any = {};
  @Input() editEmpData: any;
  @Output() updateSearchEvent = new EventEmitter<boolean>();
  @ViewChild('aadhar') aadhar: ElementRef;
  @ViewChild('panNo') panNo: ElementRef;
  submitted = false;
  public uploadedFiles: any[] = [];
  public cities: any[] = [];
  public typesOfKycDocs: any[] = [
    { "name": 'Aadhar', "code": 1 },
    { "name": 'VoterId', "code": 2 },
    { "name": 'Driving License', "code": 3 }
  ];
  kycFile: string = null;
  policeFile: string = null;
  panFile: string = null;
  photoFile: string = null;
  employeeKYC: FormGroup;


  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private http: HttpClient, private empSharedService: EmpSharedService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.kyvForm();
  }

  kyvForm() {
    this.employeeKYC = this.fb.group({
      pan: ['', [Validators.required, Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]$"), Validators.minLength(10), Validators.maxLength(12)]],
      adhaarMN: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      pfnumber: [''],
      kycdocType: [''],
      kycFile: [''],
      gratuity: [''],
      kycnumber: [''],
      policeVerDoc: [''],
      cBankAcNo:[''],
      cifsc:[''],
      aliases: this.fb.array([
        this.fb.control('')
      ])
    });
  }
  uploadedFilePolice: string;
  onBasicUploadAuto(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    console.log("File upload successfully");

  }
  get f() {
    return this.employeeKYC['controls'];
  }

  onBasicUpload(event, type) {
    let file = event['originalEvent']['body']['data'];
    switch (type) {
      case 'police':
        this.policeFile = file;
        break;
      case 'photo':
        this.photoFile = file;
        break;
      case 'pan':
        this.panFile = file;
        break;
      case 'kyc':
        this.kycFile = file;
        break;
      default:
        break;
    }
    //const xf = JSON.parse(event.xhr.responseText);
    console.log(event);
  }

  showSuccess(succ) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
  }

  showError(error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }


  onSubmit() {

    //console.log(this.editEmpData);

    const formValues = this.employeeKYC.value;

    let formData = this.empSharedService.formValues;
    console.log(formData);
    formData['cPAN'] = formValues['pan'];
    formData['cPANImage'] = this.panFile;
    formData['cKYCImage'] = this.kycFile;
    formData['cPoliceVerifyImage'] = this.policeFile;
    formData['cPhoto'] = this.photoFile;
    formData['cPFNumber'] = formValues['pfnumber'];
    formData['cGratuity'] = formValues['gratuity'] ? 't' : 'f';
    formData['cKYC'] = formValues['kycdocType'] != undefined ? formValues['kycdocType']['name'] : null;
    formData['cUIDMobile'] = formValues['adhaarMN'];
    formData['cBankAcNo'] = formValues['cBankAcNo'];
    formData['cifsc'] = formValues['cifsc'];

    // console.log(this.editEmpData);
    // console.log(formData);
    //let searchDataList = new EmpSearchComponent(`1`)
    if (this.editEmpData) {

      this.employeeService.updateEmployeeInfo(formData).subscribe((data) => {
        if (data['status'] == 200) {
          this.showSuccess(data['message']);
          setTimeout(() => {
            this.updateSearchEvent.emit(true);
          }, 2000);
          localStorage.removeItem('menu');
          localStorage.removeItem('reportMenu');
          localStorage.removeItem('appMenu');
        } else {
          this.showError(data['errorMessage']);
        }

      }, (error) => {

      });

    } else {

      this.employeeService.addEmployeeInfo(formData).subscribe((data) => {
        if (data['status'] == 200) {
          this.showSuccess(data['message']);
          setTimeout(() => {
            this.updateSearchEvent.emit(true);
          }, 2000);
          localStorage.removeItem('menu');
          localStorage.removeItem('reportMenu');
          localStorage.removeItem('appMenu');
        } else {
          this.showError(data['errorMessage']);
        }

      }, (error) => {

      })

    }
    // for (let el in this.employeeKYC.controls) {
    //   if (this.employeeKYC.controls[el].errors) {
    //     console.log(el)
    //   }
    // }
    // this.submitted = true;
    // if (this.employeeKYC.invalid) {
    //   return false
    // }
    // //console.warn(this.employeeInfoForm.value);



  }
  public editedPhoto: string = "";
  public editedPan: string = "";
  public editedKyc: string = "";
  public editedPolice: string = "";
  ngOnChanges() {
    let gratutiy;
    if (this.editEmpData) {
      if (this.editEmpData['cGratuity'] == 't') {
        gratutiy = true;
      } else {
        gratutiy = false;
      }
      // console.log(this.editEmpData['cpan']);
      this.editedPhoto = this.editEmpData['cPhoto'];
      this.editedPan = this.editEmpData['cpanImage'];
      this.editedKyc = this.editEmpData['ckycImage'];
      this.editedPolice = this.editEmpData['cPoliceVerifyImage'];


      const typeOfKyc = this.typesOfKycDocs.filter(e => e.name == this.editEmpData['ckyc']);
      this.employeeKYC.patchValue({
        pan: this.editEmpData['cpan'],
        pfnumber: this.editEmpData['cpfNumber'],
        kycnumber: this.editEmpData['kyCid'],
        gratuity: gratutiy,
        kycdocType: typeOfKyc[0],
        adhaarMN: this.editEmpData['cuidMobile'],
        cBankAcNo: this.editEmpData['cBankAcNo'],
        cifsc: this.editEmpData['cifsc']
      });
    }

  }

  onKey(e: any) {
    const value = this.aadhar.nativeElement.value;
    if (e.which === 8) {
      return;
    }

    const len = value.length;
    if (len >= 12) {
      e.preventDefault();
    }
  }
  onPan(e: any) {
    const value = this.panNo.nativeElement.value;
    if (e.which === 8) {
      return;
    }
    const len = value.length;
    if (len >= 12) {
      e.preventDefault();
    }
  }

}
