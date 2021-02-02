import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuariosI } from '../models/users.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
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
  removeUsuario(id: string) {
    return this.usersCollection.doc(id).delete();
  }
}
