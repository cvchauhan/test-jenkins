import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Message } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';


@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit {
  products = [
    { name: 'Gitanjli' },
  ];
  editGroupButton: boolean = false;
  sTableList: any[];
  position: string;
  accountForm: FormGroup;
  tableData: any;
  searchAll: any;
  searchBox: string = "";
  searchData: any;
  underData: any;
  ledgerData: any;
  ledgerType: any[] = [];
  response: any;
  editResponseById: any;
  ledgerTypeData:any[]=[];
  constructor(private primengConfig: PrimeNGConfig,
    private accountService: AccountService,
    private fb: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private empService: EmployeeService

  ) { };
//JSON.parse(localStorage.getItem("FILLCODEDATA"));
  ngOnInit(): void {
  this.ledgerTypeF();
  this.tableDataF();
  this.underF();
  this.accountGroupF();
 
     
    
    
  };

  displayBasic2: boolean;

  showModal() {
    this.displayBasic2 = true;
  };

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayBasic2 = false;
  }

  // Get Manage Group table Data
  tableDataF() {
    this.accountService.groupTable().subscribe(
      res => {
        this.tableData = res['data'];
        console.log('table data', this.tableData);
      }
    );
  };
  // pagingnation
  first = 0;

  rows = 10                    ;
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
    return this.sTableList ? this.first === (this.sTableList.length - this.rows) : true;
  };

  isFirstPage(): boolean {
    return this.sTableList ? this.first === 0 : true;
  };
  // End Pagingnation 
  // filter Table Data
  filterTableF() {
    if(this.searchBox.length >= 3) {
      this.accountService.filterTableData(this.searchBox).subscribe(
        res => {
          this.searchData = res['data'];
          this.tableData = res['data'];
          // console.log(this.searchBox);
          console.log(this.tableData);
          // this.searchAll=this.searchData;
        }
      );
    } else {
      this.tableDataF();
    }
    
  };
  // get under dropdown Data
  underF() {
    this.accountService.getUnder().subscribe(
      res => {
        this.underData = res['data'];
        //console.log(this.underData);
      }
    );
  };
  // get dropdown data for Ledger Type
  ledgerTypeF() {
         this.empService.getctgData(7).subscribe((res:any)=>{
          this.ledgerType = res.data
         })
        
       // console.log(this.ledgerData);
  };
  accountGroupF() {
    this.accountForm = this.fb.group({
      cSchNm: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      nGroupType: new FormControl('', [Validators.required]),
      nParentid: new FormControl(''),
      cDisplayNm: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      cLedger: new FormControl('true'),
      cDisplayMode: new FormControl('A'),
      nSchid: new FormControl('1')
    });
  };

  get formControls() {
    return this.accountForm.controls;
  };

  // Edit Table Data
  editGroupF(group: any) {
    console.log(group);
    this.editGroupButton = true;
    this.accountService.editGroupById(group).subscribe(
      res => {
        this.editResponseById = res['data'];
        console.log(this.editResponseById);
        let enableLedgerCreatiopn = true;
        if(this.editResponseById['cLedger']=='T'){
          enableLedgerCreatiopn=true;
        }
        else{
          enableLedgerCreatiopn=false;
        }
        const under = this.underData.filter(e => e.txt == this.editResponseById['parentNm']);
        const ledgerType = this.ledgerType.filter(e => e.codeName == this.editResponseById['groupType']);
        this.accountForm.patchValue({
          nSchid: this.editResponseById['nSchid'],
          cSchNm: this.editResponseById['cSchNm'],
          nGroupType: ledgerType[0],
          nParentid: under[0],
          cDisplayNm: this.editResponseById['cDisplayNm'],
          cLedger: enableLedgerCreatiopn,
          cDisplayMode: this.editResponseById['cDisplayMode']
        });
      }
    )

  };
  // Add Manage Group Data
  addGroupF(form: any) {
   // console.log(document.getElementsByClassName('ng-invalid'));

    // if (this.accountForm.invalid) {
    //   this.messageService.add({ severity: 'error', summary: 'OOPS', detail: 'Invalid Form, Kindly Fill The Form' });
    //   return false;
    // }
   // console.log('this is form value', form.value);
    let formValues = this.accountForm.value;
    const cLedger = formValues['cLedger'];
    let formData = {};
    if (this.editGroupButton == true) {
      formData['cSchNm'] = formValues['cSchNm'];
      formData['nGroupType'] = formValues['nGroupType']['serialNo'];
      formData['nParentid'] = formValues['nParentid']['val'];
      formData['cDisplayNm'] = formValues['cDisplayNm'];
      formData['cDisplayMode'] = formValues['cDisplayMode'];
      formData['nSchid'] = formValues['nSchid'];
      if (cLedger) {
        formData['cLedger'] = "T";
      } else {
        formData['cLedger'] = "F";
      }
      this.accountService.editGroup(formData).subscribe(
        res => {
          this.response = res;
          console.log(this.response);
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successfull' });
            this.accountForm.reset();
            this.editGroupButton = false;
            this.displayBasic2 = false;
            this.accountForm.reset();
            this.tableDataF();
            this.underF();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Update' });
          }
          // else{
          //   this.messageService.add({severity:'error', summary:'Something Went Wrong', detail:'Not Added'});
          // }

        }
      );
    }
    else {
      formData['cSchNm'] = formValues['cSchNm'];
      formData['nGroupType'] = formValues['nGroupType']['serialNo'];
      formData['nParentid'] = formValues['nParentid']['val'];
      formData['cDisplayNm'] = formValues['cDisplayNm'];
      formData['cDisplayMode'] = formValues['cDisplayMode'];
      if (cLedger) {
        formData['cLedger'] = "T";
      } else {
        formData['cLedger'] = "F";
      }

      this.accountService.accountGroupAdd(formData).subscribe(
        res => {
          this.response = res;
          console.log(this.response)
          if (this.response['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
            this.accountForm.reset();
            this.displayBasic2 = false;
            this.accountForm.reset();
            this.tableDataF();
            this.underF();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added' });
          }
          // else{
          //   this.messageService.add({severity:'error', summary:'Something Went Wrong', detail:'Not Added'});
          // }

        }
      );
    }
  };

  // Delete Table Data

  delGroupDataF(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteGroupById(id).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.tableDataF();
            }
            if (this.response['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Deleted Successfully' });
            }
          }
        );
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });
  };
}
