import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupOtrosDatosPage } from './signup-otros-datos.page';

const routes: Routes = [
  {
    path: '',
    component: SignupOtrosDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupOtrosDatosPageRoutingModule {}
