import _ from 'lodash'
import { isEmpty, isIn } from 'validator'
import ThroughputService from '../services/throughput.service'
import ThroughputRoute from './throughput.route'

jest.mock('express-validator')
let result

describe('test validation definition', () => {
    beforeEach(() => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        result = throughputRoute.validate()
    })

    it('when call validate then return array with validations definitions', async () => {
        expect(result).toBeDefined()
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

    it('periodTime field is not empty with message "it is mandatory" ', () => {
        const periodTimeValidations = _.filter(result, (check) => check._context.fields[0] === 'periodTime')
        expect(periodTimeValidations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('periodTime field is in day or week values with message "must be a "day" or "week" values" ', () => {
        const periodTimeValidations = _.filter(result, (check) => check._context.fields[0] === 'periodTime')
        expect(periodTimeValidations.find((val) => val._context.validators[0].message === 'must be a "day" or "week" values' && val._context.validators[0].validator === isIn)).toBeTruthy()
    })

    it('start field is valid format with message "it is invalid format" ', () => {
        const startValidations = _.filter(result, (check) => check._context.fields[0] === 'start')
        expect(startValidations.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)).toBeTruthy()
    })

    it('when call validator for start field with invalid date time return Promise Rejected', () => {
        const startValidations = _.filter(result, (check) => check._context.fields[0] === 'start')
        const validator = startValidations.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)

        const validatorResult = validator('2019W91')

        expect(validatorResult).toMatchObject(Promise.reject('it is invalid format'))
    })

    it('end field is valid format with message "it is invalid format" ', () => {
        const endValidations = _.filter(result, (check) => check._context.fields[0] === 'end')

        expect(endValidations.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)).toBeTruthy()
    })

    it('when call validator for end field with invalid date time return Promise Rejected', () => {
        const endValidations = _.filter(result, (check) => check._context.fields[0] === 'end')
        const validator = endValidations.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)

        const validatorResult = validator('2019W91')

        expect(validatorResult).toMatchObject(Promise.reject('it is invalid format'))
    })

    it('projectName field is not empty with message "it is mandatory" ', () => {
        const projectNameValidations = _.filter(result, (check) => check._context.fields[0] === 'projectName')
        expect(projectNameValidations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })
})