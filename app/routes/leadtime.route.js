import { validationResult, query, param } from 'express-validator/check'
import Period from '../models/period'
import DateValidate from './validations/date.validation'

class LeadtimeRoute {
    constructor(options) {
        this.leadtimeService = options.leadtimeService
    }
    async calculate (request, response) {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        }
        try {
            const leadtime = await this.leadtimeService.calculate(request.params.projectName, new Period(request.query.start, request.query.end), request.query.leadtimeType)
            response.status(200).send(leadtime)
        } catch (e) {
            return response.status(400).json({
                msg: e.message
            })
        }
    }
    validate () {
        return [
            query('start').not().isEmpty().withMessage('it is mandatory'),
            query('end').not().isEmpty().withMessage('it is mandatory'),
            query('leadtimeType').not().isEmpty().withMessage('it is mandatory'),
            query('leadtimeType').isIn(['done', 'wip']).withMessage('must be a "done" or "wip" values'),
            query('start').custom((start) => {
                return DateValidate.validate(start)
            }).withMessage('it is invalid format'),
            query('end').custom((end) => {
                return DateValidate.validate(end)
            }).withMessage('it is invalid format'),
            param('projectName').not().isEmpty().withMessage('it is mandatory')
        ]
    }
}
export default LeadtimeRoute