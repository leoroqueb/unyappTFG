import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuariosI } from '../models/users.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuariosProvider {
  private usersCollection: AngularFirestoreCollection<UsuariosI>;

  constructor(
    public http: HttpClient,
    db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.usersCollection = db.collection<UsuariosI>('users');
  }

  updateUsuario(usuario: UsuariosI) {
    return this.usersCollection.doc(usuario.id).update(usuario);
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
  removeUsuario(id: string) {
    return this.usersCollection.doc(id).delete();
  }
}
