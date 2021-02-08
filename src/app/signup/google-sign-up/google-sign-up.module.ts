import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleSignUpPageRoutingModule } from './google-sign-up-routing.module';

import { GoogleSignUpPage } from './google-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GoogleSignUpPageRoutingModule
  ],
  declarations: [GoogleSignUpPage]
})
export class GoogleSignUpPageModule {}
