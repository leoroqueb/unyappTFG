import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { $ } from 'protractor';
import { Observable, Subscription } from 'rxjs';
import { CredencialesI, UsuariosI } from '../models/users.interface';
import { AuthService } from '../providers/auth.service';
import { UsuariosProvider } from '../providers/usuarios';
import { AlertasRefactor } from '../refactors/refactor';

@Component({
  selector: 'app-nonverify',
  templateUrl: './nonverify.page.html',
  styleUrls: ['./nonverify.page.scss'],
})
export class NonverifyPage implements OnInit  {
  public user$: Observable<UsuariosI>;  
  constructor(
    private authService: AuthService,
    private userProvider: UsuariosProvider,
    private popOver: PopoverController
  ) { }

  async ngOnInit(){
    (this.user$ = await this.userProvider.getActualUser()).subscribe()
  }
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
