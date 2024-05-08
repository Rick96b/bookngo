import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ITabBarElement } from '../data/interfaces/tab.interface';
import { RouterLink } from '@angular/router';
import { TuiButtonModule, TuiDropdownModule } from '@taiga-ui/core';
import { VacationRequestComponent } from '../../vacation-request';
import { TuiActiveZoneModule, TuiObscuredModule } from '@taiga-ui/cdk';

@Component({
    selector: 'app-tab-bar',
    standalone: true,
    imports: [
        CommonModule, 
        RouterLink, 
        NgOptimizedImage, 
        TuiDropdownModule, 
        VacationRequestComponent,
        TuiButtonModule,
        TuiActiveZoneModule,
        TuiObscuredModule
    ],
    templateUrl: './tab-bar.component.html',
    styleUrl: './tab-bar.component.scss'
})
export class TabBarComponent {
    protected open = false
    protected tabs: ITabBarElement[] = [
        {
            title: 'Calendar',
            icon: 'assets/tabbar-icons/calendar.svg',
            isActive: true,
            path: '../home'
        },
        {
            title: 'Planner',
            icon: 'assets/tabbar-icons/planner.svg',
            isActive: false,
            path: '../planner'
        },
        {
            title: 'Profile',
            icon: 'assets/tabbar-icons/profile.svg',
            isActive: false,
            path: '../profile'
        }
    ];

    onClick(tab: ITabBarElement): void {
        if (tab.title === 'Planner') {
            this.open = !this.open;
        } else {
            this.tabs.forEach((item: ITabBarElement): void => {
                item.isActive = item == tab;
            });
        }

    }

    onObscured(obscured: boolean): void {
        if (obscured) {
            this.open = false;
        }
    }
 
    onActiveZone(active: boolean): void {
        this.open = active && this.open;
    }
}
