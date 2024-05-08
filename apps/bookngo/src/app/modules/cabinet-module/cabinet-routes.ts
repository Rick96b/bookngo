import { Routes } from '@angular/router';
import { HomePageComponent } from '../../pages/home/components/home.component';
import { ProfileComponent } from '../../pages/profile';
import { profileGuard } from '../../pages/profile/guards/profile.guard';
import { UserInformationEditComponent } from '../user-information-edit/components/user-information-edit.component';
import { homeGuard } from '../../pages/home/guards/home.guard';
import { CabinetComponent } from './components/cabinet.component';

export const cabinetRoutes: Routes = [
    {
        path: '',
        component: CabinetComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', component: HomePageComponent, canActivate: [homeGuard] },
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
                ]
            }
        ]

    },

];
