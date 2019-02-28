import moment from 'moment'

class DateObj {
    constructor(date) {
        if (date === undefined || !moment(date).isValid()) {
            throw new Error('Date is not valid')
        } else {
            const momentDate = moment(date)
            this.date = date
            this.week = momentDate.week()
            this.month = momentDate.month()
            this.year = momentDate.year()
            this.day = momentDate.date()
            this.dayOfWeek = momentDate.day()
            this.quarter = momentDate.quarter()
        }
    }
}

export default DateObj
