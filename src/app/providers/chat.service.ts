import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CredencialesI, Message } from '../models/users.interface'
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

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
    this.chatCollection = this.afs.collection<Message>(`chatMessages`);
  }

  setUserInfo(user: string): void{
    this.chatUser = user;
  }
  getUserInfo(): string {
    return this.chatUser;
  }

 /*  createDBInfo(me: string, to: string): void{
    let defaultMessage: Message = {
      timestamp: firebase.default.firestore.Timestamp.now(),
      from: "Uny Service",
      to: to,
      msg: "Default message created by Uny Service in order to start new document."
    }
    this.chatCollection.doc(me).collection(to).doc().set(defaultMessage);
    this.chatCollection.doc(to).collection(me).doc().set(defaultMessage);
  } */

  sendMessage(msg: string, to: string, from: string){
    let timestamp = new Date().toUTCString();
    
    let message: Message = {
      from: from,
      to: to,
      msg: msg, 
      timestamp: timestamp
    }
    this.chatCollection.doc(from).collection(to).doc().set(message);
    this.chatCollection.doc(to).collection(from).doc().set(message);
  }

  getChatFromDB(of: string, and: string): Observable<Message[]>{
    return this.chatCollection.doc(of).collection<Message>(and).valueChanges();
  }
}
