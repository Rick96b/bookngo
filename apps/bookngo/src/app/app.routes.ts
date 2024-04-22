import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register';
import { WelcomeComponent } from './modules/welcome';
import { LoginComponent } from './modules/login';
import { TabBarComponent } from './modules/tab-bar';

// определение маршрутов
export const appRoutes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth', component: LoginComponent },
];
