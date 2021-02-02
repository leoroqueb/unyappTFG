import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { NavController} from '@ionic/angular';
import { PasswordValidator, UsernamePage } from '../refactors/username/username.validator.page'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    
    
  ) { }
    signUpForm = new FormGroup({
      nick: new FormControl('', Validators.compose([
        //UsernamePage.validUsername,
        //Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      lastName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      email: new FormControl('',Validators.compose([
        Validators.required,
        //Validators.email
      ])),  
    })
  ngOnInit(){}

  userDetails: any;

  //METODO DE COMPROBACION DE CONTRASEÑA PARA POSTERIORES VERSIONES
  /** 
  matching_passwords_group = new FormGroup({
    password: new FormControl('', Validators.compose([
       Validators.minLength(5),
       Validators.required,
       Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
    ])),
    confirm_password: new FormControl('', Validators.required)
  }, (formGroup: FormGroup) => {
     return PasswordValidator.areEqual(formGroup);
  });*/

  
  ionViewDidLoad(){ }
  signup(user) {
    return new Promise<any>((resolve, reject) =>{
      this.authService.registerUser(user).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  userDetalles(form) {
    
    this.userDetails = {
      email: form.value.email,
      nick: form.value.nick,
      name: form.value.name,
      lastName: form.value.lastName,
      birthday: form.value.birthday,
      password: form.value.password
    }
    this.signup(this.userDetails);
    console.log(this.userDetails);
    
  }
  

}
