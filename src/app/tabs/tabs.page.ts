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
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    var tabs = $('.tabs');
    var selector = $('.tabs').find('a').length;
    //var selector = $(".tabs").find(".selector");
    var activeItem = tabs.find('.active');
    var activeWidth = activeItem.innerWidth();
    $(".selector").css({
      "left": activeItem.position + "px", 
      "width": activeWidth + "px"
    });

    $(".tabs").on("click","a",function(e){
      e.preventDefault();
      $('.tabs a').removeClass("active");
      $(this).addClass('active');
      var activeWidth = $(this).innerWidth();
      var itemPos = $(this).position();
      $(".selector").css({
        "left":itemPos.left + "px", 
        "width": activeWidth + "px"
      });
    });
  }

  ionViewWillLeave(){
    this.backButtonSubscription.unsubscribe();
  }


  ionViewDidEnter() {
    
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      
      if(this.router.url === '/tabs/home'){
        await this.alertController.create({
          cssClass: 'my-custom-class',
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
      }/* else{
        this.navCtrl.navigateRoot('home');
      } */
    });   
      
        
  }
}
