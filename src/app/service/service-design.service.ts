import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceDesignService {

  constructor(private httpClient:HttpClient) { }
  public baseUrl = environment.baseUrl

  getData(){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCode`)
  }
  getBranch(empID){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithBranch?UserId=${empID}`)
  }
  // Service Point API
  getEquipment(){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithSrvPointEq`)
  }
  spoint=()=> this.httpClient.get(`${this.baseUrl}/ServicePointList`)
  addSpoint(data){
    console.log(data)
     return this.httpClient.post(`${this.baseUrl}/ServicePointAdd`, data)
  }
  editServiceById(id){
    return this.httpClient.get(`${this.baseUrl}/ServiceByID?id=${id}`)
  }

  deleteSPoint=(data) => this.httpClient.delete(`${this.baseUrl}/ServicePointDelete?id=${data}`)
  // editSPoint = (data) => this.httpClient.put(`${this.baseUrl}/ServicePointEdit`, data)
  editSPoint(data) {
    console.log(data)
    return this.httpClient.put(`${this.baseUrl}/ServicePointEdit`, data)
  }
  filterServiePoint= (filter)=> this.httpClient.get(`${this.baseUrl}/ServicePointSearch?Search=${filter}`)
  editSpointById(id){
    return this.httpClient.get(`${this.baseUrl}/ServicePointByID?id=${id}`)
  }
  // End Service point API

  // service Skills pricing
  // service dropdown API
  getServiceData(){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithService`)
  }

 updateQueryStringParameter(uri, key, value) {
    let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

  getTable = (srvId,srvPntId,srvSkillId,srvPoint=false)=>{
  //  console.log(srvId,srvPntId);
    let uri = `${this.baseUrl}/ServiceRateList?SrvPnt=${srvPoint}`;
    if(srvId){
      uri = uri + "&SrvID="+srvId;
    }
    if(srvPntId){
      uri = uri + "&SrvPntID="+srvPntId;
    }

    if(srvSkillId){
      uri = uri + "&SrvSkillID="+srvSkillId;
    }
   
    // uri = srvId?this.updateQueryStringParameter(uri,"SrvID",srvId):uri;
    // uri = srvId?this.updateQueryStringParameter(uri,"SrvSkillID",srvSkillId):uri;
    // uri = srvId?this.updateQueryStringParameter(uri,"SrvPntID",srvPntId):uri;
    return this.httpClient.get(uri)
    }
  postData = (data)=> this.httpClient.post(`${this.baseUrl}/ServiceRateAdd`, data)
  deleteData = (id) => this.httpClient.delete(`${this.baseUrl}/ServiceRateDelete?id=${id}`)
  editSkillsPrice(data){
    console.log(data, 'service price')
    return this.httpClient.put(`${this.baseUrl}/ServiceRateEdit`, data)
  }
  filterSkillsPrice(data){
    return this.httpClient.get(`${this.baseUrl}/ServiceRateSearch?Search=${data}`)
  }
  editSpriceById(id){
    return this.httpClient.get(`${this.baseUrl}/ServiceRateByID?id=${id}`)
  }
  // End service Skills pricing

  // service component API:- Service list table API
  getServiceTable(){
    return this.httpClient.get(`${this.baseUrl}/ServiceList`)
  }

  serviceAdd=(data)=>this.httpClient.post(`${this.baseUrl}/ServiceAdd`, data)
  deleteSeviceById = (id)=> this.httpClient.delete(`${this.baseUrl}/ServiceDelete?id=${id}`);
  deleteServicePointTask = (id) => this.httpClient.delete(`${this.baseUrl}/ServicePointTaskDelete?id=${id}`);
  editService(data){
    console.log(data)
   return this.httpClient.put(`${this.baseUrl}/ServiceEdit`, data)
  }

  searchService(){
    return this.httpClient.get(`${this.baseUrl}/ServiceSearch?Searchs`)
    .pipe(
      map((users:any)=>{
        return users.map(user => {
          return {
            srvCode: user.srvCode,
            // email: user.email,
            // value: user.address.street
          }
        })
      })
    )
  }

 // End Service API
  // service point care plan
  //  for service point dropdown API
  getSevicePointById = (id)=> this.httpClient.get(`${this.baseUrl}/FillDLLWithSrvPoint?Srvid=${id}`)
  pointMappById = (id)=> this.httpClient.get(`${this.baseUrl}/FillDLLWithSrvPointMapping?SrvPointid=${id}`)

  // Service Point Care plan

  sPCareList = () => this.httpClient.get(`${this.baseUrl}/ServicePointTaskList`)
  delScareP = (id) => this.httpClient.get(`${this.baseUrl}/ServicePointTaskDelete?id=${id}`)
  saveSpointCare(data){
    return this.httpClient.post(`${this.baseUrl}/ServicePointTaskAdd`, data)
  }
  filterData =(data) => this.httpClient.get(`${this.baseUrl}/ServicePointTaskSearch?Search=${data}`)
  editSpointCare(data){
    return this.httpClient.put(`${this.baseUrl}/ServicePointTaskEdit`, data)
  }
  searchdata(data){
    return this.httpClient.get(`${this.baseUrl}/ServicePointTaskSearch?Search=${data}`)
  }
  getPreviewData(srvPointId){
    return this.httpClient.get(`${this.baseUrl}/ServicePointTaskPreview?SrvPointid=${srvPointId}`)
  }

  ServicePointTaskByID(id){
    return this.httpClient.get(`${this.baseUrl}/ServicePointTaskByID?id=${id}`)
  }

  // parrent combo

  parentId(Id){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${Id}`);
  }

  codeMaster(data){
    return this.httpClient.post(`${this.baseUrl}/CodeMasterAdd`, data)
  }

  getServicePointMappingData(srvId){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithSrvPointMapping?SrvPointid=${srvId}`)
  }

  getCategoryData(){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=4`);
  }

  deleteUnit(id){
    return this.httpClient.delete(`${this.baseUrl}/CodeMasterDelete?id=${id}`);
  }
  updateUnitData(formData){
    return this.httpClient.put(`${this.baseUrl}/CodeMasterEdit`, formData);
  }

  updateRateData(formData){
    return this.httpClient.put(`${this.baseUrl}/ServiceRateEdit`, formData);
  }

  getAllVehicleData() {
    return this.httpClient.get(`${this.baseUrl}/GetAllVehicles`)
  }
  geVehicleById(id) {
    return this.httpClient.get(`${this.baseUrl}/GetVehicleById?nVehId=${id}`);
  }
  getVehicleCategory(id){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${id}`);
  }
  getVehicleMake(id){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${id}`);
  }
  getVehicleModel(id){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${id}`);
  }

  addUpdateVehicle(data){
    return this.httpClient.post(`${this.baseUrl}/AddandUpdateVehicleData`, data)
  }
}
