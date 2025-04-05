import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; // Campo de confirmação de senha

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    // Verificar se as senhas coincidem
    if (this.password !== this.confirmPassword) {
      console.error('As senhas não coincidem.');
      return; // Impede o envio do formulário
    }

    try {
      await this.authService.register(this.email, this.password);
      // Navegação de volta para a página de login com animação padrão
      this.router.navigate(['/login']); // Não use replaceUrl, pois você quer manter o histórico
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login']); // Navega para a página de login
  }
}
