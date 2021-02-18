import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/games.interface';

@Pipe({
  name: 'searchFilter'
})
export class FiltroBusquedaPipe implements PipeTransform {
  
  transform(text: Game[], filterText: string): Game[] {
    if (filterText === ''){
      return text;
    }
    filterText = filterText.toLowerCase();
    return text.filter(item => {
      return item.name.toLowerCase().includes(filterText);
    });
    
  }

}
