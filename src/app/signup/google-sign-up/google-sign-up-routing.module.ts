import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleSignUpPage } from './google-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleSignUpPageRoutingModule {}
