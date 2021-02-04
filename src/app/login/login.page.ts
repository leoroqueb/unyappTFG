import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service'
import { CredencialesI, UsuariosI } from '../models/users.interface'
import { NavController } from '@ionic/angular';
import { UsuariosProvider } from '../providers/usuarios'
import { AlertasRefactor } from '../refactors/username/refactor'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  userDetail: CredencialesI;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    public auth: AuthService,
    public userProvider: UsuariosProvider,
    private authService: AuthService,
    private alerta: AlertasRefactor
    ) {}
    usuario: UsuariosI = {
      displayName: "",
      name: "",
      lastName: "",
      email: "",
      birthDate: null,
      //valor opcional
      emailVerified: false,
    };

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  async onSubmit(email, password){
    try{
      
      //Iniciamos sesion en firebase
      const logged = await this.auth.loginUser(email.value, password.value);
      if(logged){
        const isVerified = this.authService.isEmailVerified(logged);
        this.router.navigate(['/home']);
      }
    } catch (error) {  
      console.log(error)
    }
  }

  async googleLogIn(email, password){
    const logged = await this.auth.googleLogIn()
    if(logged){
      console.log("Sesion iniciada correctamente con Google", logged);
    }
  }

  ngOnInit() {
    
  }
}
