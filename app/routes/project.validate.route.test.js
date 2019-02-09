import _ from 'lodash'
import { isEmpty } from 'validator'
import ProjectRoute from './project.route'

jest.mock('express-validator')
let result

describe('test validation definition', () => {
    beforeEach(() => {
        const projectRoute = new ProjectRoute({ })

        result = projectRoute.validate()
    })

    it('when call validate then return array with validations definitions', async () => {
        expect(result).toBeDefined()
    })

    it('name field is not empty with message "it is mandatory" ', () => {
        const validations = _.filter(result, (check) => check._context.fields[0] === 'name')
        expect(validations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('issueTracking field is not empty with message "it is mandatory" ', () => {
        const validations = _.filter(result, (check) => check._context.fields[0] === 'issueTracking')
        expect(validations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })

    it('statusDone field is not empty with message "it is mandatory" ', () => {
        const validations = _.filter(result, (check) => check._context.fields[0] === 'statusDone')
        expect(validations.find((val) =>
            val._context.validators[0].message === 'it is mandatory' &&
            val._context.validators[0].validator === isEmpty &&
            val._context.validators[0].negated === true)).toBeTruthy()
    })
})