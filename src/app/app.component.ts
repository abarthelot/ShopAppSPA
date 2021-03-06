import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'app';
  isCollapsed = false;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _auth: AuthService, private cart: CartService){}
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if(token){
      this._auth.decodedToken = this.jwtHelper.decodeToken(token);
      this._auth.user = user;
      this.cart.getCartCount();
    }
    if(user){
      this._auth.user = user;
      this._auth.changeUserImage(user.photoUrl);
    }
  }

}
