import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { UsuariosI } from '../models/users.interface';
import { AlertasRefactor } from '../refactors/username/refactor'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afireauth: AngularFireAuth, 
    public afs: AngularFirestore,
    public alertController: AlertasRefactor,
    
  ) { }

  async registerUser(user): Promise<any> {
    try {
      const credentials: firebase.auth.UserCredential = await this.afireauth
        .createUserWithEmailAndPassword(
          user.email,
          user.password
        );

      const userProfileDocument: AngularFirestoreDocument<UsuariosI> = this.afs.doc(`users/${credentials.user.uid}`);

      await userProfileDocument.set({
        id: credentials.user.uid,
        nick: user.nick,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthday
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(Login): Promise<firebase.auth.UserCredential> {
    return this.afireauth.signInWithEmailAndPassword(Login.email, Login.password);
  }


    
  doLogout(){
    this.afireauth.signOut().then(() => { })
  }
}
