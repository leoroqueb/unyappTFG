//import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuariosI } from '../models/users.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getLocaleTimeFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuariosProvider implements OnInit {
  private usersCollection: AngularFirestoreCollection<UsuariosI>;
  private todosUsuarios: Observable<UsuariosI[]>;
  private longitud: boolean = false;
  

  constructor(
    public db: AngularFirestore,
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
    return this.usersCollection.doc(usuario.email).update(usuario);
  }
  addUsuario(usuario: UsuariosI) {
    return this.usersCollection.add(usuario);
  }
  async getActualUserUID(): Promise<string> {
    if (this.afAuth.currentUser) {
      return (await this.afAuth.currentUser).email;
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
  
  isUserAlreadyRegistered(email: string): Promise<boolean>{
    let a: boolean;
    return new Promise((resolve, reject) =>{
        var a = this.aux(email)
        resolve(a)
        reject("Error")
        //console.log(a); 
        /**if (a){
          resolve(true)
        }else{
          reject(false)
        }*/
    })
  }

  async aux(email){
    const isRegistered = this.db.collection<UsuariosI>('users', ref => ref.where('email', '==', email)).valueChanges();
    isRegistered.subscribe(
      items =>this.getLength(items.length) 
      ).unsubscribe()
    return this.longitud;
  }

  
  getLength(item){
    if (item == 0){
      this.longitud = false;
    }else{
      this.longitud = true;
    }
    return this.longitud;
  }

  ngOnInit(){

  }
}
