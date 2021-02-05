import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service'
import { CredencialesI, UsuariosI } from '../models/users.interface'
import { NavController } from '@ionic/angular';
import { UsuariosProvider } from '../providers/usuarios'
import { AlertasRefactor } from '../refactors/username/refactor'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  userDetail: CredencialesI;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    public auth: AuthService,
    public userProvider: UsuariosProvider,
    private authService: AuthService,
    private alerta: AlertasRefactor
    ) {}

    //PENDIENTE DE REVISION PARA ELIMINAR
    usuario: UsuariosI = {
      uid:"DJyxDzfN4SXoDCjGpqOndXaFVVD3",
      displayName: "paco",
      name: "prueba",
      lastName: "prueba2",
      email: "juan@gmail.com",
      birthDate: null,
    };

    loginForm = new FormGroup({
      email: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
         Validators.minLength(6),
         Validators.required,
      ]))
    })

  async onSubmit(email, password){
      //Iniciamos sesion en firebase
      try{
        
      const logged = await this.auth.loginUser(email.value, password.value);
      
      if(logged){
        
        //const isVerified = this.authService.isEmailVerified(logged);
        this.redirectUser(true);
        
      }
    } catch (error) {  
      console.log(error)
    }
  }

  redirectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/nonverify']);
    }

  }

  async googleLogIn(){
    
    await this.auth.googleLogIn();
    
  }

  
}
