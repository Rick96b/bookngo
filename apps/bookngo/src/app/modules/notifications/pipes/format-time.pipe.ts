import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatTime',
    standalone: true,
})
export class FormatTimePipe implements PipeTransform {
    transform(date: Date): string {

        const actualDate: Date = new Date(date);

        let hours: number = actualDate.getHours();
        let minutes: number = actualDate.getMinutes();

        let formattedHours: string | number = hours < 10 ? '0' + hours : hours;
        let formattedMinutes: string | number = minutes < 10 ? '0' + minutes : minutes;

        return `${formattedHours}:${formattedMinutes}`;
    }
}
