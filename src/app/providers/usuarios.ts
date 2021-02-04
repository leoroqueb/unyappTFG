//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuariosI } from '../models/users.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuariosProvider {
  private usersCollection: AngularFirestoreCollection<UsuariosI>;
  private todosUsuarios: Observable<UsuariosI[]>;

  constructor(
    //public http: HttpClient,
    
    db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.usersCollection = db.collection<UsuariosI>(`users`);
    this.todosUsuarios = this.usersCollection.snapshotChanges().pipe(map(
      actions =>{
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  updateUsuario(usuario: UsuariosI) {
    return this.usersCollection.doc(usuario.uid).update(usuario);
  }
  addUsuario(usuario: UsuariosI) {
    return this.usersCollection.add(usuario);
  }
  async getActualUserUID(): Promise<string> {
    if (this.afAuth.currentUser) {
      return (await this.afAuth.currentUser).uid;
    } else {
      return ""
    }
  }

  async getActualUser() {
    return this.usersCollection.doc<UsuariosI>(await this.getActualUserUID()).valueChanges();
  }

  getUserById(id: string){
    return this.usersCollection.doc<UsuariosI>(id).valueChanges();
  }

  getUsers(){
    return this.todosUsuarios;
  }
  removeUsuario(id: string) {
    return this.usersCollection.doc(id).delete();
  }
}
