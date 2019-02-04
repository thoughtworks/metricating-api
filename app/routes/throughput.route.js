import { validationResult, query } from 'express-validator/check'
import Period from '../models/period'
import DateValidate from './validations/date.validation'

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
                return DateValidate.validate(start)
            }).withMessage('it is invalid format'),
            query('end').custom((end) => {
                return DateValidate.validate(end)
            }).withMessage('it is invalid format')
        ]
    }
}

export default ThroughputRoute