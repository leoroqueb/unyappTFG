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
                }
            ]
        });
        await alert.present();
    }
}

@Injectable({
    providedIn: 'root'
  })
export class RegistroRefactor{
    detallesImportantes: Array<string>;
    detallesSecundarios: Array<string>;
    detallesFinal: any;
    constructor(){}

    obtenerFormFinal(){
        this.detallesFinal = {
            email: this.detallesImportantes[0],
            password: this.detallesImportantes[1],
            nick: this.detallesSecundarios[0],
            name: this.detallesSecundarios[1],
            lastName: this.detallesSecundarios[2],
            birthday: this.detallesSecundarios[3],
        }
        
        return this.detallesFinal;
    }

    recibirDatosImportantes(form){
        this.detallesImportantes = [form.value.email, form.value.password];
    }

    recibirDatosSecundarios(form){
        this.detallesSecundarios = [form.value.nick, form.value.name, form.value.lastName, form.value.birthday];
    }
}