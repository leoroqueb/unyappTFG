import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service'
import { CredencialesI, UsuariosI } from '../models/users.interface'
import { NavController } from '@ionic/angular';
import { UsuariosProvider } from '../providers/usuarios'
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
    private authService: AuthService
    ) {}
    usuario: UsuariosI = {
      nick: "",
      name: "",
      lastName: "",
      email: "",
      birthDate: null,
    };

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  async onSubmit(user){
    this.userDetail = {
      email: user.value.email,
      password: user.value.password,
    }
    try{
    await this.auth.loginUser(this.userDetail);
    (await this.userProvider.getActualUser()).pipe(take(1)).toPromise()
    .then(usuario => {
      this.usuario = usuario;
      this.navCtrl.navigateRoot('/home');
    });
    
  } catch (error) {  }
  }

  ngOnInit() {
    
  }
}
