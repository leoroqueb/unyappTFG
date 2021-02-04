import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { CredencialesI, UsuariosI } from '../models/users.interface';
import { AlertasRefactor } from '../refactors/username/refactor'
import { Router } from '@angular/router';
import { UsuariosProvider } from '../providers/usuarios'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebaseui';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  public user$: Observable<UsuariosI>;
  public credencial$: Observable<CredencialesI>;
  
  
  constructor(
    public afireauth: AngularFireAuth, 
    public afs: AngularFirestore,
    public alerta: AlertasRefactor,
    private router: Router,
    private userProvider: UsuariosProvider
       
  ) { 
    this.user$ = this.afireauth.authState.pipe(
      switchMap((user)=>{
        if(user) {
          return this.afs.doc<UsuariosI>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
      
    )
  }

  getCredentialData(){
    this.credencial$ = this.afireauth.authState.pipe(
      switchMap((user)=>{
        if(user) {
          return this.afs.doc<CredencialesI>(`credencialesUsers/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )
  }

  //REGISTRO USUARIO CON EMAIL Y CONTRASEÑA
  async registerUser(user: UsuariosI, email:string, password:string): Promise<any> {
    try {
       const credentials = await this.afireauth
        .createUserWithEmailAndPassword(email, password);
        //await this.sendVerificationEmail();
        const userRef: AngularFirestoreDocument<UsuariosI> = this.afs.doc(`users/${credentials.user.uid}`);
        this.updateData(user, userRef, credentials);
    } catch (error) {
      console.log(error);
    }
  }

  async updateCredencialData(user: CredencialesI){
    const userRef: AngularFirestoreDocument<CredencialesI> = this.afs.doc(`credencialesUsers/${user.email}`);
    const userProfileDocument: CredencialesI = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified
    };
    return userRef.set(userProfileDocument, {merge: true});
  }

  async updateData(user: UsuariosI, userRef: AngularFirestoreDocument<UsuariosI>, credential){
    
    const userProfileDocument: UsuariosI = {
      uid: credential.user.uid,
      displayName: user.displayName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      birthDate: user.birthDate,
      //Valor opcional
      emailVerified: user.emailVerified
    };
    return userRef.set(userProfileDocument, {merge: true});
  }

  //LOGIN USER CON EMAIL Y CONTRASEÑA
  async loginUser(email, password): Promise<CredencialesI>{
    try {
      const {user} = await this.afireauth.signInWithEmailAndPassword(email, password);
      if(user){
        this.isLogged = true;
        console.log(this.getCredentialData())
        return user;
      }
    } catch (error) {
      this.alerta.alerta("Los datos introducidos no son correctos", "Error")
    }
    
    
  }

  //Metodo firebase que envia correo de confirmacion
  async sendVerificationEmail(): Promise<void>{
    try {
      return (await this.afireauth.currentUser).sendEmailVerification();
    } catch (error) {
      
    }
  }

  //Comprueba que el email esta verificado
  async isEmailVerified(user: CredencialesI){
    return user.emailVerified === true ? true : false;
  }

  //Reseteo Contraseña
  async resetPassword(email:string): Promise<void>{
    try {
      return this.afireauth.sendPasswordResetEmail(email)
    } catch (error) {
      
    }
  }


  async googleLogOut(): Promise<void>{}

  //Login con Google
  async googleLogIn(): Promise<any>{
    try {
      const {user} = await this.afireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return user;
    } catch (error) {
      
    }
  }

  //CIERRE SESION CON EMAIL Y CONTRASEÑA
  async doLogout(): Promise<void>{
    try {
      await this.afireauth.signOut();
    } catch (error) {
      console.log("Error =>", error)
    }
    
  }

  
}
