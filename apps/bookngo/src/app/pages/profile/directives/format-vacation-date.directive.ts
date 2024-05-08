import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Vacation } from '@bookngo/base';
import { FormatDateContextInterface } from '../interfaces/format-date-context.interface';

@Directive({
    selector: '[formatVacationDate]',
    standalone: true
})
export class FormatVacationDateDirective implements OnInit {

    private _vacationDuration: number;

    private _startDate: FormatDateContextInterface
    private _endDate: FormatDateContextInterface

    @Input()
    set formatVacationDate({ startDate, endDate }: Vacation) {
        this._vacationDuration = this.countDuration(new Date(startDate), new Date(endDate));
        this._startDate = this.formatDate(new Date(startDate));
        this._endDate = this.formatDate(new Date(endDate));
    }

    private countDuration(startDate: Date, endDate: Date): number {
        return Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000));
    }

    private formatDate(date: Date): FormatDateContextInterface {
        return  {
            day: date.getDate(),
            monthName: date.toLocaleString('default', { month: 'long' })
        } as FormatDateContextInterface
    }

    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
            vacationDuration: this._vacationDuration,
            startDate: this._startDate,
            endDate: this._endDate
        });
    }
}
