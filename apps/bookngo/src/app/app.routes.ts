import { Routes } from "@angular/router";

// компоненты, которые сопоставляются с маршрутами
import { RegisterComponent } from "./modules/register";
import { WelcomeComponent } from "./modules/welcome";
import { AuthComponent } from "./modules/auth/components/auth.component";
 
// определение маршрутов
export const appRoutes: Routes = [
    { path: "", component: WelcomeComponent},
    { path: "register", component: RegisterComponent},
    { path: "auth", component: AuthComponent}
];