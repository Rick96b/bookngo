import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatTime',
    standalone: true
})
export class FormatTimePipe implements PipeTransform {
    transform(date: Date): string {

        const actualDate: Date = new Date(date);
        const currentDate: Date = new Date();

        if (currentDate.toDateString() === actualDate.toDateString()) {
            let formattedHours: string | number = actualDate.getHours() < 10 ? '0' + actualDate.getHours() : actualDate.getHours();
            let formattedMinutes: string | number = actualDate.getMinutes() < 10 ? '0' + actualDate.getMinutes() : actualDate.getMinutes();
            return `${formattedHours}:${formattedMinutes}`;
        }

        return `${actualDate.getDate()} ${actualDate.toLocaleString('en-GB', {month: 'long'})}`;
    }
}
