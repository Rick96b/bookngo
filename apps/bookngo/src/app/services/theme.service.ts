import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private theme = new BehaviorSubject<'light' | 'dark'>('light');
    theme$ = this.theme.asObservable();

    constructor() {}

    initTheme() {
        // Проверяем сохраненную тему или системные настройки
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme as 'light' | 'dark');
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        }

        // Добавляем слушатель изменения системной темы
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme: 'light' | 'dark') {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme.next(theme);
    }

    toggleTheme() {
        const currentTheme = this.theme.getValue();
        this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
} 