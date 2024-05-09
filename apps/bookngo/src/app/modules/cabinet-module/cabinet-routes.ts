import { Routes } from '@angular/router';
import { profileGuard } from '../../pages/profile/guards/profile.guard';
import { homeGuard } from '../../pages/home/guards/home.guard';
import { CabinetComponent } from './components/cabinet.component';

export const cabinetRoutes: Routes = [
    {
        path: '',
        component: CabinetComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {
                path: 'home',
                loadComponent: () => import('../../pages/home')
                    .then((component: any) => component.HomePageComponent),
                canActivate: [homeGuard]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('../../pages/profile')
                            .then((component: any) => component.ProfileComponent),
                        canActivate: [profileGuard]

                    },
                    {
                        path: 'edit',
                        loadComponent: () => import('../user-information-edit')
                            .then((component: any) => component.UserInformationEditComponent)
                    }
                ]
            }
        ]

    },

];
