import moment from 'moment'

class Period {
    constructor(dateStringStart, dateStringEnd) {
        const dateStart = moment(dateStringStart)
        if (!dateStart.isValid())
            throw new Error(`The Start Date ${dateStringStart} is not valid`)
        const dateEnd = moment(dateStringEnd)
        if (!dateEnd.isValid())
            throw new Error(`The End Date ${dateStringEnd} is not valid`)
        if (dateEnd.isBefore(dateStart))
            throw new Error(`The end date ${dateStringEnd}, can not be less than the start date ${dateStringStart}.`)

        this.start = dateStart
        this.end = dateEnd
    }
}
export default Period