import { Component, OnInit } from '@angular/core';
import { ServerCallsService } from '../../services/server-calls.service';
import { Router } from "@angular/router";
import { TooltipPosition } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { SnotifyModule, SnotifyService } from "ng-snotify";



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _servercalls: ServerCallsService, private auth: AuthService, private router: Router, private _auth: AuthService, private snoty: SnotifyService) { }
  formData: any = {
    username: null,
    password: null
  }
  imageUrl: string;

  ngOnInit() {
    this._auth.currentImageUrl.subscribe(photoUrl => this.imageUrl = photoUrl);
    console.log(this.imageUrl);
    
  }
  isCollapsed = true;
  isMenuCollapsed = false;

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSelect() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  login(){
    console.log(this.formData);
    this._servercalls.login(this.formData).subscribe(
      data => this.setToken(data),
      error => this.handleErrors(error)
    );
  }

  handleErrors(error){
    if(error.error == "Bad Credentials")
    {
      this.snoty.error('Username or Password incorrect!', 'Bad Credentials');
    }else{
      this.snoty.error('Something went wrong!', 'Oops');
      console.log(error.error);
    }
  }

  logout(){
    this.auth.remove();
    this.auth.user = null;
    localStorage.removeItem('user');
    console.log("Logged out.");
    this.router.navigateByUrl('/home');
    
  }

  isLoggedin(){
    return this.auth.isLoggedin();
  }

  setToken(data){
    console.log(data);
    this._auth.set(data);
    this.router.navigateByUrl('/home');
  }

  getUser(){
    return this._auth.getUsername();
  }

  getPic(){
    return this._auth.user.photoUrl;
  }


}
