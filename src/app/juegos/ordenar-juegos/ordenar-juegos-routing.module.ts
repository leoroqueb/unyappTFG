import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenarJuegosPage } from './ordenar-juegos.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenarJuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenarJuegosPageRoutingModule {}
