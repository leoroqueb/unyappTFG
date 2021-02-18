import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopinfoComponent } from './popinfo/popinfo.component';



@NgModule({
  declarations: [PopinfoComponent],
  imports: [
    CommonModule,
    
  ],
  exports: [
    PopinfoComponent
  ]
})
export class ComponentsModule { }
