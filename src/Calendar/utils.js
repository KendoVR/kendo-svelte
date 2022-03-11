import * as dateMath from '@progress/kendo-date-math';

const MONTHS = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

function firstDayInView(date) {
    date = dateMath.firstDayOfMonth(date);
    date = dateMath.firstDayInWeek(date);
    return dateMath.createDate(date.getFullYear(), date.getMonth(), date.getDate());
}


export { firstDayInView, MONTHS };