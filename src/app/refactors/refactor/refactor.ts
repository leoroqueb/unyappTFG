import { AlertController } from '@ionic/angular'
import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

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
            keyboardClose: true,
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
    private detallesImportantes: Array<string>;
    private detallesSecundarios: Array<string>;
    private detallesFinal: any;
    private fechaModificada: string;
    constructor(){}

    obtenerFormFinal():string[]{
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

    receiveImportantData(form: FormGroup):string[]{
        this.detallesImportantes = [form.value.email, form.value.password];
        return this.detallesImportantes;
    }

    recibirDatosSecundarios(form: FormGroup):string[]{
        this.fechaModificada = form.value.birthDate.substring(0,10);
        this.detallesSecundarios = [form.value.displayName, form.value.name, form.value.lastName, this.fechaModificada];
        return this.detallesSecundarios;
    }

    recibirDatosGoogle(form: FormGroup):string[]{
        this.fechaModificada = form.value.birthDate.substring(0,10);
        this.detallesSecundarios = [form.value.name, form.value.lastName, this.fechaModificada];
        return this.detallesSecundarios;
    }
}