import { AlertController } from '@ionic/angular'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertasRefactor {

    constructor(
        public alertController: AlertController,
    ){}

    async alertaErrores(msg: string) {
        const alert = await this.alertController.create({
        
            header: 'Error',
            message: msg,
            buttons: [
                 {
                text: 'Cerrar',
                handler: () => {
                    console.log('Confirm Okay');
                }
                }
            ]
        });
        await alert.present();
    }
}