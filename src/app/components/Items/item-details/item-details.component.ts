import { Component, OnInit } from '@angular/core';
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

  


}