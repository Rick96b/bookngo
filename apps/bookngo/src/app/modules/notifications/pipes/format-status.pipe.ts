import { Pipe, PipeTransform } from '@angular/core';
import { UserService, Vacation } from '@bookngo/base';

@Pipe({
    name: 'formatStatus',
    standalone: true,
})
export class FormatStatusPipe implements PipeTransform {

    constructor(private _userService: UserService) {
    }
    transform(type: string, missId: number = 0): string {
        if (type.includes('отдел')) {
            return `${type} одобрена`
        }

        if (type.includes('отгул')) {
            const compensationStatus = this._userService.getCompensationById(missId)?.status;
            return compensationStatus === 'approved' ?  `${type} одобрена`: `${type} отклонена`
        }
        console.log(type, missId);
        const vacationStatus = this._userService.getVacationById(missId)?.status;
        console.log(vacationStatus);

        return vacationStatus === 'approved' ? `${type} одобрена` : `${type} отклонена`
    }
}
