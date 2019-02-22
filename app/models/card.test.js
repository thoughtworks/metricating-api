import Card from './card'

it('when constructor correct parameters then initialize al properties', () => {
    const card = new Card({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done', projectId: 1 })

    expect(card.id).toBe(1)
    expect(card.issueType).toBe('User Story')
    expect(card.dateEnd.getFullYear()).toBe(2018)
    expect(card.dateEnd.getMonth()).toBe(11)
    expect(card.dateEnd.getDate()).toBe(10)
    expect(card.status).toBe('done')
    expect(card.projectId).toBe(1)
    expect(card.transitions).toHaveLength(0)
})

it('when set constructor with undefined parameter then al properties is undefined', () => {
    const card = new Card()

    expect(card.id).toBe(undefined)
    expect(card.issueType).toBe(undefined)
    expect(card.dateEnd).toBe(undefined)
    expect(card.status).toBe(undefined)
    expect(card.projectId).toBe(undefined)
    expect(card.transitions).toBe(undefined)
})