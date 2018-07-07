import { Component, OnInit } from '@angular/core';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from '../../../services/auth.service';
import { Pagination } from '../../../_models/pagination';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages-component',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: any[];
  resBody: any;
  currentPage = 1;
  itemsPerPage = 6;
  messageContainer = 'unread';
  pagination: Pagination;
  
  constructor(private serverCalls: ServerCallsService, private snoty: SnotifyService, private _auth: AuthService) { }

  ngOnInit() {
    this.messageContainer = 'unread';
    this.loadItems();
  }

  loadItems(){
    this.serverCalls.getMessages(this._auth.getId(),this.currentPage, this.itemsPerPage, this.messageContainer).subscribe(
      res => { 
	      this.resBody = res.body;
        this.SuccessHandel(this.resBody);
        console.log(res.headers.get('Pagination'));	
        if(res.headers.get('Pagination') != null)
        {
          var paginHeaders = res.headers.get('Pagination');
          this.pagination = JSON.parse(paginHeaders);
          console.log(this.pagination);
        }		  
      },
      err => {
	      this.handleErrors(err);
      }
   );
  }

  SuccessHandel(data){
    this.messages = [];
    this.messages = data;
    console.clear();
    console.log(data[0].aboutItem.user.id);
    
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error("Something went wrong, Please try again later.", "Error");
  }

  pageChanged(event: any): void{
    this.currentPage = event.page;
    this.loadItems();
  }

  deleteMessage(id)
  {
    this.serverCalls.delMessage(this._auth.getId(),+id).subscribe(
      data => {
        this.messages.splice(_.findIndex(this.messages,{id: id}),1);
        this.snoty.success("Message deleted.", "Success");
        this.loadItems();
      },
      error => this.handleErrors(error)
    );
  }

}
