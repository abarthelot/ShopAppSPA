import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/users/register/register.component';
import { BeforeLoginService } from './services/before-login.service';
import { HomeComponent } from './components/home/home.component';
import { FavouritesComponent } from './components/items/favourites/favourites.component';
import { AfterLoginService } from './services/after-login.service';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { ItemDetailsComponent } from './components/items/item-details/item-details.component';
import { PerchaseHistoryComponent } from './components/users/perchase-history/perchase-history.component';
import { ItemEditComponentComponent } from './components/Items/item-edit-component/item-edit-component.component';
import { OnlyOwnerServiceService } from './services/only-owner-service.service';
import { MessagesComponent } from './components/users/messages/messages.component';
import { MessagesThreadComponent } from './components/users/messages-thread/messages-thread.component';


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
    path: "item-details/:id",
    component: ItemDetailsComponent,
    canActivate: []
  },
  {
    path: "item-edit/:id",
    component: ItemEditComponentComponent,
    canActivate: [OnlyOwnerServiceService]
  },
  {
    path: "perchase-history",
    component: PerchaseHistoryComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: "messages",
    component: MessagesComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: "msg_thread/:rId/:iId",
    component: MessagesThreadComponent,
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
