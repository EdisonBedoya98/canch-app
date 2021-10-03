import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';

import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

logInWithGoogle(){
  this.authService.loginGoogle().then(()=>{
      //Redireccionar a la pagina que va luego de haberse logueado
      this.router.navigate(['canchas']);          
  
  }).catch((error)=>{
    this.alertMessage('Error','Ocurrió un error, comuniquese con el administrador');
  });
}


  logIn(email, password) {
    if(email.value=='' || password.value==''){
       this.alertMessage('¡Importante!','Por favor ingrese todos los campos');
    }else{
       this.authService.SignIn(email.value, password.value)
      .then(() => {
        if(this.authService.isEmailVerified) {
          //Redireccionar a la pagina que va luego de haberse logueado
          this.router.navigate(['canchas']);          
        } else {
          this.alertMessage('¡Importante!','Email no verificado');
          return false;
        }
      }).catch((error) => {
        console.log(error)
        this.alertMessage('Error','Usuario no registrado');
      })

    }
   
  }

  async alertMessage(header:string,message:string){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
}
