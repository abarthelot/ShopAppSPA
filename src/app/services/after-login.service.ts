import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var isUserLoggedIn = this._auth.isLoggedin();
    if (!isUserLoggedIn) {
      this.router.navigate(['/home'])
    }
    return isUserLoggedIn;
  }
  constructor(private _auth: AuthService, private router: Router) { }
}
