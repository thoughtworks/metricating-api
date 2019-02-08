import DateValidate from './date.validation'

it('when date format is invalid then return reject promise', async () => {
    DateValidate.validate('2018W89').catch((error) => {
        expect(error).toBe('it is invalid format')
    })
})

it('when date format is valid, then return promise resolve.', () => {
    DateValidate.validate('2018W50').then((result) => {
        expect(result).toBe(undefined)
    }).catch((error) => {
        expect(error).not.toBeCalled()
    })
})