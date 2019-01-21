import Period from './period'

it('create a new period with date start and end', () => {
    const period = new Period('2019W01', '2019W02')

    expect(period.start.format('YYYY-MM-DD')).toBe('2018-12-31')
    expect(period.end.format('YYYY-MM-DD')).toBe('2019-01-07')
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