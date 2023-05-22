import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient:HttpClient) { }
  public baseUrl = environment.baseUrl;

  getMenuData(menuId){
    return this.httpClient.get(`${this.baseUrl}/GetReportDef?menuid=${menuId}`)
  }

  getReport(reportName,obj):Observable<Blob>{
    let formattedUrl:string = reportName+"?";
    if(obj.hasOwnProperty("fromDate")){
      formattedUrl = formattedUrl +"FrmDt="+obj['fromDate'];
    }
    if(obj.hasOwnProperty("toDate")){
      formattedUrl = formattedUrl +"&ToDt="+obj['toDate'];
    }
    if(obj.hasOwnProperty("vrType")){
      formattedUrl = formattedUrl +"&vrType="+obj['vrType'];
    }
    if(obj.hasOwnProperty("GrpID")){
      formattedUrl = formattedUrl +"&GrpID="+obj['GrpID'];
    }
    if(obj.hasOwnProperty("Mode")){
      formattedUrl = formattedUrl +"&Mode="+obj['Mode'];
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});

    return this.httpClient.get<Blob>(`${this.baseUrl}/`+formattedUrl, { headers : headers,responseType :
    'blob' as 'json'});


  }
}
