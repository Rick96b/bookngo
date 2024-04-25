import { Component } from '@angular/core';
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
})
export class BnButtonComponent extends TuiButtonComponent {
  
}
