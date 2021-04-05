//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { CredencialesI, UserElements, UserGameProfile, UsuariosI } from '../models/users.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../models/games.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuariosProvider{
  private usersCollection: AngularFirestoreCollection<UsuariosI>;
  private allUsersData: Observable<UsuariosI[]>;
  private userConnection: Subscription;

  constructor(
    public db: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth) {     
      this.usersCollection = db.collection<UsuariosI>(`users`);
      
      //REVISAR: PUEDE SER QUE NO HAGA FALTA
      this.allUsersData = this.usersCollection.snapshotChanges().pipe(map(
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
    return this.allUsersData;
  }

  
  updateUsuario(usuario: UsuariosI) {
    if(this.conection != undefined){
      this.conection.unsubscribe();
    }
    return this.usersCollection.doc(usuario.email).update(usuario);
  }

  addUsuario(usuario: UsuariosI) {
    return this.usersCollection.doc(usuario.email).set(usuario,{merge: true});
  }

  credentialConnection: Subscription;
  async deleteUser(){
    const docs: string[] = ["users/","credencialesUsers/","userMatch/"];
    var user = this.afAuth.currentUser;
    await this.getActualUser().then(subject => this.credentialConnection = subject.subscribe(userDN =>{
      for (let index = 0; index < docs.length; index++) {
        user.then(user => {
          if(index < 2){
            this.db.doc(docs[index]+user.email).delete()
          }else{
            this.db.doc(docs[index]+userDN.displayName).delete()
          }
        })
      }
      this.disconectFromDB("credentialConnection");
    }));
    
    (await user).delete().then(() => {
      this.router.navigate(["login"]);
    })
    .catch(function(error){
      console.log("Error =>", error);
    })
    
  }


  async getActualUser(): Promise<Subject<UsuariosI>>{
    var subject = new Subject<UsuariosI>();
    this.userConnection = this.usersCollection.doc<UsuariosI>((await this.afAuth.currentUser).email).valueChanges().subscribe(data => {
      subject.next(data);
    });
    return subject;
  }

  //PENDIENTE DE REVISION, CREO QUE NO LO USO
  getSpecificUserData(id: string): Subject<UsuariosI> {
    //let user: UsuariosI;
    var subject = new Subject<UsuariosI>();
    
      this.usersCollection.doc<UsuariosI>(id).valueChanges().subscribe(user => {
        subject.next(user);
      });
      return subject;
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
          otherGames: otherGames,
          typeOfPlayer: user.typeOfPlayer
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
          typeOfPlayer: user.typeOfPlayer
        } 
        this.updateUsuario(usuario);
      });
      
      
    }
    
  }

  getUsers(){
    return this.db.collection<UsuariosI>(`users`).get();
  }

 
   /**
   * Saca un campo especifico de todos los usuarios
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

  
  getReformatedUsersData():Promise<UserGameProfile[]>{
    return new Promise<UserGameProfile[]>((resolve) => {
      const reformatedUser: UserGameProfile[] = [];
      const allUsers = this.getAllUsersData();
      allUsers.subscribe(users => {
        users.forEach(user =>{
          let auxFavGamesReformatedString: string[] = [];
          let auxOtherGamesReformatedString: string[] = [];
          let ageOfUser: number;
          user.favGames.forEach(game =>{
            auxFavGamesReformatedString.push(game.name);
          })
          if(user.otherGames !== undefined){
            user.otherGames.forEach(game => {
              auxOtherGamesReformatedString.push(game.name);
            })
          }
          let auxUsersGamesArray: UserGameProfile = {
            name: user.name,
            displayName: user.displayName,
            favGames: auxFavGamesReformatedString,
            otherGames: auxOtherGamesReformatedString,
            typeOfPlayer: user.typeOfPlayer,
            age: ageOfUser = this.calculateAge(user.birthDate)
          }
          reformatedUser.push(auxUsersGamesArray);
        })
        resolve(reformatedUser);
      })
    });
  }

  calculateAge(userDateOfBorn: string):number {
    var reformatedDate = userDateOfBorn.split("-");
    var actualDate = new Date();
    var year = parseInt(reformatedDate[0]);
    var month = parseInt(reformatedDate[1]);
    var day = parseInt(reformatedDate[2]);
    var age = actualDate.getFullYear() - year;
    if (month > actualDate.getMonth()){
      age--;
    }else if (month == actualDate.getMonth()){
      if(day < actualDate.getDay()){
        age--;
      }
    }
    return age;
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
        let aux = users.find(user => user.campo.includes(data));
        if (aux !== undefined){
          result = true;
        }else{
          result = false;
        }
        resolve(result);
      }).catch((error) => reject(error))
    })
  }

  disconectFromDB(connection: string):void{
    switch (connection) {
      case "userConnection":
        this.userConnection.unsubscribe();
        break;
      case "credentialConnection":
        this.credentialConnection.unsubscribe();
      default:
        break;
    }
    
  }
}
