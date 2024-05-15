import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Vacation } from '@bookngo/base';
import { FormatDateInterface } from '../interfaces/format-date.interface';

@Directive({
    selector: '[formatVacationDate]',
    standalone: true
})
export class FormatVacationDateDirective implements OnInit {
    private _vacationDuration: number;
    private _year: number;
    private _startDate: FormatDateInterface
    private _endDate: FormatDateInterface

    @Input()
    set formatVacationDate({ startDate, endDate }: Vacation) {
        const _startDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() - 1))
        const _endDate = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 1))

        this._year = new Date(_startDate).getFullYear()
        this._vacationDuration = this.countDuration(new Date(_startDate), new Date(_endDate));
        this._startDate = this.formatDate(_startDate);
        this._endDate = this.formatDate(_endDate);
    }

    private countDuration(startDate: Date, endDate: Date): number {
        return Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000)) + 1;
    }

    private formatDate(date: Date): FormatDateInterface {
        return  {
            day: date.getDate(),
            monthName: date.toLocaleString('default', { month: 'long' })
        } as FormatDateInterface
    }

    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
            year: this._year,
            vacationDuration: this._vacationDuration,
            startDate: this._startDate,
            endDate: this._endDate
        });
    }
}
