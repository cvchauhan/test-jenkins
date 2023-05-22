import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-salary-structure-details',
  templateUrl: './salary-structure-details.component.html',
  styleUrls: ['./salary-structure-details.component.css']
})
export class SalaryStructureDetailsComponent implements OnInit {

  salaryStructureData:any[] = [];
  payHeadData:any[] = [];
  payHeadList:any[] = [];
  nSalId:any;
  amount = 0;
  showBaseFormula:boolean = true;
  isEdit:boolean = false;
  lastCalcSeq:any;
  globalBaseFormulaString:string="";
  globalPreFormulaString:string="";
  typeDatas:any[] = [{"name":"Rate","value":"R"},{"name":"Amount","value":"A"}]
  calFrequency = [
    {name: 'Monthly', code: 'M'},
    {name: 'Quarterly', code: 'Q'},
    {name: 'Half Yearly', code: 'H'},
    {name: 'Yearly', code: 'Y'}
  ];


  attendance = [
    {name: 'Yes', code: 'Y'},
    {name: 'No', code: 'N'}
  ];
  calMethod = [
    {name:'Computed Value',code:'C'},
    {name:'User Defined Value',code:'U'},
    {name:'Fixed Value',code:'F'}
  ];
  calMethodType;
  isFixedValue:boolean = false;
  structureTableData:any[]=[
    {payhead:'HRA',dName:'Amresh',calMethod:'Computed',calFormula:'8'}
  ];
  payHeadForm: FormGroup;
  displayCmpValue:boolean = false;
  payHeadComponents:any[]=[
  ];
  baseCamFormula:any[]=[

  ];

  basePreCamFormula:any[]=[

  ];
  computationFormula:any[]=[{name:'Amresh'}]
  isCompFormula: boolean = false;
  baseFormulaForm:FormGroup;
  basePreFormulaForm:FormGroup;
  constructor(
    private hrservice: HrService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.payHeadForm = this.fb.group({
      eFrom: new FormControl(''),
      ePayHead: new FormControl(''),
      eDisplayName: new FormControl(''),
      eCalFreq: new FormControl(''),
      eOnAttendance: new FormControl(''),
      eCalMethod: new FormControl('')
    });
  }
  baseFormulaString:string="";
  basePreFormulaString:string="";
  isCappingApplied:boolean = false;

  initializeBaseFormulaForm(){
    this.baseFormulaForm = this.fb.group({
      min: [''],
      max: [''],
      val: [''],
      type: [''],
      capping: [0]

    });
  }

  initializeBasePreFormulaForm(){
    this.basePreFormulaForm = this.fb.group({
      min: [''],
      max: ['']

    });
  }

  delRec(index,payHead){

  }


  loadPayHeadComponents(nSalId,nSalSeq){
    this.hrservice.payHeadForCalBySalId(nSalId,nSalSeq).subscribe((res)=>{
      this.payHeadComponents = res['data'];
    },(err)=>{});
  }
  salaryStructureChange(evt){
    this.nSalId = evt['value']['nSalid'];
    this.loadAllPayHeadList(this.nSalId);

    //console.log(evt);
  }
  loadAllPayHeadList(nSalId){
    this.hrservice.getAllPayHeads(nSalId).subscribe((res)=>{
      this.payHeadList = res['data'];
      if(this.payHeadList){
        this.lastCalcSeq = this.payHeadList[this.payHeadList.length - 1];
        this.loadPayHeadComponents(this.nSalId,this.lastCalcSeq['nCalSeq']);
      }
    },(err)=>{});
  }


  submitBaseFormulaForm(baseFormulaForm){
    let baseFormVal = baseFormulaForm.value;
    //console.log(baseFormVal);
    if(this.baseFormulaString){
      this.globalBaseFormulaString = this.baseFormulaString;
    }
    baseFormVal['nparentIndex'] = this.currentPreFormulaIndex;
    this.baseCamFormula.push(baseFormVal);
    this.baseFormulaForm
    this.baseFormulaForm.reset();
    //console.log(this.globalBaseFormulaString);

  }

  submitBasePreFormulaForm(basePreFormulaForm){
    let basePreFormVal = basePreFormulaForm.value;
    if(this.basePreFormulaString){
      this.globalPreFormulaString = this.basePreFormulaString;
    }

    this.basePreCamFormula.push(basePreFormVal);
    this.basePreFormulaForm.reset();
  }


  delFormula(ind){
    this.baseCamFormula.splice(ind,1);
  }

  delPreFormula(ind){
    this.basePreCamFormula.splice(ind,1);
  }
  onClickPlus(heads){
   // console.log(heads);
    let tmpStr = `#${heads.cPayHead}#`;
    this.baseFormulaString = this.baseFormulaString + tmpStr;
   // console.log(this.baseFormulaString);
  }

  onClickPlusPre(heads){
     let tmpStr = `#${heads.cPayHead}#`;
     this.basePreFormulaString = this.basePreFormulaString + tmpStr;
    // console.log(this.baseFormulaString);
   }

  applyCapping(evt){
    if(evt.checked){
      this.isCappingApplied = true;
    }else{
      this.isCappingApplied = false;
    }

  }
  ngOnInit(): void {
    this.getSalaryStructure();
    this.initializeBaseFormulaForm();
    this.initializeBasePreFormulaForm();
    this.getPayHead();
  }

  getSalaryStructure = () => this.hrservice.getSalaryStructure().subscribe((data) => {
    this.salaryStructureData = data['data'];

  });

  getPayHead = () => this.hrservice.payTable().subscribe((data) => {
    this.payHeadData = data['data'];
  });



  checkCalMethod(){
    if(this.calMethodType['code'] =='F'){
      this.isFixedValue = true;
    } else {
      this.isFixedValue = false;
    }

    if(this.calMethodType['code'] == 'C'){
      this.displayCmpValue = true;
    } else {
      this.displayCmpValue = false;
    }
  }

  currSaldid;
  editPayHead(data,i){
    this.isEdit = true;
    this.currSaldid = data['nSaldid'];
    const calFreqF = this.calFrequency.filter(e => e.code == data['cCalFreq']);

    const calMethodF = this.calMethod.filter(e => e.code == data['cCalMethod']);
    const payheadF = this.payHeadData.filter(e => e.nPayhid == data['nPayhid']);
    const cOnAttF = this.attendance.filter(e => e.code == data['cOnAtt']);
    this.payHeadForm.patchValue({
      "eFrom":new Date(data['dEffectDt']),
      "ePayHead":payheadF[0],
      "eDisplayName":data['cDisplayNm'],
      "eCalFreq": calFreqF[0],
      "eOnAttendance":cOnAttF[0],
      "eCalMethod":calMethodF[0]
    });
    this.amount = data['nAmount'];
    if(calMethodF[0]['code'] == 'F'){
      this.isFixedValue = true;
    }else{
      this.isFixedValue = false;
    }
    //console.log(data);
  }

  payBaseCal :any[] = [];
  payHeadCal : any[] = [];



  addPayHead(){


  let tmpBaseCalObj = {  "nPaybcid": 0,
   "nSaldid": 0,
   "nBaseMin": 1,
   "nBaseMax": 999999,
   "cComputeOn": this.globalBaseFormulaString};
   this.payBaseCal = [];
   this.payHeadCal = [];
   if(this.basePreCamFormula.length){
    this.basePreCamFormula.forEach((elem,ind)=>{
      let tmpBaseCalObj = {  "nPaybcid": 0,
      "nSaldid": 0,
      "nBaseMin": elem['min'],
      "nBaseMax":elem['max'],
      "cComputeOn": this.globalBaseFormulaString};
      this.payBaseCal.push(tmpBaseCalObj);
    });
  }else{
    this.payBaseCal.push(tmpBaseCalObj);
  }
  // console.log(this.baseCamFormula);
   this.payHeadCal = []
   this.baseCamFormula.forEach((elem,ind)=>{
    let tmpBCal = {
      "nPhcid": 0,
      "nPaybcid": 0,
      "nPayMin": elem['min'],
      "nPayMax":elem['max'],
      "nValue": elem['val'],
      "cValType": elem['type'],
      "nparentIndex":elem['nparentIndex'],
      "nComputeCap": elem['capping']

    }

    this.payHeadCal.push(tmpBCal)

   });



    let formVal = this.payHeadForm.value;

    let data = {
      "nSaldid": 0,
      "nSalid": this.nSalId,
      "dEffectDt": new Date(formVal['eFrom']).toISOString(),
      "nPayhid": formVal['ePayHead']['nPayhid'],
      "cDisplayNm": formVal['eDisplayName'],
      "cCalFreq": formVal['eCalFreq']['code'],
      "cOnAtt": formVal['eOnAttendance']['code'],
      "cCalMethod": formVal['eCalMethod']['code'],
      "nAmount": this.amount,
      "cBaseCal": this.globalPreFormulaString,
      "cIsDefault": "N",
      "payBaseCal":this.payBaseCal,
      "payHeadCal":this.payHeadCal
    }
    if(this.isEdit){
      data['nSaldid'] = this.currSaldid;
    }





    this.hrservice.addPayheadD(data).subscribe((res)=>{
      if(res['status'] == 200){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
        this.isEdit = false;
        this.payHeadForm.reset();
        this.loadAllPayHeadList(this.nSalId);
      }
    },(err)=>{});

  }

  currentPreFormulaIndex
  addBaseFormula(ind){
    this.currentPreFormulaIndex = ind;
    this.showBaseFormula = true;
  }
  preCondFormula(event){
   // console.log(event.target)

    if(this.isCompFormula == true){
      this.isCompFormula = true;
      this.showBaseFormula = false;
    } else {
      this.showBaseFormula = true;
      this.isCompFormula = false;
    }
  }

  editFormulaData(ind,data){
    console.log(data);
    this.isEdit = true;
    this.basePreCamFormula = [];
    this.displayCmpValue = true;
    let basePreCalc = data['cBaseCal'];
    if(basePreCalc.length > 0){
      this.isCompFormula = true;

      this.basePreFormulaString = basePreCalc;
      data['payBaseCals'].forEach((elem,ind)=>{
        let tmpObj = {}
        tmpObj['min'] = elem['nBaseMin']
        tmpObj['max'] = elem['nBaseMax']
        this.basePreCamFormula.push(tmpObj);
      });

    }else{

      this.isCompFormula = false;
    }

    this.baseFormulaString = data['payBaseCals'][0]['cComputeOn'];

    // data['payHeadCals'].forEach((elem,ind)=>{
    //   let tmpObj = {
    //     "min": data['nPayMin'],
    //     "max":data['nPayMax'],
    //     "val": data['nValue'],
    //     "type": data['cValType'],
    //     "capping":data['nComputeCap'],
    //     "nparentIndex": 0
    // }

    // this.baseCamFormula.push(tmpObj);
    // });

  }

}
