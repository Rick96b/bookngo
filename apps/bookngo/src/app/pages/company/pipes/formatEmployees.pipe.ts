import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@bookngo/base'

@Pipe({
  name: 'formatEmployees',
  standalone: true
})
export class FormatEmployeesPipe implements PipeTransform {
    getNoun(number: number) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
          return 'сотрудников';
        }
        n %= 10;
        if (n === 1) {
          return 'сотрудник';
        }
        if (n >= 2 && n <= 4) {
          return 'сотрудника';
        }
        return 'сотрудников';
    }
    transform(number: number): string {
      return `${number} ${this.getNoun(number)}`
    }
}