import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'positionTransform',
    standalone: true
})
export class PositionTransformPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'ceo':
                return value.toUpperCase();
            default:
                return 'Сотрудник';
        }
    }
}
