import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { UsuariosProvider } from '../providers/usuarios.service';
import { RegistroRefactor, AlertasRefactor } from '../refactors/refactor';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class SignupPage implements OnInit {
  contraseñas: Array<string>;
  constructor(
    public alerta: AlertasRefactor,
    public userProvider: UsuariosProvider,
    public router: Router,
    public refactor: RegistroRefactor,
    private authService: AuthService,
    
  ) { }
    
  ngOnInit(){}

  //METODO DE COMPROBACION DE CONTRASEÑA 
  
  matching_passwords_group = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required,
      Validators.email
    ])),
    password: new FormControl('', Validators.compose([
       Validators.minLength(6),
       Validators.maxLength(30),
       Validators.required,
       
    ])),
    confirm_password: new FormControl('', Validators.required)
  })
  ionViewDidLoad(){ }

  passwordMatchValidator(fg: FormGroup): boolean {
    if (fg.value.password === fg.value.confirm_password){
      return true;
    }else{
      return false;
    }
  }

  /**
   * Comprueba varias cosas: Primero, que las contraseñas sean iguales, para
   * prevenir que el usuario haya tipeado algún caracter erróneo.
   * Segundo, comprueba que el email no esté ya registrado en la BD, para evitar
   * duplicidades de cuenta. 
   * @param form FormGroup
   * 
   */
  async importantDetailsUser(form: FormGroup){
    try {
      if (this.passwordMatchValidator(form)){ 
        this.userProvider.duplicatedData(form.value.email, "email")
          .then((isDuplicated) =>{
            if(isDuplicated){
              this.alerta.alerta("Todavía no existe un multiverso Uny para que puedas tener dos cuentas con el mismo correo", "Fatality");
            }else{
              this.refactor.transformImportantData(form);
              this.router.navigate(['/signup/signup-otros-datos'])
            }
          })   
      }else{
        this.alerta.alerta("Las contraseñas no coinciden.", "ERROR");    
      }
    } catch (error) {
      
    }
    
    
  }
  

}
