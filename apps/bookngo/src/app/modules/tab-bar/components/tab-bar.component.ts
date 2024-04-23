import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ITabBarElement } from '../data/interfaces/tab.interface';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tab-bar',
    standalone: true,
    imports: [CommonModule, RouterLink, NgOptimizedImage],
    templateUrl: './tab-bar.component.html',
    styleUrl: './tab-bar.component.scss'
})
export class TabBarComponent {
    protected tabs: ITabBarElement[] = [
        {
            title: 'Calendar',
            icon: 'assets/tabbar-icons/calendar.svg',
            isActive: false,
            path: '../calendar'
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
        this.tabs.forEach((item: ITabBarElement): void => {
            if (item.title === 'Planner') {
                return;
            }
            item.isActive = item == tab;
        });
    }
}
