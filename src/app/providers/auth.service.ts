import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { UsuariosI } from '../models/users.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afireauth: AngularFireAuth, 
    public afs: AngularFirestore,
    
  ) { }

  async registerUser(user): Promise<any> {
    try {
      const credentials: firebase.auth.UserCredential = await this.afireauth
        .createUserWithEmailAndPassword(
          user.email,
          user.password
        );

      /**const userProfileDocument: AngularFirestoreDocument<UsuariosI> = this.afs.doc(`users/${credentials.user.uid}`);

      await userProfileDocument.set({
        id: credentials.user.uid,
        nick: user.nick,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthDate
      });*/
    } catch (error) {
      console.log(error);
    }
  }

  doLogin(value){
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, 
      value.password)
      .then( 
        res => resolve(res),
        err => reject(err))
    })
  }
  doLogout(){
    this.afireauth.signOut().then(() => { })
  }
}
