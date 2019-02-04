import _ from 'lodash'
import { isEmpty, isIn } from 'validator'
import ThroughputService from '../services/throughput.sevice'
import ThroughputRoute from './throughput.route'

jest.mock('express-validator')

describe('test validation definition', () => {
    it('when call validate then return array with validations definitions', async () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        const result = throughputRoute.validate()
        expect(result).toBeDefined()
    })

    it('start field is not empty with message "it is mandatory" ', () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        const result = throughputRoute.validate()

        const startValidations = _.filter(result, (check) => check._context.fields[0] === 'start')
        expect(startValidations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('end field is not empty with message "it is mandatory" ', () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        const result = throughputRoute.validate()

        const endValidations = _.filter(result, (check) => check._context.fields[0] === 'end')
        expect(endValidations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('periodTime field is not empty with message "it is mandatory" ', () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        const result = throughputRoute.validate()

        const periodTimeValidations = _.filter(result, (check) => check._context.fields[0] === 'periodTime')
        expect(periodTimeValidations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('periodTime field is in day or week values with message "must be a "day" or "week" values" ', () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        const result = throughputRoute.validate()

        const periodTimeValidations = _.filter(result, (check) => check._context.fields[0] === 'periodTime')
        expect(periodTimeValidations.find((val) => val._context.validators[0].message === 'must be a "day" or "week" values' && val._context.validators[0].validator === isIn)).toBeTruthy()
    })

    it('start field is valid format with message "it is invalid format" ', () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        const result = throughputRoute.validate()

        const startValidations = _.filter(result, (check) => check._context.fields[0] === 'start')
        expect(startValidations.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)).toBeTruthy()
    })

    it('end field is valid format with message "it is invalid format" ', () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })

        const result = throughputRoute.validate()

        const endValidations = _.filter(result, (check) => check._context.fields[0] === 'end')
        expect(endValidations.find((val) => val._context.validators[0].message === 'it is invalid format' && val._context.validators[0].custom === true)).toBeTruthy()
    })
})