import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CredencialesI, Message } from '../models/users.interface'
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: CredencialesI = null;
  chatUser: string = "";
  chatCollection: AngularFirestoreCollection;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) { 

    this.chatCollection = afs.collection(`chatMessages`);
    
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user;
    })
  }

  sendMessage(msg: string){
    return this.afs.collection('messages').add({
      msg,
      from: this.currentUser.displayName,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    })
  }

  setUserInfo(user: string): void{
    this.chatUser = user;
  }
  getUserInfo(): string {
    return this.chatUser;
  }

  createDBInfo(me: string, to: string): any{
    let date = new Date();
    let mes = {
      message: "a"
    }
    return this.chatCollection.doc(me).collection(to).doc(date.toDateString()).set(mes);
  }
}
