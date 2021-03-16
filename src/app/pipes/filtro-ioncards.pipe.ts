import { Pipe, PipeTransform } from '@angular/core';
import { UserGameProfile } from '../models/users.interface';

@Pipe({
  name: 'filtroIoncards'
})
export class FiltroIoncardsPipe implements PipeTransform {

  transform(cards: UserGameProfile[], mustBeRemoved) {
    /* console.log("cards",cards)*/
    //console.log("removed", mustBeRemoved)
     if(!mustBeRemoved || cards.length <= 0){
      return cards;
    }
    return cards.filter(card => {
      //return card != mustBeRemoved
    });
  }

}
