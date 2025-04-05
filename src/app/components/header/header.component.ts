import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() title: string = ''; // Define o título dinamicamente

  constructor(private auth: Auth, private router: Router) {}

  async logout() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }
}
