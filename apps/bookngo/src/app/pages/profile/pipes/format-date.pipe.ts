import { Pipe, PipeTransform } from '@angular/core';
import { FormatDateContextInterface } from '../interfaces/format-date-context.interface';

@Pipe({
    name: 'formatDate',
    standalone: true,
})
export class FormatDatePipe implements PipeTransform {
    transform(value: FormatDateContextInterface, ...args: FormatDateContextInterface[]): string {
        return `${value.day} ${value.monthName} - ${args[0].day} ${args[0].monthName}`
    }
}
