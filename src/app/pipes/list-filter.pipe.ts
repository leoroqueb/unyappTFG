import { Pipe, PipeTransform } from '@angular/core';
import { JuegosPage } from '../juegos/juegos.page';
import { Game } from '../models/games.interface';


@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
  constructor(private j: JuegosPage){}
  transform(game: Game[], platform: string, category: string): Game[] | string{
    let switchResult: Game[];
    if (platform === 'Todas' && category === 'Todas'){
      return game;
    }
    let switchCase = platform + "|" + category;
    let categoriesOnly = "Todas|"+category;
    let platformOnly = platform+"|Todas";
    let bothCases = platform+"|"+category;
    switch(switchCase){
      case platformOnly:
        switchResult = game.filter(item => item.platforms.includes(platform));
        break;
      case categoriesOnly:
        switchResult = game.filter(item => item.categories.includes(category));
        break;
      case bothCases:
        switchResult = game.filter(item =>{
          if(item.platforms.includes(platform) && item.categories.includes(category)){
            return true;
          }else{
            return false;
          }
        });
        break;
    }
    if(switchResult.length === 0){
      return game;
    }else{
      return switchResult;
    }
  }

}

