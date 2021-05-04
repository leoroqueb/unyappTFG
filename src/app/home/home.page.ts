import { AfterViewInit, Component,ElementRef,OnInit, QueryList, ViewChildren} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PrivacyData, UserGameProfile, UserMatches, UsuariosI } from '../models/users.interface'
import { UsuariosProvider } from '../providers/usuarios.service'
import { AngularFirestore,  } from '@angular/fire/firestore';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { AlertaRefactor, DBRefactor } from '../refactors/refactor';
import { MatchService } from '../providers/match.service';
import { SettingsService } from '../providers/settings.service';

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
  privacyConnection: Subscription;
  matchConnection: Subscription;

  myself: UserMatches = null;
  userPrivacy: PrivacyData;
  

  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef<IonCard>>;
  constructor(
    
    public db: AngularFirestore,
    private userService: UsuariosProvider,
    private alerta: AlertaRefactor,
    private dbRefactor: DBRefactor,
    private platform: Platform,
    private gestureCtrl: GestureController,
    private matchService: MatchService,
    private settingService: SettingsService
    
  ) {
    
  }
  
  
  ngOnInit(){
     this.showCardsInfo();
     this.userPrivacy = {
       age: true,
       name: false
     }
  }

  getPlayerSettings(user: string){
    this.privacyConnection = this.settingService.connectToDB(user).subscribe(privacy => {
      this.userPrivacy = privacy;
    });
  }

  async showCardsInfo(){
    this.user$ = await this.userService.getActualUser();
    this.dataConnection = this.user$.subscribe(me =>{ 
      //We get all profiles data from DB with reformated style
      this.userService.getReformatedUsersData().then(async games => {
        //We get all likes/dislikes that I made
        await this.matchService.getUsersMatchData().then(users => {
          //Please Uny, don't show myself
          this.myself = users.find(myself => myself.userName == me.displayName);
          //Loop. This set ionCards profileData except myself, or any people I liked/disliked 
          users.forEach(userSearch => {
            if(userSearch.userName != this.myself.userName){
              if(!this.myself.likes.includes(userSearch.userName) && !this.myself.dislikes.includes(userSearch.userName)){
                //Check privacy info of the user and what to show on the ionCard, then we add the ionCard to the users array
                this.getPlayerSettings(userSearch.userName);
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

  
  addToUserLikes(like: string){
    this.matchService.addLikeToUserDB(like);
    var likes = this.matchService.getUsersDataLookingForMatch(like);

    likes.subscribe(user => {
      let myDisplayName = this.matchService.getUserDisplayName();
      
      this.matchConnection = myDisplayName.subscribe(displayName => {
        if(user.likes.includes(displayName)){
          this.match(like, displayName);
          likes.complete();
        }
      });
     
    }); 
    
  }

  match(match: string, myName: string){
    this.alerta.alerta("Hay match con "+match+" !!", "MAATCHH!!");
    this.matchService.addMatchToUserDB(match, myName);
    this.dbRefactor.disconnectFromDB(this.matchConnection);
  }

  ionViewDidLeave(){
    this.dbRefactor.disconnectFromDB(this.dataConnection);
    this.dbRefactor.disconnectFromDB(this.userConnection);
    this.dbRefactor.disconnectFromDB(this.privacyConnection);
  }
  
  
}
