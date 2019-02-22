import CardStatus from './cardStatus'

it('when constructor correct parameters then initialize al properties', () => {
    const cardStatus = new CardStatus({ cardId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) })

    expect(cardStatus.cardId).toBe(1)
    expect(cardStatus.status).toBe('BACKLOG')
    expect(cardStatus.createDate.getFullYear()).toBe(2018)
    expect(cardStatus.createDate.getMonth()).toBe(11)
    expect(cardStatus.createDate.getDate()).toBe(3)
})

it('when set constructor with undefined parameter then al properties is undefined', () => {
    const cardStatus = new CardStatus()

    expect(cardStatus.cardId).toBe(undefined)
    expect(cardStatus.status).toBe(undefined)
    expect(cardStatus.createDate).toBe(undefined)
})