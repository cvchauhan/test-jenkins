import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private httpClient: HttpClient) { }
  public baseUrl = environment.baseUrl
  CheckCurrentPassword = (data) => this.httpClient.post(`${this.baseUrl}/CheckCurrentPassword`, data);
  SetLoginPassword = (data) => this.httpClient.post(`${this.baseUrl}/SetLoginPassword`, data);
}
