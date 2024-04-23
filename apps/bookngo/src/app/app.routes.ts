import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register';
import { WelcomePageComponent } from './pages/welcome';
import { LoginComponent } from './modules/login';
import { HomePageComponent } from './pages/home/home.component';
import { authGuard } from './base/guards/authGuard';

// определение маршрутов
export const appRoutes: Routes = [
    { path: 'home', component: HomePageComponent, canActivate: [authGuard]},
    { path: 'register', component: RegisterComponent},
    { path: 'auth', component: LoginComponent},
    { path: '', component: WelcomePageComponent },
];
