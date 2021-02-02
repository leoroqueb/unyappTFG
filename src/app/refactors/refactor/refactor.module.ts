import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefactorPageRoutingModule } from './refactor-routing.module';

import { RefactorPage } from './refactor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefactorPageRoutingModule
  ],
  declarations: [RefactorPage]
})
export class RefactorPageModule {}
