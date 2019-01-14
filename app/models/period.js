import moment from 'moment';

class Period{
    constructor(dateString){
        let date = moment(dateString)
        if(!date.isValid())
            throw new Error('Date '+dateString+' is not valid')
        this.date = date
    }
}
export default Period