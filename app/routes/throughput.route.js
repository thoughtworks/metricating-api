import { validationResult, check } from 'express-validator/check'
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
        const througthput = await this.throughputService.calculate(new Period(request.params.start, request.params.end), request.params.periodTime)

        response.status(200).send(througthput)
    }
    validate () {
        return [check('periodTime').isIn(['day', 'week'])]
    }
}

export default ThroughputRoute