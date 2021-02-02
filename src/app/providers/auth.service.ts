import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import firebase from 'firebase';
import { UsuariosI } from '../models/users.interface'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afireauth: any, 
    public afs: any,
    
  ) { }

  async registerUser(user): Promise<any> {
    try {
      const credentials: firebase.auth.UserCredential = await this.afireauth.auth
        .createUserWithEmailAndPassword(
          user.email,
          user.password
        );
      const userProfileDocument: AngularFirestoreDocument<UsuariosI> = this.afs.doc(`userProfile/${credentials.user.uid}`);
      await userProfileDocument.set({
        userID: credentials.user.uid,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthDate,
      });
    } catch (error) {
      return error;
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
    this.afireauth.auth.signOut().then(() => { })
  }
}
