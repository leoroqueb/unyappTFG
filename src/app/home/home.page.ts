import { Component,OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios'
import { AuthService } from '../providers/auth.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,AfterViewInit,OnDestroy{
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

  
  ionViewCanLeave(){
    
  }
  
  async ngOnInit(){
    (this.user$ = await this.userService.getActualUser()).subscribe(
      //res => console.log(res)
    )
  }

  ngOnDestroy(){
    this.backButtonSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {     
      const alert = await this.alertController.create({
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
      });
      await alert.present();
    });
  }
  cerrarSesion(){
    this.auth.doLogout();  
  }
  
}
