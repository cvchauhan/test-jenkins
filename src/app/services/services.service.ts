import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(private httpClient: HttpClient) { }
  public baseUrl = environment.baseUrl
  // For Manage job API
  postManageData = (data) => this.httpClient.post(`${this.baseUrl}/JobMasterAdd`, data)
  // Branch Api
  getBranch(empID) {
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithBranch?UserId=${empID}`)
  }

  GetJobRenewal(branchId, JobSrvDate) {
    return this.httpClient.get(`${this.baseUrl}/GetJobRenewal?BranchID=${branchId}&JobSrvDate=${JobSrvDate}`)
  }
  AddJobRenewal(jobRenDetail) {
    return this.httpClient.post(`${this.baseUrl}/PostJobRenewal`, { jobRenDetail });
  }

  jobRunningSheetItemList(frmDate, BranchType) {
    let params = new HttpParams();
    params = params.append('FromDate', frmDate);
    params = params.append('BranchId', BranchType);
    return this.httpClient.get(`${this.baseUrl}/JobRunningSheet`, { params: params });
  }

  // search Api
  searchdata = (formDate, toDate, branchId) => this.httpClient.get(`${this.baseUrl}/JobMasterList?BranchID=${branchId}&FromDt=${formDate}&ToDt=${toDate}`)
  // service dropdown API
  getServiceData() {
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithService`)
  }

  getData() {
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCode`)
  }
  getEquipment() {
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithSrvPointEq`)
  }
  selectAddress = (data) => this.httpClient.get(`${this.baseUrl}/LedgerSearch?Search=${data}`)

  selectCustomer(val, BranchId) {
    return this.httpClient.get(`${this.baseUrl}/LedgerSearch?Search=${val}&groupType=11&BranchID=${BranchId}`)
  }

  CustomerList(BranchId) {
    return this.httpClient.get(`${this.baseUrl}/LedgerSearch?groupType=11&BranchID=${BranchId}`)
  }

  unitId(SrvID, EffectDt, BranchID) {
    return this.httpClient.get(`${this.baseUrl}/JobSrvSkillItem?SrvID=${SrvID}&EffectDt=${EffectDt}&BranchID=${BranchID}`)
  }

  GetBillingMode() {
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=1&ParentSrNo=0`)
  }

  deleteJob(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/JobMasterDelete?id=${id}`)
  }

  sendApproval(data) {
    // console.log(jobid,status)
    return this.httpClient.put(`${this.baseUrl}/JobforApproval`, data)
  }

  editJob(data) {
    return this.httpClient.put(`${this.baseUrl}/JobMasterEdit`, data)
  }
  getGroupLedger() {
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithGroupLedger`)
  }

  addLedger(data) {
    return this.httpClient.post(`${this.baseUrl}/LedgerAdd`, data);
  }

  addCustomer(data: any) {
    return this.httpClient.post(`${this.baseUrl}/CustomerAdd`, data);
  }

  addJobEnd(data) {
    return this.httpClient.post(`${this.baseUrl}/JobEndInExecution`, data);
  }

  addPatient(data) {
    return this.httpClient.post(`${this.baseUrl}/PatientInfoAdd`, data);
  }

  editManageJobById(id) {
    return this.httpClient.get(`${this.baseUrl}/JobMasterByID?id=${id}`)
  }
  getAssignStartDataExternal(data) {
    return this.httpClient.get(`${this.baseUrl}/GetJobStartAssignmentList?${this.objectToConvertQuery(data)}`)
  }
  getAssignScheduleDataExternal(data) {
    return this.httpClient.get(`${this.baseUrl}/GetJobDaySchedule?${this.objectToConvertQuery(data)}`);
    //return this.httpClient.get(`${this.baseUrl}/GetJobDaySchedule?BranchID=${id}&JobScheduleDt=${stDate}&Status=${jobStatus}`);
  }

  getAssignStartDataInternal(stDate, id) {
    return this.httpClient.get(`${this.baseUrl}/GetJobStartAssignmentList?BranchID=${id}&JobScheduleDt=${stDate}&SrvCtgid=1`)
  }

  getAssignScheduleDataInternal(stDate, id, jobStatus) {
    return this.httpClient.get(`${this.baseUrl}/GetJobDaySchedule?BranchID=${id}&JobScheduleDt=${stDate}&Status=${jobStatus}&srvcatid=1`);
    //return this.httpClient.get(`${this.baseUrl}/GetJobDaySchedule?BranchID=${id}&JobScheduleDt=${stDate}&Status=${jobStatus}`);
  }
  getEmpBySrvSkill(srvSkillId, scheduleDate) {
    return this.httpClient.get(`${this.baseUrl}/GetEmployeeListBySrvSkill?JobScheduleDt=${scheduleDate}&SrvSkill=${srvSkillId}`);
  }
  GetJobAssignData(obj: any) {
    let queryParms = `?JobSchId=${obj.JobSchId}&Jobdid=${obj.Jobdid}&PlanDate=${obj.PlanDate}`;
    return this.httpClient.get(`${this.baseUrl}/GetJobAssignData/${queryParms}`);
  }
  GetShiftData() {
    return this.httpClient.get(`${this.baseUrl}/GetShift`);
  }
  assignJob(arr) {
    return this.httpClient.post(`${this.baseUrl}/JobAssign`, arr);
  }
  unAssignJob(arr) {
    return this.httpClient.post(`${this.baseUrl}/JobUnAssign`, arr);
  }
  getCustomerList(BranchID) {
    return this.httpClient.get(`${this.baseUrl}/LedgerSearch?Search=""&GroupType=11&BranchID=${BranchID}`);
  }
  getCustomerJobListById(cstid) {
    return this.httpClient.get(`${this.baseUrl}/GetCustomerLedger?AccId=${cstid}`);
  }

  getCustomerLedgerById(cstid) {
    return this.httpClient.get(`${this.baseUrl}/GetCustomerLedger1?AccId=${cstid}`);
  }

  loadServicePoint(serviceId) {
    return this.httpClient.get(`${this.baseUrl}/ServicePointList?Srvid=${serviceId}`);
  }

  loadPatientData(query, branchId?) {
    console.log("111")
    let queryParms = query ? `${query} ? Search=${query}&BranchId=${branchId}` : `BranchId=${branchId}`;
    return this.httpClient.get(`${this.baseUrl}/PatientInfoBySearch?${queryParms}`);
  }
  loadPatientDataList(CustId) {
    return this.httpClient.get(`${this.baseUrl}/PatientInfoList?CustId=${CustId}&JobId=0`);
  }

  loadDiagnosisD() {
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=32`);
  }

  getJobHistoryData(jobId, startDate, endDate) {
    return this.httpClient.get(`${this.baseUrl}/GetJobSrvData?frmDt=${startDate}&toDt=${endDate}&JobId=${jobId}`);
  }

  getAddress(id) {
    return this.httpClient.get(`${this.baseUrl}/FillAddressDLLWithAcID?AcID=${id}`)
  }
  getAddressByCustId(CustId) {
    return this.httpClient.get(`${this.baseUrl}/GetCustomerAddress?CustId=${CustId}`)
  }

  jobViewData = (formDate, toDate, branchId) => this.httpClient.get(`${this.baseUrl}/GetJobView?BranchID=${branchId}&FromDt=${formDate}&ToDt=${toDate}`);

  getJobHistory = (jid, fdate, tdate, ref) => this.httpClient.get(`${this.baseUrl}/GetTaskData?JobID=${jid}&FrmDt=${fdate}&ToDt=${tdate}&RefFlag=${ref}`);

  getJobClosure = (status, branch) => this.httpClient.get(`${this.baseUrl}/GetClosureRequest?CStatus=${status}&NBranchId=${branch}`);

  getJobClouserByJobId = (jobid) => this.httpClient.get(`${this.baseUrl}/GetJobSrvForClosure?NJobId=${jobid}`);

  addClouserData = (data) => this.httpClient.post(`${this.baseUrl}/JobClosureAdd`, data);

  sendJobForApproval = (closerid, status) => this.httpClient.post(`${this.baseUrl}/UpdateClosureStatus?strClosureIds=${closerid}&CStatus=${status}`, {});

  approvedJobClosure = (nclosureid, targetdate, approveid, pickupdate, pickupby) =>
    this.httpClient.post(`${this.baseUrl}/ApproveJobClosure?NJobClosureId=${nclosureid}&dTargetDate=${targetdate}&NApproveId=${approveid}&dPickupdueDate=${pickupdate}&NPickedBy=${pickupby}`, {});

  getTablelList(search, loginID) {
    return this.httpClient.get(`${this.baseUrl}/GetEmployeeDetail?search=${search}&LoginID=${loginID}`)
  }
  getTaskDependency(NSrvPointid, NTaskSrNo) {
    return this.httpClient.get(`${this.baseUrl}/ServicePointTaskList?NSrvPointid=${NSrvPointid}&NTaskSrNo=${NTaskSrNo}`)
  }
  getGroupItems(nItemId, EffectDt, BranchID) {
    return this.httpClient.get(`${this.baseUrl}/GetGroupItems?nItemId=${nItemId}&EffectDt=${EffectDt}&BranchID=${BranchID}`)
  }


  // End Manage job API

  getSkillIdData(nCodeId) {
    return this.httpClient.get(`${this.baseUrl}/GetTransportationSkills?nCodeId=${nCodeId}`)
  }
  loadAllPatientData(branchId) {
    console.log("222")
    let query = branchId ? `BranchId=${branchId}` : '';
    return this.httpClient.get(`${this.baseUrl}/PatientInfoBySearch?${query}`);
  }
  getCustomerAddress(body) {
    return this.httpClient.get(`${this.baseUrl}/FillAddressDLLWithAcID?${this.objectToConvertQuery(body)}`);
  }

  packageMasterAddEdit(body) {
    return this.httpClient.post(`${this.baseUrl}/PackageMasterAddEdit`, body);
  }

  gGetPackItemforJob(PackageId) {
    return this.httpClient.get(`${this.baseUrl}/GetPackageById?PackageId=${PackageId}`);
  }

  getPackforJob(PackageId) {
    return this.httpClient.get(`${this.baseUrl}/GetPackItemforJob?PackageId=${PackageId}`);
  }

  GetActivatePackage(nBillMode, nBranchId, nSrvid) {
    return this.httpClient.get(`${this.baseUrl}/GetActivatePackage?nBillMode=${nBillMode}&nBranchId=${nBranchId}&nSrvid=${nSrvid}`);
  }

  updateJobStatus(PackageId, Status) {
    return this.httpClient.post(`${this.baseUrl}/PackageUpdateStatus?PackageId=${PackageId}&Status=${Status}`, {});
  }

  objectToConvertQuery(obj) {
    let query = Object.keys(obj).map(function (key) {
      return key + '=' + obj[key];
    }).join('&');
    return query;
  }

  getTransportpoint() {
    return this.httpClient.get(`${this.baseUrl}/GetAllTransportPoints`);
  }
  getAllSkills(CatId) {
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${CatId}`);
  }

  deleteJobClosure(data) {
    return this.httpClient.put(`${this.baseUrl}/JobClosureDelete?NJobClosureId=${data.njCloseid}&UserId=${data.userId}`, {})
  }

  getAllTrainee(data) {
    return this.httpClient.get(`${this.baseUrl}/GetTraineeInfo?JobSchId=${data}`);
  }
  manageTrainee(data) {
    return this.httpClient.post(`${this.baseUrl}/ManageTrainee`, data)
  }
  getStaff() {
    return this.httpClient.get(`${this.baseUrl}/GetFieldStaff`);
  }

  getEmployeeData(empID, startDate, endDate) {
    return this.httpClient.get(`${this.baseUrl}/GetEmployeeData?frmDt=${startDate}&toDt=${endDate}&EmpId=${empID}`);
  }

  getCustomerSearchList(BranchId: number) {
    return this.httpClient.get(`${this.baseUrl}/CustomerSearch?BranchID=${BranchId}`);
  }
}
