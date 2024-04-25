import { ResolveFn } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const profileResolver: ResolveFn<any> = () => {
    return inject(ProfileService).getUser().pipe(
        catchError(() => {
            console.log('Ошибка при загрузке данных пользователя');
            return of(null);
        })
    );
};
