import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { JuegosPage } from './juegos.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosPage
  },
  {
    path: 'ordenar-juegos',
    loadChildren: () => import('./ordenar-juegos/ordenar-juegos.module').then( m => m.OrdenarJuegosPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosPageRoutingModule {}
