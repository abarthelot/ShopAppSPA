import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseInfoService } from '../../../services/base-info.service';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from 'ng-snotify';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  userId: number;
  public uploader:FileUploader = new FileUploader({});
  baseUrl = this.baseInfo.serverUrl();
  @Output() getItemImageChange = new EventEmitter<string>();

  constructor(private baseInfo: BaseInfoService, private serverCall: ServerCallsService, private snoty: SnotifyService, private _auth: AuthService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.serverCall.getUserDetails().subscribe(
      data => this.SuccessHandel(data),
      error => this.handleErrors(error)
    );
  }

  handleErrors(error){
    this.snoty.error("Registration failed.", "Error");
  }

  SuccessHandel(data) {
    console.log(data);
    console.clear();
    this.user = data
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.user.id + '/images',
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
        this._auth.changeUserImage(res.url);
        this._auth.user.photoUrl = res.url;
        localStorage.setItem('user', JSON.stringify(this._auth.user));
      }
    };
  }

}
