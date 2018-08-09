import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseInfoService } from '../../../services/base-info.service';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from 'ng-snotify';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({});
  baseUrl = this.baseInfo.serverUrl();

  constructor(private baseInfo: BaseInfoService, private serverCall: ServerCallsService, private snoty: SnotifyService, private _auth: AuthService) { }

  ngOnInit() {
  }

  item = {
    title: null,
    description: null,
    shipingCountry: null,
    postalCode: null,
    unitPrice: null,
    quantity: null,
    otherUrl: null,
    file: File = null,
    fileName: null,

  }

  onFileSelected(event){
    console.log(event);

    this.item.file = <File>event.target.files[0];
    this.item.fileName = this.item.file.name;
  }

  onUpload(){
    console.log(this.item);
    this.item.quantity = parseInt(this.item.quantity);
    this.item.file = JSON.stringify(this.item.file);
     this.serverCall.addItem(this.item).subscribe(
      data => this.afterSave(data)
    );
  }

  afterSave(data){
    console.log(data)
    document.location.href = `${this.baseInfo.baseUrl()}item-image-add/`+data.id;
  }


}
