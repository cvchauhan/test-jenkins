import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public baseUrl = environment.baseUrl;
  constructor(private http : HttpClient) { 
   
  }

  
  

  getCategoryData(){
    return this.http.get(`${this.baseUrl}/FillDDLWithCode`);
  }
  getctgData(id){
    return this.http.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${id}`);
    
  }

  getCategoryParentCategoryData(){
    return this.http.get(`${this.baseUrl}/CategoryList`);
  }

  addEmployeeInfo(data){
    return this.http.post(`${this.baseUrl}/EmployeeMasters`,data)
  }

  updateEmployeeInfo(data){
    return this.http.put(`${this.baseUrl}/EmployeeMasters`,data)
  }

  addCodeMaster(data){
    return this.http.post(`${this.baseUrl}/CodeMasterAdd`,data)
  }

  getCatData(catId, parentSn){
    return this.http.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${catId}&ParentSrNo=${parentSn}`);
  }

  getAccessInfoPortalList(role,loginID){
    return this.http.get(`${this.baseUrl}/AccessRoleMenuMaster?Role=${role}&LoginID=${loginID}`)
  }


  deleteEmpById(id,loginId){return  this.http.delete(`${this.baseUrl}/EmployeeMasters?id=${id}&LoginID=${loginId}`);}

  //get fill combo get api
  getFillComboData(){
    return this.http.get(`${this.baseUrl}/FillDDLWithCode`)
  }

  // posting branch

  getBranch(){
    return this.http.get(`${this.baseUrl}/FillDLLWithBranch`)
  }
  // Designation
  designation(deptId){
    return this.http.get(`${this.baseUrl}/FillDLLWithDesignation?DeptID=${deptId}`)
  }
  // Reporting To
  reportingTo(dept,designation){
    return this.http.get(`${this.baseUrl}/FillDLLWithReportingTo?DeptID=${dept}&DesgID=${designation}`)
  }


    // Reporting To
    getEmpRecord(empId,loginId){
      return this.http.get(`${this.baseUrl}/GetEmployee?EmpID=${empId}&LoginID=${loginId}`);
    }

  // Access Permission Role
  accessPerRole(){
    return this.http.get(`${this.baseUrl}/FillDLLWithRole`)
  }

  uploadFile(file: File, name): Observable<HttpEvent<any>> {
    let url:string = `${this.baseUrl}/FileUpload?fileName=`+name;

    let formData = new FormData();
    formData.append('filePath', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
  }
  resetPassword(empid){
    return this.http.post(`${this.baseUrl}/ResetPassword?EmpID=${empid}`,{})
  }
  resetDevice(empid){
    return this.http.post(`${this.baseUrl}/ResetDevice?EmpID=${empid}`,{})
  }

  // Seach tab Api
  getTablelList(search,loginID){
    return this.http.get(`${this.baseUrl}/GetEmployeeDetail?search=${search}&LoginID=${loginID}`)
  }

   filterTablelList(search){
    return this.http.get(`${this.baseUrl}/GetEmployeeDetail?search=${search}`)
  }

  // Access info check user exists or not
  accessInfoUserExist(username,empId){
    return this.http.get(`${this.baseUrl}/ChkUserName?UserName=${username}?UserId=${empId}`)
  }

  empInfoMob(chuser){
    return this.http.get(`${this.baseUrl}/CheckMobileEmail?MobileNo=${chuser}`)
  }
  empInfoEmail(email){
    return this.http.get(`${this.baseUrl}/CheckMobileEmail?Email=${email}`)
  }

  getShift(){
    return this.http.get(`${this.baseUrl}/GetShift`)
  }

  getSalaryStructure(){
    return this.http.get(`${this.baseUrl}/GetSalary`)
  }

  ConfirmOTPResetPassword(Mobile,COtp,OtpId){
    return this.http.post(`${this.baseUrl}/ConfirmOTPResetPassword?Mobile=${Mobile}&COtp=${COtp}&OtpId=${OtpId}`,{});
  }
  SendOTPResetPassword(UserName,Mobile){
    return this.http.post(`${this.baseUrl}/SendOTPResetPassword?UserName=${UserName}&Mobile=${Mobile}`,{});
  }
}

