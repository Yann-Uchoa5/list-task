import { MenuService } from './services/menu.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  @ViewChild(IonMenu) menu!: IonMenu;
  public appPages = [
    {
      title: 'Tarefas',
      url: '/tasks',
      icon: 'list-outline',
      iconRight: 'chevron',
    },
  ];

  public menuVisible: boolean = true; // Inicialmente o menu está visível

  constructor(private router: Router, private menuService: MenuService) {
    // Assinar para atualizar a visibilidade do menu com base no estado
    this.menuService.menuState$.subscribe((state) => {
      this.menuVisible = state;
      this.menu.disabled = !this.menuVisible; // Usar 'disabled' para habilitar ou desabilitar o menu
      if (this.menuVisible) {
        this.menu.close(); // Se o menu estiver visível, abre o menu
      } else {
        this.menu.open();
        // Se não estiver visível, fecha o menu
      }
    });
  }

  toggleMenu() {
    if (this.menuVisible) {
      this.menu.open();
    } else {
      this.menu.close();
    }
  }

  doLogout() {
    this.router.navigate(['/login']);
  }
}
