import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashoardService {

  constructor(private httpClient: HttpClient) { }
  public baseUrl = environment.baseUrl;


  GetDashboardSkills(frDate, toDate, branchId, skillIds) {
    return this.httpClient.get(`${this.baseUrl}/GetDashboardSkills?FromDate=${frDate}&ToDate=${toDate}&BranchId=${branchId}&SkillId=${skillIds}`);
  }
  GetDashboardJobs(BranchId) {
    return this.httpClient.get(`${this.baseUrl}/GetDashboardJobs?BranchId=${BranchId}`);
  }
}
