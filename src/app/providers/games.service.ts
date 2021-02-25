import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from '../models/games.interface'

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    public afireauth: AngularFireAuth, 
    public db: AngularFirestore,
    
  ) { 
  
  }

  addGame(game: Game):Promise<void>{
    return this.db.collection(`games`).doc(game.name).set(game,{merge: true});
  }

  deleteGame(name:string):Promise<void>{
    return this.db.collection(`games`).doc(name).delete();
  }

  updateGame(game:Game):Promise<void>{
    return this.db.collection(`games`).doc(game.name).update(game);
  }

  /**
   * 
   * @param id string id del juego
   * @returns Observable<Game>
   * @description Devuelve un Observable del documento especifico del juego.
   * Hacerle un Subscribe para obtener los datos especificos.
   */
  getSpecificGame(id: string):Observable<Game>{
    return this.db.collection(`games`).doc<Game>(id).valueChanges();
  }

  /**
   * Método de inicio de escucha a la BD "games".
   * Hacerle un subscribe y guardar elementos en un Game[] mediante un map o foreach (probar)
   */
  startListeningGameCollection(): Observable<Game[]>{
    return this.db.collection<Game>(`games`).valueChanges();
  }
  
}
