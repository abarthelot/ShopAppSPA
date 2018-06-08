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



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
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
