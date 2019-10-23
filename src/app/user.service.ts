import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(`${environment.api}/login`,data);
  }

  password(data){
    return this.http.post(`${environment.api}/update_password`,data);
  }

  userChange(data){
    return this.http.post(`${environment.api}/update_username`,data);
  }

  public forgot(data){
    return this.http.post(`${environment.api}/email`,data);
  }

 
}
