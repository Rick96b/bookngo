import * as dayjs from 'dayjs'
import { Day } from '../model/day.interface'

export function generateCalendar(year: number, month: number) {
    let calendar: Day[] = []
    let monthObj = dayjs(new Date(year, month))
    for (let i = 0; i < monthObj.daysInMonth(); i++) {
        monthObj = monthObj.date(i+1)
        calendar.push({
            day: i+1,
            weekDay: monthObj.day(),
            month: month,
            year: year
        })
    }


    if(calendar[0].weekDay != 1) {
        monthObj = dayjs(new Date(year, month-1))
        monthObj = monthObj.date(monthObj.daysInMonth())
        while(calendar[0].weekDay != 1) {
            calendar.unshift({
                day: monthObj.date(),
                weekDay: monthObj.day(),
                month: monthObj.month(),
                year: monthObj.year()
            })
            monthObj = monthObj.date(monthObj.date() - 1)
        }
    }

    if(calendar[calendar.length - 1].weekDay != 0) {
        monthObj = dayjs(new Date(year, month+1))
        while(calendar[calendar.length - 1].weekDay != 0) {
            calendar.push({
                day: monthObj.date(),
                weekDay: monthObj.day(),
                month: monthObj.month(),
                year: monthObj.year()
            })
            monthObj = monthObj.date(monthObj.date() + 1)
        }
    }

    return calendar
}