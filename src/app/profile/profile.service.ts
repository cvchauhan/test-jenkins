import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }
  // API for Role dropdown data 
  roleCombo() {
    return this.http.get(`${this.baseUrl}/FillDLLWithRole`)
  }

  // API For Select Menue Dropdown
  selectMenue() {
    return this.http.get(`${this.baseUrl}/GetMenuMaster`)
  }
  // Manage Parameters API

  parentCategory(id) {
    return this.http.get(`${this.baseUrl}/FillDDLWithParentCode?CtgID=${id}`)
  }

  managePerameterListByCategory(CtgID,ParentSrNo) {
    return this.http.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${CtgID}&ParentSrNo=${ParentSrNo}`)
  }

  managePerameterList() {
    return this.http.get(`${this.baseUrl}/CodeMasterList`)
  }

  delManagePerameter(id) {
    return this.http.delete(`${this.baseUrl}/CodeMasterDelete?id=${id}`)
  }

  addManageParameter(data) {
    return this.http.post(`${this.baseUrl}/CodeMasterAdd`, data)
  }

  filterManageParameter(searchData) {
    return this.http.get(`${this.baseUrl}/CodeMasterSearch?Search=${searchData}`)
  }

  editById(id) {
    return this.http.get(`${this.baseUrl}/CodeMasterByID?id=${id}`)
  }

  editManageParameter(data) {
    return this.http.put(`${this.baseUrl}/CodeMasterEdit`, data)
  }

  getAccessInfoPortalList(role, loginID) {
    return this.http.get(`${this.baseUrl}/AccessRoleMenuMaster?Role=${role}&LoginID=${loginID}`)
  }

  // Access Permission Role
  accessPerRole() {
    return this.http.get(`${this.baseUrl}/FillDLLWithRole`)
  }
  saveAccessPerRole(data) {
    return this.http.put(`${this.baseUrl}/RoleEdit`, data);
  }

  getRoleByID(roleid) {
    return this.http.get(`${this.baseUrl}/RoleByID?id=${roleid}`)
  }

  saveRole(data) {
    return this.http.post(`${this.baseUrl}/RoleAdd`, data);
  }
  EditRole(data) {
    return this.http.put(`${this.baseUrl}/RoleEdit`, data);
  }
}
