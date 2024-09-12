import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { NgStyle } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgStyle,
    RouterOutlet,
    LoginComponent,
    CardModule,
    SidebarModule,
    PanelModule,
    MenubarModule   
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-angular';
  sidebarVisible: boolean = true;
  email = 'anibalnuma@gmail.com'
  year = new Date().getFullYear();

  constructor(private primengConfig: PrimeNGConfig) {
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
