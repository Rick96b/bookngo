import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatNotificationDate',
    standalone: true,
})
export class FormatNotificationDatePipe implements PipeTransform {
    transform(startDate: string, ...state: boolean[]): string {
        const date: Date = new Date(startDate);

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
        let day: string = (date.getDate() - 1).toString().replace(/^0+/, '');
        const formattedMonth: string = monthsFormats[date.toLocaleString('default', {month: 'long'}).toLowerCase()];

        return state[0] ? `${day} ${formattedMonth} ${date.getFullYear().toString()}` : `${day} ${formattedMonth}`;
    }
}
