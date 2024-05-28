import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@bookngo/base'

@Pipe({
  name: 'filterByDepartment',
  standalone: true
})
export class FilterByDepartmentPipe implements PipeTransform {
    transform(users: User[], department: string): User[] {
      return users.filter(user => user.companyDepartment === department)
    }
}