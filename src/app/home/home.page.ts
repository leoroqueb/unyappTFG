import { Component,OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios'
import { AuthService } from '../providers/auth.service'
import { NavController } from '@ionic/angular'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public user$: Observable<UsuariosI>;  
  constructor(
    public db: AngularFirestore,
    private userService: UsuariosProvider,
    private auth: AuthService,
  ) {
    
  }

  
  ionViewCanLeave(){
    
  }
  
  async ngOnInit(){
    (this.user$ = await this.userService.getActualUser()).subscribe(
      //res => console.log(res)
    )
  }

  ngOnDestroy(){
    this.auth.doLogout();
  }

  cerrarSesion(){
    this.auth.doLogout();
    
  }

}
