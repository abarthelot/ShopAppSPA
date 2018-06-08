import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { BeforeLoginService } from './services/before-login.service';
import { HomeComponent } from './components/home/home.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { AfterLoginService } from './services/after-login.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { PerchaseHistoryComponent } from './components/perchase-history/perchase-history.component';


const appRoutes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: []
  },
  {
    path: "",
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: []
  },
  {
    path: "favourites",
    component: FavouritesComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: "user-details",
    component: UserDetailsComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: "item-details",
    component: ItemDetailsComponent,
    canActivate: []
  },
  {
    path: "perchase-history",
    component: PerchaseHistoryComponent,
    canActivate: [AfterLoginService]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
