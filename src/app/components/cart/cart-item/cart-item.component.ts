import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BaseInfoService } from '../../../services/base-info.service';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from '../../../../../node_modules/ng-snotify';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  displayThis = true;
  @Input() item: any;
  @Input() orderQuantity: number;
  @Output() getSum = new EventEmitter<number>();

  constructor(private baseInfo: BaseInfoService, private serverCall: ServerCallsService, private snoty: SnotifyService, private _auth: AuthService) { }

  ngOnInit() {
    this.updateTotal();
  }

  increaseQuantity(){
    this.orderQuantity = this.orderQuantity + 1;
    this.updateQuantity();
  }

  decreaseQuantity(){
    if(this.orderQuantity != 1)
    {
      this.orderQuantity = this.orderQuantity - 1;
      this.updateQuantity();
    }else
    {
      this.deleteItem();
    }
  }

  updateQuantity(){
    this.serverCall.updateCartItem(this._auth.getId(), this.item.id, this.orderQuantity).subscribe(
      data => this.SuccessHandel(data),
      error => this.handleErrors(error)
    );
  }

  deleteItem(){
  this.snoty.confirm('Do you want to remove this item from your cart?', 'Remove item', {
    timeout: 5000,
    showProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    buttons: [
      {text: 'Yes (Delete)', action: (toast) => {this.confirmDelete(); this.snoty.remove(toast.id); } },
      {text: 'No', action: (toast) => {console.log('Clicked: No'); this.snoty.remove(toast.id); }, bold: true},
    ]
  });
  }

  confirmDelete(){
    this.serverCall.deleteCartItem(this._auth.getId(), this.item.id).subscribe(
      data => this.successDel(data),
      error => this.handleErrors(error)
    );
  }

  SuccessHandel(data){
    this.updateTotal();
    this.snoty.success('Cart updated.','Success');
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error(error.error, "Error");
  }

  successDel(data){
    this.updateTotal();
    this.snoty.success('Cart updated.','Success');
    this.displayThis = false;
  }

  updateTotal(){
    this.serverCall.getCartSum(this._auth.getId()).subscribe(
      data => {
        this.updateSum(data);
        console.log(data);

      },
      error => this.handleErrors(error)
    );
  }

  updateSum(data){
    this.getSum.emit(data);
  }
}
