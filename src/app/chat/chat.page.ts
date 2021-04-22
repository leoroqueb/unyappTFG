import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Message, UsuariosI } from '../models/users.interface';
import { ChatService } from '../providers/chat.service';
import { UsuariosProvider } from '../providers/usuarios.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userName: string = "";
  message: string = "";
  chat: Message[] = [];
  myName: string;
  
  user$: Observable<UsuariosI>;
  sus: Subscription;

  constructor(
    private chatService: ChatService,
    private userService: UsuariosProvider
  ) { 
    
    this.userName = this.chatService.getUserInfo();
  }

  async ngOnInit() {
    this.user$ = (await this.userService.getActualUser()).asObservable();
    this.sus = this.user$.subscribe(user => {
      this.myName = user.displayName;
      this.chatService.getChatFromDB(this.myName, this.userName).subscribe(data => {
        //Sort Messages by last incoming
        this.chat = data.sort((a, b) => a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime()) ;
      })
    })
  }

  disconnectSuscription(suscription: Subscription){
    suscription.unsubscribe();
  }

  sendMessage(msg){
    this.chatService.sendMessage(msg.value, this.userName, this.myName);
  }

  ionViewDidLeave(){
   this.disconnectSuscription(this.sus);
  }

  getChatMessages(){}

}
