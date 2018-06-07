import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  token: any;

  set(token){
    this.token = token;
    localStorage.setItem('token',token);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    this.token = null;
    localStorage.removeItem("token");
  }

  isLoggedin(){
    const getToken = localStorage.getItem("token");
    return !!getToken;
  }

}


