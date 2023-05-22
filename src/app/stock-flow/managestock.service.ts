import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageStockService {
  public baseUrl = environment.baseUrl

  constructor(private httpClient:HttpClient) { }

  // Manage Stock API for Stock Item Tab

  stockItemList(frmDate, toDate, TrType){
    let params = new HttpParams();
    params = params.append('frmDt', frmDate);
    params = params.append('toDt', toDate);
    params = params.append('TrType', TrType);
    return this.httpClient.get(`${this.baseUrl}/StockList`, {params: params});
  }

  StockTransList(frmDate, toDate, TrType,BranchId,Status){
    let params = new HttpParams();
    params = params.append('frmDt', frmDate);
    params = params.append('toDt', toDate);
    params = params.append('TrType', TrType);
    params = params.append('BranchId', BranchId);
    params = params.append('Status', Status);
    return this.httpClient.get(`${this.baseUrl}/StockTransList`, {params: params});
  }

  StockByID(id) {
    return this.httpClient.get(`${this.baseUrl}/StockByID1?id=${id}`)
  }
//   stockItemFilter(searchData){
//     return this.httpClient.get(`${this.baseUrl}/ItemSearch?Search=${searchData}`)
//   }

//   stockItemDel(id){
//     return this.httpClient.delete(`${this.baseUrl}/ItemDelete?id=${id}`);
//   }

  ItemList(){
      return this.httpClient.get(`${this.baseUrl}/ItemList`)
  }

  searchVendorStock(searchData,BranchId){
    return this.httpClient.get(`${this.baseUrl}/LedgerSearch?Search=${searchData}&GroupType=5&BranchID=${BranchId}`)
  }

  addPurchase(data){
    return this.httpClient.post(`${this.baseUrl}/StockAdd`,data);
  }
  EditPurchase(data){
    return this.httpClient.post(`${this.baseUrl}/StockEdit1`,data);
  }

  addIssue(data){
    return this.httpClient.post(`${this.baseUrl}/StockAdd`,data);
  }

  getJobNo(id){
    return this.httpClient.get(`${this.baseUrl}/GetJobItemStock?JobID=${id}`)
  }
  getJobN(id){
    return this.httpClient.get(`${this.baseUrl}/GetJobItemDepositStock?JobID=${id}`)
  }
  validateSerialized(itemid,serVal,branchId,stockType){
    return this.httpClient.get(`${this.baseUrl}/GetItemSerialStatus?BranchID=${branchId}&ItemID=${itemid}&strSrNo=${serVal}&StockType=${stockType}`);
  }

  searchCustIssueData(searchData){
    return this.httpClient.get(`${this.baseUrl}/LedgerSearch?Search=${searchData}&groupType=11`)
  }

  autopopulateEmpIssueData(searchData,loginid){
    return this.httpClient.get(`${this.baseUrl}/GetEmployeeDetail?Search=${searchData}&LoginID=${loginid}`)
  }

  addDeposit(data){
    return this.httpClient.post(`${this.baseUrl}/StockAdd`,data);
  }

  addTransfer(data){
    return this.httpClient.post(`${this.baseUrl}/StockAdd`,data);
  }

  getEmpDepositData(id){
    return this.httpClient.get(`${this.baseUrl}/StockDetailList?EmpId=${id}`)
  }
  sendOtp(userId,empId,acId,mn,data){
    return this.httpClient.post(`${this.baseUrl}/StockSendOTP?UserId=${userId}&EmpId=${empId}&AcId=${acId}&Mobile=${mn}`,data);

  }

  validateOtp(userId,empId,acId,mn,cOtp){
    return this.httpClient.post(`${this.baseUrl}/StockCheckOTP?UserId=${userId}&EmpId=${empId}&AcId=${acId}&Mobile=${mn}&COtp=${cOtp}`,{});
  }
  validateOtp2(userId,empId,acId,mn,cOtp, otpId){
    return this.httpClient.post(`${this.baseUrl}/StockCheckOTP?UserId=${userId}&EmpId=${empId}&AcId=${acId}&Mobile=${mn}&COtp=${cOtp}&OTPId=${otpId}`,{});
  }


  delStock(stockId){
    return this.httpClient.delete(`${this.baseUrl}/StockDelete?id=${stockId}`);
  }

  loadJobData(jobNo,branch){
    return this.httpClient.get(`${this.baseUrl}/GetJobID?BranchId=${branch}&JobNo=${jobNo}`);
  }

  loadJobDataDeposit(jobNo,branch){
    return this.httpClient.get(`${this.baseUrl}/GetDepositJobByNo?BranchId=${branch}&JobNo=${jobNo}`);
  }
//   itemStockEditById(id){
//     return this.httpClient.get(`${this.baseUrl}/ItemByID?id=${id}`)
//   }

//   itemEdit(data){
//     return this.httpClient.put(`${this.baseUrl}/ItemEdit`, data)
//   }

getBranch(empID){
  return this.httpClient.get(`${this.baseUrl}/FillDLLWithBranch?UserId=${empID}`)
}

getStockInHand(catId,itemId,StcId,branchId){
  return this.httpClient.get(`${this.baseUrl}/StockInHand?CategoryId=${catId}&ItemId=${itemId}&StkType=${StcId}&BranchId=${branchId}`)
}

getSummaryInHand(catId,itemId,StcId,branchId){
  return this.httpClient.get(`${this.baseUrl}/StockSummary?CategoryId=${catId}&ItemId=${itemId}&StkType=${StcId}&BranchId=${branchId}`)
}

getStockPosition(catId,itemId,StcId,branchId){
  return this.httpClient.get(`${this.baseUrl}/StockCurrentHeldWith?CategoryId=${catId}&ItemId=${itemId}&StkType=${StcId}&BranchId=${branchId}`)
}

issuePrint(stId){
  return this.httpClient.get(`${this.baseUrl}/GetStockIssuechallan1?StockId=${stId}`)
}

getSerialized(catId,itemId,StcId,branchId){
  return this.httpClient.get(`${this.baseUrl}/StockInHand?CategoryId=${catId}&ItemId=${itemId}&StkType=${StcId}&BranchId=${branchId}`)
}

getItemPickedData = (status,branch) => this.httpClient.get(`${this.baseUrl}/GetItemPickup?CStatus=${status}&NBranchId=${branch}`);

approvedItem = (jclose,apid,apdate) => this.httpClient.post(`${this.baseUrl}/ApproveItemPickup?JobCloseId=${jclose}&ApproveId=${apid}&ApproveDate=${apdate}`,{});

approvedItemPickup = (jclose,apid,apdate,itemcond) => this.httpClient.post(`${this.baseUrl}/ApproveItemPickup?JobCloseId=${jclose}&ApproveId=${apid}&ApproveDate=${apdate}&ItemCond=${itemcond}`,{});

getItemIssuePending = (branch) => this.httpClient.get(`${this.baseUrl}/GetJobPendingandIssueItems?NBranchId=${branch}`);

stockStatusUpdate(payload){
  return this.httpClient.post(`${this.baseUrl}/StockSendToPurchaseApprove?StockId=${payload.StockId}&Status=${payload.Status}`,{})
}

}
