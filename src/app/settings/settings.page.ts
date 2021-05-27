import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PrivacyData } from '../models/users.interface';
import { AuthService } from '../providers/auth.service';
import { SettingsService } from '../providers/settings.service';
import { UsuariosProvider } from '../providers/usuarios.service';
import { DBRefactor } from '../refactors/refactor';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  //We preset initial values because time response from database is longer than HTML compiling time.
  actualPrivacy: PrivacyData = {
    age: true,
    name: true
  };
  updatedPrivacy: PrivacyData = this.actualPrivacy;

  settingsSus: Subscription;
  displayNameSus: Subscription;
  updateSettingsSus: Subscription;

  constructor(
    private auth: AuthService,
    private userService: UsuariosProvider,
    private settingsService: SettingsService,
    private dbRefactor: DBRefactor
  ) { 
   
  }

  async ngOnInit() {
    this.displayNameSus = (await this.userService.getActualUser()).subscribe(data => {
      this.settingsSus = this.settingsService.connectToDB(data.displayName).subscribe(data => {
        this.actualPrivacy = data;
        this.updatedPrivacy = this.actualPrivacy;
      });
    })
    
  }

  setPrivacyAge(ev){
    this.updatedPrivacy.age = ev.detail.checked;
  }

  setPrivacyName(ev){
    this.updatedPrivacy.name = ev.detail.checked;
  }

  async ionViewWillLeave(){
    this.updateSettingsSus = (await this.userService.getActualUser()).subscribe(data => {
      this.settingsService.updateSettings(data.displayName, this.updatedPrivacy);
    }) 
  }

  ionViewDidLeave(){
   this.dbRefactor.disconnectFromDB(this.settingsSus);
   this.dbRefactor.disconnectFromDB(this.displayNameSus);
   this.dbRefactor.disconnectFromDB(this.updateSettingsSus);
  }

  logOut(){
    this.auth.doLogout();  
  }

  deleteAccount(){
    
    this.userService.deleteUser();
  }


}
