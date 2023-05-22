import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { debug } from 'console';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { AccountService } from 'src/app/account-flow/account.service';
import Utils from 'src/app/helpers/utils';
import { ServicesService } from '../services.service';
import { CodeMasterService } from 'src/app/shared-services/code-master.service';
import * as moment from 'moment';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { DialogService } from 'primeng/dynamicdialog';
import { AddUpdateManageJobComponent } from '../add-update-manage-job/add-update-manage-job.component';
import { EmployeeService } from 'src/app/hr-flow/employee/employee.service';

interface PriorityType {
    priority: string;
    code: string;
};
@Component({
    selector: 'app-job-approval',
    templateUrl: './job-approval.component.html',
    styleUrls: ['./job-approval.component.css']
})
export class JobApprovalComponent implements OnInit, AfterViewInit {
    manageJobServiceHeader: string = "";
    isDisabledAllControls: boolean = false;
    @ViewChild('repeatsOn') repeatsOn: ElementRef;
    @ViewChild('dayOfMonth') dayOfMonth: ElementRef;
    @ViewChild('nAdRate') nAdRate: ElementRef;
    @ViewChild('startTime') startTime: ElementRef;
    resService: any;
    disableRateUnit: boolean = true;
    disableApproveReject: boolean = true;
    btnTextCalculate: string = 'Calculate Service Advance';
    editResponseById: any;
    modeOfPaymentD: any;
    isTime: boolean = false;
    globalRateData: any = null;
    showNextFields: boolean = false;
    isChecked: boolean;
    editButton: boolean = false;
    patientId: number;
    skillItem: any;
    stTime: any = null;
    itemDelivery = { "name": "Not Permitted", "val": "N" };
    customerTxt: string;
    genderData: any = [
        { "name": "Male", "val": "M" },
        { "name": "Female", "val": "F" },

    ];

    itemDeliveryData: any = [
        { "name": "Permitted", "val": "Y" },
        { "name": "Not Permitted", "val": "N" },

    ];

    showSelfAssigned: boolean = false;
    showEndDate: boolean = false;
    NSrvPointid: any = null;
    rateNotMandatory: boolean = false;
    installationCharges = 0;
    nDeliveryCharge;
    diagnosisData: any = [];
    selfAssigned: boolean = false;
    itemRate: any;
    showServiceSkillgroup: boolean = true;
    showJobTable: boolean = false;
    showConsumableItemsTable: boolean = false;
    displayBasic: boolean = false;
    ledgerForm: FormGroup = this.fb.group({
        group: [{ "val": "11", "txt": "Sundry Debtors" }, [Validators.required]],
        ledgerName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        contactperson: ['', [Validators.required]],
        mobile: ['', [Validators.required]]
    })

    patientForm: FormGroup = this.fb.group({
        patientName: ['', [Validators.required]],
        age: ['', [Validators.required]],
        sex: ['', [Validators.required]],
        diagnosis: ['', [Validators.required]],
        height: ['', [Validators.required]],
        weight: ['', [Validators.required]],
    })
    patient: any;
    item: any;
    serviceTy: string = "";
    rateData: any[] = [];


    nTotalService: number;
    nTotalSecurity: number;

    servicePointRateData: any[] = [];
    itemData: any;
    sSkillsItemData: any;
    globalnItemid: any;
    submitted = false;
    manageUnitData: any;
    serviceId: any;
    patientData: any;
    addPointMap = [];
    public SelStartddl: any;
    position: string;
    minimumDate = new Date();
    RateId: any;
    searchData: any;
    MobileNo: any;
    searchAddress: any;
    customerData: any;
    searchCustomer: string = "";
    search: string = "";
    jobApprovalData: any[] = [];
    invalidDates: Array<Date>;
    patientDialog: boolean = false;
    diagnosisDialog: boolean = false;
    frequency: string = "Days"
    globalcategId: any;
    latLong: string = null;
    equipData: any;
    sSkills: any[] = [];
    unitData: any[] = [];
    billingMode: any[] = [];
    getData: any;
    sTableList: any[];
    serviceData: any;
    branchData: any;
    formDate: any = null;
    toDate: any;
    branchId: any = {};
    disableItemDeliveryDropdown: boolean = true;
    manageJobData: any[] = [];
    categoriesData: any[] = [];
    groupLedgerData: any[] = [];
    public currentUser: any;
    public formsGroup: FormGroup;
    public response: any;
    public priorities: PriorityType[];
    public value: Date;
    public value1: Date;
    public priority: any[];
    public shift: any[];
    public manageJob = [{ name: 'Data' }];
    public manageJobDialog: boolean = false;
    public manageService: any[];
    public dJobDate: any;
    public srvType: any[];
    public selectSrv: any[];
    public qty: number = 42723;
    public unit: any[];
    currJobId: number = 0;
    currSrvSkillJobDid: number = 0;
    nJobId: number;



    tmpSrvSkills: any[] = [];
    tmpSrvPoints: any[] = [];
    tmpSrvItems: any[] = [];
    consumableItems: any[] = [];
    public nSrvSkillid: any;
    public rateIdGl: any = null;
    public StartTimeddl: any[];
    showModeOfPaymentError: boolean = false;
    public repeat: any;
    public serviceSkillsItems: any;
    public serviceTypeV: any;
    public unitV: any;
    unitVa: any;
    public frequencyV: any;
    disableRate: boolean = false;
    disableBillingMode: boolean = false;
    servSkillModel: any;
    jobServPoint: any[] = [];
    public disabledServiceSkills: boolean = false;
    jobSkillsArr: any[] = [];
    secDepositActual: any;
    secDepositTotal: any;

    // public startTime: any;
    public hours: any;
    public startingAt: any;

    public start_at: Date;
    public end_at: Date;
    public products = [{ name: 'servicetable' }];
    public weeklyRepeate: [
        { name: 'Monday', code: 'mo' },
        { name: 'Tuesday', code: 'tu' }
    ];
    public cJobtype: string;
    public weekDaysList: any = [];
    public weekDays;
    public adDiscount: any = null;
    public nADRate: any = null;
    public showWeekDaysList: boolean = false;
    public showNumberBox: boolean = true;
    public customerDialog: boolean = false;
    public addJobTable: any[];
    public filteredGroups: any[];
    public customer: any[];
    public date8: any;
    public IsStarTimeDisabled: boolean = false;
    // pagingnation
    first = 0;

    rows = 10;

    public isMachine: boolean = false;
    public servType: any = 1;

    public freqQty: number = 0;
    public cWeekDys: string = "0";
    public jobService: any[] = [];
    public jobServiceTable: any[] = [];
    public srvSkillsData: any[] = [];
    servicePointData: any[] = [];
    hideAdd: boolean = false;
    hideServiceFields: boolean = false;
    cusHeight: number;
    totalAmount = 0;
    totalSecurityAmount = 0;
    totalPayable = 0;
    totalServiceAdvance: any = 0;
    total = 0;
    showDelhiveryCharge: boolean = false;
    departMentFormGroup: FormGroup;
    departMentCatId = 32;
    departmentData: any[] = [];
    public customerLoader: boolean = false;
    showInstallationCharge: boolean = false;
    endMinDate = new Date();
    endMaxDate = new Date();
    StartminDate = new Date();
    public BillMode: any;
    srvctg: String = '';
    showServiceSkillsTable: boolean = false;
    StartmaxDate = new Date();
    addServiceKitButtonDisabled: boolean = false;
    isManageJobEdit: boolean = false;
    modeOfPayment = [
        { name: 'Prepaid', code: 'P' },
        { name: 'Cash on Delivery', code: 'C' }
    ];
    addressData: any[];
    serviveJobId:any = null;
    displayModal: boolean = false;
    serviveJobStatus:any = null;
    constructor(private fb: FormBuilder,
        private servicesService: ServicesService,
        private primeNGConfig: PrimeNGConfig,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private accountService: AccountService,
        private codeMasterService: CodeMasterService,
        public dialogService: DialogService,
        private employeeService : EmployeeService

    ) {
        this.priorities = [{ code: '1', priority: 'High' }, { code: '2', priority: 'Normal' }, { code: '3', priority: 'Low' }]
        this.priority = [
            { name: 'Emergancy', code: 'Em' },
            { name: 'Normal', code: 'Nr' },
            { name: 'Other', code: 'Or' }
        ]
        this.shift = [
            { name: 'Select', code: '' },
            { name: 'Day', code: 'D' },
            { name: 'Night', code: 'N' },
            { name: 'Evening', code: 'Ev' },
            { name: 'Mid Night', code: 'Mn' }
        ]
        this.manageService = [

            { name: 'Days', code: 'D' },
            { name: 'One Time', code: 'O' },
            { name: 'Monthly', code: 'M' },
        ]
        this.srvType = [

            { name: 'Machine', code: '1' },
        ]
        this.selectSrv = [
            { name: 'OT', code: '' },
            { name: 'Monthly', code: 'D' },
            { name: 'Quater', code: 'N' },
            { name: 'Annual', code: 'Ev' },
        ]
        this.unit = [
            { name: 'OT', code: '' },
            { name: 'Monthly', code: 'D' },
            { name: 'Quater', code: 'N' },
            { name: 'Annual', code: 'Ev' },
        ]
    }

    loadPatientData(query?, nAcid?) {
        this.servicesService.loadPatientData(query, nAcid).subscribe((res) => {
            this.patientData = res['data'];
            if (this.isManageJobEdit) {

                const patient = this.patientData.filter(e => e.cPatientNm == this.editResponseById['patient']);
                this.formsGroup.patchValue({
                    patient: patient[0]
                });
            }
            //  console.log(this.patientData);
        }, (err) => { });

    }
    searchJobApproval() {
        //console.log(this.formDate);
        let branchId = this.branchId.val;
        let frDate = Utils.formatDate(this.formDate);
        let toDate = Utils.formatDate(new Date(this.toDate));
        //console.log(toDate);

        this.accountService.getJobApprovaltable(branchId, frDate, toDate).subscribe(
            res => {
                //  console.log(res);
                this.jobApprovalData = res['data'];
                //console.log(this.jobApprovalData, 'Table Data');
            }
        );
    }
    bindStartTime() {
        this.StartTimeddl = [
            { name: '08:00', code: '08:00:00' },
            { name: '20:00', code: '20:00:00' },
            { name: 'Custom', code: 'Custom' },
        ]
    }
    ngOnInit() {

        this.bindStartTime();
        this.isChecked = false;

       // this.categoriesData = JSON.parse(localStorage.getItem("FILLCODEDATA"));
       this.employeeService.getctgData(15).subscribe((res:any)=>{
        this.categoriesData = res.data
       })

        // this.loadServicePoints();
        this.getServiceSkillsCombo();
        this.addManageJob();
        this.BranchLocation();
        this.servicedropdownF();
        this.getComboF();
        setTimeout(() => {
            this.selectCustomerF("");
        }, 1000);




        this.addJobTable = [
            { type: 'Machine', service: 'BP Instrument', unit: '180 per day', disc: '0', amount: '3040.00', deposit: '', total: '', discs: '' },
            { type: 'Machine', service: 'Air-bed', unit: '100 per day', disc: '', amount: '2040.00', deposit: '', total: '', discs: '' },
            { type: 'Man', service: 'Nursing Cardioc', unit: '180 per day', disc: '', amount: '180.00', deposit: '', total: '', discs: '' }
        ];


        let d = new Date();
        let finalDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        let newDate = new Date(d);
        let finalFromDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
        this.formDate = finalFromDate;
        this.toDate = new Date(finalDate);
        this.popupForm();
        this.dateToSend = this.formatDate(d);
        this.StartminDate.setDate(d.getDate() - 1);
        this.StartmaxDate.setDate(d.getDate() + 15);
        let setTime = new Date();
        setTime.setHours(8);
        setTime.setMinutes(0);
        setTime.setSeconds(0);
        this.stTime = setTime;
    }

    @HostListener('window:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.manageJobDialog = false;
        this.customerDialog = false;
        this.patientDialog = false;
        this.diagnosisDialog = false;
    }

    showPatientDialog() {
        this.patientDialog = true;
        this.loadDiagnosisData();
    }

    showDiagnosisDialog() {
        this.diagnosisDialog = true;
    }

    selfAssignedVal(evt) {
        if (evt.checked) {
            this.selfAssigned = true;
        } else {
            this.selfAssigned = false;
        }
    }
    checkStartTime(event: any) {


        // if (event.checked) {
        //     this.isTime = true;
        // }
        // else {
        //     this.isTime = false;
        // }
    }

    filterGroup(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side

        let query = event.query;
        let filtered: any[] = [];
        for (let i = 0; i < this.groupLedgerData.length; i++) {
            let group = this.groupLedgerData[i];
            if (group.txt.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(group);
            }
        }

        this.filteredGroups = filtered;

    }


    filteredDiagnosisData: any[] = [];
    filterGroupDiagnosis(event) {
        //let tmpData = this.diagnosisData;

        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side

        let query = event.query;
        let filtered: any[] = [];
        for (let i = 0; i < this.diagnosisData.length; i++) {
            let group = this.diagnosisData[i];
            if (group.codeName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(group);
            }
        }

        this.filteredDiagnosisData = filtered;

    }
    getGroupLedger() {
        this.servicesService.getGroupLedger().subscribe((res) => {
            this.groupLedgerData = res['data'];
            // console.log(this.groupLedgerData);
        }, (error) => {

        });
    }
    // Edit Manage Job
    public selectedStartDate;
    onStartDate() {
        let minEndDate = new Date(this.selectedStartDate);
        this.endMinDate.setDate(minEndDate.getDate() - 0);
        this.endMaxDate.setDate(minEndDate.getDate() + 60);
    }
    // Edit Table Data
    disableInstDeliver: boolean = false;
    disableModeOfPayment: boolean = false;
    currentSrvCategory;
    public editJobId;
    editJobApproval(id, custName, Jobno) {
        let setTime = new Date();
        setTime.setHours(8);
        setTime.setMinutes(0);
        setTime.setSeconds(0);
        this.stTime = setTime;
        this.customerLoader = true;
        this.manageJobDialog = true;
        this.editButton = true;
        this.cusHeight = 1000;
        this.currJobId = id;
        this.tmpSrvItems = [];
        this.tmpSrvPoints = [];
        this.tmpSrvSkills = [];
        this.isChecked = false;
        this.discountRatePerSkill = "";
        this.discountRateSkill = "";
        this.machineRateId = "";
        this.isManageJobEdit = true;
        this.selectCustomerF("");

        this.servicesService.editManageJobById(id).subscribe(
            res => {
                this.editResponseById = res['data'];
                this.tmpSrvItems = res['data']['srvItems'];

                this.tmpSrvPoints = res['data']['srvPoints'];
                this.tmpSrvSkills = res['data']['srvSkills'];
                this.consumableItems = res['data']['consumableItems'];
                this.consumableItems.forEach((element) => {
                    element['nadRate'] = element['nRate'];
                    element['nDiscRatePer'] = 0;
                });
                if (this.consumableItems.length > 0) {
                    this.showConsumableItemsTable = true;
                }
                else {
                    this.showConsumableItemsTable = false;
                }
                this.currSrvSkillJobDid = this.tmpSrvSkills.length > 0 ? this.tmpSrvSkills[0]['nJobdid'] : 0;

                this.editJobId = '/' + Jobno;

                this.jobService = [];
                if (this.tmpSrvItems.length > 0) {
                    this.tmpSrvItems.forEach((el, ind) => {
                        el['ind'] = ind;
                        this.jobService.push(el);
                    });
                }

                if (this.tmpSrvPoints.length > 0) {
                    this.tmpSrvPoints.forEach((el, ind) => {
                        el['ind'] = ind;
                        this.jobService.push(el);
                    });
                }
                if (this.jobService.length > 0) {
                    this.showJobTable = true;
                } else {
                    this.showJobTable = false;
                }
                // if (this.jobService.length > 0 || this.tmpSrvSkills.length > 0) {
                //     this.disabledSave = false;
                // }
                // else {
                //     this.disabledSave = true;
                // }
                this.serviceId = this.editResponseById['nSrvid'];
                this.dateToSend = this.formatDate(new Date(this.editResponseById['dJobDate']));
                // console.log(this.customerData);
                //console.log('edit job approval response',this.editResponseById);
                this.loadPatientData("", this.editResponseById['nAcid']);
                const service = this.serviceData.filter(e => e.txt == this.editResponseById['srvName']);
                const billingMode = this.billingMode.filter(e => e.name == this.editResponseById['billMode']);
                const customer = this.customerData.filter(e => e.cLedgerNm == this.editResponseById['cCustNm']);



                this.currentUser = customer[0];
                this.customerId = customer[0]['nAcid'];
                this.getAddress();
                // console.log(patient);
                const date = new Date(this.editResponseById['dJobDate']);
                date.setDate(date.getDate() + 15);
                this.formsGroup.patchValue({
                    dJobDate: new Date(this.editResponseById['dJobDate']),
                    nSrvid: service[0],
                    nBillMode: billingMode[0],
                    nAcid: this.currentUser['nAcid'],
                    // dJobEndDate: new Date(this.editResponseById['dJobSrvEnd']),
                    dJobEndDate: date,
                });
                this.srvctg = service[0].srvCtg;
                this.endDateToSend = this.formatDate(date);
                this.proceed(0);
                if (this.tmpSrvItems.length > 0) {
                    this.showJobTable = true;
                }
                else {
                    this.showJobTable = false;
                }
            }
        )


        setTimeout(() => {
            this.customerTxt = this.editResponseById['cCustNm'].toLowerCase();
            if (this.tmpSrvSkills.length > 0) {
                this.showServiceSkillsTable = true;
                this.tmpSrvSkills.forEach((element) => {
                    element['RateUnitName'] = String(Number(element["rate"])) + '-' + element["unitName"];
                    const freqD = this.manageService.filter(e => e.code == element["nJobFrq"]);
                    if (freqD.length > 0) {
                        element['FrequencyName'] = freqD[0].name;
                    }
                });
                this.tmpSrvItems.forEach((element) => {
                    if (element['cSrvType'] == 'Machine') {
                        this.showDelhiveryCharge = true;
                    } else {
                        this.showDelhiveryCharge = false;
                    }
                });
            }
            else {
                this.showServiceSkillsTable = false;
            }
            // console.log(this.editResponseById);
            // console.log(this.customerTxt);
            const s = this.StartTimeddl.find(e => e.name == '08:00');
            this.SelStartddl = s;
            this.IsStarTimeDisabled = false;
            this.customerLoader = false;
        }, 1000);
    };


    editJobServiceData(tmpData) {
        const formValues = this.formsGroup.value;
        let userId = localStorage.getItem('empID');
        let formData = {
            "nJobid": this.nJobId,
            "nSrvid": formValues['nSrvid']['val'],
            "dJobDate": this.dJobDate.split("T00")[0],
            "nBillMode": formValues['nBillMode']['serialNo'],
            "nAcid": this.currentUser['nAcid'],
            "cCustNm": this.currentUser['cLedgerNm'],
            "patient": this.patient,
            "cAddress": this.currentUser['addresses'][0]['cAddress1'],
            "cMobile": this.currentUser['addresses'][0]['cMobile'],
            "cLatLong": this.currentUser['addresses'][0]['cLatLong'],
            "nUserid": userId,
            "dJobSrvEnd": this.endDateToSend,
            "nBranchId": +this.branchId['val'],
            'nAddrid': formValues['nAddress']['nAddrid'],
            "sentForApproval": this.editResponseById['sentForApproval'],
            "nTotalService": 0,//this.nTotalService,
            "nTotalSecurity": 0,// this.nTotalSecurity,
            "nAdvanceAmt": this.totalServiceAdvance,
            "jobService": this.resService
        }

        this.accountService.updateJob(formData).subscribe((res) => {
            this.accountService.approveJob(tmpData).subscribe((data) => {
                // console.log(data);
                this.showSuccess(data['msg']);

                this.manageJobDialog = false;
                this.searchJobApproval();

            }, (err) => {

            });

        }, (err) => {

        });



    }
    ChangeStartZone(evt: any) {
        if (evt.value.name == "Custom") {
            this.IsStarTimeDisabled = true;
        }
        else {
            if (evt.value.name == "08:00") {
                let stTime1 = new Date();
                stTime1.setHours(8);
                stTime1.setMinutes(0);
                stTime1.setSeconds(0);
                this.stTime = stTime1;
            }
            else if (evt.value.name == "20:00") {
                let stTime1 = new Date();
                stTime1.setHours(20);
                stTime1.setMinutes(0);
                stTime1.setSeconds(0);
                this.stTime = stTime1;
            }
            this.IsStarTimeDisabled = false;
        }
    }

    totalInstallationCharges = 0;
    updateTotalValues() {
        this.secDepositActual = 0;
        this.secDepositTotal = 0;
        this.totalInstallationCharges = 0;
        this.tmpSrvItems.forEach(element => {
            this.secDepositActual = this.secDepositActual + element['nSecurity'];
            this.secDepositTotal = this.secDepositTotal + element['nadSecurity'];
            if (element.hasOwnProperty('nInstallationCharge')) {
                this.totalInstallationCharges = Number(this.totalInstallationCharges) + Number(element['nInstallationCharge']);
            }

        });



    }

    calcServiceAdvance(evt) {
        this.totalServiceAdvance = evt.target.value;

        //  this.total = this.total - evt.target.value;
        this.total = parseInt(this.secDepositTotal) + parseInt(this.totalServiceAdvance);
    }

    calcServ() {
        if (this.btnTextCalculate == "Calculate Service Advance") {
            this.isDisabledAllControls = true;
            this.disableApproveReject = false;
            this.formsGroup.disable();
            this.btnTextCalculate = "Edit Calculate Service Advance";
        }
        else if (this.btnTextCalculate == "Edit Calculate Service Advance") {
            this.isDisabledAllControls = false;
            this.disableApproveReject = true;
            this.formsGroup.enable();
            this.btnTextCalculate = "Calculate Service Advance";
        }
    }

    EnableDisableServiceSkillsAddButton() {
        if (this.servSkillModel == null || this.showMonthRepeatError == true || this.stTime == null || this.repeatVal == null || (this.srvctg == 'INTERNAL SERVICE' && this.tmpSrvSkills.length == 1)) {
            this.disabledServiceSkills = true;
        }
        else {
            this.disabledServiceSkills = false;
        }
    }



    ApproveJob() {
        // console.log(this.modeOfPayment);
        if (!this.modeOfPaymentD && this.servCtg == "EXTERNAL SERVICE") {
            this.showModeOfPaymentError = true;
            return;
        } else {
            this.showModeOfPaymentError = false;
        }
        let cStatus;
        if (this.servCtg == "EXTERNAL SERVICE") {
            if (this.modeOfPaymentD['code'] == "P") {
                cStatus = "A";
            } else {
                cStatus = "E";
            }

        } else {
            cStatus = "R";
        }

        let tmpData = { "nJobid": this.nJobId, "cStatus": cStatus };
        this.submitManageJob(tmpData);
        this.editJobServiceData(tmpData);
    }

    rejectJob() {
        let tmpData = { "nJobid": this.nJobId, "cStatus": "Z" };
        this.accountService.approveJob(tmpData).subscribe((data) => {
            //console.log(data);

            this.manageJobDialog = false;
            this.searchJobApproval();

        }, (err) => {

        });
    }

    closePopUp() {
        this.manageJobDialog = false;

    }




    addManageJob() {
        this.formsGroup = this.fb.group({
            nSrvid: new FormControl('', [Validators.required]),
            dJobDate: new FormControl(this.dJobDate, [Validators.required]),
            dJobEndDate: [],
            customer: [],
            patient: [],
            nAddress: [],
            endDate: new FormControl(''),

            nBillMode: new FormControl('', [Validators.required]),
            //  nSrvSkillid: new FormControl('', [Validators.required]),
            // nJobFrq: new FormControl('', [Validators.required]),
            nQty: new FormControl(''),
            nFrqQty: new FormControl(''),
            cWeekDys: new FormControl('', [Validators.required]),
            dStartTm: new FormControl(''),
            // dStartTm: new FormControl(this.dJobDate, [Validators.required]),
            dEndTm: new FormControl(''),
            cDayMonth: new FormControl(''),
            cweekly: new FormControl(''),
            cJobtype: new FormControl(''),
            cCustNm: new FormControl(''),
            cMobile: new FormControl('', [Validators.required, Validators.pattern("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$")]),
            cAddress: new FormControl('', [Validators.required]),
            nUserid: new FormControl('1'),
            cLatLong: new FormControl(''),
            nAcid: new FormControl('', [Validators.required]),

            serviceKitGroup: this.fb.group({
                nItemid: ['', [Validators.required]],
                servTypeD: [''],
                nRateId: ['', [Validators.required]],
                nRateNotId: [''],
                nHour: ['', [Validators.required]],
                nSrvSkillid: ['', [Validators.required]],
                nSrvPoint: [null],
                nJobFrq: ['', [Validators.required]],
                startTime: ['', [Validators.required]],
                jobDuration: ['', [Validators.required]],
                dayOfMonth: [0],
            }),
            nBranchId: new FormControl('', [Validators.required]),
            nJobid: new FormControl('')
        });


    }


    get formControls() {
        return this.formsGroup.controls;
    }

    get serviceKitForm() {
        return this.formsGroup.controls.serviceKitGroup as FormGroup;
    }

    disabledRepeat: boolean = false;

    finalRepDay;
    showMonthRepeatError: boolean = false;
    repeatVal = null;
    repeatFunc(evt) {

        //let evVal = evt.target.value;
        this.repeatVal = evt;
        let currFreq = this.frequencyV['code'];
        switch (currFreq) {
            case 'D':
                this.finalRepDay = Math.ceil(this.totalDateDifference / evt);
                this.showMonthRepeatError = false;
                this.EnableDisableServiceSkillsAddButton();
                break;
            case 'M':
                let totalMonth = Math.ceil(this.totalDateDifference / 30);
                if (evt > totalMonth) {
                    this.showMonthRepeatError = true;
                    this.EnableDisableServiceSkillsAddButton();
                } else {
                    this.showMonthRepeatError = false;
                    this.EnableDisableServiceSkillsAddButton();
                }
                this.finalRepDay = Math.ceil(this.totalDateDifference / evt);
                break;
            default:
                this.showMonthRepeatError = false;
                this.EnableDisableServiceSkillsAddButton();
                break;
        }



        //   console.log(evVal);
        if (evt) {
            //this.addServiceKitButtonDisabled = false;
        } else {
            //this.addServiceKitButtonDisabled = true;
        }
        this.freqQty = evt;

        if (evt && currFreq) {
            //this.disabledSave = false;
        } else {
            //this.disabledSave = true;
        }

        // console.log(evt.target.value);
    }

    // post manage job
    jobSrvSkillArr: any[] = [];
    showJobServiceKitError: boolean = false;
    onChangeRate() {
        if (!this.discountRatePerSkill) {
            this.discountRatePerSkill = 0;
            this.discountRateSkill = this.globalRateData.name.split("-")[0];
        } else {
            let rateD = this.globalRateData.name.split("-")[0];
            let discPer = (this.discountRatePerSkill * rateD) / 100;
            this.discountRateSkill = rateD - discPer;
        }
        // this.calcServiceAmount();
    }
    calcServiceAmount() {
        //this.totalDateDifference = toDate.diff(fromDate, 'days') + 1;
        let totalServicePoint = 0;
        let totalMachineAmount = 0;
        this.finalRepDay = this.finalRepDay ? this.finalRepDay : 1;
        this.jobService.forEach((elem, ind) => {
            if (elem['cSrvType'] == 'Machine') {
                totalMachineAmount = totalMachineAmount + Number(elem['nadRate']);
            }
            else {
                totalServicePoint = totalServicePoint + Number(elem['nadRate']);
            }
        });

        if ((!this.discountRateSkill || Number.isNaN(this.discountRateSkill)) && this.globalRateData) {
            this.discountRateSkill = this.globalRateData.name.split("-")[0];
        }

        let finalMachineAm = totalMachineAmount * this.totalDateDifference;
        let totalSKillAmount = 0;
        if (this.discountRateSkill) {
            totalSKillAmount = (this.discountRateSkill + totalServicePoint) * this.finalRepDay;
        } else {
            totalSKillAmount = totalServicePoint * this.finalRepDay;
        }

        let finalServiceAdvanceAmount = finalMachineAm + totalSKillAmount;

        this.totalServiceAdvance = finalServiceAdvanceAmount;
        let totalRateCounsumableItems = 0;
        this.consumableItems.forEach((elem, ind) => {
            totalRateCounsumableItems = totalRateCounsumableItems + Number(elem['nRate']);
        });
        this.totalServiceAdvance = this.totalServiceAdvance + totalRateCounsumableItems;

        this.secDepositTotal = 0;
        this.jobService.forEach((el, ind) => {
            let per = el['nDiscPerSec'];
            let sec2 = el['nSecurity'];
            if (per == 0 || per == "") {
                this.secDepositTotal = this.secDepositTotal + sec2;
            }
            else {
                this.secDepositTotal = this.secDepositTotal + el['nDiscAmtSec'];
            }
        });
    }
    submitManageJob(tmpData) {
        // this.calcServiceAmount();
        // this.saveServSkillFunc();
        if (this.billMS == 2 && this.jobService.length < 1) {
            this.showJobServiceKitError = true;
            return false;
        } else {
            this.showJobServiceKitError = false;
        }
        const formValues = this.formsGroup.value;
        //console.log(formValues);

        let formData = {};

        formData['nAdvanceAmt'] = this.totalServiceAdvance;
        let userId = localStorage.getItem('empID');
        formData['nSrvid'] = formValues['nSrvid']['val'];
        formData['dJobDate'] = this.dateToSend;
        formData['dJobSrvEnd'] = this.formatDate(formValues['dJobEndDate']);
        formData['nBillMode'] = formValues['nBillMode']['serialNo'];
        formData['cMobile'] = this.currentUser['addresses'][0]['cMobile'];
        formData['nAcid'] = formValues['nAcid'];
        formData['nAddrid'] = formValues['nAddress']['nAddrid'];
        formData['nJobid'] = this.currJobId;
        formData["cCustNm"] = this.currentUser['cLedgerNm'];
        formData["cAddress"] = this.currentUser['addresses'][0]['cAddress1'];
        formData['nUserid'] = userId;
        formData['cLatLong'] = this.currentUser['addresses'][0]['cLatLong'];
        formData['nBranchId'] = +this.branchId['val'];
        formData['selfAssigned'] = this.selfAssigned;
        formData['srvSkills'] = this.tmpSrvSkills;
        formData['srvItems'] = this.tmpSrvItems;
        formData['srvPoints'] = this.tmpSrvPoints;
        formData['cStatus'] = tmpData['cStatus'];
        formData['nInstallationCharge'] = this.totalInstallationCharges;
        formData["sentForApproval"] = this.editResponseById['sentForApproval'];
        formData["nTotalService"] = this.totalServiceAdvance;//this.nTotalService,
        formData["nTotalSecurity"] = this.secDepositTotal;// this.nTotalSecurity,
        //   formData["nAdvanceAmt"] = this.total;//this.totalServiceAdvance,
        formData['nDeliveryCharge'] = this.nDeliveryCharge;
        formData['CItemDelivery'] = this.itemDelivery['val'];
        formData['nPatientid'] = formValues['patient']['nPatientid'] ? formValues['patient']['nPatientid'] : this.patientId;


        this.accountService.updateJob(formData).subscribe((res) => {
            this.accountService.approveJob(tmpData).subscribe((data) => {
                // console.log(data);
                this.showSuccess(data['msg']);

                this.manageJobDialog = false;
                this.modeOfPaymentD = null;
                this.disableApproveReject = true;
                this.disableModeOfPayment = false;
                this.searchJobApproval();

            }, (err) => {

            });

        }, (err) => {

        });




        // this.servicesService.editJob(formData).subscribe(res => {
        //     this.response = res;
        //     // console.log('Manage Job', res);
        //     if (this.response['status'] == 200) {
        //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successfull' });
        //         this.formsGroup.reset();
        //         this.editButton = false;
        //         this.manageJobDialog = false;

        //         this.searchManageJobF();
        //     }
        //     if (this.response['status'] == 204) {
        //         //  this.messageService.add(this.response.errorMessage)
        //         this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Update' });
        //     }
        // })




    }

    getTotal(secDepositTotal, totalInstallationCharges, nDeliveryCharge, totalServiceAdvance) {
        return Number(secDepositTotal) + Number(totalInstallationCharges) + Number(nDeliveryCharge) + Number(totalServiceAdvance);
    }
    showDialog() {
        this.addServiceKitButtonDisabled = false;
        this.serviceId = undefined;
        if (this.srvType.length > 1) {
            this.srvType.pop();
        }

        this.manageJobDialog = true;
        this.disableBillingMode = false;
        this.showNextFields = false;
        this.editButton = false;
        this.jobService = [];
        this.tmpSrvSkills = [];
        this.tmpSrvItems = [];
        this.tmpSrvPoints = [];
        this.isChecked = false;
        this.discountRatePerSkill = "";
        this.discountRateSkill = "";

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

    //  get Branch and Location
    BranchLocation() {
        const empID = localStorage.getItem('empID');
        this.servicesService.getBranch(empID).subscribe(
            res => {
                this.branchData = res['data'];
                this.branchId = this.branchData[0];
                // console.log('This is Branch location',this.branchData);
            }
        );
    }

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

    //   search Table Data
    searchManageJobF() {
        this.manageJobData = [];
        let tmpBranchId = this.branchId.val;
        //console.log(tmpBranchId);
        this.servicesService.searchdata(Utils.formatDate(this.formDate), Utils.formatDate(this.toDate), tmpBranchId).subscribe(
            res => {

                this.manageJobData = res['data'];

            }
        );

    }

    changeBranch() {
        this.hideAdd = true;
        //console.log('change')
    }

    // Send approval
    sendToApproval(jobId, ind) {
        let cStatus = "T";
        let data = {};
        data['nJobid'] = jobId;
        data['cStatus'] = cStatus;
        this.servicesService.sendApproval(data).subscribe(
            res => {
                this.showSuccess(res['data']['msg']);
                // this.manageJobData[ind]['cStatus'] = 'Approval';
                this.searchManageJobF();
                //console.log(res);
            }
        );
    }

    // service dropdown
    servicedropdownF() {
        this.servicesService.getServiceData().subscribe(
            res => {
                this.serviceData = res['data'];
                //console.log('this is service dropdown', this.serviceData);
            }
        );
    }

    //Unit dropdown
    getComboF() {
        //JSON.parse(localStorage.getItem("FILLCODEDATA"));
        let tmpData
        this.employeeService.getctgData(4).subscribe((res:any)=>{
            tmpData = res.data
            tmpData.forEach((element) => {
                if (element["ctgID"] == 4) {
                    this.unitData.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
                }

            });
           })
           this.employeeService.getctgData(1).subscribe((res:any)=>{
            tmpData = res.data
            tmpData.forEach((element) => {
                if (element["ctgID"] == 1) {
                    this.unitData.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
                }

            });
           })


        // console.log('This is service data', this.getData);


        // console.log(this.billingMode);

        // this.servicesService.getData().subscribe(
        //     res => {
        //         this.getData = res['data']
        //         // console.log('This is service data', this.getData)
        //         this.getData.forEach((element) => {
        //             if (element["categoryName"] == "Skills Price Unit") {
        //                 this.unitData.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
        //             }
        //             if (element["categoryName"] == "Billing Mode") {
        //                 this.billingMode.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });
        //             }
        //         });
        //         //    this.skills=true;
        //         //    this.pUnit=true;
        //     }
        // )
    }
    //Service Skills
    getServiceSkillsCombo() {
        this.categoriesData.forEach((element) => {
            if (element["categoryName"] == "Service Skills") {
                this.sSkills.push({ "name": element['codeName'], "serialNo": element['serialNo'], "code": element["codeID"], 'ctgID': element['ctgID'], "category": element["categoryName"] });

            }
        });
    }
    // Equipment dropdown Data
    getEquipment() {
        this.servicesService.getEquipment().subscribe(
            res => {
                this.equipData = res['data'];
                this.sSkills = this.equipData;
            }
        );
    }

    loadDiagnosisData() {
        this.servicesService.loadDiagnosisD().subscribe((res) => {
            this.diagnosisData = res['data'];
            this.filteredDiagnosisData = this.diagnosisData;
            //console.log(this.diagnosisData);
        }, (err) => {

        });
    }

    // change Frequency Data
    showDayOfMonth = false;
    nDayOfMonth = 0;
    manageDayOfMonth(evt) {

        this.nDayOfMonth = evt.target.value;
    }
    frequencyDataF(events) {
        //console.log(events);
        let evtVal: string = events.value['name'];
        switch (evtVal) {
            case 'Days':
                this.showWeekDaysList = false;
                this.showNumberBox = true;
                this.frequency = 'Days';
                this.showDayOfMonth = false;
                this.nDayOfMonth = 0;
                this.disabledRepeat = false;
                this.repeatsOn.nativeElement.value = "1";
                this.repeatVal = 1;
                this.repeatFunc(1);
                //  this.addServiceKitButtonDisabled = true;
                // if (this.repeatVal) {
                //     //this.disabledSave = false;
                //     this.disabledServiceSkills = false;
                // } else {
                //     //this.disabledSave = true;
                //     this.disabledServiceSkills = true;
                // }
                this.EnableDisableServiceSkillsAddButton();
                break;
            case 'One Time':
                this.frequency = 'Weekly';
                this.showWeekDaysList = true;
                this.showNumberBox = false;
                this.showDayOfMonth = false;
                this.nDayOfMonth = 0;
                this.disabledRepeat = true;
                this.repeatsOn.nativeElement.value = "0";
                //this.addServiceKitButtonDisabled = false;
                //this.disabledServiceSkills = false;
                //this.disabledSave = false;
                this.repeatVal = 0;
                this.repeatFunc(0);
                this.EnableDisableServiceSkillsAddButton();
                break;
            case 'Monthly':
                this.frequency = 'Monthly';
                this.showWeekDaysList = false;
                this.showNumberBox = true;
                this.showDayOfMonth = true;
                this.disabledRepeat = false;
                this.repeatsOn.nativeElement.value = "1";
                this.repeatVal = 1;
                this.repeatFunc(1);
                // this.addServiceKitButtonDisabled = true;
                // if (this.repeatVal) {
                //     //this.disabledSave = false;
                //     this.disabledServiceSkills = false;
                // } else {
                //     //this.disabledSave = true;
                //     this.disabledServiceSkills = true;
                // }
                this.EnableDisableServiceSkillsAddButton();
                break;
            default:
                this.frequency = 'Days';
                //   this.addServiceKitButtonDisabled = true;
                this.disabledRepeat = false;
                this.showWeekDaysList = false;
                this.showNumberBox = true;
                this.showDayOfMonth = false;
                this.nDayOfMonth = 0;
                this.repeatsOn.nativeElement.value = "1";
                this.repeatVal = 1;
                this.repeatFunc(1);
                // if (this.repeatVal) {
                //     //this.disabledSave = false;
                //     this.disabledServiceSkills = false;
                // } else {
                //     //this.disabledSave = true;
                //     this.disabledServiceSkills = true;
                // }
                this.EnableDisableServiceSkillsAddButton();

        }


    }




    repeatTrack(evt) {
        this.freqQty = evt['value'];

    }

    jobServiceUpdated: any[] = [];
    // onAdd(serviceType, unit, frequency, hours, startingAt) {
    //     let tmpObj = {};
    //     let itemId = null;
    //     let nSrvSkillid = null;
    //     let startTime = new Date(startingAt);
    //     let startHours = startTime.getHours();
    //     let startMins = startTime.getMinutes();
    //     let startSecs = startTime.getSeconds();
    //     let finalStartingAt = startHours + ":" + startMins + ":" + startSecs;
    //     //console.log(serviceType);

    //     if (serviceType["code"] == "1") {
    //         itemId = this.serviceSkillsItems["nItemID"];
    //     } else {
    //         nSrvSkillid = this.serviceSkillsItems["nSrvSkillID"];
    //     }
    //     //   console.log(arguments);
    //     //   console.log(this.serviceSkillsItems);
    //     //   console.log(this.freqQty);
    //     //   console.log(this.cWeekDys);
    //     tmpObj["nItemid"] = itemId;
    //     tmpObj["nSrvSkillid"] = nSrvSkillid;
    //     tmpObj["nRateId"] = unit["rateId"];
    //     tmpObj["nRateNotId"] = unit["rateId"];
    //     tmpObj["nJobFrq"] = frequency["code"];
    //     tmpObj["nFrqQty"] = this.freqQty;
    //     tmpObj["cWeekDys"] = this.cWeekDys;
    //     tmpObj["dStartTm"] = finalStartingAt;
    //     tmpObj["nHour"] = hours;
    //     tmpObj["srvType"] = this.servType;
    //     this.jobService.push(tmpObj);

    //     //console.log(this.jobService);

    //     //  this.addPointMap


    // }
    //   Get Unit Data

    public formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    public dateToSend: string;
    public endDateToSend: string;
    onSelectDate(event, typ) {
        this.dateToSend = this.formatDate(event);
        const date = new Date(this.dateToSend);
        date.setDate(date.getDate() + 15);
        this.formsGroup.patchValue({
            dJobEndDate: date
        });
        console.log();
    }
    // get Select Customer DropDown


    getLatLong(evt) {
        this.latLong = evt;
        // console.log('latest latlong',evt);
    }

    onPatientSubmit(formVal) {
        //console.log(formVal);
        let formData = {
            "nAcid": this.currentUser['nAcid'], "cPatientNm": formVal['patientName'], "nAge": formVal['age'], "cSex": formVal['sex']['val'], "nDiagnosis": formVal['diagnosis']['serialNo'], "dDoa": null,
            "nHospitalid": null, "cDoctor": "", "nJobid": null, "nHeight": formVal['height'], "nWeight": formVal['weight']
        };


        this.servicesService.addPatient(formData).subscribe((res) => {

            if (res['status'] == 200) {
                this.customerDialog = false;
                this.showSuccess(res['message']);
                this.loadPatientData();
                this.patientForm.reset();

            } else {
                this.showError(res['errorMessage']);
            }

        }, (error) => {

        });
        // console.log(formVal);


    }


    onLedgerSubmit(formVal) {
        let branchId = localStorage.getItem("branchId");
        let userId = localStorage.getItem("empID");
        let formData = {
            "nSchid": formVal['group']['val'],
            "cLedgerNm": formVal['ledgerName'],
            "nBranchid": branchId, "cDisplayNm": formVal['ledgerName'], "cBankAc": null, "nBankid": null,
            "cIfsc": null, "nUserid": userId, "addresses": [
                {
                    "cLatLong": this.latLong, "cContactPerson": formVal['contactperson'], "cMobile": formVal['mobile'],
                    "cAddress1": formVal['address'], "cPin": null, "nState": null, "nDistrict": null, "nCity": null,
                    "cEmail": null
                },]
        };

        this.servicesService.addLedger(formData).subscribe((res) => {

            if (res['status'] == 200) {
                this.customerDialog = false;
                this.showSuccess(res['message']);
                this.selectCustomerF();

            } else {
                this.showError(res['errorMessage']);
            }

        }, (error) => {

        });
        // console.log(formVal);


    }

    showSuccess(succ) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: succ });
    }

    showError(error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
    }


    selectCustomerF(val: string = "") {
        this.filteredGroups = [];
        //this.customerLoader = true;
        this.servicesService.selectCustomer(val, this.branchId['val']).subscribe(
            res => {
                this.customerData = res['data'];
                res['data']?.forEach(element => {
                    //console.log(element);
                    this.filteredGroups.push(element.cLedgerNm.toLowerCase());

                });
                //console.log(this.filteredGroups);
                //this.customerLoader = false;
                //  this.filteredGroups = this.customerData;
                // console.log('this is select customer Data', this.customerData);
            }
        );
    }

    //get Address DropDown

    customerId;
    selectAddressF(evt) {

        //console.log(evt);
        const ledgerName = evt;//evt.cLedgerNm;

        // console.log(ledgerName);
        const addrss = this.customerData.filter(e => e.cLedgerNm.toLowerCase() == ledgerName);
        //console.log(addrss);
        this.customerId = addrss[0]['nAcid'];
        this.currentUser = addrss[0];
        //console.log(this.currentUser);
        const cusAddrss = addrss[0]['addresses'];
        this.searchAddress = cusAddrss;
        this.getAddress();

        this.formsGroup.patchValue({
            patient: [],

        });
    }

    searchPatient(event) {
        let q = event.query;
        this.servicesService.loadPatientData(q).subscribe((res) => {
            this.patientData = res['data'];
        }, (err) => { });
        //  console.log(q);
    }

    selectPatient(evt) {
        this.patientId = evt['nPatientid'];
        //console.log(evt);
    }
    selectMobF(evts) {
        let address = evts.value.cAddress1;
        const mobData = this.searchAddress.filter(e => e.cAddress1 == address);
        this.MobileNo = mobData[0]['cMobile'];
        //console.log(mobData);
    }


    onService(evt) {
        //    console.log(evt.value['srvCtg']);
        if (evt.value['srvCtg'] == 'INTERNAL SERVICE') {
            this.rateNotMandatory = true;
        } else {
            this.rateNotMandatory = false;
        }
        this.srvctg = evt.value['srvCtg'];
        if (evt.value['srvCtg'] == 'INTERNAL SERVICE') {
            const bill = this.billingMode.filter(c => c.name == 'CARE');
            this.BillMode = bill[0];
            this.billMS = this.BillMode.code;
            this.disableBillingMode = true;
            console.log(this.billMS);
            if (this.billMS == 2) {
                this.callServicePointList = true;
            } else {
                this.callServicePointList = false;
            }
        }
        else {
            this.BillMode = [];
            this.billMS = 0;
            this.disableBillingMode = false;
        }
        this.hideServiceFields = true;
        this.NSrvPointid = null;
        let evtId = evt.value.val;
        // if (evt.value.srvCtgId == 131) {
        //     this.showSelfAssigned = true;
        //     this.showEndDate = false;
        // } else {
        //     this.showSelfAssigned = false;
        //     this.showEndDate = true;
        // }
        this.serviceId = evtId;
        //this.disabledSave = true;
        //this.disabledSave = true;
        console.log('this is service Id', this.serviceId);
    }





    saveServSkillFunc() {
        //this.tmpSrvSkills = [];
        let tmpObjSrvSkill: any = {};
        let hours = null;
        let finalStartingAt;
        if (this.stTime) {
            let startTime = new Date(this.stTime);
            let startHours = startTime.getHours();
            let startMins = startTime.getMinutes();
            let startSecs = startTime.getSeconds();

            finalStartingAt = startHours + ":" + startMins + ":" + startSecs;
        } else {
            finalStartingAt = null;
        }

        // if (serviceType["code"] == "0") {
        //this.globalItemId = null;
        // }

        this.nSrvSkillid = this.servSkillModel ? this.servSkillModel['nSrvSkillID'] : null;

        tmpObjSrvSkill["nItemid"] = null;
        tmpObjSrvSkill["nSrvSkillid"] = this.nSrvSkillid;


        if (this.callServicePointList) {
            this.rateIdGl = null;
        } else {
            if (this.globalRateData) {
                this.rateIdGl = this.globalRateData['rateId'];
            } else {
                this.rateIdGl = null;
            }

        }
        tmpObjSrvSkill["nRateId"] = this.callServicePointList ? null : this.rateIdGl;
        // let rateAfterDisc;
        // if (this.callServicePointList) {
        //     rateAfterDisc = 0;
        // } else {
        //     let rd = this.globalRateData ? this.globalRateData['name'].split("-")[0] : 0;
        //     rateAfterDisc = rd - this.discountRateSkill;
        // }

        let rateAfterDisc;
        let adRate;
        let discRateAmount;

        if (this.callServicePointList) {
            rateAfterDisc = 0;
            adRate = 0;
        } else {
            if (this.globalRateData) {
                let rateS = this.globalRateData['name'].split("-")[0];
                let rateCalc = (rateS * this.discountRatePerSkill) / 100;
                adRate = rateS;
                rateAfterDisc = (rateS - rateCalc);
                discRateAmount = rateCalc;
            }
        }

        tmpObjSrvSkill["nJobFrq"] = this.frequencyV ? this.frequencyV["code"] : null;
        tmpObjSrvSkill["nFrqQty"] = this.freqQty;
        tmpObjSrvSkill["cWeekDys"] = this.cWeekDys;
        tmpObjSrvSkill["dStartTm"] = finalStartingAt;
        tmpObjSrvSkill["dEndSrvDt"] = this.endDateToSend;
        tmpObjSrvSkill["nJobdid"] = this.currSrvSkillJobDid;
        tmpObjSrvSkill["nJobid"] = this.currJobId;
        tmpObjSrvSkill["nHour"] = hours;
        tmpObjSrvSkill["nDiscRatePer"] = this.callServicePointList ? null : this.discountRatePerSkill;
        tmpObjSrvSkill["nDiscRateAmt"] = this.callServicePointList ? null : discRateAmount;
        tmpObjSrvSkill["nadRate"] = rateAfterDisc;
        tmpObjSrvSkill['nDiscPerSec'] = 0;
        tmpObjSrvSkill['nDiscAmtSec'] = 0;
        tmpObjSrvSkill['nADSecurity'] = 0;
        //   tmpObjSrvSkill['jobServicePntDetails'] = [];
        tmpObjSrvSkill['nDayOfMonth '] = this.dayOfMonth;
        const servSkillId = this.srvSkillsData.filter(e => e.nSrvSkillID == this.nSrvSkillid);
        tmpObjSrvSkill['srvSkill'] = servSkillId[0].srvSkillName;
        if (this.globalRateData != null && this.globalRateData != "") {
            const rateIdData = this.rateData.filter(e => e.rateId == this.globalRateData.rateId);
            tmpObjSrvSkill['RateUnitName'] = rateIdData[0].name;
        }
        const freqD = this.manageService.filter(e => e.code == tmpObjSrvSkill["nJobFrq"]);
        tmpObjSrvSkill['FrequencyName'] = freqD[0].name;
        console.log(this.billMS);

        console.log(tmpObjSrvSkill);
        if ((this.billMS != 3) && (this.nSrvSkillid == null || tmpObjSrvSkill["nJobFrq"] == null || this.repeatVal == null)) {
            this.tmpSrvSkills = [];
        }
        else {
            this.tmpSrvSkills.push(tmpObjSrvSkill);
            this.servSkillModel = [];
            this.globalRateData = [];
            this.discountRatePerSkill = [];
            this.discountRateSkill = [];
            this.frequencyV = [];
            this.repeatsOn.nativeElement.value = '';
            let setTime = new Date();
            setTime.setHours(8);
            setTime.setMinutes(0);
            setTime.setSeconds(0);
            this.stTime = setTime;
            this.freqQty=0;
        }
        //console.log(this.tmpSrvSkills);
        console.log(this.tmpSrvSkills);
        if (this.tmpSrvSkills.length > 0) {
            this.showServiceSkillsTable = true;
        }
        else {
            this.showServiceSkillsTable = false;
        }
        const s = this.StartTimeddl.find(e => e.name == '08:00');
        this.SelStartddl = s;
        this.EnableDisableServiceSkillsAddButton();
    }
    addServiceKit(serviceType, unit) {
        this.customerLoader = true;
        // if (this.tmpSrvSkills.length == 0) {
        //     this.saveServSkillFunc();
        // }
        // if ((this.tmpSrvSkills.length > 0 || this.billMS == 3) && this.servType != null && (this.globalItemId != null || this.globalSrvPointId != null) && this.RateId != null) {
        if ((this.globalItemId != null || this.globalSrvPointId != null) && this.RateId != null) {
            this.jobServPoint = [];
            let hours = null;
            let tmpObj = {};
            let servSkillTmpObj
            let itemId = null;
            let nSrvSkillid = null;
            tmpObj["nItemid"] = this.globalItemId;
            tmpObj['rate'] = unit["name"] ? unit['name'].split("-")[0] : "";
            tmpObj['unit'] = unit["name"] ? unit['name'].split("-")[1] : "";
            tmpObj['cSrvType'] = serviceType['name'];
            tmpObj["nSrvSkillid"] = null;//nSrvSkillid;
            tmpObj["nRateId"] = unit["rateId"] ? unit["rateId"] : null;
            tmpObj["nInstallationCharge"] = this.installationCharges;
            tmpObj["nJobFrq"] = this.frequencyV ? this.frequencyV["code"] : null;
            tmpObj["nFrqQty"] = this.freqQty;
            tmpObj["cWeekDys"] = this.cWeekDys;
            tmpObj["nHour"] = hours;
            tmpObj['nDiscRateAmt'] = 0;
            tmpObj['nSrvPointid'] = this.globalSrvPointId;
            tmpObj['amount'] = unit['name'] ? unit['name'].split("-")[0] : 0;
            tmpObj['nadRate'] = unit['name'] ? unit['name'].split("-")[0] : 0;
            tmpObj['nDiscRatePer'] = 0;
            tmpObj['nDiscRateAmt'] = 0;
            tmpObj['nDayOfMonth'] = this.nDayOfMonth;

            tmpObj['nADSecurity'] = this.securityAm;
            tmpObj['nDiscPerSec'] = 0;
            tmpObj['nDiscAmtSec'] = 0;

            tmpObj['security'] = this.securityAm ? this.securityAm : 0;
            tmpObj['nDiscAmtSec'] = 0;

            tmpObj['secTotal'] = this.securityAm;
            tmpObj["srvSkill"] = this.serviceTy;
            tmpObj['type'] = "item";
            tmpObj["cSrvPointNm"] = this.NSrvPointid ? this.NSrvPointid['srvPointName'] : "";
            tmpObj['dJobSrvEnd'] = this.endDateToSend;
            let tmpObj1 = Object.assign({}, tmpObj);
            tmpObj1['nRateId'] = unit["rateId"];
            tmpObj1['type'] = "servPoint";
            tmpObj1['nSrvSkillid'] = nSrvSkillid;

            if (this.showServicePointCarePoint) {
                delete tmpObj1['nItemid'];

            }
            // if (this.billMS != 3 && this.servType == 0) {
            if (this.billMS == 2) {
                // this.jobServPoint.push(tmpObj1);
                this.tmpSrvPoints.push(tmpObj1);
            }

            if (this.servType != 0) {
                this.tmpSrvItems.push(tmpObj);
            }

            this.jobService = [];
            if (this.tmpSrvItems.length > 0) {
                this.tmpSrvItems.forEach((el, ind) => {
                    el['ind'] = ind;
                    this.jobService.push(el);
                });
            }

            if (this.tmpSrvPoints.length > 0) {
                this.tmpSrvPoints.forEach((el, ind) => {
                    el['ind'] = ind;
                    this.jobService.push(el);
                });
            }
            this.jobService.forEach((el, ind) => {
                // console.log(el['cSrvType']);
                if (el['cSrvType'] == "Machine") {
                    this.showDelhiveryCharge = true;
                } else {
                    this.showDelhiveryCharge = false;
                }
            })
            this.servicePointRateData = [];
            this.installationCharges = 0;
            this.sSkillsItemData = [];
            console.log(this.jobService);
            //console.log(this.jobService['cSrvType']);
            this.showJobTable = true;
            // setTimeout(() => {
            //     this.proceed(0);
            //     this.RateId = null;
            // }, 500);
            // setTimeout(() => {
            //     if (this.editButton == false && this.tmpSrvSkills.length > 0) {
            //         let jobSkillsData = this.tmpSrvSkills[0];
            //         const rateIdData = this.rateData.filter(e => e.rateId == jobSkillsData['nRateId']);
            //         this.globalRateData = rateIdData[0];

            //         this.discountRatePerSkill = this.tmpSrvSkills[0]['nDiscRatePer'];
            //         // this.discountRateSkill = this.tmpSrvSkills[0]['nDiscRateAmt'];
            //         this.discountRateSkill = this.tmpSrvSkills[0]['nadRate'];
            //         if (jobSkillsData['dStartTm']) {
            //             this.isChecked = true;
            //         }
            //         if (this.tmpSrvSkills.length > 0 || this.billMS == "Machine") {
            //             this.addServiceKitButtonDisabled = false;
            //         }

            //         const freqD = this.manageService.filter(e => e.code == jobSkillsData['nJobFrq']);
            //         this.frequencyV = freqD[0];
            //         this.repeatsOn.nativeElement.value = jobSkillsData['nFrqQty'];
            //         if (jobSkillsData['dStartTm']) {
            //             // this.isChecked = true;
            //             let startTime = new Date();
            //             let tmpTime = jobSkillsData['dStartTm'].split(":");
            //             startTime.setHours(tmpTime[0]);
            //             startTime.setMinutes(tmpTime[1]);
            //             startTime.setSeconds(0o0);

            //             // this.isTime = true;
            //             this.stTime = startTime;
            //         } else {
            //             // this.isTime = false;
            //             this.stTime = null;
            //         }
            //         const servSkillId = this.srvSkillsData.filter(e => e.nSrvSkillID == jobSkillsData['nSrvSkillid']);
            //         this.servSkillModel = servSkillId[0];
            //         this.customerLoader = false;
            //     }
            // }, 500);
            //this.showDelhiveryCharge = true
            // this.formsGroup.patchValue({
            //     serviceKitGroup: {
            //         nItemid: "",
            //         // nSrvSkillid:"",
            //         // nRateId: "",
            //         // nRateNotId: "",
            //         // nJobFrq:"",
            //         nSrvPoint:null,
            //         startTime:"",
            //         jobDuration:"",
            //         dayOfMonth:0

            //     },
            //   });


            //  this.repeatsOn.nativeElement.value = "";
            //   this.dayOfMonth.nativeElement.value=0;


            //   if(this.jobService.length > 0){
            //       this.disableBillingMode = true;
            //   }


            // console.log(this.jobService);
            setTimeout(() => {
                this.servicesService.getGroupItems(this.serviceSkillsItems.nItemID, this.dateToSend, this.branchId['val']).subscribe(
                    res => {
                        this.manageUnitData = res['data'];
                        if (res['data'] != null) {
                            if (res['data']['SrvItems'].length > 0) {
                                let resleng = Number(this.jobService.length);
                                res['data']['SrvItems'].forEach(element => {
                                    element['srNo'] = resleng + 1;
                                    this.consumableItems.push(element);
                                });
                                this.consumableItems.forEach((element) => {
                                    element['nadRate'] = element['nRate'];
                                    element['nDiscRatePer'] = 0;
                                });
                                if (this.consumableItems.length > 0) {
                                    this.showConsumableItemsTable = true;
                                }
                                else {
                                    this.showConsumableItemsTable = false;
                                }
                                if (this.jobService.length > 0) {
                                    let reslength = Number(this.jobService.length);
                                    this.jobService.forEach((elem, ind) => {
                                        let i = ind + 1;
                                        if (i == reslength) {
                                            elem['srNo'] = resleng + 1;
                                        }
                                    });
                                }
                            }
                        }
                    });
            }, 500);
        }
        this.customerLoader = false;
    }

    discountRateSkill;
    discountRatePerSkill;
    skillDiscount(evt) {
        // console.log(this.globalRateData);
        let dVal = evt.target.value;
        let rateS = this.globalRateData['name'].split("-")[0];
        let rateCalc = (rateS * dVal) / 100;
        this.discountRateSkill = (rateS - rateCalc);
        //  console.log(rateCalc);
    }
    deleteJob(jobD, rowInd) {
        let rInd = jobD['ind'];
        let resSr = jobD['srNo'];
        this.jobService.splice(rowInd, 1);
        if (jobD['cSrvType'] == 'Machine') {
            this.showDelhiveryCharge = true;
            this.tmpSrvItems.splice(rInd, 1);
        } else {
            this.showDelhiveryCharge = false;
            this.tmpSrvPoints.splice(rInd, 1);
        }

        if (this.jobService.length > 0) {
            this.disableBillingMode = true;
            this.showDelhiveryCharge = true;
        } else {
            this.showDelhiveryCharge = false;
            this.disableBillingMode = false;
            this.showJobTable = false;
        }
        this.consumableItems.forEach((item, index) => {
            if (item['srNo'] === resSr) this.consumableItems.splice(index, 1);
        });
        if (this.consumableItems.length > 0) {
            this.showConsumableItemsTable = true;
        }
        else {
            this.showConsumableItemsTable = false;
        }
    }

    deleteServiceSkills(rowInd) {
        this.tmpSrvSkills.splice(rowInd, 1);
        if (this.tmpSrvSkills.length > 0) {
            this.showServiceSkillsTable = true;
        } else {
            this.showServiceSkillsTable = false;
        }

    }
    calcDisc(evt, ind, rate, jobD) {
        let inpVal = evt.target.value;
        let rInd = jobD['ind'];
        let perAmount = (rate * inpVal) / 100;
        let fAmount = rate - perAmount;
        this.jobService[ind]['nadRate'] = fAmount;
        this.jobService[ind]['nDiscRatePer'] = inpVal;
        this.jobService[ind]['nDiscRateAmt'] = perAmount;


        if (jobD['type'] == 'item') {

            this.tmpSrvItems[rInd]['nadRate'] = fAmount;
            this.tmpSrvItems[rInd]['nDiscRatePer'] = inpVal;
            this.tmpSrvItems[rInd]['nDiscRateAmt'] = perAmount;

        }

        if (jobD['type'] == "servPoint") {
            this.tmpSrvPoints[rInd]['nadRate'] = fAmount;
            this.tmpSrvPoints[rInd]['nDiscRatePer'] = inpVal;
            this.tmpSrvPoints[rInd]['nDiscRateAmt'] = perAmount;

        }


        // console.log(inpVal);
    }

    calcConsumables(evt, ind, rate, jobD) {
        let inpVal = evt.target.value;
        let rInd = jobD['ind'];
        let perAmount = (rate * inpVal) / 100;
        let fAmount = rate - perAmount;
        this.consumableItems[ind]['nadRate'] = fAmount;
        this.consumableItems[ind]['nDiscRatePer'] = inpVal;
        this.consumableItems[ind]['nDiscRateAmt'] = perAmount;


        // if (jobD['type'] == 'item') {

        //     this.tmpSrvItems[rInd]['nadRate'] = fAmount;
        //     this.tmpSrvItems[rInd]['nDiscRatePer'] = inpVal;
        //     this.tmpSrvItems[rInd]['nDiscRateAmt'] = perAmount;

        // }

        // if (jobD['type'] == "servPoint") {
        //     this.tmpSrvPoints[rInd]['nadRate'] = fAmount;
        //     this.tmpSrvPoints[rInd]['nDiscRatePer'] = inpVal;
        //     this.tmpSrvPoints[rInd]['nDiscRateAmt'] = perAmount;

        // }


        // console.log(inpVal);
    }

    saveManageJob() {

    }

    cancelManageJob() {
        this.formsGroup.reset();
        this.manageJobDialog = false;

    }

    onHideManageJobForm() {
        this.formsGroup.reset();
    }

    calcDiscSec(evt, ind, sec, d) {
        let inpVal = evt.target.value;
        let sec1 = d['nSecurity'];
        let perAmount = d['nSecurity'];
        if (Number(inpVal) > 0) {
            perAmount = (sec1 * inpVal) / 100;
        }
        // let perAmount = (sec * inpVal) / 100;
        let fAmount = sec1 - perAmount;
        this.jobService[ind]['secTotal'] = fAmount;
        this.secDepositTotal = fAmount;
        this.jobService[ind]['nadSecurity'] = this.securityAm;
        this.jobService[ind]['nDiscPerSec'] = inpVal;
        this.jobService[ind]['nDiscAmtSec'] = fAmount;
        this.secDepositTotal = 0;
        this.jobService.forEach((el, ind) => {
            let per = el['nDiscPerSec'];
            let sec2 = el['nSecurity'];
            if (per == 0 || per == "") {
                this.secDepositTotal = this.secDepositTotal + sec2;
            }
            else {
                this.secDepositTotal = this.secDepositTotal + el['nDiscAmtSec'];
            }
        });
    }

    calcInstallationCharges(evt, ind) {
        let inpVal = evt.target.value;
        this.jobService[ind]['nInstallationCharge'] = inpVal;
        this.totalInstallationCharges = this.installationCharges + Number(inpVal);
        this.totalInstallationCharges = 0;
        this.jobService.forEach((el, ind) => {
            let charge = el['nInstallationCharge'];
            if (charge == 0 || charge == "") {
                this.totalInstallationCharges = this.totalInstallationCharges + 0;
            }
            else {
                this.totalInstallationCharges = this.totalInstallationCharges + Number(el['nInstallationCharge']);
            }
        });
    }

    editedTime: any = null;
    serviceSkillChange() {
        //  console.log(this.servSkillModel);
        if (this.servSkillModel != undefined) {
            let val = this.servSkillModel;
            let tmpData = val['svrSkillRate'];
            this.rateData = [];
            tmpData.forEach(element => {
                let tmpObj = {};
                tmpObj["unitId"] = element["nRentUnit"];
                tmpObj["rateId"] = element["nRateID"];
                tmpObj["name"] = element["nRate"] + "-" + element["rentUnitName"];
                this.rateData.push(tmpObj);
            });
        }
        if (this.editButton && this.tmpSrvSkills.length > 0) {

            let jobSkillsData = this.tmpSrvSkills[0];
            const rateIdData = this.rateData.filter(e => e.rateId == jobSkillsData['nRateId']);
            this.globalRateData = rateIdData[0];

            //this.discountRatePerSkill = this.tmpSrvSkills[0]['nDiscRatePer'];
            // this.discountRateSkill = this.tmpSrvSkills[0]['nDiscRateAmt'];
            //this.discountRateSkill = this.tmpSrvSkills[0]['nadRate'];
            if (jobSkillsData['dStartTm']) {
                this.isChecked = true;
            }
            if (this.tmpSrvSkills.length > 0 || this.billMS == "Machine") {
                //this.addServiceKitButtonDisabled = false;
            }

            // const freqD = this.manageService.filter(e => e.code == jobSkillsData['nJobFrq']);
            // this.frequencyV = freqD[0];
            //this.repeatsOn.nativeElement.value = jobSkillsData['nFrqQty'];
            //this.repeatVal = jobSkillsData['nFrqQty'];
            // if (jobSkillsData['dStartTm']) {
            //     // this.isChecked = true;
            //     let startTime = new Date();
            //     let tmpTime = jobSkillsData['dStartTm'].split(":");
            //     startTime.setHours(tmpTime[0]);
            //     startTime.setMinutes(tmpTime[1]);
            //     startTime.setSeconds(0o0);

            //     // this.isTime = true;
            //     this.stTime = startTime;
            // } else {
            //     // this.isTime = false;
            //     this.stTime = null;
            // }

            //   this.jobServPoint = jobSkillsData['jobServicePntDetails'];
            //   this.jobService = [...this.jobService,...this.jobServPoint];
            //   if(this.jobService.length > 0){
            //       this.showJobTable = true;
            //   }
            //console.log(this.jobService);
            //  this.frequencyV
            // console.log(this.servSkillModel);

            //  this.serviceSkillChange();

        }
        this.EnableDisableServiceSkillsAddButton();
    }
    selectManageUnitF() {
        // let serviceId = evt.value.val;
        // let branchId=localStorage.getItem("branchId");
        let branchId = +this.branchId['val'];
        // console.log(this.branchId);
        this.servicesService.unitId(this.serviceId, this.dateToSend, branchId).subscribe(
            res => {
                this.srvSkillsData = [];
                this.servicePointData = [];
                this.manageUnitData = res['data'];
                if (this.manageUnitData != null) {
                    this.srvSkillsData = res['data']['srvSkills'];
                    this.servicePointData = res['data']['srvPoints'];
                }
                if (this.editButton && this.tmpSrvSkills.length > 0) {
                    let jobSkillsData = this.tmpSrvSkills[0];


                    // console.log(this.rateData);
                    // const servSkillId = this.srvSkillsData.filter(e => e.nSrvSkillID == jobSkillsData['nSrvSkillid']);
                    // this.servSkillModel = servSkillId[0];
                    // console.log(this.servSkillModel);

                    this.serviceSkillChange();

                }
                //console.log('this is unit', this.srvSkillsData);
            }
        );
    }

    showServicePointCarePoint: boolean = false;
    billMS;
    showSkillSave: boolean = false;

    saveServSkill() {
        this.tmpSrvSkills = [];
        const formValues = this.formsGroup.value;
        let formData = {};
        formData['nSrvid'] = formValues['nSrvid']['val'];
        formData['dJobDate'] = this.dateToSend;
        formData['nBillMode'] = formValues['nBillMode']['serialNo'];
        formData['cMobile'] = this.currentUser['addresses'].length > 0 ? this.currentUser['addresses'][0]['cMobile'] : '';
        formData['dJobSrvEnd'] = this.endDateToSend;
        formData['nAcid'] = this.currentUser['nAcid'] ? this.currentUser['nAcid'] : formValues['nAcid']['nAcid'];
        if (this.editButton) {
            formData['nJobid'] = this.currJobId;
        }
        // formData['nJobid'] = formValues['nJobid']['nJobid'];
        formData["cCustNm"] = this.currentUser['cLedgerNm'] ? this.currentUser['cLedgerNm'] : formValues['nAcid']['cLedgerNm'];
        formData["cAddress"] = this.currentUser['addresses'][0]['cAddress1'];
        formData['nUserid'] = this.currentUser['nUserid'];
        formData['nBranchId'] = +this.branchId['val'];
        formData['selfAssigned'] = this.selfAssigned;

        let tmpObj = {};
        let itemID = null;
        // console.log(this.machineRateId);
        tmpObj["nItemid"] = this.machineRateId ? this.machineRateId['nItemID'] : null;
        let finalStartingAt;
        if (this.stTime) {
            let startTime = new Date(this.stTime);
            let startHours = startTime.getHours();
            let startMins = startTime.getMinutes();
            let startSecs = startTime.getSeconds();
            finalStartingAt = startHours + ":" + startMins + ":" + startSecs;
        } else {
            finalStartingAt = null;
        }
        //   tmpObj["nSrvSkillid"] = this.serviceSkillsItems["nSrvSkillID"];
        // console.log();
        // console.log();
        // console.log(this.frequencyV,this.globalRateData,this.servSkillModel,this.nAdRate.nativeElement.value,this.repeatsOn.nativeElement.value, this.stTime);
        let gRateId;
        //  console.log(this.unitVa);
        if (this.globalRateData) {
            gRateId = this.globalRateData['rateId'];
        } else {
            gRateId = null;

        }

        tmpObj["nSrvSkillid"] = this.servSkillModel ? this.servSkillModel["nSrvSkillID"] : null;
        tmpObj["nRateId"] = gRateId ? gRateId : null;
        tmpObj["nJobFrq"] = this.frequencyV ? this.frequencyV["code"] : null;
        tmpObj["nFrqQty"] = this.freqQty;
        tmpObj["cWeekDys"] = this.cWeekDys;
        tmpObj["dStartTm"] = finalStartingAt;
        tmpObj["srvType"] = this.servType;

        tmpObj['amount'] = 0;
        tmpObj['nDiscPerSec'] = 0;
        tmpObj['nDiscAmtSec'] = 0;
        tmpObj['nADSecurity'] = 0;

        let rateAfterDisc;

        if (this.callServicePointList) {
            rateAfterDisc = 0;
        } else {
            let rd = this.globalRateData ? this.globalRateData['name'].split("-")[0] : 0;
            rateAfterDisc = rd - this.discountRateSkill;
        }


        tmpObj["nDiscRatePer"] = this.callServicePointList ? null : this.discountRatePerSkill;
        tmpObj["nDiscRateAmt"] = this.callServicePointList ? null : this.discountRateSkill;
        tmpObj["nADRate"] = rateAfterDisc;


        //   this.jobService.push(tmpObj);
        this.tmpSrvSkills.push(tmpObj);

        // formData['jobService'] = this.jobService;
        formData['srvSkills'] = this.tmpSrvSkills;
        formData['srvItems'] = [];
        formData['srvPoints'] = [];

        formData['nPatientid'] = this.patientId;

        // console.log(this.jobService);
        // console.log(formData);

        if (this.editButton) {
            this.servicesService.editJob(formData).subscribe(res => {
                this.response = res;
                // console.log('Manage Job', res);
                if (this.response['status'] == 200) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Successfull' });
                    this.formsGroup.reset();
                    this.editButton = false;
                    this.manageJobDialog = false;

                    this.searchManageJobF();
                }
                if (this.response['status'] == 204) {
                    //  this.messageService.add(this.response.errorMessage)
                    this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Update' });
                }
            })
        } else {

            this.servicesService.postManageData(formData).subscribe(res => {
                this.response = res;
                //  console.log('Manage Job', res);
                if (this.response['status'] == 200) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
                    this.formsGroup.reset();
                    this.searchManageJobF();
                    this.manageJobDialog = false;
                }
                if (this.response['status'] == 204) {
                    //  this.messageService.add(this.response.errorMessage);
                    this.messageService.add({ severity: 'error', summary: this.response.errorMessage, detail: 'Not Added' });
                }
            });
        }


    }
    serviceTypeF(events) {
        this.machineRateId = "";
        this.sSkillsItemData = [];
        console.log(this.machineRateId);
        this.servType = events.value['code'];
        this.serviceSkillsItems = [];
        this.globalItemId = null;
        //console.log(this.servType);
        // this.rateData = [];
        // this.globalnItemid=nItemid
        let serviceItemId: string = events.value['name'];
        let billModeSelectedObj = this.formsGroup.get('nBillMode').value;
        this.billMS = billModeSelectedObj['code'];
        if (events.value['name'] == "Machine") {
            this.showInstallationCharge = true;
        } else {
            this.showInstallationCharge = false;
        }
        switch (serviceItemId) {
            case 'Service Point':
                const service = this.manageUnitData['srvSkills'];
                //console.log(this.formsGroup.get('nBillMode').value);

                // console.log(billMS);
                if (this.billMS == 2) {
                    //  this.srvType.push( { name: 'Service Point', code: '0' })
                    this.showServicePointCarePoint = true;
                } else {
                    this.showServicePointCarePoint = false;
                }

                this.sSkillsItemData = service;
                // const seviceIData =this.manageUnitData['srvSkills'][0]['srvSkillName'];
                this.skillItem = this.manageUnitData['srvSkills'][0]['srvSkillName'];
                this.isMachine = false;

                break
            case 'Machine':
                const sItems = this.manageUnitData['srvItems'];
                this.itemData = sItems;
                this.sSkillsItemData = this.itemData;
                this.showServicePointCarePoint = false;
                this.NSrvPointid = null;

                this.isMachine = true;
                // console.log('service Item',this.sSkillsItemData);
                // console.log(this.skillItem)
                // this.getComboF();
                // this.globalnItemid=1
                break;
        }

        // console.log(this.sSkillsItemData);
        console.log(this.machineRateId);

    }

    public securityAm: number = 0;

    srvPointChange(evt) {

        this.globalSrvPointId = evt['value']['nSrvPintID'];
        this.servicePointRateData = [];
        let srvItemRate = evt['value']['svrPointRate'];
        this.serviceTy = "";
        this.disableRateUnit = true;
        srvItemRate.forEach(element => {
            let tmpObj = {};
            tmpObj["unitId"] = element['nRentUnit'];
            tmpObj["rateId"] = element['nRateID'] ? element['nRateID'] : 0;

            tmpObj["name"] = element["nRate"] + "-" + element["rentUnitName"];
            this.servicePointRateData.push(tmpObj);
        });
        if (this.servicePointRateData.length > 0) {
            this.disableRateUnit = false;
        }
    }

    globalItemId: number = null;
    globalSrvPointId: number = null;
    machineRateId: any;
    unitF(evt, typeofDropdown) {
        this.disableRateUnit = true;
        // console.log(evt['value']);
        this.serviceSkillsItems = evt['value'];
        // this.rateData = [];
        this.servicePointRateData = [];
        let tmpData: any = [];
        this.globalItemId = evt['value']['nItemID'];

        if (typeofDropdown == "man") {
            //  tmpData = evt.value['svrSkillRate'];
            tmpData = evt.value['svrItemRate'];
            this.serviceTy = evt.value['srvSkillName'];
            this.securityAm = tmpData[0]['nSecurity'];

        } else {

            // let uEvt =evt.value.srvSkillName;
            tmpData = evt.value['svrItemRate'];
            this.serviceTy = evt.value['srvSkillName'];
            this.serviceTy = evt.value['itemName'];
            this.securityAm = tmpData[0]['nSecurity'];
        }

        // console.log(tmpData);
        tmpData.forEach(element => {
            let tmpObj = {};
            tmpObj["unitId"] = element["nRentUnit"];
            tmpObj["rateId"] = element["nRateID"];
            tmpObj["name"] = element["nRate"] + "-" + element["rentUnitName"];
            this.servicePointRateData.push(tmpObj);
            // if(this.callServicePointList){
            //     this.servicePointRateData.push(tmpObj);
            // }else{
            //     this.rateData.push(tmpObj);
            // }
            // this.rateData.push(tmpObj);
        });

        //  console.log(this.rateData);
        if (this.servicePointRateData.length > 0) {
            this.disableRateUnit = false;
        }
    }



    srvPointRateChange(evt) {
        this.RateId = evt.value['unitId'];
        // if ((this.tmpSrvSkills.length > 0 || this.billMS == "Machine") && this.servType != null && this.globalItemId != null && this.RateId!=null) {
        //     this.addServiceKitButtonDisabled = false;
        // }
    }

    ngAfterViewInit() {
        //JSON.parse(localStorage.getItem("FILLCODEDATA"));
        let catData
        this.employeeService.getctgData(27).subscribe((res:any)=>{
            catData = res.data
            catData.forEach((item, ind) => {
                if (item['ctgID'] == 27) {
                    this.weekDaysList.push({ "txt": item['codeName'], "val": item["serialNo"], "ctgID": item["ctgID"] });
                }
            });
           })




    }

    manageWeekDays(evt) {
        let tmpArr = [];
        evt['value'].forEach((elem) => {
            tmpArr.push(elem['val']);
        });

        this.cWeekDys = tmpArr.toString();
    }

    showCustomerDialog() {
        this.customerDialog = true;
        this.customerTxt = "";
        this.getGroupLedger();
    }


    delJob(id) {

        this.confirmationService.confirm({
            message: 'Are you sure that you want to Delete?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.servicesService.deleteJob(id).subscribe(res => {


                    if (res['status'] == 200) {
                        this.searchManageJobF();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });

                    }
                    if (res['status'] == 204) {
                        this.messageService.add({ severity: 'error', summary: res['errorMessage'], detail: 'Not Deleted Successfully' });
                    }
                });
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You Have Canceled' });
            }
        });
    }

    onJobType(evt) { }


    loadServicePoints() {
        //  console.log('calling load service point');
        this.servicesService.loadServicePoint(this.serviceId).subscribe((res) => {
            //  this.servicePointData = res['data'];
            //  console.log(res['data']);
        }, (err) => {

        })
    }


    onSelectDateEnd(evt) {
        this.endDateToSend = this.formatDate(evt);
    }


    callServicePointList: Boolean = false;
    billingModeChange(evt) {
        this.billMS = evt['value']['code'];
        //console.log(this.billMS);



        if (evt['value']['code'] == 2) {
            this.callServicePointList = true;
        } else {
            this.callServicePointList = false;
        }

        // if(evt['value']['code'] == 3){
        //     this.showServiceSkillgroup = false;
        // }else{
        //     this.showServiceSkillgroup = true;
        // }


    }
    servCtg: string;
    public totalDateDifference;
    proceed(val) {
        if (val == 1) {
            this.jobService = [];
            this.showJobTable = false;
            this.showServiceSkillsTable = false;
            this.tmpSrvSkills = [];
            //this.disabledSave = true;
            this.disabledServiceSkills = true;
        }
        this.customerLoader = true;
        console.log(this.formsGroup.value);
        let noofdays;
        let toDate = moment(this.endDateToSend);
        let fromDate = moment(this.dateToSend);
        this.totalDateDifference = toDate.diff(fromDate, 'days') + 1;
        this.finalRepDay = this.totalDateDifference;

        this.showNextFields = true;
        //  console.log(this.billMS);

        let billModeSelectedObj = this.formsGroup.get('nBillMode').value;
        this.billMS = billModeSelectedObj['code'];

        // if (this.billMS == 3) {
        //     this.showServiceSkillgroup = false;
        // } else {
        //     this.showServiceSkillgroup = true;
        // }

        // console.log(this.billingMode);
        if (this.billMS == 2) {
            let res = this.srvType.filter(e => e.name == "Service Point");
            if (res.length == 0) {
                this.srvType.push({ name: 'Service Point', code: '0' });
            }
            this.disableRate = true;


            // this.showServicePointCarePoint = true;
        } else {
            this.disableRate = false;
            let tmpInd = Utils.getIndexById(this.srvType, 'code', 0);
            // console.log(tmpInd);
            if (tmpInd) {
                this.srvType.splice(tmpInd, 1);
            }

            // this.srvType = Utils.removeByAttr(this.srvType,'code',1);
            //this.showServicePointCarePoint = false;
        }

        // if (this.billMS == 1) {
        //     this.showSkillSave = true;
        // } else {
        //     this.showSkillSave = false;
        // }
        this.formsGroup.patchValue({
            serviceKitGroup: {
                nItemid: "",
                servTypeD: "",
                nSrvSkillid: "",
                nRateId: "",
                nRateNotId: "",
                nJobFrq: "",
                nSrvPoint: null,
                startTime: "",
                jobDuration: "",
                dayOfMonth: 0

            },
        });
        this.selectManageUnitF();
        if (this.callServicePointList) {
            // this.loadServicePoints();
        }
        this.customerLoader = false;
        if (this.srvctg == 'INTERNAL SERVICE') {
            this.jobService = [];
            this.showJobTable = false;
            this.showSkillSave = false;
        }
        else {
            this.showJobTable = false;
            this.showSkillSave = true;
        }
    }

    // keyUpAutoComplete(evt){
    //     // console.log(evt.target.value);
    //     let val = evt ? evt.target.value : "";
    //     if(val.length > 1 && this.groupLedgerData.length == 0){
    //         this.selectCustomerF(val);

    //     }
    // }


    filterCustomer(event) {
        let query = event.query;
        let filtered: any[] = [];
        for (let i = 0; i < this.customerData.length; i++) {
            let group = this.customerData[i];
            if (group.cLedgerNm.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(group.cLedgerNm.toLowerCase());
            }
        }
        //  console.log('calling.....', filtered);
        this.filteredGroups = filtered;
    }

    popupForm() {
        const userId = localStorage.getItem("empID");
        const branchId = localStorage.getItem("branchId");
        this.departMentFormGroup = this.fb.group({
            nCtgId: new FormControl(this.departMentCatId),
            cCodeName: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            nParentSerialNo: new FormControl(null),
            nAdmin: new FormControl(true),
            cBranchId: new FormControl(branchId),
            nUserid: new FormControl(userId)
        });
    }

    get deptForm() {
        return this.departMentFormGroup['controls'];
    }

    submitPopupF(form: any) {
        this.departmentData = [];
        //console.log(this.departMentFormGroup.value)
        const formValues = this.departMentFormGroup.value;
        this.codeMasterService.codeMaster(formValues).subscribe(
            res => {
                this.response = res;
                if (this.response['status'] == 200) {
                    this.diagnosisDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfull' });
                    this.departMentFormGroup.reset();

                }
                else if (this.response['status'] == 204) {
                    this.diagnosisDialog = false;
                    this.messageService.add({ severity: 'error', summary: 'OOPS', detail: `Department Name already available` });
                    this.departMentFormGroup.reset();
                }
                else {
                    this.diagnosisDialog = false;
                    this.messageService.add({ severity: 'error', summary: 'OOPS', detail: 'Something went wrong' });
                }

                // this.loadDepartmentData();
            }
        );
    }

    getAddress() {
        this.servicesService.getAddress(this.customerId).subscribe(res => {
            this.addressData = res['data'];

            if (this.editButton) {

                const address = this.addressData.filter(e => e.nAddrid == this.editResponseById['nAddrid']);
                this.formsGroup.patchValue({
                    nAddress: address[0]
                });
            }
            console.log(this.addressData['cAddress1']);
        });
    }

    selectAdd(evt) {

    }

    editJob(id, status){
        console.log(id)
        this.serviveJobId = id;
        this.serviveJobStatus = status;
        this.displayModal = true;
    }
    onDialogClose(event) {
        console.log(event)
        this.displayModal = event;
        this.serviveJobId = null;
    }

    viewJobWithId(id, status, jobNumber){
        const ref = this.dialogService.open(AddUpdateManageJobComponent, {
              data: {
                  servId: id,
                  cStatus:status,
                  jobNum:jobNumber,
                  processOfJob:'jobapproval'
              },
              header:`Approval Job  #${jobNumber}`,
              width: '60vw',
              styleClass:'customer-modal'
        });
        ref.onClose.subscribe((res:any) => {
            //this.getPatient();
            this.searchJobApproval();
        });
    }





}


