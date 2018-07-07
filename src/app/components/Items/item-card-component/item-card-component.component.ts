import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SnotifyService } from 'ng-snotify';
import { ServerCallsService } from '../../../services/server-calls.service';

@Component({
  selector: 'app-item-card-component',
  templateUrl: './item-card-component.component.html',
  styleUrls: ['./item-card-component.component.css']
})
export class ItemCardComponentComponent implements OnInit {

  @Input() item: any;
  @Input() isHome: boolean;
  constructor(private _auth: AuthService, private snoty: SnotifyService, private serverCalls: ServerCallsService) { }

  ngOnInit() {
  }

  addFavorite(id)
  {
    if(this._auth.isLoggedin() == true)
    {
      this.serverCalls.addFavorite(this._auth.getId(),id).subscribe(
        data => this.SuccessHandel(data),
        error => this.handleErrors(error)
      );
    }else{
      this.snoty.info('Please login to add items to favorites.','Please login');
    }

  }

  SuccessHandel(data){
    this.snoty.success('Item added to favourites','Success');
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error(error.error, "Error");
  }

  isFav(){
    return this.isHome;
  }
}
