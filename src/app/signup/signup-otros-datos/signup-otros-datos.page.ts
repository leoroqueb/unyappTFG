import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroRefactor } from '../../refactors/refactor';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { CredencialesI, UsuariosI } from 'src/app/models/users.interface';
import { AlertasRefactor } from '../../refactors/refactor'
import { UsuariosProvider } from 'src/app/providers/usuarios.service';
import { App } from '@capacitor/core';

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
      Validators.required,
      Validators.pattern("[A-Za-z0-9]+"),
      Validators.minLength(4),
      Validators.maxLength(15),])
        
    }),
    name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[A-Za-z]+")
    ])),
    lastName: new FormControl(''),
    birthDate: new FormControl('', Validators.required), 
  })
  

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

  /**
   * Aqui podemos obtener de manera separada los datos del primer paso
   * del signup y los del segundo, y podemos unirlos en un solo dato
   */
  getDataFromForm(form){
    this.refactor.transformSecondaryData(form);
    const detalles = this.refactor.getFinalForm();
    this.signUp(detalles);
    
  }
  
  signUp(user) {
    try {
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

      let promiseDuplicated = this.userProvider.duplicatedData(datosSecun.displayName, "displayName");
      promiseDuplicated.then((isDuplicated) =>{
        if(isDuplicated == true){
          this.alerta.alerta("Lo sentimos, ese nombre de usuario ya está cogido. ¡Dale al coco! ;)", "Error");
        }else{
          this.authService.registerUser(user.email, user.password)
            .then((completed) => {
              if(completed){
                this.authService.registerDataForFirstTime(datosSecun,credencial);
              }
            }) 
        }
      })
      .catch((error) => console.log(error))
      
    } catch (error) {
      console.log(error)
    }
  }
}
