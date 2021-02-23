//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UserElements, UsuariosI } from '../models/users.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../models/games.interface';

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

  getAllUsersData(): Observable<UsuariosI[]>{
    return this.todosUsuarios;
  }
  
  updateUsuario(usuario: UsuariosI) {
    this.conection.unsubscribe();
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

  //PENDIENTE DE REVISION, CREO QUE NO LO USO
  getSpecificUserData(id: string): Observable<UsuariosI> {
    //let user: UsuariosI;
    var subject = new Subject<UsuariosI>();
    
      this.usersCollection.doc<UsuariosI>(id).valueChanges().subscribe(user => {
        subject.next(user);
      });
      return subject.asObservable();
  }

  conection: Subscription;
  /**
   * Envia a la base de datos los juegos elegidos por el usuario
   * @param favoriteGames 
   * @param otherGames 
   */
  async addGamesToUser(favoriteGames: Game[], otherGames?: Game[]){
    
    if(otherGames){
      this.conection = (await this.getActualUser()).subscribe(user =>{
        const usuario:UsuariosI = {
          name: user.name,
          displayName: user.displayName,
          lastName: user.lastName,
          email: user.email,
          favGames: favoriteGames,
          otherGames: otherGames
        } 
        this.updateUsuario(usuario);
      });
      
    }else{
      this.conection = (await this.getActualUser()).subscribe(user =>{
        const usuario:UsuariosI = {
          name: user.name,
          displayName: user.displayName,
          lastName: user.lastName,
          email: user.email,
          favGames: favoriteGames,
        } 
        this.updateUsuario(usuario);
      });
      
      
    }
    
  }

  getUsers(){
    return this.db.collection<UsuariosI>(`users`).get();
  }

 
   /**
   * ATENCION: 
   * METODO PARA SACAR A TODOS LOS ELEMENTOS DE UNA COLECCION!!!
   * @param campo 
   * Se le pasa un string con el nombre del campo de la bd que quieras recibir
   * @returns Array<string> con los valores de ese campo de todos los documentos
   */
  compruebaDatosDeUsuarios(campo:string): Promise<UserElements[]>{
    return new Promise((resolve, reject) =>{
      const usuarios: UserElements[] = [];
      const useri = this.getUsers();
      useri.toPromise().then(function(querySnapshot) {     
        querySnapshot.forEach(function(doc) {
          let aux: UserElements = {
            id: doc.id,
            campo: doc.get(campo)
          }
          usuarios.push(aux);
        });
        resolve(usuarios);
      }) 
      .catch((error) =>
        reject(console.log(error))
      )
    });
  }

   /**
   * Método que previene al usuario de elegir ciertos nombres y/o elementos
   * que ya están usados en la BD
   * @param fc 
   */
  duplicatedData(data: string, field: string): Promise<boolean>{  
    let usuarios = this.compruebaDatosDeUsuarios(field);
    let result:boolean;
    return new Promise<boolean>((resolve,reject) =>{
      usuarios.then((users) =>{
        let aux = users.find(user => user.campo === data);
        if (aux !== undefined){
          result = true;
        }else{
          result = false;
        }
          
        resolve(result);
      }).catch((error) => reject(error))
    })
    
  }
  
  removeUsuario(id: string) {
    return this.usersCollection.doc(id).delete();
  }
}
