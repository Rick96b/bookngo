import * as dayjs from 'dayjs'

export function getDatesBetween(date1: string, date2: string) {
    let result = []
    const date1_obj = dayjs(date1)
    const date2_obj = dayjs(date2)
    for(let i = 0; i < date1_obj.diff(date2_obj); i++) {
        const dateBetween = date1_obj.add(i, 'day')
        result.push(dateBetween.format('YYYY-MM-DD'))
    } 
    return result
}