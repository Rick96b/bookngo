import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [CommonModule, TuiButtonModule],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss'
})
export class ErrorComponent implements AfterViewInit {

    @ViewChild('errorText') protected _headerElement: ElementRef<HTMLHeadingElement>;

    constructor(private _router: Router) {
    }

    ngAfterViewInit(): void {
        this._headerElement.nativeElement.style.color = 'red';
    }

    protected navigateToHome(): void {
        this._router.navigate(['cabinet']);
    }
}
