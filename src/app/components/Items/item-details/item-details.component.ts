import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyModule, SnotifyService } from "ng-snotify";
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  displayEdit= false;
  userId = 0;
  avilableQuantity: number;
  quantity = 1;

  @ViewChild('cartTrig') cartTrig: ElementRef;
  @ViewChild('closeTrig') closeTrig: ElementRef;

  constructor(private serverCalls: ServerCallsService, private snoty: SnotifyService, private route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit() {
    this.loadItemDetails();

    this.galleryOptions = [
        {
            width: '500px',
            height: '500px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            preview: true
        }
    ];
  }

  getImages(){
    const imageUrls = [];
    for(let i = 0; i < this.item.photo.length; i++){
      imageUrls.push({
        small: this.item.photo[i].url,
        medium: this.item.photo[i].url,
        big: this.item.photo[i].url,
      });
    }
    return imageUrls;
  }

  loadItemDetails(){
    this.serverCalls.getItemDetails(+this.route.snapshot.params['id']).subscribe(
      data => this.SuccessHandel(data),
      error => this.handleErrors(error)
    );
  }

  SuccessHandel(data){
    console.clear();
    this.item = data;
    this.galleryImages = this.getImages();
    this.userId = this._auth.getId();
    if(this.userId == data.userId && this._auth.isLoggedin){
      this.displayEdit = true;
    }
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error("Failed to load, Please try again later.", "Error");
  }

  cart(){

    this.serverCalls.getItemQuantity(+this.route.snapshot.params['id']).subscribe(
      data => this.showCart(data),
      error => this.handleErrors(error)
    );

  }

  showCart(data){
    console.log(data);
    this.avilableQuantity = +data;
    let el: HTMLElement = this.cartTrig.nativeElement as HTMLElement;
    el.click();
  }

  closePopup(){
    let el: HTMLElement = this.closeTrig.nativeElement as HTMLElement;
    el.click();
  }

  addToCart(){
    this.closePopup();
    this.serverCalls.AddCartItem(this._auth.getId(),+this.route.snapshot.params['id'],+this.quantity).subscribe(
      data => this.addCartSuccess(data),
      error => this.handleErrors(error)
    );
  }

  addCartSuccess(data){
    this.snoty.success("Item added to your cart.", "Success");
  }

  addFavorite()
  {
    if(this._auth.isLoggedin() == true)
    {
      this.serverCalls.addFavorite(this._auth.getId(),this.item.id).subscribe(
        data => this.AddFavSuccessHandel(data),
        error => this.handleErrors(error)
      );
    }else{
      this.snoty.info('Please login to add items to favorites.','Please login');
    }

  }

  AddFavSuccessHandel(data)
  {
    this.snoty.success('item added to favorites.','Success');
  }


}
