import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireAuth,  } from '@angular/fire/auth'
import { CredencialesI, UsuariosI } from '../models/users.interface';
import { AlertasRefactor } from '../refactors/refactor'
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { UsuariosProvider } from './usuarios';
import { GooglePlus } from '@ionic-native/google-plus/ngx'





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<UsuariosI>;
  public credencial$: Observable<CredencialesI>;
  public credentials: firebase.auth.UserCredential | PromiseLike<firebase.auth.UserCredential>;
  
  
  constructor(
    private userProvider: UsuariosProvider,
    public afireauth: AngularFireAuth, 
    public afs: AngularFirestore,
    private platform: Platform,
    private googlePlus: GooglePlus,
    public alerta: AlertasRefactor,
    public router: Router
  ) { 


    //Conectamos con la base de datos 'users'
    this.user$ = this.afireauth.authState.pipe(
      switchMap((user)=>{
        if(user) {
          return this.afs.doc<UsuariosI>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
      
    )

    //Conectamos con la base de datos 'credencialesUser'
    this.credencial$ = this.afireauth.authState.pipe(
      switchMap((user)=>{
        if(user) {
          return this.afs.doc<CredencialesI>(`credencialesUsers/${user.email}`).valueChanges();
        }
        return of(null);
      })
    )
    
  }


  //REGISTRO USUARIO CON EMAIL Y CONTRASEÑA
  async registerUser(email:string, password:string): Promise<firebase.auth.UserCredential>{
    try {    
        //Intentamos el registro, enviamos email de verificación y actualizamos perfil del usuario 
      this.credentials = await this.afireauth
        .createUserWithEmailAndPassword(email, password);  
      return this.credentials;
    } catch (error) {
      this.alerta.alerta(error, "Error");      
    }
  }

  async registerDataForFirstTime(user:UsuariosI, credential: CredencialesI) {
    try {
      await this.sendVerificationEmail();
      this.updateCredencialData(credential);
      this.createDataFirstTime(user, this.credentials);
      this.alerta.alerta("Cuenta registrada correctamente", "Éxito");
      this.router.navigateByUrl('/nonverify')
    } catch (error) {
      console.log(error)
    }
    
  }

  /**
   * 
   * @param user 
   * @param credential
   * @description 
   * Toma los datos introducidos por el usuario para crear un primer perfil.
   * Se diferencia de UsuariosProvider.add() porque en este
   * obtenemos las credenciales que nos devuelve createUserWithEmailAndPassword
   * para unirlas al id del usuario
   *  
   */
  async createDataFirstTime(user: UsuariosI, credential){
      const userRef: AngularFirestoreDocument<UsuariosI> = this.afs.doc(`users/${user.email}`);
      const userProfileDocument: UsuariosI = {
        uid: credential.user.uid,
        displayName: user.displayName,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthDate,
        
      };
      
      return userRef.set(userProfileDocument, {merge: true});
  }

  //Actualiza las credenciales del usuario
  async updateCredencialData(user: CredencialesI){
    const userRef: AngularFirestoreDocument<CredencialesI> = this.afs.doc(`credencialesUsers/${user.email}`);
    const userProfileDocument: CredencialesI = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified
    };
    return userRef.set(userProfileDocument, {merge: true});
  }


  //LOGIN USER CON EMAIL Y CONTRASEÑA
  async loginUser(email: string, password: string): Promise<CredencialesI>{
    try {
      //Obtenemos las credenciales del inicio de sesion
      const {user} = await this.afireauth.signInWithEmailAndPassword(email, password);
      if(user){
        //Si todo ha ido bien, actualizamos las credenciales   
        this.updateCredencialData(user);
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
  isEmailVerified(user: CredencialesI){
    return user.emailVerified === true ? true : false;
  }

  //Reseteo Contraseña
  async resetPassword(email:string): Promise<void>{
    try {
      return this.afireauth.sendPasswordResetEmail(email)
    } catch (error) {
      
    }
  }

  //Login con Google
  async googleLogIn(): Promise<any>{
    if(this.platform.is('android')){
      this.loginGoogleAndroid();
    }else{
      this.loginGoogleWeb();
    } 
    
  }

  userInfo = null;
  async loginGoogleAndroid(){
    try {
      
      await this.googlePlus.login({
        'webClientId': "947506461654-mrsienuncjouk7qkvgsifirrnsqell68.apps.googleusercontent.com", 
        'offline': true
      }).then( async result => {
        this.googleRedirect(result);
      })
      .catch(err => {
        if(err != `${JSON.stringify(12501)}`){
          this.alerta.alerta(`${JSON.stringify(err)}`, "Error") 
        }
        
      }); 
    } catch (error) {
      this.alerta.alerta(error, "Error");
    }
    
  }
  
  async googleRedirect(credencial){
    let usuarios = this.userProvider.compruebaDatosDeUsuarios("email");
    const {user} = await this.afireauth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(credencial.idToken, credencial.accessToken));
    usuarios.then((users) =>{
      let userField = users.find(userFind => userFind.id === user.email);
      if(userField !== undefined){
        this.updateCredencialData(user);
        this.router.navigate(['/home']);
        return user;
      }else{
        this.router.navigate(['/signup/google-sign-up']);
        this.updateCredencialData(user);
        return user;
      } 
    });
  }

  async loginGoogleWeb(){
    //Sacamos todos los usuarios de la bd users
    let usuarios = this.userProvider.compruebaDatosDeUsuarios("email");
    try {
      const {user} = await this.afireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      //Si el usuario ya ha guardado sus datos en la bd users, va al home, si no, al registro.
      usuarios.then((users) =>{
        let userField = users.find(userFind => userFind.id === user.email);
        if(userField !== undefined){
          this.updateCredencialData(user);
          this.router.navigate(['/home']);
          return user;
        }else{
          this.router.navigate(['/signup/google-sign-up']);
          this.updateCredencialData(user);
          return user;
        } 
      })
    } catch (error) {
      this.alerta.alerta("Ha habido un fallo al contactar con los servidores de Google. Inténtalo de nuevo", "Error");
    }
  }

  //CIERRE SESION CON EMAIL Y CONTRASEÑA
  async doLogout(): Promise<void>{
    try {
      if(this.platform.is('android')){
        await this.afireauth.signOut();
        await this.googlePlus.disconnect();
        await this.redirectUserAfterLogOut();
      
      }else{
        await this.afireauth.signOut().then(() =>
          this.redirectUserAfterLogOut()
        );
      }
    } catch (error) {
      console.log("Error =>", error)
    }
     
  }
  redirectUserAfterLogOut(){
    this.router.navigate(['login']);  
  }

  
}
