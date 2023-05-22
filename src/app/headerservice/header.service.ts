import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  navigation: MegaMenuItem[] = [];
  constructor(private httpClient: HttpClient) { }
  public baseUrl = environment.baseUrl
  setNavbar(data) {
    this.navigation = data;
  }
  getNavbar() {
    return this.navigation;
  }

  CheckCurrentPassword = (data) => this.httpClient.post(`${this.baseUrl}/CheckCurrentPassword`, data);
  SetLoginPassword = (data) => this.httpClient.post(`${this.baseUrl}/SetLoginPassword`, data);
}
