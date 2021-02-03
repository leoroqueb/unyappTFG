import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroRefactor } from './../../refactors/username/refactor';
import { AuthService } from './../../providers/auth.service';
import { UsernamePage } from './../../refactors/username/username.validator.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-otros-datos',
  templateUrl: './signup-otros-datos.page.html',
  styleUrls: ['./signup-otros-datos.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class SignupOtrosDatosPage implements OnInit {
  detalles: any;
  constructor(
    public refactor: RegistroRefactor,
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
  }
  signUpForm = new FormGroup({
    nick: new FormControl('', Validators.compose([
      UsernamePage.validUsername,
      Validators.required
    ])),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required), 
  })

  recibirDatosForm(form){
    this.refactor.recibirDatosSecundarios(form);
    this.detalles = this.refactor.obtenerFormFinal();
    this.signup(this.detalles);
    
  }
  signup(user) {
    return new Promise<any>((resolve, reject) =>{
      this.authService.registerUser(user).then(
        res => resolve(res),
        err => reject(err)
      )
      
    })
  }
}
