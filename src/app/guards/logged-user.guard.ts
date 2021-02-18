import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../providers/auth.service'
import { AlertasRefactor } from '../refactors/refactor';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertasRefactor
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.afireauth.authState.pipe(
        map((user) =>{
          if(user === null || user === undefined || user.emailVerified == false){            
            return true;
          }else{
            this.router.navigate(['home']);
            return false;
          }
        })
      );
    
  }
  
}
