import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefactorPage } from './refactor.page';

const routes: Routes = [
  {
    path: '',
    component: RefactorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefactorPageRoutingModule {}
