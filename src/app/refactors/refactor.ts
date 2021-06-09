import { AlertController, ToastController } from '@ionic/angular'
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Game } from '../models/games.interface';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaRefactor {

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
                    text: 'Cerrar'
                }
            ]
        });
        await alert.present();
    }
}

@Injectable({
    providedIn: 'root'
  })
export class ToastRefactor {
    constructor(
        private toastController: ToastController
    ){}
    async presentToast(msg: string) {
        const toast = await this.toastController.create({
          message: msg,
          duration: 2000
        });
        toast.present();
      }
}


@Injectable({
    providedIn: 'root'
})
export class DBRefactor{
    constructor(){}

    disconnectFromDB(suscription: Subscription): void{
        suscription.unsubscribe();
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
    private gamesData: Game[];
    constructor(){}

    getFinalForm():string[]{
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

    transformImportantData(form: FormGroup):string[]{
        this.detallesImportantes = [form.value.email, form.value.password];
        return this.detallesImportantes;
    }

    transformSecondaryData(form: FormGroup):string[]{
        this.fechaModificada = form.value.birthDate.substring(0,10);
        this.detallesSecundarios = [form.value.displayName, form.value.name, form.value.lastName, this.fechaModificada];
        return this.detallesSecundarios;
    }

    transformGoogleData(form: FormGroup):string[]{
        this.fechaModificada = form.value.birthDate.substring(0,10);
        this.detallesSecundarios = [form.value.name, form.value.lastName, this.fechaModificada];
        return this.detallesSecundarios;
    }

    setGamesData(games: Game[]):void{
        this.gamesData = games;
    }

    getGamesData(): Game[]{
        return this.gamesData;
    }
}


@Injectable({
    providedIn: 'root'
  })
export class SortRefactor {
    defaultSortingAlgorithm = (a, b) => {
        
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      };
      
      quickSort = (
        unsortedArray,
        sortingAlgorithm = this.defaultSortingAlgorithm
      ) => {
        // immutable version
        const sortedArray = [...unsortedArray];
      
        const swapArrayElements = (arrayToSwap, i, j) => {
          const a = arrayToSwap[i];
          arrayToSwap[i] = arrayToSwap[j];
          arrayToSwap[j] = a;
        };
      
        const partition = (arrayToDivide, start, end) => {
          const pivot = arrayToDivide[end];
          let splitIndex = start;
          for (let j = start; j <= end - 1; j++) {
            const sortValue = sortingAlgorithm(arrayToDivide[j], pivot);
            if (sortValue === -1) {
              swapArrayElements(arrayToDivide, splitIndex, j);
              splitIndex++;
            }
          }
          swapArrayElements(arrayToDivide, splitIndex, end);
          return splitIndex;
        };
      
        // Recursively sort sub-arrays.
        const recursiveSort = (arraytoSort, start, end) => {
          // stop condition
          if (start < end) {
            const pivotPosition = partition(arraytoSort, start, end);
            recursiveSort(arraytoSort, start, pivotPosition - 1);
            recursiveSort(arraytoSort, pivotPosition + 1, end);
          }
        };
      
        // Sort the entire array.
        recursiveSort(sortedArray, 0, unsortedArray.length - 1);
        return sortedArray;
      };
}