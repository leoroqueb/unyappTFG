import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../providers/auth.service'
import { AlertasRefactor } from '../refactors/username/refactor'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertasRefactor
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.credencial$.pipe(
        take(1),
        map((user) =>{
          console.log(user);
          if(user.emailVerified){
            
            return true;
          }else{
            this.alert.alerta("¡¡NO PUEDES PASAR!!", "Gandalf dice");
            this.router.navigateByUrl('/login');
            return false;
          }
        })
      );
  }
  
}
