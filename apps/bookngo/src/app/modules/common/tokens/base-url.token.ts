import { InjectionToken } from '@angular/core';

export const BASE_URL: InjectionToken<string> = new InjectionToken<string>('base_api_url',
    { providedIn: 'root', factory: (): string => 'http://localhost:3000/api' });
