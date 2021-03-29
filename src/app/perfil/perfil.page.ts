import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.interface';
import { UsuariosProvider } from '../providers/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  typeOfPlayer: string = "";
  birthDate: string = "";
  profileConnection: Subscription;
  constructor(
    
    private userService: UsuariosProvider
  ) { }

  ngOnInit() {
  }

  changeTypeOfPlayer(ev): void{
    this.typeOfPlayer = ev.detail.value;
  }

  changeBirthDate(ev): void{
    this.birthDate = ev.detail.value;
  }

  saveChanges(){
    this.userService.getActualUser().then(connection => 
      this.profileConnection = connection.subscribe(user =>{
        let reformatedDate = this.birthDate.substring(0,10);
        let updatedData: UsuariosI = {
          displayName: user.displayName,
          email: user.email,
          lastName: user.lastName,
          name: user.name,
        }
        if(this.birthDate != "" && this.typeOfPlayer != ""){
          updatedData.birthDate = reformatedDate;
          updatedData.typeOfPlayer = this.typeOfPlayer;
          this.userService.updateUsuario(updatedData);
        }else if(this.birthDate == "" && this.typeOfPlayer != ""){
          updatedData.typeOfPlayer = this.typeOfPlayer;
          this.userService.updateUsuario(updatedData);
        }else if(this.birthDate != "" && this.typeOfPlayer == ""){
          updatedData.birthDate = reformatedDate;
          this.userService.updateUsuario(updatedData);
        }
        
      })
    )
  }

  changeFavGames(){
    //TODO
  }

  changeOtherGames(){
    //TODO
  }
 
  ionViewDidLeave(){
    this.profileConnection.unsubscribe();   
  }

}
