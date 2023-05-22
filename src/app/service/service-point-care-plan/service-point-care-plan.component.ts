import { Component, OnInit, Output, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as EventEmitter from 'events';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ServiceDesignService } from '../service-design.service';
import Utils from 'src/app/helpers/utils';
import * as uuid from 'uuid';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-point-care-plan',
  templateUrl: './service-point-care-plan.component.html',
  styleUrls: ['./service-point-care-plan.component.css']
})
export class ServicePointCarePlanComponent implements OnInit {
  @Output() empDataUpdated = new EventEmitter();


  fileUuid = uuid.v4();
  editData: any;
  editButton: boolean = false;
  public servicePointMapp = [];
  public previewHeader: string;
  public servicePointMappArr: any[] = [];
  isTaskDependencyChecked:boolean = false;
  manageJobData: any[];
  taskS = [
    { name: 'Active', val: 'A' },
    { name: 'Deactive', val: 'D' }
  ];
  dataType = [
    { name: 'LOV', val: 'LOV' },
    { name: 'NUM', val: 'NUM' },
    { name: 'DAT', val: 'DAT' },
    { name: 'TXT', val: 'TXT' },
    { name: 'DEC', val: 'DEC' }
  ];
  commaSValue = [
    { name: 'YES', val: 'YES' },
    { name: 'NO', val: 'NO' }
  ];
  searchBox:string="";
  servicePointMapping: any;
  showServicePointMappingCheckbox: boolean = false;
  showServicePointMappingDropdown: boolean = false;
  searchData: any;
  searchAll: any;
  servicePointCareForm: FormGroup;
  position: any;
  response: any;
  sMappData: any;
  sPoint: any;
  servicePoint;
  delRes: any;
  onData: any;
  // data type
  currentServicePointId: number = 0;
  defaulBlock: boolean = false;
  separetedValue: boolean = false;
  pointMapping: boolean = false;
  dataValidation: boolean = false;
  alertParameter: boolean = false;
  maxLength: boolean = false;
  minToMax: boolean = false;
  showAlertMappingRanges: boolean = false;
  commaSVal = "YES, NO";
  isLovData:boolean = false;
  lovDataModel:string="";
  taskDFrom:string="";
  taskDTo:string="";
  isNumData:boolean = false;
  addPointMap = [];
  servicePointTable: boolean = false;
  currentSelectedTaskDataType:string;
  currentSelectedTask:string;
  // end data type
  show: boolean = false;
  serviceD: any;
  displayPreviewBasic: boolean = false;
  uploadedFiles: any[] = [];
  includeAnalysis:boolean = false;
  servicePointTaskData:any = [];
  showIsTaskDependant:boolean = false;
  taskDependency:boolean = false;
  analysis = [
    { name: 'YES', val: 'Y' },
    { name: 'NO', val: 'N' }
  ]
  taskDepen:any[];
  taskDetailDialog:boolean = false;
  spcpFile;
  detailChecked: boolean = false;
  selectedCheckbox:any;
  onTaskDataList:any = [];
  values: string[];
  constructor(private serviceDesignService: ServiceDesignService,
    private fb: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: ServicesService
  ) { }

  ngOnInit(): void {
    //this.sPointTableF();
    this.careFormF();
    this.getServiceF();
   // this.loadTask();

    this.taskDepen = [
    
    ]
  }

  @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.displayPreviewBasic = false;
    this.taskDependency = false;
    this.taskDetailDialog = false;
  }

  onBasicUpload(event, type){
  
    let file = event['originalEvent']['body']['data'];

    switch (type) {
      case 'spcp':
        this.spcpFile = file;
        break;
    
      default:
        break;
    }
    //const xf = JSON.parse(event.xhr.responseText);
    //console.log(file);
  }



  changeCheck(evt){
   // console.log(evt.checked);
    //this.detailChecked = !evt.checked;

    if(evt.checked){
      this.detailChecked = true;
      this.isTaskDependencyChecked = true;
    }else{
      this.isTaskDependencyChecked = false;
      this.detailChecked = false;
    }
  }
  showTaskDependency(){
    this.taskDependency =true;
   // this.taskDepen = this.servicePointTaskData;
  }

  currentParentTaskId:number;
  servicePntTaskDependencies:any[] = [];
  lovValues:any[];

  setLovValues(){
    this.taskDFrom = this.lovDataModel;
    this.taskDTo = this.lovDataModel;
  }
  selectData(data){
    //console.log('check', data);
    this.selectedCheckbox = data;
    const dataList = data.cLovval.split(',');
    const dataDropDown = []
    if(dataList.length > 0){
      dataList.forEach((el, ind) => {
        dataDropDown.push({ "name": el, "val": el });
      });
    }
    this.lovValues = dataDropDown;
    
    this.currentSelectedTaskDataType = data['cDataType'];
    this.currentSelectedTask = data['cTaskNm'];
    this.taskDFrom = "";
    this.taskDTo = "";
    this.lovDataModel = null;
    this.currentParentTaskId = data['nTaskid'];
    if(data['cDataType'].trim() == 'LOV'){
      //this.lovValues = this.commaSValue;
     // this.lovValues = data['cLovval'].split(",");
      this.isLovData = true;
      this.isNumData = false;
    }else{
      this.isLovData = false;
      this.isNumData = true;
    }
  }
  

  addDependency(){
    let tmpObj = { "nParentTaskid": this.currentParentTaskId, "cFromVal": this.taskDFrom, "cToVal": this.taskDTo,"taskNm":this.currentSelectedTask,"cDataType":this.currentSelectedTaskDataType.trim() };
    this.servicePntTaskDependencies.push(tmpObj);
    //console.log(this.servicePntTaskDependencies);
    this.lovDataModel = null;
    this.taskDTo = "";
    this.taskDFrom = "";
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
  }

  deleteRow(id){
    //console.log(id);
    this.servicePntTaskDependencies.splice(id,1);
  }
  populateServicePointMappingDr() {
    this.commaSValue = [];
    let tmpStr = this.commaSVal.split(",");
    tmpStr.forEach((el, ind) => {
      this.commaSValue.push({ "name": el, "val": el });
    });
    //console.log(this.commaSVal);
  }

  handleTaskDependent(evt){
    if(evt.checked){
      this.showIsTaskDependant = true;
    }else{
      this.showIsTaskDependant = false;
    }
   // console.log(evt);
  }
 

  public servicePointMappingData: any[] = [];
  public editedServicePointMapData:any[] = [];
  handleServicePointMapping(evt) {
    if (evt.checked) {
      this.showServicePointMappingDropdown = true;
    } else {
      this.showServicePointMappingDropdown = false;
    }

    this.serviceDesignService.getServicePointMappingData(this.currentServicePointId).subscribe((res) => {
      let tmpData = res['data'];
      this.servicePointMappingData = res['data'];

      //console.log(tmpData);

    });
  }

  changeSV(evt){
    this.servicePointCareForm.patchValue({
      "mapData":null
    });
    //console.log(evt);
  }


  handleAlertParam(evt) {
    if (evt.checked) {
      this.showAlertMappingRanges = true;
    } else {
      this.showAlertMappingRanges = false;
    }
  }
  data_TypeF(events) {
    let typeVal: string = events.value['name'];
    // console.log(events)
    switch (typeVal) {
      case "LOV":
        this.separetedValue = true;
        this.showServicePointMappingCheckbox = true;
        this.minToMax = false;
        this.dataValidation = false;
        this.alertParameter = false;
        this.maxLength = false;
        break;

      case "NUM":
        this.maxLength = false;
        this.separetedValue = false;
        this.showServicePointMappingCheckbox = false;
        this.showServicePointMappingDropdown = false;
        this.minToMax = true;
        this.dataValidation = true;
        this.alertParameter = true;
        this.includeAnalysis = true;
        break;

      case "TXT":
        this.dataValidation = true;
        this.maxLength = true;
        this.separetedValue = false;
        this.showServicePointMappingCheckbox = false;
        this.showServicePointMappingDropdown = false;
        this.alertParameter = false;
        this.minToMax = false;
        break;

      case "DAT":
        this.separetedValue = false;
        this.showServicePointMappingCheckbox = false;
        this.showServicePointMappingDropdown = false;
        this.minToMax = false;
        this.dataValidation = false;
        this.alertParameter = false;
        this.maxLength = false;
        break;

      case "DEC":
        this.maxLength = false;
        this.separetedValue = false;
        this.showServicePointMappingCheckbox = false;
        this.showServicePointMappingDropdown = false;
        this.minToMax = true;
        this.dataValidation = true;
        this.alertParameter = true;
        this.includeAnalysis = true;
        break;
    }
  }

  careFormF() {
    this.servicePointCareForm = this.fb.group({
      nService: new FormControl('', [Validators.required]),
      nSrvPointid: new FormControl('', [Validators.required]),
      cTaskNm: new FormControl('', [Validators.required]),
      cDataType: new FormControl('', [Validators.required]),
      cLovval: new FormControl(''),
      cCamera: new FormControl(''),
      nTaskid: [''],
      cRangeMin: new FormControl(''),
      cRangeMax: new FormControl(''),
      nMaxLen: new FormControl(''),
      cDataMap: new FormControl(''),
      cAlertMin: new FormControl(''),
      cAlertMax: new FormControl(''),
      cStatus: new FormControl('', [Validators.required]),
      lovValue: new FormControl(''),
      mapData: new FormControl(''),
      cAnalysisType: new FormControl(''),
      servicePointTaskControl: []
    });
  }

  get formControl() {
    return this.servicePointCareForm['controls'];
  }
  // service dropdown
  getServiceF() {
    this.serviceDesignService.getServiceData().subscribe(
      res => {
        this.serviceD = res['data'];
      }
    );
  }
  // pagingnation
  first = 0;

  rows = 10;
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
    return this.sPointTableF ? this.first === (this.sPointTableF.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.sPointTableF ? this.first === 0 : true;
  }
  onService() {
    this.show = true;
  }
  onPatient() {
    this.show = false;
  }
  // get Service Point Mapping dropdown data

  sMappingF(evt) {
    // console.log(evt);
    //  console.log('this is map id', id)
    let mapId = evt.value['val'];
    this.previewHeader = evt.value['txt'];
    //console.log(this.previewHeader)
    if (mapId) {
      this.serviceDesignService.pointMappById(mapId).subscribe(
        res => {
          // console.log(res, 'this is res');
          this.sMappData = res['data'];
        }
      )
    }
    else {
      this.sMappData = null;
    }
  }
  // get  service point data
  servicePointF(evt, catId?) {
    let servicePoinData;
    // console.log('this is id',evt)
    let serviceId;
    if (evt) {
      serviceId = evt.value['val'];
      //console.log(serviceId)
    } else {
      serviceId = catId;
      let servicePoint = this.editData['nSrvPointid'];
      // console.log(this.parrentCategoryRes);
      servicePoinData = this.serviceD.filter(el => el['val'] == servicePoint);
      //console.log(servicePoint);
      //console.log('parent category data', servicePoinData);
    }
    // let serviceId = evt.value['val'];
    // if(evt){
      this.serviceDesignService.getSevicePointById(serviceId).subscribe(
        res => {
          this.servicePoint = res['data'];
          //console.log(this.servicePoint);
          if (!evt) {
            // let tmpObj = { "val": servicePoinData['val'].toString(), "txt": servicePoinData['txt'] };
            // console.log(tmpObj);
            // console.log(servicePoinData[0]);
            const servPointData = this.servicePoint.filter(e=>e.txt == this.editData['cSrvPnt']);

            this.servicePointCareForm.patchValue({
              // nSrvPointid: tmpObj
              nSrvPointid:servPointData[0]
            });
          }
        }
      );
      // }
    // else {
    //   this.servicePoint = null;
    // }

  }
  // Table Data
  sPointTableF() {
    this.serviceDesignService.sPCareList().subscribe(
      res => {
        this.sPoint = res['data'];
        //console.log(this.sPoint);
      }
    );
  }

  //   search Table Data
  callPointTableData(servicePoint){
    this.serviceDesignService.searchdata(servicePoint).subscribe(
      res => {
        //console.log(res);
        this.manageJobData = res['data'];
      //  this.servicePntTaskDependencies = res['data'];
        this.taskDepen = res['data'];
        //console.log(this.manageJobData, 'Table Data');
        
      }
    );
  }
  public servicePointCare:any;

  searchPointCareF(evt) {
    if (evt.value) {
      this.currentServicePointId = evt['value']['val'];
      this.manageJobData = [];
      this.servicePointCare = evt.value.txt;
      this.callPointTableData(this.servicePointCare);
      this.sMappingF(evt);
    }
  }

  deleteCare(id: any,ind) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.serviceDesignService.deleteServicePointTask(id).subscribe(
          res => {
            this.response = res;
            // console.log(res)
            if (this.response['status'] == 200) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
              this.manageJobData.splice(ind,1);
              //this.sPointTableF();
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

  // save service point care data

  clearFormConditions(){

    this.separetedValue = false;
    this.servicePointTable = false;
    this.showServicePointMappingCheckbox = false;
    this.servicePntTaskDependencies = [];
    this.servicePointMappArr = [];
    this.addPointMap = [];
    this.alertParameter = false;
    this.showAlertMappingRanges = false;
    this.showServicePointMappingDropdown = false;

    this.isTaskDependencyChecked = false;
    this.detailChecked = false;
    


    this.spcpFile = "";
    this.servicePointFinallArr = [];
  }
  public prevArr = [];
  savePointCplanF(form: any) {
    const formValue = this.servicePointCareForm.value;
    const cDataMap = formValue['cDataMap'];
    const cCamera = formValue['cCamera'];
    const formData = {};
    if (this.editButton == true) {
      formData['nTaskid'] = formValue['nTaskid'];
      formData['nSrvPointid'] = formValue['nSrvPointid']['val'];
      formData['cTaskNm'] = formValue['cTaskNm'];
      formData['cDataType'] = formValue['cDataType']['val'];
      formData['cLovval'] = formValue['cLovval'];
      formData['cImageNm'] = this.spcpFile;

      // formData['cCamera'] = formValue['cCamera'];
      formData['cRangeMin'] = formValue['cRangeMin'];
      formData['cRangeMax'] = formValue['cRangeMax'];
      formData['nMaxLen'] = formValue['nMaxLen'];
      formData['cAlertMin'] = formValue['cAlertMin'];
      formData['cAlertMax'] = formValue['cAlertMax'];
      formData['cStatus'] = formValue['cStatus']['val'];
      formData['servicePointMap'] = this.servicePointMappArr;
      formData['servicePntTaskDependencies'] = this.servicePntTaskDependencies;
      //formData['servicePointMap']= [ { "nSrvPointid": 2,  "nUserid": 1, "lovValue": "Y" }, { "nSrvPointid": 7,  "nUserid": 1, "lovValue": "Y" }, { "nSrvPointid": 21,  "nUserid": 1, "lovValue": "N" } ]
      if (cDataMap) {
        formData['cDataMap'] = "S";
      } else {
        formData['cDataMap'] = "P";
      }
      if (cCamera) {
        formData['cCamera'] = "t";
      }
      else {
        formData['cCamera'] = "f";
      }
      // formData['servicePointMap']= formValue[' { "nSrvPointid": nSrvPointid.val,  "nUserid": nUserid, "lovValue": "lovValue.val" }, { "nSrvPointid": nSrvPointid.val,  "nUserid": nUserid, "lovValue": "lovValue.val" }, { "nSrvPointid": nSrvPointid.val,  "nUserid": nUserid, "lovValue": "lovValue.val" }']

      this.serviceDesignService.editSpointCare(formData).subscribe(
        res => {
          this.response = res;
          if (this.response['status'] == 200) {
            // let tmpObj = {};
            // tmpObj["txt"] = formValue['cTaskNm'];
            // tmpObj["dType"] = formValue['cDataType']['val'];
            // this.prevArr.push(tmpObj);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successfully' });
            this.sPointTableF();
            this.editButton = false;
            this.servicePointCareForm.patchValue({
              cStatus: '',
              cTaskNm: '',
              cDataType: '',
              cCamera: false,
              cRangeMin: '',
              cRangeMax: '',
              nMaxLen: '',
              cDataMap: false,
              cAlertMin: '',
              cAlertMax: '',
              lovValue: '',
              mapData: ''
            });
            this.clearFormConditions();
            
   
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Update Successfully' });
          }
        }
      );
      this.callPointTableData(this.servicePointCare);
    }
    else {
      formData['nSrvPointid'] = formValue['nSrvPointid']['val'];
      formData['cTaskNm'] = formValue['cTaskNm'];
      formData['cDataType'] = formValue['cDataType']['val'];
      formData['cLovval'] = formValue['cLovval'];
      formData['cImageNm'] = this.spcpFile;
      // formData['cCamera'] = formValue['cCamera'];
      formData['cRangeMin'] = formValue['cRangeMin'];
      formData['cRangeMax'] = formValue['cRangeMax'];
      formData['nMaxLen'] = formValue['nMaxLen'];
      formData['cAlertMin'] = formValue['cAlertMin'];
      formData['cAlertMax'] = formValue['cAlertMax'];
      formData['cStatus'] = formValue['cStatus']['val'];
      formData['servicePointMap'] = this.servicePointMappArr;
      formData['servicePntTaskDependencies'] = this.servicePntTaskDependencies;
      //formData['servicePointMap']= [ { "nSrvPointid": 2,  "nUserid": 1, "lovValue": "Y" }, { "nSrvPointid": 7,  "nUserid": 1, "lovValue": "Y" }, { "nSrvPointid": 21,  "nUserid": 1, "lovValue": "N" } ]
      if (cDataMap) {
        formData['cDataMap'] = "S";
      } else {
        formData['cDataMap'] = "P";
      }
      if (cCamera) {
        formData['cCamera'] = "t";
      }
      else {
        formData['cCamera'] = "f";
      }
      // formData['servicePointMap']= formValue[' { "nSrvPointid": nSrvPointid.val,  "nUserid": nUserid, "lovValue": "lovValue.val" }, { "nSrvPointid": nSrvPointid.val,  "nUserid": nUserid, "lovValue": "lovValue.val" }, { "nSrvPointid": nSrvPointid.val,  "nUserid": nUserid, "lovValue": "lovValue.val" }']

      this.serviceDesignService.saveSpointCare(formData).subscribe(
        res => {
          this.response = res;
          //console.log(res);
          if (this.response['status'] == 200) {
            // let tmpObj = {};
            // tmpObj["txt"] = formValue['cTaskNm'];
            // tmpObj["dType"] = formValue['cDataType']['val'];
            // this.prevArr.push(tmpObj);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
            this.spcpFile = "";
            this.sPointTableF();
            this.servicePointCareForm.patchValue({
              cStatus: '',
              cTaskNm: '',
              cDataType: '',
              cCamera: false,
              cRangeMin: '',
              cRangeMax: '',
              nMaxLen: '',
              cDataMap: false,
              cAlertMin: '',
              cAlertMax: '',
              lovValue: '',
              mapData: ''
            });

            this.clearFormConditions();
          }
          if (this.response['status'] == 204) {
            this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added Successfully' });
          }
          this.callPointTableData(this.servicePointCare);
        }
      );
    }
    

  }
 
  servicePointFinallArr:any[] = [];
 
  onRemoveChip(parentInd,childInd,spmInd){
    if(this.servicePointFinallArr[parentInd]['serviceArr'].length > 0){
      this.servicePointFinallArr[parentInd]['serviceArr'].splice(childInd,1);
    }else{
      this.servicePointFinallArr.splice(parentInd);
    }

    this.servicePointMappArr.splice(spmInd);
   
    
  }
  onAddF(id, mapData) {
   // this.addPointMap = [];
    let userId = localStorage.getItem("empID");
    this.servicePointTable = true;
    let mapDataVal = mapData['value'];

    mapDataVal.forEach(element => {
      let srvPointId = element['val'];
       if(!Utils.checkKeyValPairServPoint(this.servicePointMappArr,srvPointId,id.value['name'])){
        this.servicePointMappArr.push({ "nSrvPointid": srvPointId, "srvWithSrvPoint":element['txt'],"nUserid": userId, "lovValue": id.value['val'], "lovName":id.value['name'] });

        // this.addPointMap.push({
        //   id: id.value['name'],
        //   mapData: element['txt'],
        // });
      }
  

    });


    //  console.log(this.servicePointMappArr);
    this.formatAccordion();

    
  }

  formatAccordion(){
    //console.log(this.servicePointMappArr);
    this.servicePointMappArr.forEach((elem,ind) => {
      let tmpElem = {};
      let tmpParentElem = {};
      tmpParentElem['name'] = elem['lovValue'];
      tmpParentElem['serviceArr'] = [];
      
      tmpElem['spmIndex'] = ind;
      tmpElem['nSrvPointid'] = elem['nSrvPointid'];
      tmpElem['nUserid'] = elem['nUserid'];
      tmpElem['lovValue'] = elem['lovValue'];
      tmpElem['lovName'] = elem['lovName'];
      tmpElem['srvWithSrvPoint'] = elem['srvWithSrvPoint'];
      let index = null;
      this.servicePointFinallArr.forEach((el,indexes)=>{
        if(el['name'] == elem['lovValue']){
          index = indexes;
          // el['serviceArr'].forEach(element => {
          //   if(element['nSrvPointid'] != elem['nSrvPointid']){
          //     index = ind;
          //   }
          // });
          
         
        }
      });
    //  console.log(index);
      if(index || index == 0){
       // console.log(index);
        let findV:boolean = false;
        this.servicePointFinallArr[index]['serviceArr'].forEach(element => {
          //console.log(element['nSrvPointid'],elem['nSrvPointid']);
            if(element['nSrvPointid'] == elem['nSrvPointid']){
             // this.servicePointFinallArr[index]['serviceArr'].push(tmpElem);
             findV = true;
            }
          });

          if(!findV){
            this.servicePointFinallArr[index]['serviceArr'].push(tmpElem);
          }
      
      }else{
      //  console.log(tmpElem);
        tmpParentElem['serviceArr'].push(tmpElem);
        this.servicePointFinallArr.push({...tmpParentElem});
        //console.log(tmpParentElem);
        tmpParentElem['serviceArr'] = [];
      }

      // if(elem['lovValue'] == 'NO'){
      //   this.servicePointMapNo.push(tmpElem);
      // }
    });

    //console.log(this.servicePointFinallArr);

   

  }
  onDelF(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.addPointMap.splice(id);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Remove Successfully' });
        this.sPointTableF();
      },
      reject: () => {
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
      }
    })
  }

  // filter Table data

  onKeypressFilterF() {
    this.serviceDesignService.filterData(this.searchBox).subscribe(
      res => {
        this.searchData = res['data'];
        this.manageJobData = this.searchData;
        //console.log("filter Data",this.manageJobData)
        // this.searchAll.filter((eve)=>{
        //   eve.cTaskNm.toLowerCase().includes(event)

        // })
      }
    );
  }
  showPreviewDialog() {
    this.serviceDesignService.getPreviewData(this.currentServicePointId).subscribe((res) => {
      this.prevArr = res['data'];
      if (this.prevArr.length > 0) {
        this.displayPreviewBasic = true;

      } else {
        this.displayPreviewBasic = false;
      }
      //console.log(this.prevArr);
    }, (error) => {

    });


  }
  previewDialog() {
    this.displayPreviewBasic = false;
  }

  editSpointcareF(id) {
    const servicePointData = this.servicePoint.filter(e => e.txt == id['cSrvPnt']);
    //console.log('service point', servicePointData)
    const taskStatus = this.taskS.filter(e => e.name == id['cStatus']);
    //console.log('task status', taskStatus);
    const DataType = this.dataType.filter(e => e.name == id['cDataType']);
    //console.log('Data Type', DataType);
    // console.log('Task status', this.taskS);
    //console.log('data type', this.dataType);
    this.editButton = true;
    this.servicePointCareForm.patchValue({
      nTaskid: id['nTaskid'],
      nSrvPointid: servicePointData[0],
      cTaskNm: id['cTaskNm'],
      cDataType: DataType[0],
      cLovval: id['cLovval'],
      cCamera: id['cCamera'],
      cRangeMin: id['cRangeMin'],
      cRangeMax: id['cRangeMax'],
      nMaxLen: id['nMaxLen'],
      cDataMap: id['cDataMap'],
      cAlertMin: id['cAlertMin'],
      cAlertMax: id['cAlertMax'],
      cStatus: taskStatus[0],
      NMapid: id['NMapid'],
      // nSrvPointid:id['nSrvPointid'],
      nUserid: id['nUserid'],
      lovValue: id['lovValue']
    });
  }
  onCancel() {
    //this.servicePointCareForm.reset();
    this.servicePointCareForm.controls['servicePointTaskControl'].reset();
    this.servicePointCareForm.controls['cStatus'].reset();
    this.servicePointCareForm.controls['cTaskNm'].reset();
    this.servicePointCareForm.controls['cDataType'].reset();
    this.servicePointCareForm.controls['cLovval'].reset();
    this.servicePointCareForm.controls['nTaskid'].reset();
    this.servicePointCareForm.controls['cCamera'].reset();
    this.servicePointCareForm.controls['cRangeMin'].reset();
    this.servicePointCareForm.controls['cRangeMax'].reset();
    this.servicePointCareForm.controls['nMaxLen'].reset();
    this.servicePointCareForm.controls['cDataMap'].reset();
    this.servicePointCareForm.controls['cAlertMin'].reset();
    this.servicePointCareForm.controls['cAlertMax'].reset();
    this.servicePointCareForm.controls['lovValue'].reset();
   
    //this.servicePointCareForm.controls['lovValue'].reset();
    this.editButton = false;
    this.separetedValue = false;
    this.showServicePointMappingCheckbox = false;
    this.servicePntTaskDependencies = [];
    this.servicePointMappArr = [];
    this.addPointMap = [];
    this.alertParameter = false;
    this.showAlertMappingRanges = false;
    this.showServicePointMappingDropdown = false;

    this.isTaskDependencyChecked = false;
    this.detailChecked = false;
    


    this.spcpFile = "";
  }

  //  edit table data by id

  editServicePointCarePlan(id, data) {
    console.log(data)
    this.editButton = true;
    this.addPointMap = [];
    this.servicePointTable = false;
    if(data.nSrvPointid != null && data.nTaskSrNo != null){
      this.getTaskDependency(data.nSrvPointid, data.nTaskSrNo);
    }
    //console.log('this is id',id);
    this.serviceDesignService.ServicePointTaskByID(id).subscribe(
      res => {
        let tmpRespData : any[] = [];
        this.editData = res['data'];

       // console.log(this.editData);
        if(this.editData['cDataType'].trim() == 'LOV'){
          this.showServicePointMappingCheckbox = true;

          this.editData['servicePointMap'].forEach((el,ind)=>{
            let tmpObj = {};
            tmpObj['val'] = el['nSrvPointid'].toString();
            tmpObj['txt'] = el['srvWithSrvPoint'];
            tmpRespData.push(tmpObj);
          });
         // console.log(tmpRespData);
          
          this.handleServicePointMapping({"checked":true});
          this.servicePointCareForm.patchValue({
            "lovValue":this.commaSValue[0],
            "mapData":tmpRespData
          });
        }
        if(this.editData['servicePointMap'].length > 0){
          this.pointMapping = true;
          
        }
        this.servicePntTaskDependencies = this.editData['servicePntTaskDependencies'];
        this.spcpFile = this.editData['cImageNm'] ? this.editData['cImageNm']: "";
       
        // console.log(this.editData['nSrvID'])
        // console.log('edit response',this.editData);
        this.servicePointF(undefined, this.editData['nSrvID']);
       // console.log(this.servicePointF(undefined, this.editData['nSrvID']));
       // console.log(this.editData['cDataType'].trim());
        if (this.editData['cDataType'].trim() == "TXT") {
          this.dataValidation = true;
          this.maxLength = true;
        } else {
          this.dataValidation = false;
          this.maxLength = false;
        }
        if (this.editData['servicePointMap'].length > 0) {
          this.showServicePointMappingCheckbox = true;
          this.pointMapping = true;
          this.showServicePointMappingDropdown = true;
          this.servicePointTable = true;
          this.editData['servicePointMap'].forEach((elem) => {
            this.addPointMap.push({
              id: elem['lovValue'],
              mapData: elem['cSrvName']
            });
          });
         // this.servicePointMappArr = this.addPointMap;
         this.servicePointMappArr = this.editData['servicePointMap'];
         this.formatAccordion();
        }
        this.separetedValue = this.editData['cDataType'].trim() == "LOV" ? true : false;
        //this.showServicePointMappingCheckbox = this.editData['srvPtMap'] ? true : false;
        const servData = this.serviceD.filter(e => e.val == this.editData['nSrvID']);
        // const servPointData = this.servicePoint.filter(e=>e.val == this.editData['cSrvPnt']);
        const taskStatusData = this.taskS.filter(e => e.val == this.editData['cStatus']);
        const dataTypeData = this.dataType.filter(e => e.val == this.editData['cDataType'].trim());
        let cameraRequirement = true;
        let dataMap = true;
        if (this.editData['cCamera'] == "t") {
          cameraRequirement = true;
        }
        else {
          cameraRequirement = false;
        }
        if (this.editData['cDataMap'] == 'S') {
          dataMap = true;
          // this.servicePointMapping = 
        }
        else {
          dataMap = false;
        }
        this.servicePointCareForm.patchValue({
          nService: servData[0],
          // nSrvPointid: servPointData[0],
          cStatus: taskStatusData[0],
          cTaskNm: this.editData['cTaskNm'],
          cDataType: dataTypeData[0],
          cCamera: cameraRequirement,
          nMaxLen: this.editData['nMaxLen'],
          cLovval: this.editData['cLovval'],
          nTaskid: this.editData['nTaskid'],
            // nSrvPointid:servPointData[0],
          //  cTaskNm:this.editData['cTaskNm'],
          //  cDataType:DataType[0],
          //  cLovval:this.editData['cLovval'],
          //  cCamera:this.editData['cCamera'],
          //  cRangeMin:this.editData['cRangeMin'],
          //  cRangeMax:this.editData['cRangeMax'],
          //  nMaxLen:this.editData['nMaxLen'],
          cDataMap: dataMap,
          //  cAlertMin:this.editData['cAlertMin'],
          //  cAlertMax:this.editData['cAlertMax'],
          //  cStatus:taskStatus[0],
          // nTaskid: this.editData['nTaskid'],
          // //  NMapid:this.editData['NMapid'],
          //  nUserid:this.editData['nUserid'],
          //  lovValue:commaValue[0]
        });

        // if(this.editData['nSrvID']==2){
        //   console.log('nsrvid',this.editData['nSrvID'])
        //  const servicePointData = this.servicePoint.filter(e=>e.txt==this.editData['cSrvPnt']);
        //  console.log('service point',servicePointData)
        //  const taskStatus = this.taskS.filter(e=>e.name==this.editData['cStatus']);
        //  console.log('task status',taskStatus);
        //  const DataType = this.dataType.filter(e=>e.name==this.editData['cDataType']);
        //  console.log('Data Type',DataType);
        //  const commaValue = this.commaSValue.filter(e=>e.name==this.editData['lovValue'])
        //  // console.log('Task status', this.taskS);
        //   this.reactForm.patchValue({
        //     nSrvPointid:servicePointData[0],
        //    cTaskNm:this.editData['cTaskNm'],
        //    cDataType:DataType[0],
        //    cLovval:this.editData['cLovval'],
        //    cCamera:this.editData['cCamera'],
        //    cRangeMin:this.editData['cRangeMin'],
        //    cRangeMax:this.editData['cRangeMax'],
        //    nMaxLen:this.editData['nMaxLen'],
        //    cDataMap:this.editData['cDataMap'],
        //    cAlertMin:this.editData['cAlertMin'],
        //    cAlertMax:this.editData['cAlertMax'],
        //    cStatus:taskStatus[0],
        //   nTaskid: this.editData['nTaskid'],
        //   //  NMapid:this.editData['NMapid'],
        //    nUserid:this.editData['nUserid'],
        //    lovValue:commaValue[0]
        //   })
        //   console.log(this.editData['cSrvPnt'],)
        // }
      });

  }

  getTaskDependency(NSrvPointid, NTaskSrNo){
    this.service.getTaskDependency(NSrvPointid, NTaskSrNo).subscribe((res:any) =>{
      console.log('data', res.data)
      this.onTaskDataList = res.data
    })
  }





  loadTask(){
    this.serviceDesignService.sPCareList().subscribe((res)=>{
      this.servicePointTaskData = res['data'];
    },(err)=>{

    });
  }

 
}


//NUM , DEC-> enable :->  Range->  min to max , Alert parmaete(normal range) 
// Txt-> enable:-> Max Length
// DAT -> enabled nothing
// Lov-> enable:-> comma separeted value, service mapping checkbox(service point mapping)