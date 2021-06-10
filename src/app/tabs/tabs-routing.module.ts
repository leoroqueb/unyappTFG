import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesSelectionGuard } from '../guards/games-selection.guard';
import { AuthGuard } from '../guards/guards.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
        canActivate: [GamesSelectionGuard]
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'chat',
        loadChildren: () => import('../list-chat/list-chat.module').then( m => m.ListChatPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
