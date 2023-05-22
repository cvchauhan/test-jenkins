import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { EmpSharedService } from 'src/app/shared-services/emp-shared.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EmpSearchComponent implements OnInit {
  @Output() buttonClicked = new EventEmitter<any>();
  @Output() tabIndexSearch = new EventEmitter<number>();
  @Output() empDataUpdated = new EventEmitter<any>();
  @Input() isTabUpdated: boolean = false;
  // @ViewChild('')
  products = [
    { name: 'Gitanjli', empCode: 'NIPL2020', employee: 'Gitanjli', department: 'Management', Des: 'Director', role: 'Admin' }
  ]

  searchList: any[] = []
  filterData: string = "";
  searchData: any
  searchAllData: any;
  isChanged: boolean = false;
  // pagingnation
  first = 0;
  rows = 10;
  sTableList: any[];

  constructor(private http: HttpClient,
    private employeeS: EmployeeService, private empSharedService: EmpSharedService, private confirmationService: ConfirmationService, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.searchTableF()
  }

  ngOnChanges() {
    if (this.isTabUpdated) {
      this.searchTableF();
    }
  }
  //Get Search Table List
  searchTableF() {
    let empID = localStorage.getItem('empID');
    let roleName = "";

    this.employeeS.getTablelList(roleName, empID).subscribe(
      res => {
        //console.log(res);
        this.searchList = res['data'];
        console.log('This is Table Data', this.searchList);
      });
  }
  filtersearchTableF() {
    this.employeeS.filterTablelList(this.filterData).subscribe(
      res => {
        this.searchData = res['data']
        this.searchList = res['data']
        this.searchAllData = this.searchData
        console.log(this.searchList)
      }
    )
  }

  AddEmployee() {
    localStorage.removeItem('menu');
    localStorage.removeItem('reportMenu');
    localStorage.removeItem('appMenu');
    // localStorage.setItem("Addcount", "1");
    this.tabIndexSearch.emit(1);
    this.empDataUpdated.emit();
    localStorage.removeItem('EmpId');
    this.buttonClicked.emit();
    // setTimeout(() => {
    //    this.tabIndexSearch.emit(1);
    // }, 2000);
  }
  showSuccess(succ) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
  }

  showError(error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }
  ResetPassword(empId) {
    this.employeeS.resetPassword(empId).subscribe((data) => {
      if (data['status'] == 200) {
        this.showSuccess(data['data']['msg']);
      }
      else if (data['status'] == 204) {
        this.messageService.add({ severity: 'error', summary: data['errorMessage'], detail: data['data']['msg'] });
      }
    }, (error) => {

    });
  }

  ResetDevice(empId) {
    this.employeeS.resetDevice(empId).subscribe((data) => {
      if (data['status'] == 200) {
        this.showSuccess(data['data']['msg']);
      }
      else if (data['status'] == 204) {
        this.messageService.add({ severity: 'error', summary: data['errorMessage'], detail: data['data']['msg'] });
      }
    }, (error) => {

    });

  }


  editEmp(empId, emp) {
    console.log(emp);
    localStorage.setItem("EmpId", empId);
    // localStorage.setItem("Addcount", "2");
    let loginId = localStorage.getItem("loginId");
    this.employeeS.getEmpRecord(empId, loginId).subscribe(
      res => {
        console.log(res);
        let empData = res['data'];
        this.empDataUpdated.emit(empData);
        //this.empSharedService.updateEmpItem(empData);
        this.tabIndexSearch.emit(1);


      });

    // console.log(emp);
  }

  delEmp(id) {
    let loginId = localStorage.getItem('loginId');

    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeS.deleteEmpById(id, loginId).subscribe(
          res => {

            console.log(res)
            if (res['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.searchTableF()
            }
            if (res['status'] == 204) {
              this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Deleted Successfully' });
            }
          }
        )
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    });

  }


  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.sTableList ? this.first === (this.sTableList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.sTableList ? this.first === 0 : true;
  }
  // End Pagingnation
}
