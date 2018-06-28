import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { BaseInfoService } from './base-info.service';
import { AuthService } from './auth.service';
import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs';

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

  getUserDetails(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    var userId = +this._auth.getId();
    return this._http.get(`${this._baseInfo.serverUrl()}users/`+userId, {headers: headers});
  }

  getItems(page?: number, itemsPerPage?: number, minPrice?: number, maxPrice?: number, type?: string, searchTerm?: string, orderBy?: string): Observable<any>{
    let queryString = '?';
    if(page != null && itemsPerPage != null)
    {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage; 
    }
    if(minPrice != null && maxPrice != null)
    {
      queryString += '&minPrice=' + minPrice + '&maxPrice=' + maxPrice; 
    }
    if(type != null)
    {
      queryString += '&isService=' + type; 
    }
    if(searchTerm != null)
    {
      queryString += '&searchTerm=' + searchTerm.trim();
    }
    if(orderBy != null)
    {
      queryString += '&orderBy=' + orderBy.trim();
    }    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    //var jwtToken = this.jwt();
    //headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}items` + queryString, {headers: headers, observe: 'response'});
  }

  getItemOwner(id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}items/Owner/`+id, {headers: headers});
  }

  getItemDetails(id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    //var jwtToken = this.jwt();
    //headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}items/`+id, {headers: headers});
  }

  setItemMainImage(itemId: number, picId: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}items/`+itemId+'/images/'+picId+'/setProfile',{},{headers: headers});
  }

  deleteItemImage(itemId: number, picId: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.delete(`${this._baseInfo.serverUrl()}items/`+itemId+'/images/'+picId,{headers: headers});
  }

  getFavorites(data: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}favorites/`+data, {headers: headers});
  }

  updateItem(data: any, id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.put(`${this._baseInfo.serverUrl()}items`, data, {headers: headers});
  }

  private jwt(){
    let token = localStorage.getItem('token');
    var bearerToken  = 'Bearer ' + token;
    if(token){
      return bearerToken; 
    }
  }

  


}
