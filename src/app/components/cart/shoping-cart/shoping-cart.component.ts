import { Component, OnInit, Input } from '@angular/core';
import { BaseInfoService } from '../../../services/base-info.service';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from '../../../../../node_modules/ng-snotify';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {
  items: any;
  cartTotal = 0;

  constructor(private baseInfo: BaseInfoService, private serverCall: ServerCallsService, private snoty: SnotifyService, private _auth: AuthService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.serverCall.getCartItems(this._auth.getId()).subscribe(
      data => this.SuccessLoad(data),
      error => this.handleErrors(error)
    );
  }


  SuccessLoad(data){
    console.log(data);
    this.items = data;
  }

  SuccessHandel(data){
    this.snoty.success('Item added to favourites','Success');
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error(error.error, "Error");
  }

  changeTotal(total){
    this.cartTotal = total;
  }

}
