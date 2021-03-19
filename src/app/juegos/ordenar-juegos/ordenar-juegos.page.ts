import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/games.interface';
import { UsuariosProvider } from 'src/app/providers/usuarios.service';
import { RegistroRefactor } from 'src/app/refactors/refactor';

@Component({
  selector: 'app-ordenar-juegos',
  templateUrl: './ordenar-juegos.page.html',
  styleUrls: ['./ordenar-juegos.page.scss'],
})
export class OrdenarJuegosPage implements OnInit {
  gamesSelected: Game[] = [];
  favoriteGames: Game[] = [];
  otherGames: Game[];

  constructor(
    private refactor: RegistroRefactor,
    private userProvider: UsuariosProvider,
    private router: Router,
  ) { }

  ngOnInit() {
    this.gamesSelected = this.refactor.getGamesData();
    this.favoriteGames = this.gamesSelected.slice(0,3);
    if(this.gamesSelected.length > 3){
      this.otherGames = this.gamesSelected.slice(3,this.gamesSelected.length);
    }
  }

  sendGamesToDB(){
    if(this.otherGames !== undefined){
      this.userProvider.addGamesToUser(this.favoriteGames, this.otherGames);
      this.router.navigate(['home']);
    }else{
      this.userProvider.addGamesToUser(this.favoriteGames);
      this.router.navigate(['home']);
    }
  }

  doReorder(ev: any) {
    let from = ev.detail.from;
    let to = ev.detail.to ;
    let itemToReorder:Game;
    let realocateItem:Game;
    console.log(from, to);
    //Si solo tenemos los juegos favoritos
    if(this.otherGames === undefined){
      itemToReorder = this.favoriteGames.splice(from,1)[0];
      if(to <= 2){
        this.favoriteGames.splice(to,0,itemToReorder);
      }else{
        this.favoriteGames.splice(2,0,itemToReorder);
      }
    }else{
      if(from <=2){
        //Si cogemos alguno de los juegos favoritos
        switch (true) {
          case to>2:
            itemToReorder = this.favoriteGames.splice(from,1)[0];
            realocateItem = this.otherGames.splice(to-4,1)[0];
            this.otherGames.splice(to-4,0,itemToReorder);
            this.favoriteGames.splice(from,0,realocateItem);
            
            break;
          case to <= 2:
            itemToReorder = this.favoriteGames.splice(from,1)[0];
            this.favoriteGames.splice(to,0,itemToReorder);
            break;
        }
      }else if(from > 2){
        //Si cogemos alguno de los otros juegos
        switch (true) {
          case to > 2:
            itemToReorder = this.otherGames.splice(from-4,1)[0];
            this.otherGames.splice(to-3,0,itemToReorder);
            break;
        
          case to <= 2:
            itemToReorder = this.otherGames.splice(from-4,1)[0];
            realocateItem = this.favoriteGames.splice(to,1)[0];
            this.favoriteGames.splice(to,0,itemToReorder);
            this.otherGames.splice(from-4,0,realocateItem);
            break;
        }
      }
    }
    ev.detail.complete();
  }

}
