import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register';
import { WelcomePageComponent } from './pages/welcome';
import { LoginComponent } from './modules/login';
import { HomePageComponent } from './pages/home/home.component';
import { authGuard } from './base/guards/authGuard';
import { ProfileComponent } from './pages/profile';
import {
    UserInformationEditComponent
} from './modules/user-information-edit/components/user-information-edit.component';
import { profileGuard } from './pages/profile/guards/profile.guard';

// определение маршрутов
export const appRoutes: Routes = [
    { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'auth', component: LoginComponent },
    { path: '', component: WelcomePageComponent },
    {
        path: 'profile',
        children: [
            {
                path: '',
                component: ProfileComponent
            },
            {
                path: 'edit',
                component: UserInformationEditComponent
            }
        ],
        canActivate: [profileGuard]
    }

];
