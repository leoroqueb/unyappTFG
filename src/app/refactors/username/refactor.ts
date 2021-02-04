import { AlertController } from '@ionic/angular'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertasRefactor {

    constructor(
        public alertController: AlertController,
    ){}

    async alerta(msg: string, header: string) {
        const alert = await this.alertController.create({
        
            header: header,
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
    fechaModificada: string;
    constructor(){}

    obtenerFormFinal(){
        this.detallesFinal = {
            email: this.detallesImportantes[0],
            password: this.detallesImportantes[1],
            displayName: this.detallesSecundarios[0],
            name: this.detallesSecundarios[1],
            lastName: this.detallesSecundarios[2],
            birthDate: this.detallesSecundarios[3],
            emailVerified: false
        }
        
        return this.detallesFinal;
    }

    recibirDatosImportantes(form){
        this.detallesImportantes = [form.value.email, form.value.password];
    }

    recibirDatosSecundarios(form){
        this.fechaModificada = form.value.birthDate.substring(0,10);
        this.detallesSecundarios = [form.value.displayName, form.value.name, form.value.lastName, this.fechaModificada];
    }
}