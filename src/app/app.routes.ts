import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { FilesComponent } from './modules/files/files.component';
import { AuthGuard } from './core/guards/auth-guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'files', component: FilesComponent, canActivate:[AuthGuard]},
    {path:'**', redirectTo:'login'}
];
