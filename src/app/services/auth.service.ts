import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  token: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  set(token){
    this.token = token;
    localStorage.setItem('token',token.tokenString);
    this.decodedToken = this.jwtHelper.decodeToken(token.tokenString);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    this.token = null;
    localStorage.removeItem("token");
  }

  isLoggedin(){
    return tokenNotExpired('token');
  }

  getUsername(){
    return this.decodedToken.unique_name;
  }

}


