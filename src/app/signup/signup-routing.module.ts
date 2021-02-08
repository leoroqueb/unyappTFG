import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  },
  {
    path: 'signup-otros-datos',
    loadChildren: () => import('./signup-otros-datos/signup-otros-datos.module').then( m => m.SignupOtrosDatosPageModule)
  },
  {
    path: 'google-sign-up',
    loadChildren: () => import('./google-sign-up/google-sign-up.module').then( m => m.GoogleSignUpPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupPageRoutingModule {}
