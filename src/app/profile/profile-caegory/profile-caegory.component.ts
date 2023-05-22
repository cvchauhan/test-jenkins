import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-caegory',
  templateUrl: './profile-caegory.component.html',
  styleUrls: ['./profile-caegory.component.css']
})

export class ProfileCaegoryComponent implements OnInit {
  disableParentCategory: boolean = true;
  categorySelected: any;
  position: string;
  editButton: boolean = false;
  userId: any;
  serachResponse: any;
  cities: [];
  products: [{}];
  categoriesData: any[] = [];
  categories: any[] = [];
  categoriesRes: any[] = [];
  parrentCategoryRes: any;
  tableResponse: any;
  tableRArr: any[] = [];
  editResponse: any;
  response: any;
  addResponse: any;
  ctgID: any;
  searchBox: string = "";
  manageParameterGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private employeeService: EmployeeService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    //this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
   
    this.getCategory();
   
    //this.getManageParameterTable();
    this.manageParameterForm();
  }

  checkIfExists(categoryName, arrayOfObjects) {
    return arrayOfObjects.some((el) => {
      return el.category === categoryName;
    });
  }
  getCategory() {

    this.employeeService.getCategoryParentCategoryData().subscribe((res:any)=>{
      this.categoriesData = res.data
     
      this.categoriesData.forEach((element) => {
        
        if (element["cCategory"] && !this.checkIfExists(element["cCategory"], this.categories)) {
          this.categories.push({  "code": element["nCtgID"], "category": element["cCategory"], "codeID": element["nParentCatID"],  "parentCategoryName": element["cParentCategory"] });
          //console.log('Category', this.categories);
        }
        // this.categories.forEach((elem) => {
        //   if (elem['category'] == '') {
        //     this.categoriesRes.push({ "name": element['codeName'], "code": element["serialNo"], "category": element["categoryName"], "codeID": element["codeID"], "ctgID": element["ctgID"] });
        //   }
  
        // })
      })
     })
   
  }

  getParrentCategory(event, catId?) {
    console.log(event);
    console.log(catId)
    let categoryId;
    let parentData;
    if (event) {
      categoryId = event.value['ctgID'];
      console.log(categoryId)
    } else {
      categoryId = catId;
      let parentSn = this.editResponse['nParentSerialNo'];
      // console.log(this.parrentCategoryRes);
      parentData = this.categoriesData.filter(el => el['serialNo'] == parentSn);
      console.log(parentSn);
      console.log('parent category data', parentData);
    }

    this.profileService.parentCategory(categoryId).subscribe(
      res => {
        this.parrentCategoryRes = res['data'];
        if (this.parrentCategoryRes.length > 1) {
          this.disableParentCategory = false;
        }
        else {
          this.disableParentCategory = true;
        }
        console.log(this.parrentCategoryRes);
        if (!event) {
          if (parentData.length > 0) {
            let tmpObj = { "val": parentData[0]['serialNo'].toString(), "txt": parentData[0]['codeName'] };
            // console.log(tmpObj);
            // console.log(parentData[0]);
            this.manageParameterGroup.patchValue({
              nParentSerialNo: tmpObj
            });
          }
        }
        // console.log(this.parrentCategoryRes);
      }
    )
    //console.log('ctgID',evt)

  }

  getManageParameterTable() {
    this.profileService.managePerameterList().subscribe(
      res => {
        this.tableResponse = res['data'];
        this.tableRArr = res['data'];

      }
    )
  }

  // pagingnation
  first = 0;

  rows = 10;
  next() {
    this.first = this.first + this.rows;
  };

  prev() {
    this.first = this.first - this.rows;
  };

  reset() {
    this.first = 0;
  };
  isLastPage(): boolean {
    return this.tableResponse ? this.first === (this.tableResponse.length - this.rows) : true;
  };

  isFirstPage(): boolean {
    return this.tableResponse ? this.first === 0 : true;
  };
  // End Pagingnation

  deleteManagePerameter(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.profileService.delManagePerameter(id).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.getManageParameterTable();
            }
            if (this.response['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Deleted Successfully' });
            }
          }
        )
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });
  };

  // Filter or Search Table data
  searchManageParameter() {
    this.profileService.filterManageParameter(this.searchBox).subscribe(
      res => {
        this.serachResponse = res['data'];
        this.tableResponse = this.serachResponse;
        console.log(this.serachResponse);
      }
    )
  }

  // update manage Parameters

  editManageParameter(id: any) {
    this.editButton = true;
    this.profileService.editById(id).subscribe(
      res => {
        this.editResponse = res['data'];
        console.log(this.editResponse['nCtgID'])
        console.log(this.editResponse);
        this.getParrentCategory(undefined, this.editResponse['nCtgID']);
        // let parentCtgId = this.editResponse['nParentCtgID'];
        // if(parentCtgId){
        //  // console.log(this.categoriesData);
        //   this.parrentCategoryRes = this.categoriesData.filter(e => e.ctgID == parentCtgId);
        // }
        //  console.log(parentCtgId);
        const category = this.categories.filter(e => e.category == this.editResponse['cCategory']);
        console.log(category);
        // const parrentCategory = this.parrentCategoryRes.filter(e => e.txt == this.editResponse['cParentCodeName']);
        // console.log('parrentCategory',parrentCategory);
        this.manageParameterGroup.patchValue({
          nCtgId: category[0],
          cCodeName: this.editResponse['cCodeName'],
          // nParentSerialNo: parrentCategory[0],
          nSerialNo: this.editResponse['nSerialNo']
        })
      }
    )
  }
  resetManageParameter() {
    this.manageParameterGroup.reset();
    this.editButton = false;
  }
  // Submit manage parameter data
  manageParameterForm() {
    this.manageParameterGroup = this.fb.group({
      nCtgId: new FormControl('', [Validators.required]),
      cCodeName: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      nParentSerialNo: new FormControl(''),
      nAdmin: new FormControl(''),
      nBranchId: new FormControl(''),
      nUserid: new FormControl(this.userId),
      nSerialNo: new FormControl('')
    })
  }

  get getControl() {
    return this.manageParameterGroup['controls'];
  }

  // Parrent Category Validation

  onParentChange(evt) {
    this.tableResponse = [];
    if (evt['value'] != null) {
      let ParentID: number = evt['value']['val'];
      this.profileService.managePerameterListByCategory(this.ctgID, ParentID).subscribe(
        res => {
          this.tableResponse = res['data'];
        })
    }
    else {
      this.profileService.managePerameterListByCategory(this.ctgID, 0).subscribe(
        res => {
          this.tableResponse = res['data'];
        })
    }
  }

  onParentCategoryChange(evt) {
    this.tableResponse = [];
    this.ctgID = evt['value']['ctgID'];
    this.profileService.managePerameterListByCategory(this.ctgID, 0).subscribe(
      res => {
        this.tableResponse = res['data'];
      })
    this.categorySelected = this.manageParameterGroup.get('nCtgId').value['parentCategoryName'];

    if (this.categorySelected === '') {
      this.manageParameterGroup.get('nParentSerialNo').clearValidators();
      this.manageParameterGroup.get('nParentSerialNo').updateValueAndValidity();
    }
    else {
      this.manageParameterGroup.get('nParentSerialNo').setValidators([Validators.required]);
      this.manageParameterGroup.get('nParentSerialNo').updateValueAndValidity();
    }
  }

  submitManageParameter(form) {
    console.log('this is form value', form.value);
    const formValues = this.manageParameterGroup.value;
    let logId = localStorage.getItem("loginId");
    this.userId = logId;
    formValues['nUserid'] = this.userId;
    let branchId = 0;
    formValues['nBranchId'] = branchId;
    let admin = true;
    formValues['nAdmin'] = admin;
    let formData = {};
    if (this.editButton == true) {
      formData['nSerialNo'] = formValues['nSerialNo'];
      formData['nCtgId'] = formValues['nCtgId']['ctgID'];
      formData['cCodeName'] = formValues['cCodeName'];
      formData['description'] = formValues['description'];
      formData['nParentSerialNo'] = (formValues['nParentSerialNo'] != "" || formValues['nParentSerialNo'] != null) ? formValues['nParentSerialNo']['val'] : "0";
      this.profileService.editManageParameter(formData).subscribe(
        res => {
          this.addResponse = res;
          console.log('this is response', res);
          if (this.addResponse['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: this.addResponse['errorMessage'], detail: 'Update Successfull' });
            this.getManageParameterTable();
            this.editButton = false;
            this.manageParameterGroup.patchValue({
              cCodeName: ""
            });
            this.manageParameterGroup.get('cCodeName').setValidators([Validators.required]);
            this.manageParameterGroup.get('cCodeName').updateValueAndValidity();
            // this.manageParameterGroup.reset();
          }
          if (this.addResponse['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.addResponse['errorMessage'], detail: 'Not Update' });
          }

        }
      )

    }
    else {
      formData['nCtgId'] = formValues['nCtgId']['ctgID'];
      formData['cCodeName'] = formValues['cCodeName'];
      formData['description'] = formValues['description'];
      formData['nParentSerialNo'] = formValues['nParentSerialNo']['val'];
      formData['nAdmin'] = formValues['nAdmin'];
      formData['nBranchId'] = formValues['nBranchId'];
      formData['nUserid'] = formValues['nUserid'];

      this.profileService.addManageParameter(formData).subscribe(
        res => {
          this.addResponse = res;
          console.log('this is response', res);
          if (this.addResponse['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Successfull' });
            this.getManageParameterTable();
            this.manageParameterGroup.patchValue({
              cCodeName: ""
            });
            this.manageParameterGroup.get('cCodeName').setValidators([Validators.required]);
            this.manageParameterGroup.get('cCodeName').updateValueAndValidity();
            // this.manageParameterGroup.reset();
          }
          if (this.addResponse['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added' });
          }

        }
      )
    }

  }
}
