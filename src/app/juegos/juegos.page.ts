import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Game } from '../models/games.interface';
import { GamesService } from '../providers/games.service'
import { AlertasRefactor, RegistroRefactor } from '../refactors/refactor';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit, OnDestroy {
  game$: Game[];
  //Variables de los filtros
  searchText = '';
  platFilters = 'Todas';
  catFilters = 'Todas'
  selectedGame: Game = undefined;
  delete = false;

  //Plataformas
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
  //Categorias
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
    private refactor: RegistroRefactor,
    private router: Router,
  ) {
     
  }
  ngOnDestroy(): void {
    this.gameInfo.unsubscribe();
  }


  ngOnInit() {
    this.categoryFilters.sort();
    this.categoryFilters.push("Otras");
    this.categoryFilters.unshift("Todas");
    this.gameInfo = this.gameService.startListeningGameCollection().subscribe(game => {
      this.game$ = game;
    })
    
  }

  onSearchChange(ev:any){
    this.searchText = ev.detail.value;
  }


  applyFilters(platform:string,category:string){
    this.platFilters = platform;
    this.catFilters = category;
  }

  chosenGamesByUser:Game[] = [];
  
  selectGamesFromList(chosenGame: Game){
    let submitButton = document.getElementById('submitButton');
    if(!this.chosenGamesByUser.includes(chosenGame)){
      if(this.chosenGamesByUser.length < 13){
        this.chosenGamesByUser.push(chosenGame);
        this.selectedGame = chosenGame;
        if(this.chosenGamesByUser.length >= 3){
          submitButton.setAttribute("disabled","false")
        }
      }else{
        this.alerta.alerta("Si añades un juego más, la RAM te va a explotar","Tranquilo");
      }
    }
  }

  deleteGamesFromList(chosenGame: Game){
    let submitButton = document.getElementById('submitButton');
    let index = this.chosenGamesByUser.indexOf(chosenGame);
    this.chosenGamesByUser.splice(index,1);
    this.selectedGame = chosenGame;
    if(this.chosenGamesByUser.length < 3){
      submitButton.setAttribute("disabled","true");
    }

  }

  getChosenGamesByUser(){
    this.refactor.setGamesData(this.chosenGamesByUser);
    this.router.navigate(['juegos','ordenar-juegos']);
  }
}
