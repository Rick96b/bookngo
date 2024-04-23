import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard = () => {
    const authService: AuthService = inject(AuthService);    // получаем сервис
    return authService.getAuthState();
};
