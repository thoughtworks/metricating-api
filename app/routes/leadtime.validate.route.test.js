import _ from 'lodash'
import { isEmpty, isIn } from 'validator'
import LeadtimeRoute from './leadtime.route'

jest.mock('express-validator')
let result

describe('test validation definition', () => {
    beforeEach(() => {
        const leadtimeRoute = new LeadtimeRoute({ })
        result = leadtimeRoute.validate()
    })

    it('when call validate then return array with validations definitions', async () => {
        expect(result).toBeDefined()
        expect(result).toHaveLength(7)
    })

    it('start field is not empty with message "it is mandatory" ', () => {
        const startValidations = _.filter(result, (check) => check._context.fields[0] === 'start')
        expect(startValidations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('end field is not empty with message "it is mandatory" ', () => {
        const endValidations = _.filter(result, (check) => check._context.fields[0] === 'end')
        expect(endValidations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('leadtimeType field is not empty with message "it is mandatory" ', () => {
        const validators = _.filter(result, (check) => check._context.fields[0] === 'leadtimeType')
        expect(validators.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('leadtimeType field is in done or wip values with message "must be a "done" or "wip" values" ', () => {
        const validators = _.filter(result, (check) => check._context.fields[0] === 'leadtimeType')
        expect(validators.find((val) => val._context.validators[0].message === 'must be a "done" or "wip" values' && val._context.validators[0].validator === isIn)).toBeTruthy()
    })

    it('start field is valid format with message "it is invalid format" ', () => {
        const validators = _.filter(result, (check) => check._context.fields[0] === 'start')
        expect(validators.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)).toBeTruthy()
    })

    it('end field is valid format with message "it is invalid format" ', () => {
        const validators = _.filter(result, (check) => check._context.fields[0] === 'end')

        expect(validators.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)).toBeTruthy()
    })

    it('projectName field is not empty with message "it is mandatory" ', () => {
        const validators = _.filter(result, (check) => check._context.fields[0] === 'projectName')
        expect(validators.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('when call validator for end field with invalid date time return Promise Rejected', () => {
        const validators = _.filter(result, (check) => check._context.fields[0] === 'end')
        const validator = validators.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)

        validator._context.validators[0].validator('2019W91').catch((result) => {
            expect(result).toBe('it is invalid format')
        })
    })

    it('when call validator for start field with invalid date time return Promise Rejected', () => {
        const validators = _.filter(result, (check) => check._context.fields[0] === 'start')
        const validator = validators.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)

        validator._context.validators[0].validator('2019W91').catch((result) => {
            expect(result).toBe('it is invalid format')
        })
    })
})