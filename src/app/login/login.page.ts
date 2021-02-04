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
      displayName: "",
      name: "",
      lastName: "",
      email: "",
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
    try{
      
      //Iniciamos sesion en firebase
      const logged = await this.auth.loginUser(email.value, password.value);
      if(logged){
        const isVerified = this.authService.isEmailVerified(logged);
        this.redirectUser(isVerified)
        
      }
    } catch (error) {  
      console.log(error)
    }
  }

  async googleLogIn(email, password){
    const logged = await this.auth.googleLogIn()
    if(logged){
      const isVerified = this.authService.isEmailVerified(logged);
      this.redirectUser(isVerified)
      console.log("Sesion iniciada correctamente con Google", logged);
    }
  }

  redirectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/nonverify']);
    }

  }
}
