import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { ToastRefactor } from '../refactors/refactor';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastRefactor
  ) { }

  ngOnInit() {
  }

  resetPasswordForm = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required,
    ])),
  })
  
  async onSubmit(email){
    await this.authService.resetPassword(email.value).then(() => {
      this.toast.presentToast("Se ha enviado un correo con las instrucciones para reestablecer la contraseña");
      this.router.navigate(['/login']); 
    })
    .catch(err => {
      this.toast.presentToast("Ha ocurrido un error, inténtelo de nuevo.");
      console.log(err);
    });
  }
}
