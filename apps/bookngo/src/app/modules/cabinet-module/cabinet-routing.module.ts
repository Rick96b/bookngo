import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cabinetRoutes } from './cabinet-routes';
import { CabinetComponent } from './components/cabinet.component';
import { TabBarComponent } from '../tab-bar';
import { CompanyService, UserService } from '@bookngo/base';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(cabinetRoutes), TabBarComponent],
    exports: [RouterModule],
    declarations: [CabinetComponent],
    bootstrap: [CabinetComponent],
    providers: [UserService, CompanyService]
})
export class CabinetRoutingModule {}
