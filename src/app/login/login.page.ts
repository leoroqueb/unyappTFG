import { AfterViewInit, Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service'
import { CredencialesI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AlertasRefactor } from '../refactors/refactor';
import { AlertController, Platform } from '@ionic/angular';
import { Game } from '../models/games.interface';
import { GamesService } from '../providers/games.service';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ AuthService, UsuariosProvider]
})
@Injectable({
  providedIn: 'root'
})
export class LoginPage implements OnInit,AfterViewInit,OnDestroy{
  userDetail: CredencialesI;
  backButtonSubscription;
  
  constructor(
    private router: Router,
    public auth: AuthService,
    private googlePlus: GooglePlus,
    private alertController: AlertController,
    private platform: Platform,
    
    public userProvider: UsuariosProvider,
    
    ) {}

  ngOnInit(): void {
    if(this.platform.is('android')){
      this.googlePlus.trySilentLogin({
        'webClientId': "947506461654-mrsienuncjouk7qkvgsifirrnsqell68.apps.googleusercontent.com", 
        'offline': false
      })
    }
  }
  
  ngOnDestroy(){
    this.backButtonSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      
        const alert = await this.alertController.create({
          header: 'Salir de Uny',
          subHeader: '¿En serio?',
          message: '¿Ya me abandonas? :(',
          buttons: [
            {
              text: 'Nunca',
              role: 'cancel',
              cssClass: 'primary'
            },
            {
              text:'No me queda otra...',
              cssClass:'secundary',
              handler: () =>{
                navigator['app'].exitApp();
              }
            }
          ]
        });
        
        await alert.present();
      
    });
    
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
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['nonverify']);    
    }
  }

  async googleLogIn(){
    await this.auth.googleLogIn();
  }

  
}
