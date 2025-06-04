import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cabinetRoutes } from './cabinet-routes';
import { CompanyService, DestroyService, UserService } from '@bookngo/base';
import { NotificationsService } from '../notifications/services/notifications.service';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(cabinetRoutes)],
    exports: [RouterModule],
    providers: [UserService, CompanyService, NotificationsService, DestroyService]
})
export class CabinetRoutingModule {}
