//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UsuariosI } from '../models/users.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertasRefactor } from '../refactors/refactor/refactor';

@Injectable({
  providedIn: 'root'
})
export class UsuariosProvider{
  private usersCollection: AngularFirestoreCollection<UsuariosI>;
  private todosUsuarios: Observable<UsuariosI[]>;
  

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth) {     
      this.usersCollection = db.collection<UsuariosI>(`users`);
      //REVISAR: PUEDE SER QUE NO HAGA FALTA
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
    return this.usersCollection.doc(usuario.email).set(usuario,{merge: true});
  }
  async getActualUserUID(): Promise<string> {
    if (this.afAuth.currentUser) {
      return (await this.afAuth.currentUser).email;
    } else {
      return ""
    }
  }

  async eliminaUsuario(){
    var user = this.afAuth.currentUser;
    (await user).delete().then(function(){
      console.log("Usuario eliminado correctamente");
    })
    .catch(function(error){
      console.log("Error =>", error);
    })
  }

  async getActualUser(){
    return this.usersCollection.doc<UsuariosI>(await this.getActualUserUID()).valueChanges();
  }

  async getSpecificUserData(id: string) {
    //let user: UsuariosI;
    if( id === "this"){
      return this.usersCollection.doc<UsuariosI>(await this.getActualUserUID()).valueChanges()
      .toPromise()
      .catch(
        error => console.log(error)
      );
    }else{
      return this.usersCollection.doc<UsuariosI>(id).valueChanges()
      .toPromise()
      .catch(
        error => console.log(error)
      );
    }
  }

  getUsers(){
    return this.db.collection(`users`).get();
  }

 
   /**
   * ATENCION: 
   * METODO PARA SACAR A TODOS LOS ELEMENTOS DE UNA COLECCION!!!
   * @param campo 
   * Se le pasa un string con el nombre del campo de la bd que quieras recibir
   * @returns Array<string> con los valores de ese campo de todos los documentos
   */
  compruebaDatosDeUsuarios(campo:string): Array<string>{
    const usuarios: string[] = [];
    const useri = this.getUsers();
    useri.toPromise().then(function(querySnapshot) {     
      querySnapshot.forEach(function(doc) {
          usuarios.push(doc.get(campo));
      });
    });
    return usuarios;
  }

  
  removeUsuario(id: string) {
    return this.usersCollection.doc(id).delete();
  }
}
