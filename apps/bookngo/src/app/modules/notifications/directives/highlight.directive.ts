import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[highlight]',
    standalone: true,
})
export class HighlightDirective   {
    constructor(private elementRef: ElementRef) {

    }
    @HostListener('click')
    onClick(): void  {
        this.elementRef.nativeElement.style.background = '#f9ffea'
    }
}
