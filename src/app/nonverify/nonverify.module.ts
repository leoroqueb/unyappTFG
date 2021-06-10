import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IonicModule } from '@ionic/angular';

import { NonverifyPageRoutingModule } from './nonverify-routing.module';

import { NonverifyPage } from './nonverify.page';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    IonicModule,
    NonverifyPageRoutingModule
  ],
  declarations: [NonverifyPage]
})
export class NonverifyPageModule {}
