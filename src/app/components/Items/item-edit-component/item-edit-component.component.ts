import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from 'ng-snotify';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


@Component({
  selector: 'app-item-edit-component',
  templateUrl: './item-edit-component.component.html',
  styleUrls: ['./item-edit-component.component.css']
})
export class ItemEditComponentComponent implements OnInit {

  item: any;
  postItem = {
    id: null,
    title: null,
    isService: null, 
    description: null,
    shipingAddress: null,
    shipingCountry: null,
    createdDate: null,
    quantity: null,
    unitPrice: null, 
    imageUrl: null,
    otherUrl: null,
    userId: null,
    photo: null
  }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private _auth: AuthService, private serverCalls: ServerCallsService, private snoty: SnotifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this._auth.getId());
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
    console.log(data);
    this.item = data;
    this.galleryImages = this.getImages();
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error("Failed to load, Please try again later.", "Error");
  }


  save(){
    const fd = new FormData();
      this.postItem.id = this.item['id'],
      this.postItem.title = this.item['title'],
      this.postItem.isService = this.item['isService'],
      this.postItem.description = this.item['description'],
      this.postItem.shipingAddress = this.item['shipingAddress'],
      this.postItem.shipingCountry = this.item['shipingCountry'],
      this.postItem.createdDate = this.item['createdDate'],
      this.postItem.quantity = this.item['quantity'],
      this.postItem.unitPrice = this.item['unitPrice'],
      this.postItem.imageUrl = this.item['imageUrl'],
      this.postItem.otherUrl = this.item['otherUrl'],
      this.postItem.userId = this.item['userId'],
      this.postItem.photo = this.item['photo']
    this.serverCalls.updateItem(this.postItem, this.item.id).subscribe(
      data => this.saveSuccessHandel(data),
      error => this.handleErrors(error)
    );
    
  }

  updateMainimage(url){
    this.item.imageUrl = url;
  }

  saveSuccessHandel(data){
    this.snoty.success("Save successfully.", "Success");
  }
}
