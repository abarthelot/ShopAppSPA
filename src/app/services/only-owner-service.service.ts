import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import { ServerCallsService } from './server-calls.service';
import { SnotifyService } from 'ng-snotify';


@Injectable({
  providedIn: 'root'
})
export class OnlyOwnerServiceService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var isUserLoggedIn = this._auth.isLoggedin();
    var userId = this._auth.getId();
    var itemId = route.params['id'];
    var itemOwner = null;
    this._serverCalls.getItemOwner(+itemId).subscribe(
      data => this.handle(data, isUserLoggedIn, userId, itemId),
      error => this.error(itemId)
    );
    
    return isUserLoggedIn;
  }
  constructor(private _auth: AuthService, private snoty: SnotifyService, private router: Router, private _serverCalls: ServerCallsService) { }

  handle(data, isUserLoggedIn, userId, itemId){
    var itemOwner = data;
    if (!isUserLoggedIn) {
      this.router.navigate(['/item-details/'+itemId]);
    }else if(itemOwner != userId){
      this.snoty.error("You are not the owner of this item.", "Error");
      this.router.navigate(['/item-details/'+itemId]);  
    }
  }

  error(itemId){
    this.snoty.error("Failed to load, Please try again later.", "Error");
    this.router.navigate(['/item-details/'+itemId]);
  }

}