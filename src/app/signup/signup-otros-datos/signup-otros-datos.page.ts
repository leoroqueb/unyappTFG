import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroRefactor } from '../../refactors/refactor/refactor';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { CredencialesI, UsuariosI } from 'src/app/models/users.interface';
import { AlertasRefactor } from '../../refactors/refactor/refactor'
import { Observable } from 'rxjs';
import { UsuariosProvider } from 'src/app/providers/usuarios';

@Component({
  selector: 'app-signup-otros-datos',
  templateUrl: './signup-otros-datos.page.html',
  styleUrls: ['./signup-otros-datos.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class SignupOtrosDatosPage implements OnInit {
  public users: Array<string>;
  static userStatic: Array<string>;
  constructor(
    public refactor: RegistroRefactor,
    public authService: AuthService,
    public router: Router,
    private userProvider: UsuariosProvider,
    public alerta: AlertasRefactor,
    
  ) { 
    
  }

  ngOnInit() {
    this.users = this.userProvider.compruebaDatosDeUsuarios("displayName");
   
    SignupOtrosDatosPage.userStatic = this.users;
  }

  signUpForm = new FormGroup({
    displayName: new FormControl('', Validators.compose([
      SignupOtrosDatosPage.nickDuplicado,
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])),
    name: new FormControl('', Validators.required),
    lastName: new FormControl(''),
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
      hasEverLogged: true
    }

    //Creamos el CredentialI con datos de ambos form
    const credencial: CredencialesI = {
      email: user.email,
      emailVerified: false,
      displayName: datosSecun.displayName
    }

    //Intentamos el registro
    const registered = this.authService.registerUser(datosSecun, user.email, user.password);
    
    //Si no es null (por lo tanto, esta bien hecho)
    if(registered){

      //Actualizamos las BD y vamos al login para que el usuario se loguee
      // MAS ADELANTE PODREMOS IR DIRECTAMENTE AL HOME CON EL USUARIO LOGUEADO
      this.authService.updateCredencialData(credencial)
      this.alerta.alerta("Cuenta registrada correctamente", "Éxito");
      this.router.navigateByUrl('/login')
    }
  }

  static nickDuplicado(fc: FormControl){
    if (SignupOtrosDatosPage.userStatic.includes(fc.value)){
      return ({nickDuplicado: true});
    }else{
      return (null);
    }
  }
}
