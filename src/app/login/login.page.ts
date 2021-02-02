import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from "firebase";



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home'])
  }
  ngOnInit() {
    
  }
}
