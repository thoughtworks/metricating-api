import Period from './period'

it('create a new period with only year and week', () => {
    const period = new Period('2019W01')

    expect(period.date.utc().date()).toBe(31)
    expect(period.date.month()).toBe(11)
})

it('create invalid period then throw Error', () => {
    let error
    try {
        new Period('2019W91')
    } catch (e) {
        error = e
    }

    expect(error).toEqual(new Error('Date 2019W91 is not valid'))
})