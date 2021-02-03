import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-username.validator',
  templateUrl: './username.validator.page.html',
  styleUrls: ['./username.validator.page.scss'],
})
export class UsernamePage implements OnInit {

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
    static validUsername(fc: FormControl){
      if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
        return ({validUsername: true});
      } else {
        return (null);
      }
    }
}
