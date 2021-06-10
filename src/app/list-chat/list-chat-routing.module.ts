import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListChatPage } from './list-chat.page';

const routes: Routes = [
  {
    path: '',
    component: ListChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListChatPageRoutingModule {}
