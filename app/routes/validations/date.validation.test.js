import { fail } from 'assert'
import { when } from 'jest-when'
import moment from 'moment'
import DateValidate from './date.validation'

jest.mock('moment')

it('when date format is invalid then return reject promise', async () => {
    when(moment).calledWith('2018W89').mockImplementation({ isValid: jest.fn().mockReturnValue(false) })
    try {
        await DateValidate.validate('2018W89')
        fail()
    } catch (error) {
        expect(error).toBe('it is invalid format')
    }
})

it('when date format is valid, then return promise resolve.', async () => {
    when(moment).calledWith('2018W50').mockImplementation({ isValid: jest.fn().mockReturnValue(true) })
    try {
        await DateValidate.validate('2018W50')
    } catch (error) {
        fail()
    }
})