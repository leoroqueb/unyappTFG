import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Game } from '../models/games.interface';
import { GamesService } from '../providers/games.service'
import { AlertasRefactor } from '../refactors/refactor';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit, OnDestroy {
  game$: Game[];
  searchText = '';
  platformFilters:string[] = [
    "Todas",
    "PS5",
    "PS4",
    "PS3",
    "PSVITA",
    "Xbox Series X",
    "Xbox Series S",
    "Xbox One",
    "Xbox 360",
    "PC",
    "Nintendo Switch",
    "iOS",
    "Android"
  ];
  categoryFilters:string[] = [
    "Multijugador",
    "Acción",
    "Battle Royale",
    "Shooter",
    "Primera persona",
    "Tercera persona",
    "JRPG",
    "Aventura",
    "Zombis",
    "GOTY",
    "Retro",
    "VR",
    "Infantil",
    "Familia",
    "Estrategia",
    "Gore",
    "Action-RPG",
    "Hack and Slash",
    "MMORPG",
    "Mundo abierto",
    "Sigilo",
    "Plataformas",
    "Novela visual",
    "Survival Horror",
    "Terror",
    "MMO",
    "MOBA",
    "Deportes",
    "Fútbol",
  ];
  
  private gameInfo:Subscription;
  constructor(
    private gameService:GamesService,
    private alerta: AlertasRefactor,
  ) {
     
  }
  ngOnDestroy(): void {
    this.gameInfo.unsubscribe();
  }


  ngOnInit() {
    this.categoryFilters.sort();
    this.categoryFilters.push("Otras");
    this.categoryFilters.unshift("Todas");
    this.gameInfo = this.gameService.startListeningGameCollection().subscribe(game => 
      this.game$ = game
    )
  }

  onSearchChange(ev:any){
    this.searchText = ev.detail.value;
  }


  applyFilters(platform:string,category:string){
    
    let filteredGame: Game[];
    switch (platform + "|" + category) {
      case "Todas|Todas":
        this.gameService.startListeningGameCollection().subscribe(game => 
          this.game$ = game
        )
        break;
      
      case "Todas|"+category:
        
        this.gameService.startListeningGameCollection().subscribe(game =>{
          filteredGame = game.filter(isFilteredGame => {
            if(category === "Otras"){
              //Si las categorias del juego NO están en categoryFilters, las muestra
              for (let index = 0; index < isFilteredGame.categories.length; index++) {
                if(!this.categoryFilters.includes(isFilteredGame.categories[index])){
                  return isFilteredGame;
                }
              }
            }else{
              if(isFilteredGame.categories.includes(category)){
                return isFilteredGame;
              }
            }
          })
        this.game$ = filteredGame;
        })
        break;
      case platform+"|Todas":
        this.gameService.startListeningGameCollection().subscribe(game =>{
          filteredGame = game.filter(isFilteredGame => {
            if(isFilteredGame.platforms.includes(platform)){
              return isFilteredGame;
            }
          })
        this.game$ = filteredGame;
        })
        break;
      case platform+"|"+category:
        this.gameService.startListeningGameCollection().subscribe(game =>{
          filteredGame = game.filter(isFilteredGame => {
            if(category === "Otras"){
              
              for (let index = 0; index < isFilteredGame.categories.length; index++) {
                if(!this.categoryFilters.includes(isFilteredGame.categories[index])){
                  if(isFilteredGame.platforms.includes(platform)){
                    console.log(isFilteredGame);
                    return isFilteredGame;
                  }
                }
              }
            }else{
              if(isFilteredGame.categories.includes(category)){
                if(isFilteredGame.platforms.includes(platform)){
                  return isFilteredGame;
                }
              }
            }
          })
        this.game$ = filteredGame;
        })
        break;
    }
  }

  chosenGamesByUser:Game[] = [];

  selectGamesFromList(chosenGame: Game){
    let submitButton = document.getElementById('submitButton');
    let itemGame = document.getElementById(chosenGame.name)
    if(!this.chosenGamesByUser.includes(chosenGame)){
      if(this.chosenGamesByUser.length < 13){
        this.chosenGamesByUser.push(chosenGame);
        itemGame.style.color= "green";
        if(this.chosenGamesByUser.length >= 3){
          submitButton.setAttribute("disabled","false")
        }
      }else{
        this.alerta.alerta("Si añades un juego más, la RAM te va a explotar","Tranquilo");
      }
    }else{
      let index = this.chosenGamesByUser.indexOf(chosenGame);
      this.chosenGamesByUser.splice(index,1);
      itemGame.style.color= "black";
      if(this.chosenGamesByUser.length < 3){
        submitButton.setAttribute("disabled","true")
      }
    }
    console.log(this.chosenGamesByUser);
  }
}
