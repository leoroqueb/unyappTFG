import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Message, UsuariosI } from '../models/users.interface';
import { ChatService } from '../providers/chat.service';
import { UsuariosProvider } from '../providers/usuarios.service';
import { SortRefactor } from '../refactors/refactor';

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
    private userService: UsuariosProvider,
    private sortRefactor: SortRefactor
  ) { 
    
    this.userName = this.chatService.getUserInfo();
  }

  async ngOnInit() {
    this.user$ = (await this.userService.getActualUser()).asObservable();
    this.sus = this.user$.subscribe(user => {
      this.myName = user.displayName;
      this.chatService.getChatFromDB(this.myName, this.userName).subscribe(data => {
        //Sort Messages by last incoming
        this.chat = this.sortMessages(data);
      })
    })
  }

  sortMessages(data: Message[]): Message[]{
    let sortedData: Message[] = [];
    let datesArray: string[] = [];
    data.forEach(element => datesArray.push(element.timestamp));
    let sortedTimestamps: string[] = this.sortRefactor.quickSort(datesArray);
    console.log(sortedTimestamps);
    for (let index = 0; index < sortedTimestamps.length; index++) {
      data.forEach(element => {
        if(element.timestamp == sortedTimestamps[index]){
          sortedData.push(element);
        } 
      }) 
    }
    return sortedData;
  }

  //PASAR AL REFACTOR????
  disconnectSuscription(suscription: Subscription){
    suscription.unsubscribe();
  }

  sendMessage(msg){
    this.chatService.sendMessage(msg.value, this.userName, this.myName);
    document.querySelector("input").value = "";
    this.scrollToEnd();
  }

  ionViewDidLeave(){
   this.disconnectSuscription(this.sus);
  }

  scrollToEnd(){
    const main = document.getElementsByTagName('main')[1];
    main.scrollTop = main.scrollHeight;
  }

}
