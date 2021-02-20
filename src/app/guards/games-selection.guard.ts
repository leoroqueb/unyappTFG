import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserElements, UsuariosI } from '../models/users.interface';
import { AuthService } from '../providers/auth.service';
import { UsuariosProvider } from '../providers/usuarios';

@Injectable({
  providedIn: 'root'
})
export class GamesSelectionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userProvider: UsuariosProvider,
    private router: Router,
    public db: AngularFirestore,
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.authService.afireauth.authState.pipe(
        map((user) =>{
          if(user !== null || user !== undefined && user.emailVerified == true){
            let b: UserElements;
            this.userProvider.compruebaDatosDeUsuarios("favGames").then(userData =>{
              b = userData.find( usuario => usuario.id === user.email );
              if(b.campo === undefined){
                this.router.navigate(['juegos']);
                return true;
              }else{
                this.router.navigate(['home']);
              }
            });
            return true;
            
          }else{
            this.router.navigate(['login'])
            return false;
          }
        })
      );
  }
  
}
