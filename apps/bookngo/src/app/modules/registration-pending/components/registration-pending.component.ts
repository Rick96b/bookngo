import { Component, OnInit } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
    standalone: true,
    selector: 'app-registration-pending',
    imports: [
        TuiSvgModule
    ],
    templateUrl: './registration-pending.component.html',
    styleUrl: './registration-pending.component.scss'
})
export class RegistrationPendingComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
