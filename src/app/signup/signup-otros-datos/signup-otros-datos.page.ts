import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroRefactor } from '../../refactors/refactor/refactor';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { CredencialesI, UsuariosI } from 'src/app/models/users.interface';
import { AlertasRefactor } from '../../refactors/refactor/refactor'
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
    
    //console.log(this.users)
    SignupOtrosDatosPage.userStatic = this.users;
    //console.log(SignupOtrosDatosPage.userStatic);
    
  }

  signUpForm = new FormGroup({
    displayName: new FormControl('', {
      validators: Validators.compose([
      //SignupOtrosDatosPage.nickDuplicado,
      //SignupOtrosDatosPage.espaciosEnBlanco,
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),])
        
    }),
    name: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    birthDate: new FormControl('', Validators.required), 
  })
  

  //MENSAJES DE ERROR
  validation_messages = {
    'displayName': [
        { type: 'required', message: 'Necesitamos un nombre de usuario. El único Hombre Sin Nombre es Clint Eastwood.' },
        { type: 'minlength', message: 'Venga va, cúrrate algo un poquito más largo.' },
        { type: 'maxlength', message: '¡Pero sin pasarse! ¡Quita algunas letras!' },
        //{ type: 'espaciosEnBlanco', message: '¿Cuándo has visto un nombre de usuario con espacios?' },
        //{ type: 'nickDuplicado', message: 'Ese nombre me suena... ¡Te lo han robado! Vas a tener que probar con otro.' }
      ],
      'name': [
        { type: 'required', message: 'Necesito también tu nombre verdadero... ¡No sólo voy a llamarte por tu "alter ego"!' }
      ],
      'birthDate':[
        { type: 'required', message: '¿No quieres que te felicite por tu cumple?' }
      ]   
    }

  /**
   * Aqui podemos obtener de manera separada los datos del primer paso
   * del signup y los del segundo, y podemos unirlos en un solo dato
   */
  recibirDatosForm(form){
    this.refactor.recibirDatosSecundarios(form);
    const detalles = this.refactor.obtenerFormFinal();
    this.signup(detalles);
    
  }

  
  async duplicatedNickName(fc: FormControl){
    
    const displayName: string = "juan";
    //displayName.trim();
    const usersNickName: Array<string> = this.userProvider.compruebaDatosDeUsuarios("displayName");
    console.log(usersNickName)
    var a = [];
    usersNickName.forEach((x) =>{
      
        a.push(x.indexOf(fc.value));
      
    });
    console.log(a);
    
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
      displayName: datosSecun.displayName
    }

    //Intentamos el registro
    this.authService.registerUser(datosSecun, user.email, user.password, credencial);
    
    
  }

  static noValido = /\s/

  /**
   * 
   * @param fc 
   * @todo REVISAR CODIGO, LA PAGINA NO LEE EL INCLUDES
   */
  static nickDuplicado(fc: FormControl){
    if (SignupOtrosDatosPage.userStatic.includes(fc.value)){
      return ({nickDuplicado: false});
    }else{
      return ({nickDuplicado: true});
    }
  }
  /**
   * 
   * @param fc 
   * @todo REVISAR CODIGO, LA PAGINA NO LEE EL INCLUDES
   */
  static espaciosEnBlanco(fc: FormControl){
    if (SignupOtrosDatosPage.noValido.test(fc.value)){
      return ({nickDuplicado: true});
    }else{
      return ({nickDuplicado: false});
    }
  }
}
