import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service'
import { CredencialesI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios'
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ AuthService, UsuariosProvider]
})

export class LoginPage implements OnInit{
  userDetail: CredencialesI;
  constructor(
    private router: Router,
    public auth: AuthService,
    public userProvider: UsuariosProvider,
    
    ) {}
  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
    ]))
  })

  //Iniciamos sesion en firebase
  async onSubmit(email, password){
      try{   
      
      const logged = await this.auth.loginUser(email.value, password.value);   
      if(logged){       
        const isVerified = this.auth.isEmailVerified(logged);
        this.redirectUser(isVerified);      
      }
    } catch (error) {  
      console.log(error)
    }
  }

  redirectUser(isVerified: boolean){
    if(isVerified){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['nonverify']);    
    }
  }

  async googleLogIn(){
    await this.auth.googleLogIn();
  }

  
}
