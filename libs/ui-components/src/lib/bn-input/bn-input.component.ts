import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputComponent, TuiInputModule } from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'bn-input',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule
    ],
    templateUrl: './bn-input.component.html',
    styleUrls: ['./bn-input.component.scss'],
})
export class BnInputComponent extends TuiInputComponent {
    @Input() inputType: string = 'text';
    @Input() formControl: FormControl
}
