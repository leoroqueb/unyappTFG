import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';

import { Game } from '../models/games.interface';
import { GamesService } from '../providers/games.service'

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit, OnDestroy {
  game$: Game[];
  currentPopover = null;
  searchText = '';
  private gameInfo:Subscription;
  constructor(
    private gameService:GamesService,
    private popoverController: PopoverController,
    
  ) {
     
  }
  ngOnDestroy(): void {
    this.gameInfo.unsubscribe();
  }


  ngOnInit() {
    this.gameInfo = this.gameService.startListeningGameCollection().subscribe(game => 
      this.game$ = game
    )
  }

  onSearchChange(ev:any){
    //console.log(ev);
    this.searchText = ev.detail.value;
  }


  async filterResult(ev: any){
    
    
      const popover = await this.popoverController.create({
        component: PopinfoComponent,
        event: ev,
        translucent: false
      });
      this.currentPopover = popover;
      await popover.present();

      const {data} = await popover.onDidDismiss();
      console.log(data);
    
  }
}
