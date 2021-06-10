import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../providers/auth.service'
import { AlertaRefactor } from '../refactors/refactor'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertaRefactor
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.afireauth.authState.pipe(
        map((user) =>{
          if(user !== null || user !== undefined){           
            return true;
          }else{
            this.alert.alerta("¡¡NO PUEDES PASAR!!", "Gandalf dice");
            this.router.navigate(['login']);
            return false;
          }
        })
      );
  }
  
}
