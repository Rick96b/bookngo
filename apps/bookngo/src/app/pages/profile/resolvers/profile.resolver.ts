import { ResolveFn } from '@angular/router';
import { UserService } from '../../../modules/common/services/user.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { User } from '@bookngo/base';

export const profileResolver: ResolveFn<User | null> = () => {
    return inject(UserService).getUser().pipe(
        catchError(() => {
            console.log('Ошибка при загрузке данных пользователя');
            return of(null);
        })
    );
};
