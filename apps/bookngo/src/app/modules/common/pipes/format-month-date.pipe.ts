import { Pipe, PipeTransform } from '@angular/core';
import { FormatDateInterface } from '../../vacation-list/interfaces/format-date.interface';

@Pipe({
    name: 'formatMonthDate',
    standalone: true
})
export class FormatMonthDatePipe implements PipeTransform {
    transform(value: FormatDateInterface): string {
        return this.formatDate(value.day, value.monthName);
    }

    formatDate(day: number, month: string): string {

        const monthsFormats: { [key: string]: string } = {
            'январь': 'января',
            'февраль': 'февраля',
            'март': 'марта',
            'апрель': 'апреля',
            'май': 'мая',
            'июнь': 'июня',
            'июль': 'июля',
            'август': 'августа',
            'сентябрь': 'сентября',
            'октябрь': 'октября',
            'ноябрь': 'ноября',
            'декабрь': 'декабря'
        };

        const formattedMonth: string = monthsFormats[month.toLowerCase()];

        if (formattedMonth) {
            return `${day} ${formattedMonth}`;
        } else {
            return 'Некорректный месяц';
        }
    }
}
