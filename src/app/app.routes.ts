import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { FilesComponent } from './modules/files/files.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { SignupComponent } from './modules/signup/signup.component';
import ROUTES from './shared/routes';

export const routes: Routes = [
    { path: ROUTES.LOGIN, component: LoginComponent },
    { path: ROUTES.SIGNUP, component: SignupComponent },
    { path: ROUTES.FILES, component: FilesComponent, canActivate:[AuthGuard]},

    {path:'**', redirectTo:ROUTES.LOGIN}
];
