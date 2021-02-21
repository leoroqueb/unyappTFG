import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenarJuegosPageRoutingModule } from './ordenar-juegos-routing.module';

import { OrdenarJuegosPage } from './ordenar-juegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenarJuegosPageRoutingModule
  ],
  declarations: [OrdenarJuegosPage]
})
export class OrdenarJuegosPageModule {}
