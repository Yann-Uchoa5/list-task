import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuStateSubject = new Subject<boolean>(); // Controle de visibilidade do menu
  menuState$ = this.menuStateSubject.asObservable(); // Observable que o AppComponent vai assinar

  constructor(private router: Router) {
    // Escuta as mudanças de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkMenuState(event.urlAfterRedirects); // Checa se o menu deve ser exibido
      }
    });
  }

  // Função que verifica se o menu deve ser visível com base na URL
  private checkMenuState(url: string): void {
    // Definindo páginas que não devem mostrar o menu
    const noMenuPages = ['/login', '/register']; // Adicione aqui as páginas que não devem ter menu
    if (noMenuPages.includes(url)) {
      this.menuStateSubject.next(false); // Esconde o menu
    } else {
      this.menuStateSubject.next(true); // Mostra o menu
    }
  }
}
