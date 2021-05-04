import { AfterViewInit, Component,ElementRef,OnInit, QueryList, ViewChildren} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserGameProfile, UserMatches, UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios.service'
import { AngularFirestore,  } from '@angular/fire/firestore';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { AlertaRefactor } from '../refactors/refactor';
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
  mustBeRemoved = [];
  aux = [];
  profileToFilter: string = '';
  
  userConnection: Subscription;
  dataConnection: Subscription;
  cardArrayConnection: Subscription;
  

  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef<IonCard>>;
  constructor(
    
    public db: AngularFirestore,
    private userService: UsuariosProvider,
    private alerta: AlertaRefactor,
    private platform: Platform,
    private gestureCtrl: GestureController,
    private matchService: MatchService,
    
  ) {
    
  }
  displayName:string;
  myself: UserMatches = null;
  async ngOnInit(){
    this.user$ = await this.userService.getActualUser();
    this.dataConnection = this.user$.subscribe(me =>{ 
      //Obtenemos todos los perfiles a mostrar
      this.userService.getReformatedUsersData().then(async games => {
        //Obtenemos los datos de los likes/dislakes de los usuarios
        await this.matchService.getUsersMatchData().then(users => {
          //Me separo a mi mismo
          this.myself = users.find(myself => myself.userName == me.displayName);
          //Recorro. Añado a la variable que muestra las ion cards los perfiles que no son yo mismo, ni estén entre mis likes/dislikes
          users.forEach(userSearch => {
            if(userSearch.userName != this.myself.userName){
              if(!this.myself.likes.includes(userSearch.userName) && !this.myself.dislikes.includes(userSearch.userName)){
                this.usersGameProfile.push(games.find(game => game.displayName == userSearch.userName));
              }
            }
          })  
        })
      }); 
    }) 
  }


  ngAfterViewInit(){
    const cardArray = this.cards.changes;
    this.userConnection = cardArray.subscribe(item => {
      this.swipeGesture(item.toArray())
    })
    
  }

  swipeGesture(cards){   
    for (let index = 0; index < cards.length; index++) {
      const card:ElementRef<any> = cards[index];
      //Actualizamos ID de los titulos de las cartas
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe-gesture',
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => {
          let user = card.nativeElement.children[0].childNodes[0].textContent;
          card.nativeElement.style.transition = '.5s ease-out';
          if(ev.deltaX > 150){
            card.nativeElement.style.transform = `translateX(${+this.platform.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.addToUserLikes(user);
          }else if(ev.deltaX < -150){
            card.nativeElement.style.transform = `translateX(-${+this.platform.width() * 2}px) rotate(${ev.deltaX / 2}deg)`;
            this.addToUserDislikes(user); 
          }else{
            card.nativeElement.style.transform = '';
          }
        }
      }); 
      
      gesture.enable(true); 
    }
  }

  addToUserDislikes(user:string){
    this.matchService.addDislikeToUserDB(user);
  }

  connection: Subscription;
  addToUserLikes(like: string){
    this.matchService.addLikeToUserDB(like);
    var match = this.matchService.checkForMatch(like);

    match.subscribe(user => {
      let myDisplayName = this.matchService.getUserDisplayName();
      
      this.connection = myDisplayName.subscribe(displayName => {
        if(user.likes.includes(displayName)){
          this.match(like, displayName);
          match.complete();
        }
      });
     
    }); 
    
  }

  match(match: string, myName: string){
    this.alerta.alerta("Hay match con "+match+" !!", "MAATCHH!!");
    this.matchService.addMatchToUserDB(match, myName);
    this.connection.unsubscribe();
  }

  ionViewWillLeave(){
   
    //this.dataConnection.unsubscribe();
  }
  
  
}
