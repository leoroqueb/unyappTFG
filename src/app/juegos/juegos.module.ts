import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { JuegosPageRoutingModule } from './juegos-routing.module';
import { JuegosPage } from './juegos.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
 
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JuegosPageRoutingModule
  ],
  declarations: [JuegosPage]
})
export class JuegosPageModule {}
