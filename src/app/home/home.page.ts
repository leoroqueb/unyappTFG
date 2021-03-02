import { AfterViewInit, Component,ElementRef,OnInit, QueryList, ViewChildren} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserElements, UserGameProfile, UserMatches, UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios.service'
import { AuthService } from '../providers/auth.service'
import { AngularFirestore,  } from '@angular/fire/firestore';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { Game } from '../models/games.interface';
//import { Animation, AnimationController } from '@ionic/angular';
import { AlertasRefactor } from '../refactors/refactor';
import { MatchService } from '../providers/match.service';


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
  cardArrayConnection: Subscription;

  //animation: Animation;
  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;
  constructor(
    
    public db: AngularFirestore,
    private userService: UsuariosProvider,
    //private alerta: AlertasRefactor,
    private auth: AuthService,
    private platform: Platform,
    //private animationCtrl: AnimationController,
    private gestureCtrl: GestureController,
    private matchService: MatchService
    
  ) {
    
  }

  async ngOnInit(){
    this.userConnection = (this.user$ = await this.userService.getActualUser()).subscribe(data => {
      let userMatchData: UserMatches = {
        userName: data.displayName,
        likes: [],
        dislikes: []
      };
      this.matchService.addDocToDB(userMatchData);
    });
    this.userService.getReformatedUsersData().then(games => {
      this.usersGameProfile = games;
    });

  }

  ngAfterViewInit(){
    const cardArray = this.cards.changes;
    this.cardArrayConnection = cardArray.subscribe(item => {
      this.swipeGesture(item.toArray());
    })
    
  }

  swipeGesture(cardArray){
    for (let index = 0; index < cardArray.length; index++) {
      const card:ElementRef<any> = cardArray[index];
      console.log(card.nativeElement)
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
            card.nativeElement.style.transform = `translateX(-${+this.platform.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
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
    //this.matchService.addLikeToUserArray()
  }

 
  ionViewWillLeave(){
    this.userConnection.unsubscribe();
    this.cardArrayConnection.unsubscribe();
  }
  
  
}
