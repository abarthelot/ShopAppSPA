import { Component, OnInit } from '@angular/core';
import { ServerCallsService } from '../../services/server-calls.service';
import { SnotifyModule, SnotifyService } from "ng-snotify";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any[];

  constructor(private serverCalls: ServerCallsService, private snoty: SnotifyService) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems(){
    this.serverCalls.getItems().subscribe(
      data => this.SuccessHandel(data),
      error => this.handleErrors(error)
    );
  }

  SuccessHandel(data){
    this.items = data;
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error("Failed to load, Please try again later.", "Error");
  }

}
