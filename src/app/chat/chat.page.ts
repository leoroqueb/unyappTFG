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
    //this.getChatMessages();
    this.sus = this.user$.subscribe(user => {
      //this.chatService.createDBInfo(user.displayName, this.userName);
      this.chatService.getChatFromDB(user.displayName, this.userName).subscribe(data => {
        this.chat = data.sort((a, b) => a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime()) ;
      })
      //  this.disconnectSuscription();
    })
  }
  disconnectSuscription(suscription: Subscription){
    suscription.unsubscribe();
  }

  //NECESITO ENCONTRAR LA MANERA DE OBTENER MI NOMBRE DE USUARIO (REFACTOR?????)
  sendMessage(msg){
    let messageSuscription: Subscription;
    this.user$.subscribe(a => this.chatService.sendMessage(msg.value, this.userName, a.displayName))
  }
  getChatMessages(){}

}
