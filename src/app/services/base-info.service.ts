import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseInfoService {

  constructor() { }

  baseUrl(){
    return "http://localhost:4200/";
  }

  serverUrl(){
    return "http://localhost:49523/api/";
  }
}
