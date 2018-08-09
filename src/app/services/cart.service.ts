import { Injectable } from '@angular/core';
import { ServerCallsService } from './server-calls.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount = 0;

  constructor(private servercalls: ServerCallsService, private _auth: AuthService) { }

  getCartCount(){
    this.servercalls.getCartCount(+this._auth.getId()).subscribe(
      data => this.SuccessHandel(data),
      error => this.handleErrors(error)
    );
  }

  SuccessHandel(data){
    console.log(data);
    this.cartCount = +data;
  }

  handleErrors(error){
    console.log(error);
  }
}
