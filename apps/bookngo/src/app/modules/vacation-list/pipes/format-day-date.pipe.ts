import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDayDate',
  standalone: true
})
export class FormatDayDatePipe implements PipeTransform {

  transform(duration: number): string {
      if (duration % 10 == 1 && duration % 100 != 11)
          return `${duration} день`;
      if (duration % 10 >= 2 && duration % 10 <= 4 && (duration % 100 < 12 || duration % 100 > 14))
          return `${duration} дня`;
      return `${duration} дней`;
  }

}
