import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { UserCardsComponent } from './user-cards/user-cards.component';



@NgModule({
  declarations: [
    PopinfoComponent, 
    UserCardsComponent
  ],
  imports:[CommonModule],
  exports: [
    PopinfoComponent,
    UserCardsComponent
  ]
})
export class ComponentsModule { }
