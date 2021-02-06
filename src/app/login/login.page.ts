import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service'
import { CredencialesI, UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsernamePage } from '../refactors/refactor/username.validator.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ AuthService, UsuariosProvider]
})

export class LoginPage implements OnInit{
  userDetail: CredencialesI;
  

  constructor(
    private route: ActivatedRoute,
    private a: UsernamePage,
    private router: Router,
    public auth: AuthService,
    public userProvider: UsuariosProvider,
    //private authService: AuthService,
    ) {}
  ngOnInit(): void {
    this.a.compruebaNick()
  }

    //PENDIENTE DE REVISION PARA ELIMINAR
    /**usuario: UsuariosI = {
      uid:"DJyxDzfN4SXoDCjGpqOndXaFVVD3",
      displayName: "paco",
      name: "prueba",
      lastName: "prueba2",
      email: "juan@gmail.com",
      birthDate: null,
    };*/

    loginForm = new FormGroup({
      email: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
         Validators.minLength(6),
         Validators.required,
      ]))
    })

  async onSubmit(email, password){
      //Iniciamos sesion en firebase
      try{
        
      const logged = await this.auth.loginUser(email.value, password.value);
      
      if(logged){
        
        //const isVerified = this.authService.isEmailVerified(logged);
        this.redirectUser(false);
        
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
