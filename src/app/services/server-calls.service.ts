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

  getFavorites(id: number, page?: number, itemsPerPage?: number, minPrice?: number, maxPrice?: number, type?: string, searchTerm?: string, orderBy?: string){
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
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}favorites/`+ id +'/'+queryString, {headers: headers, observe: 'response'});
  }

  updateItem(data: any, id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.put(`${this._baseInfo.serverUrl()}items`, data, {headers: headers});
  }

  addFavorite(id: number, itemId: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}users/` + id + '/favorite/' + itemId,{}, {headers: headers});
  }

  getMessages(id: number, page?: number, itemsPerPage?: number, messageContainer?: string){
    let queryString = '?';
    if(messageContainer != null)
    {
      queryString += 'MessageContainer=' + messageContainer;
    }
    if(page != null && itemsPerPage != null)
    {
      queryString += '&pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}usr_msg/`+ id +'/message'+queryString, {headers: headers, observe: 'response'});
  }

  getThread(id: number, recepientId: number, itemId: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}usr_msg/`+id+'/message/thread/'+recepientId+'/item/'+itemId, {headers: headers});
  }

  sendMessage(id: number, message: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}usr_msg/`+id+'/message', message, {headers: headers});
  }

  delMessage(userId: number, id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}usr_msg/`+userId+'/message/'+id, {}, {headers: headers});
  }

  markMessageAsRead(userId: number, id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}usr_msg/`+userId+'/message/'+id+'/read', {}, {headers: headers}).subscribe();
  }

  addItem(item: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}items`, item, {headers: headers});
  }

  getItemQuantity(id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}items/Quantity/`+id, {headers: headers});
  }

  AddCartItem(userId: number, itemId: number, quantity: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}cart/`+userId+'/add/'+itemId+'/'+quantity, {}, {headers: headers});
  }

  getCartItems(id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}cart/`+id, {headers: headers});
  }

  deleteCartItem(userId: number, itemId: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}cart/`+userId+'/delete/'+itemId, {}, {headers: headers});
  }

  updateCartItem(userId: number, itemId: number, quantity: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}cart/`+userId+'/update/'+itemId+'/'+quantity, {}, {headers: headers});
  }

  getCartCount(id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}cart/count/`+id, {headers: headers});
  }

  getCartSum(userId: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}cart/total/`+userId, {}, {headers: headers});
  }

  getPaypalInfo(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}cart/paypal/info`, {}, {headers: headers});
  }

  getPayPalItems(id: number){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.get(`${this._baseInfo.serverUrl()}cart/paypal/cart/`+id, {headers: headers});
  }

  CompletePayments(paymentInfo: any){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    var jwtToken = this.jwt();
    headers = headers.set('Authorization', jwtToken);
    return this._http.post(`${this._baseInfo.serverUrl()}cart/paypal/cart/complete`,paymentInfo, {headers: headers});
  }

  private jwt(){
    let token = localStorage.getItem('token');
    var bearerToken  = 'Bearer ' + token;
    if(token){
      return bearerToken;
    }
  }




}
