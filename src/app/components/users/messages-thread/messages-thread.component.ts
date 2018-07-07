import { Component, OnInit } from '@angular/core';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from 'ng-snotify';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import * as _ from 'underscore';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-messages-thread',
  templateUrl: './messages-thread.component.html',
  styleUrls: ['./messages-thread.component.css']
})
export class MessagesThreadComponent implements OnInit {

  messages: any[];
  userId: number;
  otherUser: number;
  aboutItem: number;
  itemTitle: string;
  newMessage: any = {};

  constructor(private serverCalls: ServerCallsService, private snoty: SnotifyService, private route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit() {
    this.userId = this._auth.getId();
    this.otherUser = +this.route.snapshot.params['rId'];
    this.aboutItem = +this.route.snapshot.params['iId'];
    this.loadMessageThread();
  }

  loadMessageThread(){
    this.serverCalls.getThread(this._auth.getId(),+this.route.snapshot.params['rId'],+this.route.snapshot.params['iId'])
    .do(data =>{
      _.each(data, (message: any) => {
        if(message.isRead == false && message.recipientId == this.userId)
        {
          this.serverCalls.markMessageAsRead(this.userId, message.id);
        }
      });
    })
    .subscribe(
      data => this.SuccessHandel(data),
      error => this.handleErrors(error)
    );
  }

  SuccessHandel(data){
    console.clear();
    this.messages = data;
    console.log(data);
    this.itemTitle = data[0].aboutItem.title;
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error("Failed to load, Please try again later.", "Error");
  }

  sendMessage(){
    this.newMessage.senderId = this.userId;
    this.newMessage.recipientId = this.otherUser;
    this.newMessage.aboutItemId = this.aboutItem;

    this.serverCalls.sendMessage(this.userId, this.newMessage).subscribe(
      data => this.sendSuccessHandel(data),
      error => this.handleErrors(error)
    );
  }

  sendSuccessHandel(data){
    this.messages.unshift(data);
    console.log(data);
    this.newMessage.content = '';
  }


}
