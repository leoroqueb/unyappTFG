import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CredencialesI, UsuariosI } from 'src/app/models/users.interface';
import { AuthService } from '../../providers/auth.service'
import { AlertasRefactor, RegistroRefactor } from '../../refactors/refactor'
import { UsuariosProvider } from '../../providers/usuarios'
import { Router } from '@angular/router';

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
    private refactor: RegistroRefactor,
    private alerta: AlertasRefactor,
    private router: Router
  ) { }

  Form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    birthDate: new FormControl('', Validators.required), 
  },{updateOn: 'change'});

  //MENSAJES DE ERROR
  validation_messages = {
    'displayName': [
        { type: 'required', message: 'Necesitamos un nombre de usuario. El único Hombre Sin Nombre es Clint Eastwood.' },
        { type: 'minlength', message: 'Venga va, cúrrate algo un poquito más largo.' },
        { type: 'maxlength', message: '¡Pero sin pasarse! ¡Quita algunas letras!' },
        { type: 'pattern', message: 'Mi código fuente no es capaz de interpretar espacios' },
      ],
      'name': [
        { type: 'required', message: 'Necesito también tu nombre verdadero... ¡No sólo voy a llamarte por tu "alter ego"!' },
        { type: 'pattern', message: 'Dudo que tu nombre tenga números o caracteres raros (a no ser que seas un robot)' }
      ],
      'birthDate':[
        { type: 'required', message: '¿No quieres que te felicite por tu cumple?' }
      ]   
    }

  getDataFromForm(form, email, displayName, uid){
    const aux = this.refactor.transformGoogleData(form);
    const usuario:UsuariosI = {
      uid: uid.value,
      email: email.value,
      displayName: displayName.value,
      name: aux[0],
      lastName: aux[1],
      birthDate: aux[2],
    }
    let promiseDuplicated = this.userProv.duplicatedData(usuario.displayName, "displayName");
    promiseDuplicated.then((isDuplicated) =>{
      if(isDuplicated == true){
        this.alerta.alerta("Lo sentimos, ese nombre de usuario ya está cogido. ¡Dale al coco! ;)", "Error");
      }else{
        this.userProv.addUsuario(usuario);
        this.router.navigate(['/home']);
      }
    })
    .catch((error) => console.log(error))
    
  }
  
  cancel(){
    this.authService.doLogout();
  }
  
}
