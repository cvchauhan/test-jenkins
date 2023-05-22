import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  login(username,password){
    return this.http.post(this.baseUrl+"/GetLogin1", { "userName": username, "password": password});
  }

 

}
