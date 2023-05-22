import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RecommendationService {

  constructor(private httpClient:HttpClient) { }
  public baseUrl = environment.baseUrl
// For Manage job API
  postManageData = (data)=> this.httpClient.post(`${this.baseUrl}/JobMasterAdd`, data)
  // Branch Api
  getBranch(){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithBranch`)
  }
  // search Api
  searchdata = (formDate, toDate, branchId) => this.httpClient.get(`${this.baseUrl}JobApprovalList?BranchID=${branchId}&FromDt=${formDate}&ToDt=${toDate}&JobStatus=R`)

  //status
  // getStatusTypeData(branch,fromDate,toDate,status){
  //   return this.httpClient.get(`${this.baseUrl}/JobApprovalList?BranchID=${branch}&FromDt=${fromDate}&ToDt=${toDate}&JobStatus=${status}`);
  // }

  getStatusTypeData(fromDate,toDate,StatusData,branchD){
    return this.httpClient.get(`${this.baseUrl}/JobApprovalList?BranchID=${branchD}&FromDt=${fromDate}&ToDt=${toDate}&JobStatus=S`);
  }

  loadServicePoints(srvId){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithSrvPoint?Srvid=${srvId}`);
  }

}
