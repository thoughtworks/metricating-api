import DateObj from './date'

it('when call constructor with datetime then get dateObj', () => {
    const dateObj = new DateObj(new Date(2019, 0, 1))

    expect(dateObj.year).toBe(2019)
    expect(dateObj.month).toBe(0)
    expect(dateObj.week).toBe(1)
    expect(dateObj.day).toBe(1)
    expect(dateObj.dayOfWeek).toBe(2)
    expect(dateObj.quarter).toBe(1)
})

it('when call constructor with invalid date then get error', () => {
    let error
    try {
        new DateObj('2019W91')
    } catch (e) {
        error = e
    }

    expect(error).toEqual(new Error('Date is not valid'))
})

it('when call constructor with null date then get error', () => {
    let error
    try {
        new DateObj(null)
    } catch (e) {
        error = e
    }

    expect(error).toEqual(new Error('Date is not valid'))
})

it('when call constructor with undefined date then get error', () => {
    let error
    try {
        new DateObj(undefined)
    } catch (e) {
        error = e
    }

    expect(error).toEqual(new Error('Date is not valid'))
})