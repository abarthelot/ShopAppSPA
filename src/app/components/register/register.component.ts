import { Component, OnInit } from '@angular/core';
import { ServerCallsService } from '../../services/server-calls.service';
import { SnotifyModule, SnotifyService } from "ng-snotify";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { log } from 'util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private servercalls: ServerCallsService, private snoty: SnotifyService) { }

  ngOnInit() {
  }
   password_confirmation= null;

  public form = {
    username: '',
    email: '',
    password: ''
  };

  public error = null;
  public emailError = null;
  public invalidEmail = null;

  public usernameError = null;

  onSubmit(){
    if(this.password_confirmation == this.form.password){
      this.servercalls.register(this.form).subscribe(
        data => this.signupSuccessHandel(data),
        error => this.handleErrors(error)
      );
    }else{
      this.snoty.error("Password & Password Confirmation doesn't match.", "Error");
    }
    
  }
  validateUsenameFire(){
    if(this.usernameError){
      this.usernameError = null;
    }
  }

  validateEmailFire(){
    console.log(this.validateEmail(this.form.email));
    
    if(this.validateEmail(this.form.email) == false){
      console.log("inside if");
      
      this.invalidEmail = true;
    }else{
      this.invalidEmail = false;
    }
    if(this.emailError){
      this.emailError = null;
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleErrors(error){
    console.log(error.error.hasOwnProperty("Email"));
    if(error.error.hasOwnProperty("Email")){
      this.emailError = error.error['Email'][0];
    }else{
      this.emailError = null;
    }

    if(error.error.hasOwnProperty("Username")){
      this.usernameError = error.error["Username"][0];
    }else{
      this.usernameError = null;
    }
    
    console.log(error.error['Email'][0]);
    
    this.snoty.error("Registration failed.", "Error");
  }

  signupSuccessHandel(data) {
    //this.token.handel(data.access_token);
    //this.router.navigateByUrl('/userhome');
  }

}
