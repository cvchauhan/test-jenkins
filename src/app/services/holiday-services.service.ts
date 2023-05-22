import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HolidayServices {

  constructor(private httpClient:HttpClient) { }
  public baseUrl = environment.baseUrl

  importHoliday(data){
    return this.httpClient.post(`${this.baseUrl}/HolidayImport`, data);
  }

  listHolidays(fromDate,toDate){
    return this.httpClient.get(`${this.baseUrl}/HolidayList?frmDt=${fromDate}&toDt=${toDate}`);
  }
  addHoliday(data){
    return this.httpClient.post(`${this.baseUrl}/HolidayAdd`, data);
  }

  updateHoliday(data){
    return this.httpClient.put(`${this.baseUrl}/HolidayEdit`, data);
  }
  deleteHoliday(holidayId){
    return this.httpClient.delete(`${this.baseUrl}/HolidayDelete?id=${holidayId}`);
  }

  jobAssignmentList(fromDate,branchId){
    return this.httpClient.get(`${this.baseUrl}/GetJobStartAssignmentList?BranchID=${branchId}&JobScheduleDt=${fromDate}`);
  }

  scheduleJob(data){
    return this.httpClient.put(`${this.baseUrl}/JobSchedulePlan`, data);
  }
  
}