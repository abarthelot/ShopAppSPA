import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  
  title = 'app';
  isCollapsed = false;
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private _auth: AuthService){}
  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this._auth.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
  
}
