import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AlertasRefactor } from '../refactors/refactor/refactor';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private alerta: AlertasRefactor
  ) { }

  ngOnInit() {
  }
  async onSubmit(email){
    try {
      await this.authService.resetPassword(email.value);
      this.alerta.alerta("Se ha enviado un correo con las instrucciones para reestablecer la contraseña", "Aviso");
      this.router.navigate(['/login']); 
    } catch (error) {
      
    }
    
  }
}
