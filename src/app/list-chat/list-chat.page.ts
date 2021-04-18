import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosI } from '../models/users.interface';
import { ChatService } from '../providers/chat.service';
import { UsuariosProvider } from '../providers/usuarios.service'

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.page.html',
  styleUrls: ['./list-chat.page.scss'],
})
export class ListChatPage implements OnInit {
  chatUsers: Observable<UsuariosI[]>
  constructor(
    public router: Router,
    private userService: UsuariosProvider,
    private chatService: ChatService,
  ) { 
    this.chatUsers = this.userService.getAllUsersData();
  }

  ngOnInit() {
  }

  openChat(user: string){
    this.router.navigate(['chat']);
    this.chatService.setUserInfo(user);
  }

}
