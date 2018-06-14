import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { MaterialModule } from './material.module';
import { NavComponent } from './components/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BaseInfoService } from './services/base-info.service';
import { ServerCallsService } from './services/server-calls.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/users/register/register.component';
import { AppRoutingModule } from './/app-routing.module'
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertifyService } from './services/alertify.service';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { PerchaseHistoryComponent } from './components/users/perchase-history/perchase-history.component';
import { FavouritesComponent } from './components/items/favourites/favourites.component';
import { RequestResetComponent } from './components/users/password/request-reset/request-reset.component';
import { RequestResponseComponent } from './components/users/password/request-response/request-response.component';
import { UserListComponentComponent } from './components/users/user-list-component/user-list-component.component';
import { ItemCardComponentComponent } from './components/items/item-card-component/item-card-component.component';
import { ItemDetailsComponent } from './components/items/item-details/item-details.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from 'ngx-gallery';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UserDetailsComponent,
    PerchaseHistoryComponent,
    FavouritesComponent,
    ItemDetailsComponent,
    RequestResetComponent,
    RequestResponseComponent,
    UserListComponentComponent,
    ItemCardComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    SnotifyModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
                BaseInfoService, 
                ServerCallsService, 
                {provide: 'SnotifyToastConfig', useValue:ToastDefaults }, 
                SnotifyService, 
                AlertifyService 
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
