import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserElements, UsuariosI } from '../models/users.interface';
import { AuthService } from '../providers/auth.service';
import { UsuariosProvider } from '../providers/usuarios.service';

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
          if(user != null || user != undefined || user.emailVerified != true || user.email != null){
            let data: UserElements;
            this.userProvider.compruebaDatosDeUsuarios("favGames").then(userData =>{
              data = userData.find( usuario => usuario.id === user.email );
              if(data.campo === undefined){
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
