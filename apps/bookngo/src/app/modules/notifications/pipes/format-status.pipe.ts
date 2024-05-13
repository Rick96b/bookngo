import { Pipe, PipeTransform } from '@angular/core';
import { UserService, Vacation } from '@bookngo/base';

@Pipe({
    name: 'formatStatus',
    standalone: true,
})
export class FormatStatusPipe implements PipeTransform {

    constructor(private _userService: UserService) {
    }
    transform(type: string, vacationId: number = 0): string {
        if (type.includes('отдел')) {
            return `${type} одобрена`
        }
        if (this._userService.getVacationById(vacationId)?.status === 'approved') {
            return `${type} одобрена`
        }
        return `${type} отклонена`
    }
}
