import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  backButtonSubscription;
  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  ionViewWillLeave(){
    this.backButtonSubscription.unsubscribe();
  }


  ionViewDidEnter() {
    
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      
      if(this.router.url === '/tabs/home'){
        await this.alertController.create({
          //cssClass: 'my-custom-class',
          header: 'Salir de Uny',
          message: '¿Ya me abandonas? :(',
          buttons: [
            {
              text: '¡Nunca!',
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
      }
    });   
      
        
  }
}
