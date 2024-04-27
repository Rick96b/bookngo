import { ResolveFn } from '@angular/router';
import { CompanyService } from '@bookngo/base';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { User } from '@bookngo/base';

export const profileResolver: ResolveFn<User | null> = () => {
    return inject(CompanyService).getMe().pipe(
        catchError(() => {
            console.log('Ошибка при загрузке данных пользователя');
            return of(null);
        })
    );
};
