import { Component,OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserElements, UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios'
import { AuthService } from '../providers/auth.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController, Platform } from '@ionic/angular';
import { Game } from '../models/games.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user$: Observable<UsuariosI>;  
  backButtonSubscription;
  
  constructor(
    
    public db: AngularFirestore,
    private userService: UsuariosProvider,
    private alertController: AlertController,
    private auth: AuthService,
    private platform: Platform,
    
  ) {
    
  }

  
  async ngOnInit(){

    (this.user$ = await this.userService.getActualUser()).subscribe(
      //res => console.log(res)
    )
  }

  ionViewWillLeave(){
    this.backButtonSubscription.unsubscribe();
  }
  ionViewDidEnter() {
    
    
    
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      
      await this.alertController.create({
        cssClass: 'my-custom-class',
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
      }).then((alerta) => alerta.present());
        
    });   
      
        
  }
  cerrarSesion(){
    this.auth.doLogout();  
  }
  
}
