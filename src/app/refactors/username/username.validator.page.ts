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
export class PasswordValidator {
  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;
  
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    }
   }
  }