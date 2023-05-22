import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';
import { ServiceDesignService } from '../service-design.service';

@Component({
  selector: 'app-service-point-pricing',
  templateUrl: './service-point-pricing.component.html',
  styleUrls: ['./service-point-pricing.component.css']
})
export class ServicePointPricingComponent implements OnInit {

  formGroup: FormGroup;
  serviceD: any;
  servicePoint: any;
  currentServicePointId: number = 0;
  editData: any;
  rate: any[] = [];
  categoriesData: any[] = [];
  tableList: any[] = [];
  response: any;
  position: string;
  isEdit:boolean = false;
  currentSrvrId:number;
  branchData: any;
  selectedBranch:string;
   // pagingnation
   first = 0;
   rows = 10;
   sTableList: any[];


  constructor(
    private fb: FormBuilder,
    private serviceDesignService: ServiceDesignService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeeService : EmployeeService) { }

  ngOnInit(): void {
    //this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
    this.employeeService.getctgData(4).subscribe((res:any)=>{
      this.categoriesData = res.data
     })
   
    this.rateMRP();
    this.reactForm();
    this.getServiceF();
    this.getTableData();
    this.BranchLocation();
  }

  reactForm() {
    this.formGroup = this.fb.group({
      nService: new FormControl('', [Validators.required]),
      nSrvPointid: new FormControl('', [Validators.required]),
      cBranchid: new FormControl('',[Validators.required]),
      dDoe: new FormControl('', [Validators.required]),
      nRateUnit: new FormControl('', [Validators.required]),
      nrate: new FormControl('', [Validators.required])
    })
  }
  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  get formControl() {
    return this.formGroup['controls']
  }

  // service dropdown
  getServiceF() {
    this.serviceDesignService.getServiceData().subscribe(
      res => {
        this.serviceD = res['data'].filter((elem)=>elem.srvCtg != "INTERNAL SERVICE");
       // console.log(this.serviceD);
      }
    );
  }

  searchPointCareF(evt) {
    if (evt.value) {
     
      this.currentServicePointId = evt['value'];
      this.getTableData(this.globalServId,this.currentServicePointId);
    }
  }

  globalServId;
  servicePointF(evt, catId?) {
   // console.log(evt);
   // let servicePoinData;
    // console.log('this is id',evt)
    let serviceId = evt?evt.value:catId;
    this.globalServId = serviceId;
    this.serviceDesignService.getSevicePointById(serviceId).subscribe(
      res => {
        this.servicePoint = res['data'];
        this.getTableData(serviceId,null);
       // console.log(this.servicePoint);
      //  this.getServiceF();
        // if (!evt) {
        //   // let tmpObj = { "val": servicePoinData['val'].toString(), "txt": servicePoinData['txt'] };
        //   // console.log(tmpObj);
        //   // console.log(servicePoinData[0]);
        //   const servPointData = this.servicePoint.filter(e => e.txt == this.editData['cSrvPnt']);

        //   this.formGroup.patchValue({
        //     // nSrvPointid: tmpObj
        //     nSrvPointid: servPointData[0]
        //   });
        // }
      }
    );
    // }
    // else {
    //   this.servicePoint = null;
    // }

  }

  onCancel(){
    this.formGroup.reset();
    this.isEdit = false;
  }

  rateMRP() {
    this.categoriesData.forEach((element) => {
      // console.log(element);
      if (element['ctgID'] == 4) {
        this.rate.push({ "serialNo": element["serialNo"], "codeID": element["codeID"], "ctgID": element["ctgID"], "codeName": element["codeName"], "parentSerialNo": element["parentSerialNo"] })
      }
    })
    console.log(this.rate);
  };

  //  get Branch and Location
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.serviceDesignService.getBranch(empID).subscribe(
      res => {
        this.branchData = res['data'];
        this.selectedBranch = this.branchData.value;
        console.log(this.selectedBranch);

        console.log('This is Branch location',this.branchData);
      }
    );
  }

  onSubmit() {
    let formValue = this.formGroup.value;
    let branchId = localStorage.getItem('branchId')
    console.log(branchId)
    let formData = {};

    formData['dDoe'] = this.formatDate(formValue['dDoe']);
    formData['nSrvid'] = formValue['nService'];
    formData['nSrvSkillid'] = null;
    formData['cBranchid'] = formValue['cBranchid'].toString();
    formData['nRate'] = formValue['nrate'];
    formData['nUnit'] = formValue['nRateUnit'];
    formData['nSrvPointid'] = formValue['nSrvPointid'];
    if(this.isEdit){
      formData['nSrvrid'] = this.currentSrvrId;
      this.serviceDesignService.updateRateData(formData).subscribe(
        res => {
          if (res['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
            this.formGroup.reset();
            this.getTableData();
          }
          if (res['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          }
        });
    }else{

      this.serviceDesignService.postData(formData).subscribe(
        res => {
          if (res['status'] == 200) {

            this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
            this.formGroup.reset();
            this.getTableData();

          }
          if (res['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res['errorMessage'] });
          }
        });

    }



  }

  getTableData(servId?,srvPointId?) {
    this.tableList = [];
    let serviceId = servId? servId : null;
    let servicePointId  = srvPointId ? srvPointId : null;
    this.serviceDesignService.getTable(serviceId,servicePointId,null,true).subscribe(
      res => {
        this.tableList = res['data'];
        //console.log(this.tableList);
      }
    )
  }

  deleteServicePrice(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceDesignService.deleteData(id).subscribe(
          res => {
            this.response = res;
            console.log(res);
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.getTableData();
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
  }


  editServicePointPrice(data){
 // console.log(this.branchData);
    this.isEdit = true;
    this.currentSrvrId = data['nSrvrid'];
    const branchValue = [];
    const bBranch = data['cBranchid'].split(",");
    console.log(bBranch);
    bBranch.forEach(element => {
      this.branchData.forEach((el, ind) => {
        if (element == el['val']) {
          branchValue.push(el);
        }
      });
    });
    console.log(branchValue);
    this.servicePointF(undefined,data['nSrvid']);
    this.formGroup.patchValue({
      "nService":data['nSrvid'].toString(),
      "nSrvPointid":data['nSrvPointid'].toString(),
      "dDoe": this.formatDate(data['dDoe']),
      "nrate":data['nRate'],
      "nRateUnit":data['nUnit'],
      "cBranchid":branchValue
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
