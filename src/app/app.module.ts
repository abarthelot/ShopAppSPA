import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { MaterialModule } from './material.module';
import { NavComponent } from './components/nav/nav.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BaseInfoService } from './services/base-info.service';
import { ServerCallsService } from './services/server-calls.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './/app-routing.module'
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AlertifyService } from './services/alertify.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PerchaseHistoryComponent } from './components/perchase-history/perchase-history.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { RequestResponseComponent } from './components/password/request-response/request-response.component';



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
    RequestResponseComponent
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
    BsDropdownModule.forRoot()
  ],
  providers: [BaseInfoService, 
                ServerCallsService, 
                {provide: 'SnotifyToastConfig', useValue:ToastDefaults }, 
                SnotifyService, AlertifyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
