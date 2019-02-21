import _ from 'lodash'
import { isEmpty } from 'validator'
import ProjectRoute from './project.route'

jest.mock('express-validator')
let result

const fieldMandatory = function (fieldName) {
    const validations = _.filter(result, (check) => check._context.fields[0] === fieldName)
    expect(validations.find((val) =>
        val._context.validators[0].message === 'it is mandatory' &&
        val._context.validators[0].validator === isEmpty &&
        val._context.validators[0].negated === true)).toBeTruthy()
}

describe('test validation definition', () => {
    beforeEach(() => {
        const projectRoute = new ProjectRoute({ })

        result = projectRoute.validate()
    })

    it('when call validate then return array with validations definitions', async () => {
        expect(result).toBeDefined()
    })

    it('name field is not empty with message "it is mandatory" ', () => {
        fieldMandatory('name')
    })

    it('issueTracking field is not empty with message "it is mandatory" ', () => {
        fieldMandatory('issueTracking')
    })

    it('backlogList field is not empty with message "it is mandatory" ', () => {
        fieldMandatory('backlogList')
    })

    it('workingList field is not empty with message "it is mandatory" ', () => {
        fieldMandatory('workingList')
    })

    it('doneList field is not empty with message "it is mandatory" ', () => {
        fieldMandatory('doneList')
    })
})