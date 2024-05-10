import { Pipe, PipeTransform } from '@angular/core';
import { FormatDateInterface } from '../interfaces/format-date.interface';
import { Vacation } from '@bookngo/base'

@Pipe({
    name: 'sortDate',
    standalone: true,
})
export class SortDate implements PipeTransform {
    transform(value: Vacation[]): Vacation[] {
        const vacations = value
        vacations.sort((a, b) => {
            const firstStartDate = new Date(a.startDate)
            const endStartDate = new Date(b.startDate)
            if(firstStartDate > endStartDate) {
                return -1
            }
            return 1
        }) 
        return vacations
    }
}
