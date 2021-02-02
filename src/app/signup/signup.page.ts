import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(){}

  signUpForm = new FormGroup({
    nick: new FormControl('', Validators.compose([
      UsernamePage.validUsername,
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.required
    ])),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),  
  });
  matching_passwords_group = new FormGroup({
    password: new FormControl('', Validators.compose([
       Validators.minLength(5),
       Validators.required,
       Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
    ])),
    confirm_password: new FormControl('', Validators.required)
  }, (formGroup: FormGroup) => {
     return PasswordValidator.areEqual(formGroup);
  });

  /**userDetails = {
    nick: this.signUpForm.value.nick,
    name: this.signUpForm.value.name,
    lastName: this.signUpForm.value.lastName,
    email: this.signUpForm.value.email,
    birthDate: this.signUpForm.value.dateBirth,
    password: this.matching_passwords_group.value.password
  }
  ionViewDidLoad(){ }
  signup() {
    try {
      this.authService.registerUser(this.userDetails);
      this.navCtrl.navigateForward("home");
    } catch (error) {  }
  }**/
  

}
