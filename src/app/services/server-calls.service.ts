import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { BaseInfoService } from './base-info.service';

@Injectable({
  providedIn: 'root'
})
export class ServerCallsService {

  constructor(private http: HttpClient, private baseInfo: BaseInfoService) {  

  }

  value(data){
    return this.http.post(`${this.baseInfo.serverUrl()}/value`, data)
  }


}
