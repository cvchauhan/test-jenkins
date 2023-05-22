import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BranchService {

  constructor(private httpClient:HttpClient) { }
  public baseUrl = environment.baseUrl

    // Branch Api
    getBranchData(empID){
      return this.httpClient.get(`${this.baseUrl}/FillDLLWithBranch?UserId=${empID}`)
    }
    getBranch(){
      return this.httpClient.get(`${this.baseUrl}/FillDLLWithBranch`)
    }
  }
