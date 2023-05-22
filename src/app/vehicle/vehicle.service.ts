import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  constructor(private httpClient: HttpClient) { }
  public baseUrl = environment.baseUrl

  AddTransportPoint(payload) {
    return this.httpClient.post(`${this.baseUrl}/AddandUpdateTransportData`,  payload );
  }

  getTransportPointData() {
    return this.httpClient.get(`${this.baseUrl}/GetAllTransportPoints`)
  }
   
  getTransportPointById(id) {
    return this.httpClient.get(`${this.baseUrl}/GetTransportPointById?TransportPointId=${id}`);
  }

}
