import { Component, OnInit } from '@angular/core';
import { ServerCallsService } from '../../services/server-calls.service';
import { SnotifyService } from "ng-snotify";

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

  handleErrors(error){
    this.snoty.error(error.error.error, "Error");
  }

  signupSuccessHandel(data) {
    //this.token.handel(data.access_token);
    //this.router.navigateByUrl('/userhome');
  }

}
