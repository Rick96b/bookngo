import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { TabBarComponent } from '../../tab-bar/components/tab-bar.component';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    standalone: true,
    imports: [RouterModule, TabBarComponent],
    animations: [
        trigger('routeAnimations', [
            transition('* <=> *', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('300ms ease-out',
                    style({ opacity: 1, transform: 'translateY(0)' })
                )
            ])
        ])
    ]
})
export class CabinetComponent {
    prepareRoute(outlet: any) {
        return outlet?.activatedRouteData?.['animation'] || outlet;
    }
}
