import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/games.interface';

@Pipe({
  name: 'searchFilter'
})
export class FiltroBusquedaPipe implements PipeTransform {
  
  transform(game: Game[], filterText: string): Game[] {
    if (filterText === ''){
      return game;
    }
    filterText = filterText.toLowerCase();
    return game.filter(item => {
      return item.name.toLowerCase().includes(filterText);
    });
    
  }

}
