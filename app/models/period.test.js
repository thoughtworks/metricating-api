import Period from './period'

it('create a new period with date start and end', () => {
    const period = new Period('2019W01', '2019W02')

    expect(period.start.toJSON()).toBe('2018-12-31T03:00:00.000Z')
    expect(period.end.toJSON()).toBe('2019-01-07T03:00:00.000Z')
})

it('when set invalid start date then throw Error', () => {
    let error
    try {
        new Period('2019W91', '2019W01')
    } catch (e) {
        error = e
    }

    expect(error).toEqual(new Error('The Start Date 2019W91 is not valid'))
})

it('when set invalid end date then throw Error', () => {
    let error
    try {
        new Period('2019W01', '2019W91')
    } catch (e) {
        error = e
    }

    expect(error).toEqual(new Error('The End Date 2019W91 is not valid'))
})