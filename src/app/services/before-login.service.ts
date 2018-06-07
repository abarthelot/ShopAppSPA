import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var isUserLoggedIn = this._auth.isLoggedin();
    if (isUserLoggedIn) {
      this.router.navigate(['/home'])
    }
    return !isUserLoggedIn;
  }
  constructor(private _auth: AuthService, private router: Router) { }
}
