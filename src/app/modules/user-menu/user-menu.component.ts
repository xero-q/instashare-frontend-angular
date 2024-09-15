import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../core/services/auth.service';
import ROUTES from '../../shared/routes';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MenuModule, NgIf],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  menuVisible = false;

  items: MenuItem[] = [
    { label: 'Signup', icon: 'pi pi-user-plus', routerLink:ROUTES.SIGNUP  },
    { label: 'Logout', icon: 'pi pi-sign-out', command:() => this.logout()  }   
  ];

  constructor (private authService: AuthService){}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout(){
      this.authService.logout();;
  }
}
