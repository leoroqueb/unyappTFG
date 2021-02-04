import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistroRefactor, AlertasRefactor } from '../refactors/username/refactor';


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
    public navCtrl: NavController,
    public router: Router,
    public refactor: RegistroRefactor
    
  ) { }
    
  ngOnInit(){}

  //METODO DE COMPROBACION DE CONTRASEÑA 
  
  matching_passwords_group = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    password: new FormControl('', Validators.compose([
       Validators.minLength(6),
       Validators.required,
    ])),
    confirm_password: new FormControl('', Validators.required)
  })
  ionViewDidLoad(){ }

  coincidenContraseñas(form){
    this.contraseñas = [form.value.password, form.value.confirm_password];
    if (this.contraseñas[0] == this.contraseñas[1]){
      return true;
    }
    return false;
  }

  

  userDetallesImportantes(form){
    if (this.coincidenContraseñas(form)){
      this.refactor.recibirDatosImportantes(form);
      this.router.navigate(['/signup/signup-otros-datos']);
    }else{
      this.alerta.alerta("Las contraseñas no coinciden.", "ERROR");
    }
    
  }
  

}
