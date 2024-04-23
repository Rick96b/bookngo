import { Pipe, PipeTransform } from "@angular/core";
import { TuiMonth } from "@taiga-ui/cdk";
  
@Pipe({
    name: "tuiMonth",
    standalone: true
})
export class TuiMonthPipe implements PipeTransform {
  transform(value: {year: number, month: number}, args?: any): TuiMonth {
      
    return new TuiMonth(value.year, value.month)
  }
}