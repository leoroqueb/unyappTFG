import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroRefactor } from './../../refactors/username/refactor';
import { AuthService } from '../../providers/auth.service';
import { UsernamePage } from './../../refactors/username/username.validator.page';
import { Router } from '@angular/router';
import { CredencialesI, UsuariosI } from 'src/app/models/users.interface';
import { AlertasRefactor } from './../../../app/refactors/username/refactor'

@Component({
  selector: 'app-signup-otros-datos',
  templateUrl: './signup-otros-datos.page.html',
  styleUrls: ['./signup-otros-datos.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class SignupOtrosDatosPage implements OnInit {
  
  constructor(
    public refactor: RegistroRefactor,
    public authService: AuthService,
    public router: Router,
    public alerta: AlertasRefactor
  ) { }

  ngOnInit() {
  }

  signUpForm = new FormGroup({
    displayName: new FormControl('', Validators.compose([
      //UsernamePage.validUsername,
      Validators.required
    ])),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required), 
  })

  /**
   * Aqui podemos obtener de manera separada los datos del primer paso
   * del signup y los del segundo, y podemos unirlos en un solo dato
   */
  recibirDatosForm(form){
    this.refactor.recibirDatosSecundarios(form);
    const detalles = this.refactor.obtenerFormFinal();
    this.signup(detalles);
    
  }
  
  signup(user) {

    //Sacamos todos los datos secundarios
    const datosSecun: UsuariosI = {
      name: user.name,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email,
      birthDate: user.birthDate,
    }

    //Creamos el CredentialI con datos de ambos form
    const credencial: CredencialesI = {
      email: user.email,
      emailVerified: false,
      displayName: user.displayName
    }

    //Intentamos el registro
    const registered = this.authService.registerUser(datosSecun, user.email, user.password);
    
    //Si no es null (por lo tanto, esta bien hecho)
    if(registered){

      //Actualizamos las BD y vamos al login para que el usuario se loguee
      // MAS ADELANTE PODREMOS IR DIRECTAMENTE AL HOME CON EL USUARIO LOGUEADO
      this.authService.updateCredencialData(credencial)
      this.alerta.alerta("Cuenta registrada correctamente", "Éxito");
      this.router.navigateByUrl('/')
    }
  }
}
