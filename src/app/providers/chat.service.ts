import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CredencialesI, Message } from '../models/users.interface'
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: CredencialesI = null;
  chatUser: string = "";
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 
    
    this.afAuth.onAuthStateChanged(user => {
      console.log("Changed: ", user);
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

  getUserInfo(user: string): void{
    this.chatUser = user;
  }
  sendUserInfo(): string {
    return this.chatUser;
  }
}
