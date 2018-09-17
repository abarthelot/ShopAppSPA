import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewChecked } from '@angular/core';
import { BaseInfoService } from '../../../services/base-info.service';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from '../../../../../node_modules/ng-snotify';
import { AuthService } from '../../../services/auth.service';
import * as _ from 'underscore';
import 'rxjs/add/operator/do';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyIndex } from '../../../../../node_modules/@angular/common/src/i18n/locale_data';
import { PayPalItem } from '../../../../../models/PayPalItem';
import { Router } from "@angular/router";
import { CartService } from '../../../services/cart.service';

declare let paypal: any;

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})


export class ShopingCartComponent implements OnInit, AfterViewChecked {

  items: any;
  paypalItems: any;
  cartTotal = 0;
  @ViewChild('cartFormPost') cartFormPost: ElementRef;
  this = this;

  AddScript: boolean = false;
  PaypalLoad: boolean = false;

  transactionInfo = {
    intent: null,
    orderID: null,
    payerID: null,
    paymentID: null,
    paymentToken: null
  }

  paymenTReturn = {
    userId: null,
    amount: null,
    info: null
  }

  payPalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ASUUALbeklNlC0mVNbWhFIDWqWGdMqZgPi1t6w01YMqOu1DG-wwMn-HhxxB0kbWf8oMwVCjgXh2iBA1c',
      production: ''
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        transactions: [{
          amount: {
            total:  this.cartTotal,
            currency: 'USD',
            details: {
              subtotal:  this.cartTotal,
              tax: '0.00',
              shipping: '0.00',
              handling_fee: '0.00',
              shipping_discount: '0.00',
              insurance: '0.00'
            }
          },
          description: 'The payment transaction description.',
          custom: '90048630024435',
          //invoice_number: '12345', Insert a unique invoice number
          payment_options: {
            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
          },
          soft_descriptor: 'ECHI5786786',
          item_list: {
            items: this.paypalItems
          }
        }],
        note_to_payer: 'Contact us for any questions on your order.'
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) =>{
        // Payment success
        document.querySelector('#paypal-checkout-btn').dispatchEvent(new CustomEvent('onPaymentCompleted', { detail: {paymentInfo: data}}));
        console.log(data);
        //console.log(self._auth.getId());

      });
    },onCancel: function(data) {

      this.snoty.error('The payment was cancelled!', 'Error');
      console.log('The payment was cancelled!');
    }
  };
  paypalInfo: Object;


  ngAfterViewChecked(): void {
    if(this.AddScript){
      this.addPayPalScript().then(() => {

        this.PaypalLoad = true;
      })
    }
  }

  addPayPalScript(){
    this.AddScript = true;
    return new Promise((resolve, reject) =>{
      let scriptTagElement = document.createElement('script');
      scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    })
  }


  constructor(private baseInfo: BaseInfoService,private renderer: Renderer2, private serverCall: ServerCallsService, private snoty: SnotifyService, private _auth: AuthService, private router: Router, public cart: CartService) { }

  ngOnInit() {
    paypal.Button.render(this.payPalConfig, '#paypal-checkout-btn');
    this.getItems();
  }

  getItems(){
    this.serverCall.getCartItems(this._auth.getId()).subscribe(
      data => this.SuccessLoad(data),
      error => this.handleErrors(error)
    );
  }


  SuccessLoad(data){
    this.items = data;
    this.serverCall.getPayPalItems(this._auth.getId()).subscribe(
      data => this.SuccessPayPalLoad(data),
      error => this.handleErrors(error)
    );
    console.log(this.paypalItems);
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

  SuccessPayPalLoad(data){
    this.paypalItems = data;
    console.log(this.paypalItems);
  }

  finishPayments(event) {
    console.log(event.detail.paymentInfo);
    this.transactionInfo.intent = event.detail.paymentInfo.intent;
    this.transactionInfo.orderID = event.detail.paymentInfo.orderID;
    this.transactionInfo.payerID = event.detail.paymentInfo.payerID;
    this.transactionInfo.paymentID = event.detail.paymentInfo.paymentID;
    this.transactionInfo.paymentToken = event.detail.paymentInfo.paymentToken;

    this.paymenTReturn.info = this.transactionInfo;
    this.paymenTReturn.amount = this.cartTotal;
    this.paymenTReturn.userId = this._auth.getId();

    this.serverCall.CompletePayments(this.paymenTReturn).subscribe(
        error => this.handleErrors(error)
    );

    this.router.navigateByUrl('/home');
    this.cart.cartCount = 0;
  }

}
