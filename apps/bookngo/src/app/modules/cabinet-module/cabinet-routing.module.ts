import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cabinetRoutes } from './cabinet-routes';
import { CabinetComponent } from './components/cabinet.component';
import { TabBarComponent } from '../tab-bar';
import { CompanyService, DestroyService, UserService } from '@bookngo/base';
import { NotificationsService } from '../notifications/services/notifications.service';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(cabinetRoutes), TabBarComponent],
    exports: [RouterModule],
    declarations: [CabinetComponent],
    bootstrap: [CabinetComponent],
    providers: [UserService, CompanyService, NotificationsService, DestroyService]
})
export class CabinetRoutingModule {}
