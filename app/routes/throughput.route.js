import { validationResult, query } from 'express-validator/check'
import moment from 'moment'
import Period from '../models/period'

class ThroughputRoute {
    constructor(options) {
        this.throughputService = options.throughputService
    }
    async calculate (request, response) {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        }
        const througthput = await this.throughputService.calculate(new Period(request.query.start, request.query.end), request.query.periodTime)

        response.status(200).send(througthput)
    }
    validate () {
        return [
            query('start').not().isEmpty().withMessage('it is mandatory'),
            query('end').not().isEmpty().withMessage('it is mandatory'),
            query('periodTime').not().isEmpty().withMessage('it is mandatory'),
            query('periodTime').isIn(['day', 'week']).withMessage('must be a "day" or "week" values'),
            query('start').custom((start) => {
                if (!moment(start).isValid())
                    return Promise.reject('it is invalid format')
                return Promise.resolve()
            }).withMessage('it is invalid format'),
            query('end').custom((end) => {
                if (!moment(end).isValid())
                    return Promise.reject('it is invalid format')
                return Promise.resolve()
            }).withMessage('it is invalid format')
        ]
    }
}

export default ThroughputRoute