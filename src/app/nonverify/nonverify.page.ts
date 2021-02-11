import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UsuariosI } from '../models/users.interface';
import { AuthService } from '../providers/auth.service';
import { UsuariosProvider } from '../providers/usuarios';

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
