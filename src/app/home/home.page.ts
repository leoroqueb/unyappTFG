import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios'
import { AuthService } from '../providers/auth.service'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuarios: UsuariosI[];
  observer: Subscription
  constructor(
    private userService: UsuariosProvider,
    private auth: AuthService,
    private navCtrl: NavController
  ) {}

  
  ionViewCanLeave(){
    
  }
  
  ngOnInit(){
    this.userService.getUsers().subscribe(res =>{
      //console.log('usuarios', res);
    })
  }

  cerrarSesion(){
    this.auth.doLogout();
    
  }

}
