import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { BaseInfoService } from './base-info.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServerCallsService {

  constructor(private _http: HttpClient, private _baseInfo: BaseInfoService) {  

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

  


}
