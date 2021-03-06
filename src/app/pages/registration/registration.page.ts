import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication-service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(){}

  signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)      
      .then((res) => {
        // Do something here
        console.log('Hi daniel torres g');
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
