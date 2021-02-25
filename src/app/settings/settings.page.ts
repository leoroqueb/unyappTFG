import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    
  }

  cerrarSesion(){
    
    this.auth.doLogout();  
  }

}
