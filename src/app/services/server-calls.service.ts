import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { BaseInfoService } from './base-info.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServerCallsService {

  constructor(private _http: HttpClient, private _baseInfo: BaseInfoService, private _auth: AuthService) {  

  }

  login(data: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(`${this._baseInfo.serverUrl()}auth/login`, data, {headers: headers})
  }

  register(data: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(`${this._baseInfo.serverUrl()}auth/register`, data);
  }

  getUsers(data: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}users`, data, {headers: headers});
  }

  getItems(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    //var jwtToken = this.jwt();
    //headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}items`, {headers: headers});
  }

  getItemDetails(id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    //var jwtToken = this.jwt();
    //headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}items/`+id, {headers: headers});
  }

  getFavorites(data: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}favorites/`+data, {headers: headers});
  }

  private jwt(){
    let token = localStorage.getItem('token');
    var bearerToken  = 'Bearer ' + token;
    if(token){
      return bearerToken; 
    }
  }

  


}
