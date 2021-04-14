import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ChatService } from '../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userName: string = "";
  message: string = "";
  chat: string[] = [];
  constructor(
    private chatService: ChatService,
  ) { 
    this.userName = chatService.sendUserInfo();
  }

  ngOnInit() {
    this.getChatMessages();
  }
  
  getChatMessages(){}
}
