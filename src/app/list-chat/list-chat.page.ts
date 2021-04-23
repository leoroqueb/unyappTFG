import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../providers/chat.service';
import { MatchService } from '../providers/match.service';
import { UsuariosProvider } from '../providers/usuarios.service';
import { DBRefactor } from '../refactors/refactor';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.page.html',
  styleUrls: ['./list-chat.page.scss'],
})
export class ListChatPage implements OnInit {
  chatUsers: string[]

  userSus: Subscription;
  listChatSus: Subscription;
  constructor(
    public router: Router,
    private matchService: MatchService,
    private chatService: ChatService,
    private userService: UsuariosProvider,
    private refactor: DBRefactor
  ) { 
    
  }

  async ngOnInit() {
    this.userSus = (await this.userService.getActualUser()).subscribe(data => {
      this.listChatSus = this.matchService.matchCollection.doc(data.displayName).valueChanges().subscribe(matches => {
        this.chatUsers = matches.matches;
      })
    })
  }

  openChat(user: string){
    this.router.navigate(['chat']);
    this.chatService.setUserInfo(user);
  }

  ionViewDidLeave(){
   this.refactor.disconnectFromDB(this.listChatSus);
   this.refactor.disconnectFromDB(this.userSus);
   console.log("disconnected");
  }

}
