import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register';
import { WelcomeComponent } from './modules/welcome';
import { AuthComponent } from './modules/auth/components/auth.component';
import { TabBarComponent } from './modules/tab-bar';

// определение маршрутов
export const appRoutes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'tab-bar', component: TabBarComponent }
];
