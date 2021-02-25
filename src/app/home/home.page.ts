import { AfterViewInit, Component,ElementRef,OnInit, QueryList, ViewChildren} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserElements, UserGameProfile, UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios'
import { AuthService } from '../providers/auth.service'
import { AngularFirestore,  } from '@angular/fire/firestore';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { Game } from '../models/games.interface';
//import { Animation, AnimationController } from '@ionic/angular';
import { AlertasRefactor } from '../refactors/refactor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  user$: Observable<UsuariosI>;  
  users$: Observable<UsuariosI[]>;
  usersGameProfile: UserGameProfile[] = [];
  
  userConnection: Subscription;
  usersConnection: Subscription;

  //animation: Animation;
  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;
  constructor(
    
    public db: AngularFirestore,
    private userService: UsuariosProvider,
    private alerta: AlertasRefactor,
    //private auth: AuthService,
    private platform: Platform,
    //private animationCtrl: AnimationController,
    private gestureCtrl: GestureController,
    
  ) {
    
  }

  prueba = {
    displayName: "Pepitodelafrontera50",
    favGames: ["Among us", "COD Warzone"]
  }

  async ngOnInit(){
    this.userConnection = (this.user$ = await this.userService.getActualUser()).subscribe();
    this.userService.getReformatedUsersData().then(games => {
      this.usersGameProfile = games;
    });
  }

  ngAfterViewInit(){
    const cardArray = this.cards.toArray();
    this.swipeGesture(cardArray);
  }

  swipeGesture(cardArray){
    for (let index = 0; index < cardArray.length; index++) {
      const card:ElementRef<any> = cardArray[index];
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe-gesture',
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;

        },
        onEnd: ev => {
          card.nativeElement.style.transition = '.5s ease-out';
          if(ev.deltaX > 150){
            card.nativeElement.style.transform = `translateX(${+this.platform.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.addToUserLikes();
          }else if(ev.deltaX < -150){
            card.nativeElement.style.transform = `translateX(-${+this.platform.width() * 2}px) rotate(${ev.deltaX / 2}deg) opacity: 0 height: '!'`;
            this.addToUserDislikes(); 
          }else{
            card.nativeElement.style.transform = '';
          }
        }
      }); 
      gesture.enable(true);   
    }
    
  }

  addToUserDislikes(){
    console.log("Has rechazado a alguien :(")
  }

  addToUserLikes(){
    console.log("Has dado like a alguien yeyyyy");
  }

 
  ionViewWillLeave(){
    this.userConnection.unsubscribe();
    //this.usersConnection.unsubscribe();
  }
  
  
}
