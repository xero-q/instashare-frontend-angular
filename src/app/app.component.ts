import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { NgStyle, NgIf } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { UserMenuComponent } from "./modules/user-menu/user-menu.component";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    RouterOutlet,
    LoginComponent,
    CardModule,
    SidebarModule,
    PanelModule,
    MenubarModule,
    UserMenuComponent
], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'InstaShare';
  email = 'anibalnuma@gmail.com'
  year = new Date().getFullYear();

  constructor(private primengConfig: PrimeNGConfig, public authService: AuthService) {
    this.primengConfig.csp.set({nonce: '...'});  
  }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation({
          accept: 'Accept',
          reject: 'Cancel'         
      });
    }
}
