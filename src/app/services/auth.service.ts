import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServerCallsService } from './server-calls.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  token: any;
  decodedToken: any;
  user: any;
  jwtHelper: JwtHelper = new JwtHelper();
  private imageUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentImageUrl = this.imageUrl.asObservable();

  changeUserImage(url: string){
    this.imageUrl.next(url);
  }

  set(token){
    this.token = token.tokenString;
    localStorage.setItem('token',token.tokenString);
    this.user = token.user;
    localStorage.setItem('user', JSON.stringify(token.user));
    this.decodedToken = this.jwtHelper.decodeToken(token.tokenString);
    this.changeUserImage(this.user.photoUrl);
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

  getId(){
    return this.decodedToken.nameid;
  }



}


