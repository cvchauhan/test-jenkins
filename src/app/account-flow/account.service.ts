import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  getAccounts() {
    throw new Error('Method not implemented.');
  }
  public baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  // Manage Group API

  groupTable() {
    return this.http.get(`${this.baseUrl}/GroupList`)
  }

  filterTableData = (filter) => this.http.get(`${this.baseUrl}/GroupSearch?Search=${filter}`)
  accountGroupAdd(data) {
    return this.http.post(`${this.baseUrl}/GroupAdd`, data)
  }

  getVoucherType() {
    return this.http.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=25`);
  }
  getUnder() {
    return this.http.get(`${this.baseUrl}/FillDLLWithUnderGroup`)
  }
  getLedgeType() {
    return this.http.get(`${this.baseUrl}/FillDDLWithCode`)
  }

  deleteGroupById = (id) => this.http.delete(`${this.baseUrl}/GroupDelete?id=${id}`)
  editGroup(data) {
    return this.http.put(`${this.baseUrl}/GroupEdit`, data)
  }

  editGroupById(id) {
    return this.http.get(`${this.baseUrl}/GroupByID?id=${id}`)
  }

  // Manage Ledger API
  ledgerTable(BranchID) {
    return this.http.get(`${this.baseUrl}/LedgerList?BranchID=${BranchID}`)
  }
  deleteLedgerById = (id) => this.http.delete(`${this.baseUrl}/LedgerDelete?id=${id}`)
  filterLedgerData = (filter,Branchid) => this.http.get(`${this.baseUrl}/LedgerSearch?Search=${filter}&BranchID=${Branchid}`)
  ledgerUnder() {
    return this.http.get(`${this.baseUrl}/FillDLLWithGroupLedger`)
  }
  addLedger(data) {
    return this.http.post(`${this.baseUrl}/LedgerAdd`, data)
  }
  ledgerEdit(data) {
    return this.http.put(`${this.baseUrl}/LedgerEdit`, data)
  }
  filterLedgerById(id) {
    return this.http.get(`${this.baseUrl}/LedgerByID?id=${id}`)
  }
  // Fill combo Data API
  getData() {
    return this.http.get(`${this.baseUrl}/FillDDLWithCode`)
  }
  // Bank District API
  getBankDistrict(bankId) {
    return this.http.get(`${this.baseUrl}/FillDLLWithBankDistrict?BankID=${bankId}`)
  }
  // Get IFSC code
  getIfscCode(bankId, districtName) {
    return this.http.get(`${this.baseUrl}/IFSCCodeSearch?BankID=${bankId}&District=${districtName}`)
  }
  manageLedgerAdd(data) {
    return this.http.post(`${this.baseUrl}/LedgerAdd`, data)
  }

  // Voucher Entry API

  addVoucherEntry(data) {
    return this.http.post(`${this.baseUrl}/TransactionAdd`, data)
  }


  addJobReceipt(data) {
    return this.http.post(`${this.baseUrl}/AddJobReceipt`, data)
  }


  selectLedger() {
    return this.http.get(`${this.baseUrl}/LedgerSearch?Search`)
  }

  getBanks(BranchId) {
    return this.http.get(`${this.baseUrl}/LedgerSearch?Search=""&GroupType=6&BranchID=${BranchId}`)
  }
  // Branch Api
  getBranch(empID) {
    return this.http.get(`${this.baseUrl}/FillDLLWithBranch?UserId=${empID}`)
  }

  deleteVoucherById = (id, loginId) => this.http.delete(`${this.baseUrl}/TransactionDelete?id=${id}&LoginID=${loginId}`)

  voucherList(frmDt, toDt, DocType) {
    return this.http.get(`${this.baseUrl}/VoucherList?frmDt=${frmDt}&toDt=${toDt}&DocType=${DocType}`)
  }

  jobItem(ledgerId) {
    return this.http.get(`${this.baseUrl}/FillDLLWithJobByAcID?AcID=${ledgerId}`)
  }

  // Start Job Approval API
  getServiceData() {
    return this.http.get(`${this.baseUrl}/FillDLLWithService`)
  }

  selectCustomer(branchId,groupType?) {
    if (groupType) {
      return this.http.get(`${this.baseUrl}/LedgerSearch?Search""&groupType=6&BranchID=${branchId}`);
    } else {
      return this.http.get(`${this.baseUrl}/LedgerSearch?Search&BranchID=${branchId}`)
    }

  }

  unitId(SrvID, EffectDt, BranchID) {
    return this.http.get(`${this.baseUrl}/JobSrvSkillItem?SrvID=${SrvID}&EffectDt=${EffectDt}&BranchID=${BranchID}`)
  }

  getGroupLedger() {
    return this.http.get(`${this.baseUrl}/FillDLLWithGroupLedger`)
  }

  getJobApprovaltable(BranchID, FromDt, ToDt) {
    return this.http.get(`${this.baseUrl}/JobApprovalList?BranchID=${BranchID}&FromDt=${FromDt}&ToDt=${ToDt}&JobStatus=T`)
  }

  getAllPackages(BranchID, BillMode?) {
    return this.http.get(`${this.baseUrl}/GetAllPackages?BranchId=${BranchID}`)
  }

  editJobApprovalById(id) {
    return this.http.get(`${this.baseUrl}/JobMasterByID?id=${id}`)
  }

  updateJob(data) {
    return this.http.put(`${this.baseUrl}/JobMasterEdit`, data);
  }

  approveJob(data) {

    return this.http.put(`${this.baseUrl}/JobforApproval`, data);
  }

  getEntryItemData() {
    return this.http.get(`${this.baseUrl}/ItemList`);
  }

  addTaxDetails(data) {
    return this.http.post(`${this.baseUrl}/TaxDetailAdd`, data);
  }
  updateTaxDetails(data) {
    return this.http.put(`${this.baseUrl}/TaxDetailEdit`, data);
  }

  getAccountList(BranchID) {
    return this.http.get(`${this.baseUrl}/LedgerSearch?Search=""&GroupType=11&BranchID=${BranchID}`);
  }
  loadInvoiceGenerationData(InvoiceDate,BillingDate,branch) {
    return this.http.get(`${this.baseUrl}/GetInvoiceGeneration1?InvoiceDate=${InvoiceDate}&BillingDate=${BillingDate}&BranchId=${branch}`);
  }

  getTaxDetailList(val) {
    return this.http.get(`${this.baseUrl}/TaxDetailBySearch?Search=${val}`);
  }
  deleteTax = (id) => this.http.delete(`${this.baseUrl}/TaxDetailDelete?id=${id}`)

  getJobReceipt(branch, fromDate, toDate, status) {
    return this.http.get(`${this.baseUrl}/JobApprovalList?BranchID=${branch}&FromDt=${fromDate}&ToDt=${toDate}&JobStatus=${status}`);
  }

  getJobReceiptRcvd(branch, fromDate, toDate, status) {
    return this.http.get(`${this.baseUrl}/GetJobReceipt?branchID=${branch}&frmDt=${fromDate}&toDt=${toDate}`);
  }

  getAccountLedgerById(cstid) {
    return this.http.get(`${this.baseUrl}/GetAccountLedger?AccId=${cstid}`);
  }
  generateInvoice(data) {
    return this.http.post(`${this.baseUrl}/InvoiceGenerate1`, data);
  }
  invoiceHistory(fromDate, toDate, branchId) {
    return this.http.get(`${this.baseUrl}/GetInvoiceHistory1?FrmDate=${fromDate}&ToDate=${toDate}&BranchId=${branchId}`);
  }

  // addPaymentData(data) {
  //   return this.http.post(`${this.baseUrl}/TransactionAdd`, data);
  // }

  taxInputLedger(id,BranchID) {
    return this.http.get(`${this.baseUrl}/LedgerSearch?GroupType=${id}&BranchID=${BranchID}`);
  }

  purchaseLedger(id,BranchID) {
    return this.http.get(`${this.baseUrl}/LedgerSearch?GroupType=${id}&BranchID=${BranchID}`);
  }

  salesLedger(id,BranchID) {
    return this.http.get(`${this.baseUrl}/LedgerSearch?GroupType=${id}&BranchID=${BranchID}`);
  }

  getPdfData(acId, batchNo) {
    return this.http.get(`${this.baseUrl}/GetJobReceiptPrint?AcID=${acId}&BatchNo=${batchNo}`);
  }

  getEmpData(searchData, loginid) {
    return this.http.get(`${this.baseUrl}/GetEmployeeDetail?Search=${searchData}&LoginID=${loginid}`);
  }

  getCollection(emp, fdate, tdate, status) {
    return this.http.get(`${this.baseUrl}/GetCollectionWithEmp?EmpId=${emp}&frmDt=${fdate}&toDt=${tdate}&Status=${status}`);
  }

  assignEmpCollection(CODId,EmpColId,EmpColDate){
    return this.http.post(`${this.baseUrl}/AssignEmpCollection?CODId=${CODId}&EmpColId=${EmpColId}&EmpColDate=${EmpColDate}`,{});
  }

  approveEmpCollection(data){
    return this.http.post(`${this.baseUrl}/SendOTPApproveEmpCollection`,data);
  }

  validateOtp(empId,mn,cOtp,otpId){
    return this.http.post(`${this.baseUrl}/CheckOTPApproveEmpCollection?EmpId=${empId}&Mobile=${mn}&COtp=${cOtp}&OtpId=${otpId}`,{});
  }

  StockTransList(frmDate, toDate, TrType,BranchId,Status){
    let params = new HttpParams();
    params = params.append('frmDt', frmDate);
    params = params.append('toDt', toDate);
    params = params.append('TrType', TrType);
    params = params.append('BranchId', BranchId);
    params = params.append('Status', Status);
    return this.http.get(`${this.baseUrl}/StockTransList`, {params: params});
  }

  StockByID(id) {
    return this.http.get(`${this.baseUrl}/StockByID1?id=${id}`)
  }

  stockStatusUpdate(payload){
    return this.http.post(`${this.baseUrl}/StockSendToPurchaseApprove?StockId=${payload.StockId}&Status=${payload.Status}`,{})
  }

  ItemList(){
    return this.http.get(`${this.baseUrl}/ItemList`)
}

  searchVendorStock(searchData,BranchId){
    return this.http.get(`${this.baseUrl}/LedgerSearch?Search=${searchData}&GroupType=5&BranchID=${BranchId}`)
  }
}
