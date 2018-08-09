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
import { ItemEditComponentComponent } from './components/Items/item-edit-component/item-edit-component.component';
import { ItemImageEditorComponentComponent } from './components/Items/item-image-editor-component/item-image-editor-component.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MessagesComponent } from './components/users/messages/messages.component';
import { MessagesThreadComponent } from './components/users/messages-thread/messages-thread.component';
import { ShopingCartComponent } from './components/cart/shoping-cart/shoping-cart.component';
import { AddItemComponent } from './components/Items/add-item/add-item.component';
import { CheckOutComponent } from './components/cart/check-out/check-out.component';
import { ItemImageComponent } from './components/Items/item-image/item-image.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';



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
    ItemCardComponentComponent,
    ItemEditComponentComponent,
    ItemImageEditorComponentComponent,
    TimeAgoPipe,
    MessagesComponent,
    MessagesThreadComponent,
    ShopingCartComponent,
    AddItemComponent,
    CheckOutComponent,
    ItemImageComponent,
    CartItemComponent
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
    NgxGalleryModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot()
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
