import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { BeforeLoginService } from './services/before-login.service';
import { HomeComponent } from './components/home/home.component';


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
