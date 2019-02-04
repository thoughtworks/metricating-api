import moment from 'moment'

class DateValidate {
    static validate(dateString) {
        if (!moment(dateString).isValid())
            return Promise.reject('it is invalid format')
        return Promise.resolve()
    }
}

export default DateValidate