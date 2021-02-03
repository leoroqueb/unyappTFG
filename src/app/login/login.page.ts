import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service'
import { CredencialesI, UsuariosI } from '../models/users.interface'
import { NavController } from '@ionic/angular';
import { HomePage } from '../home/home.page';


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
    private authService: AuthService
    ) {}
    user: UsuariosI = {
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

  onSubmit(user){
    this.userDetail = {
      email: user.value.email,
      password: user.value.password,
    }
    try{
    this.authService.doLogin(this.userDetail)
    .then(usuario =>{
      user = usuario;
      this.router.navigate(['/home']); 
    });    
    }catch(error){
      alert(error);
    }
  }

  ngOnInit() {
    
  }
}
