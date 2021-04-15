import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { UsuariosProvider } from '../providers/usuarios.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private auth: AuthService,
    private userService: UsuariosProvider,
  ) { }

  ngOnInit() {
    
  }

  logOut(){
    this.auth.doLogout();  
  }

  deleteAccount(){
    this.userService.deleteUser();
    
  }


}
