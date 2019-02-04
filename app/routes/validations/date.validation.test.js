import DateValidate from './date.validation'

it('when date format is invalid then return reject promise', () => {
    const result = DateValidate.validate('2018W89')

    expect(result).toMatchObject(Promise.reject('it is invalid format'))
})

it('when date format is valid, then return promise resolve.', () => {
    const result = DateValidate.validate('2018W50')

    expect(result).toMatchObject(Promise.resolve())
})