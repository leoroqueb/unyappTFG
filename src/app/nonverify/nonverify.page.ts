import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CredencialesI } from '../models/users.interface';
import { AuthService } from '../providers/auth.service';
import { AlertasRefactor } from '../refactors/refactor/refactor';

@Component({
  selector: 'app-nonverify',
  templateUrl: './nonverify.page.html',
  styleUrls: ['./nonverify.page.scss'],
})
export class NonverifyPage  {
  credencial$: Observable<CredencialesI> = this.authService.afireauth.user;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alerta: AlertasRefactor
  ) { }

  async onClick(): Promise<void>{
    try {
      await this.authService.sendVerificationEmail();
    } catch (error) {
      console.log(error)
    }
  }
  
  ngOnDestroy(): void {
    this.authService.doLogout();
  }
}
