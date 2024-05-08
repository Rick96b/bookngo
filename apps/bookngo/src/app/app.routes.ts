import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register';
import { WelcomePageComponent } from './pages/welcome';
import { LoginComponent } from './modules/login';
import { HomePageComponent } from './pages/home/components/home.component';
import { authGuard } from './base/guards/authGuard';
import { ProfileComponent } from './pages/profile';
import {
    UserInformationEditComponent
} from './modules/user-information-edit/components/user-information-edit.component';
import { profileGuard } from './pages/profile/guards/profile.guard';
import { ErrorComponent } from './pages/error/components/error.component';
import { homeGuard } from './pages/home/guards/home.guard';

// определение маршрутов
export const appRoutes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'auth', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomePageComponent, canActivate: [authGuard, homeGuard] },
    {
        path: 'profile',
        children: [
            {
                path: '',
                component: ProfileComponent,
                canActivate: [profileGuard]
            },
            {
                path: 'edit',
                component: UserInformationEditComponent
            }
        ],
        canActivate: [authGuard]
    },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: 'error' }
];
