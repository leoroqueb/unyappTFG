import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CredencialesI, UsuariosI } from 'src/app/models/users.interface';
import { AuthService } from '../../providers/auth.service'
import { RegistroRefactor } from '../../refactors/username/refactor'
import { UsuariosProvider } from '../../providers/usuarios'

@Component({
  selector: 'app-google-sign-up',
  templateUrl: './google-sign-up.page.html',
  styleUrls: ['./google-sign-up.page.scss'],
})
export class GoogleSignUpPage {
  credencial$ : Observable<CredencialesI> = this.authService.afireauth.user; 
  
  constructor(
    private authService: AuthService,
    private userProv: UsuariosProvider,
    private refactor: RegistroRefactor
  ) { }

  Form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required), 
  },{updateOn: 'change'})

  recibirDatosForm(form, email, displayName, uid){
    const aux = this.refactor.recibirDatosGoogle(form);
    const usuario:UsuariosI = {
      uid: uid.value,
      email: email.value,
      displayName: displayName.value,
      name: aux[0],
      lastName: aux[1],
      birthDate: aux[2] 
    }
    this.userProv.addUsuario(usuario);
  }
  
  cancel(){
    this.authService.doLogout();
  }
  
}
