import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeMasterService {

  constructor(private httpClient:HttpClient) { }
  public baseUrl = environment.baseUrl
 
 
  
 
  codeMaster(data){
    return this.httpClient.post(`${this.baseUrl}/CodeMasterAdd`, data)
  }

  getCatData(catId, parentSn){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${catId}&ParentSrNo=${parentSn}`);
  }

  getEpsData(){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithMLMEmp`);
  }
  addJob(data){
    return this.httpClient.post(`${this.baseUrl}/JobMasterAdd`, data)
  }
  getJobDetails(id, status){
    return this.httpClient.get(`${this.baseUrl}/JobMasterByID?id=${id}&cStatus=${status}`)
  }
  JobMasterUpdate(data){
    return this.httpClient.put(`${this.baseUrl}/JobMasterEdit1`, data)
  }
  addSrvtoJob(data){
    return this.httpClient.post(`${this.baseUrl}/AddSrvtoJob`, data)
  }
  JobMasterUpdateOld(data){
    return this.httpClient.put(`${this.baseUrl}/JobMasterEdit`, data)
  }
  getGroupItems(data){
    return this.httpClient.get(`${this.baseUrl}/GetGroupItems?nItemId=${data.nItemId}&EffectDt=${data.EffectDt}&BranchId=${data.BranchId}`)
  }
  updateJobApproval(data){
    return this.httpClient.put(`${this.baseUrl}/JobforApproval`, data)
  }

  
 
}
