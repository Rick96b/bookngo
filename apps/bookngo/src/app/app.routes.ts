import { Routes } from "@angular/router";

// компоненты, которые сопоставляются с маршрутами
import { Register } from "./modules/register";
import { WelcomeComponent } from "./modules/welcome";
import { AuthComponent } from "./modules/auth/components/auth.component";
 
// определение маршрутов
export const appRoutes: Routes = [
    { path: "", component: WelcomeComponent},
    { path: "register", component: Register},
    { path: "auth", component: AuthComponent}
];