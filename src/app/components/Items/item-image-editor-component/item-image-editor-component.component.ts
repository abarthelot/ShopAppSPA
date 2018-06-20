import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { BaseInfoService } from '../../../services/base-info.service';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from 'ng-snotify';
import * as _ from 'underscore';


@Component({
  selector: 'app-item-image-editor-component',
  templateUrl: './item-image-editor-component.component.html',
  styleUrls: ['./item-image-editor-component.component.css']
})
export class ItemImageEditorComponentComponent implements OnInit {
  @Input() images: any[];
  @Input() itemId: any;
  public uploader:FileUploader = new FileUploader({});
  public hasBaseDropZoneOver:boolean = false;
  baseUrl = this.baseInfo.serverUrl();
  currentMainPic: any;
  @Output() getItemImageChange = new EventEmitter<string>();

  constructor(private baseInfo: BaseInfoService, private serverCall: ServerCallsService, private snoty: SnotifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'items/' + this.itemId + '/images',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          isProfilePic: res.isProfilePic
        };
        this.images.push(photo);
      }
    };
  }

  setMainImage(image){
    this.serverCall.setItemMainImage(this.itemId,image.id).subscribe(() =>{
      this.currentMainPic = _.findWhere(this.images, {isProfilePic:true});
      this.currentMainPic.isProfilePic = false;
      image.isProfilePic = true;
      this.snoty.success("Image set as main image","Success");
      this.getItemImageChange.emit(image.url);
    }, error =>{
      this.snoty.error("Something went wrong.","Error");
    }
    
    );
  }

  deleteImage(image){
    this.snoty.confirm('Are you sure you want to delete image', 'Confirm', {
      timeout: 5000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {text: 'Yes', action: (toast) => {this.doDelete(image); this.snoty.remove(toast.id); }, bold: true},
        {text: 'No', action: (toast) => {console.log('Clicked: No'); this.snoty.remove(toast.id); }, bold: true},
      ]
    });
  }

  doDelete(image){
    this.serverCall.deleteItemImage(this.itemId,image.id).subscribe(() =>{
      this.currentMainPic = _.findWhere(this.images, {isProfilePic:true});
      this.images.splice(_.findIndex(this.images, { id: image.id }, 1));
      this.snoty.success("Image has been deleted.","Success");
    }, error =>{
      this.snoty.error("Something went wrong.","Error");
    }
    
    );
  }

  SuccessHandel(data){
    this.snoty.success("Image set as main image","Success");
  }

  handleErrors(){
    console.log("error");
  }

}
