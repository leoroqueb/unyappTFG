import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupOtrosDatosPageRoutingModule } from './signup-otros-datos-routing.module';

import { SignupOtrosDatosPage } from './signup-otros-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignupOtrosDatosPageRoutingModule
  ],
  declarations: [SignupOtrosDatosPage]
})
export class SignupOtrosDatosPageModule {}
