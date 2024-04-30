import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonComponent, TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'bn-button',
  standalone: true,
  imports: [
    CommonModule,
    TuiButtonModule
  ],
  templateUrl: './bn-button.component.html',
  styleUrl: './bn-button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BnButtonComponent {
  
}
