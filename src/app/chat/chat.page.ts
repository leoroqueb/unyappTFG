import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.interface';
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
  chat: string[] = [];
  
  user$: Observable<UsuariosI>;
  sus: Subscription;

  constructor(
    private chatService: ChatService,
    private userService: UsuariosProvider
  ) { 
    
    this.userName = this.chatService.getUserInfo();
  }

  async ngOnInit() {
    this.user$ = await this.userService.getActualUser();
    //this.getChatMessages();
    this.sus = this.user$.subscribe(user => {
      this.chatService.createDBInfo(user.displayName, this.userName);
      this.disconnectSuscription();
    })
  }
  disconnectSuscription(){
    this.sus.unsubscribe();
  }
  getChatMessages(){}

}
