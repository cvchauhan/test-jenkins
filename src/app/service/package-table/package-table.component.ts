import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'src/app/account-flow/account.service';
import Utils from 'src/app/helpers/utils';
import { ServicesService } from 'src/app/services/services.service';
import { ServicePackageComponent } from '../service-package/service-package.component';

@Component({
  selector: 'app-package-table',
  templateUrl: './package-table.component.html',
  styleUrls: ['./package-table.component.css']
})
export class PackageTableComponent implements OnInit {
  formDate: any = null;
  toDate: any;
  packageData: any[] = [];
  first = 0;
  rows = 10;
  branchData:any = [];
  selectedBranch:any;
  selectedBranchPopup:any;
  stateOptions = [
    { label: 'Active', value: 'A' },
    { label: 'Inactive', value: 'I' },
  ];

  constructor(
    private accountService: AccountService,
    public dialogService:DialogService,
    private servicesService: ServicesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.BranchLocation();
  }


  public dateToSend: string;
  public endDateToSend: string;
  onSelectMethod(event, typ) {
    // console.log(event);
    let d = new Date(event);
    //console.log(d.getMonth());
    let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    if (typ == "fromD") {
        this.formDate = new Date(finalDate);
    } else {
        this.toDate = new Date(finalDate);
        this.dateToSend = Utils.formatDate(finalDate);
    }
}
searchJobApproval() {
  //console.log(this.formDate);
  let branchId = this.selectedBranch.val;
  let frDate = Utils.formatDate(this.formDate);
  let toDate = Utils.formatDate(new Date(this.toDate));
  //console.log(toDate);

  this.accountService.getAllPackages(branchId).subscribe(
      res => {
          this.packageData = res['data'];
      }
  );
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
addPackage(){
  const ref = this.dialogService.open(ServicePackageComponent, {
    data: {
        branchId: this.selectedBranch.val,
        processOfJob:'jobapproval'
    },
    header:`Add Service Package`,
    width: '60vw',
    styleClass:'customer-modal'
});
ref.onClose.subscribe((res:any) => {
  //this.getPatient();
  if(res){
    this.searchJobApproval();
  }
});
}

viewJobWithId(id, status, jobNumber,packageName){
  const ref = this.dialogService.open(ServicePackageComponent, {
        data: {
            nPackid: id,
            cStatus:status,
            jobNum:jobNumber,
            processOfJob:'jobapproval',
            jobView:true,
            branchId: this.selectedBranch.val
        },
        header:`Edit Service Package - ${packageName}`,
        width: '60vw',
        styleClass:'customer-modal'
  });
  ref.onClose.subscribe((res:any) => {
      //this.getPatient();
  });
}


BranchLocation() {
  const empID = localStorage.getItem('empID');
  this.servicesService.getBranch(empID).subscribe(
    res => {
      this.branchData = res['data'];
      localStorage.setItem('branchData', JSON.stringify(res['data']));
      this.selectBranch()
    });
}

  selectBranch() {
    this.selectedBranch = this.branchData[0];
    this.selectedBranchPopup = this.branchData[0];
  }

  updateStatus(event,PackageId){
    // this.confirmationService.confirm({
    //   message: 'Are you sure to update status?',
    //   accept: () => {
            this.servicesService.updateJobStatus(PackageId,event.value).subscribe(res =>{
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res['data'].msg });
            })
  //     },
  //     reject: () => {
  //        console.log('No')
  //     }
  // });
  }
}
