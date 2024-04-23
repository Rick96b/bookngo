import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const aboutGuard = () => {
    const authService: AuthService = inject(AuthService);    // получаем сервис
    return authService.getAuthState();
};
