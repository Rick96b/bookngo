import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register';
import { WelcomePageComponent } from './pages/welcome';
import { LoginComponent } from './modules/login';
import { ErrorComponent } from './pages/error';
import { authGuard } from '@bookngo/base';

export const appRoutes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'auth', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'cabinet',
        loadChildren: () => import('./modules/cabinet-module/cabinet-routing.module').then((a: any) => a.CabinetRoutingModule),
        canActivate: [authGuard]
    },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: 'error' }
];
