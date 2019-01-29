import TrelloClient from 'trello'
import TrelloApi from './TrelloApi'

jest.mock('trello')

it('initializes as a singleton', () => {
    expect(TrelloClient).toHaveBeenCalledTimes(1)
})

it('has a method that exposes the trello client', () => {
    const instanceTrelloClient = TrelloApi.getTrelloClient()
    expect(instanceTrelloClient.constructor).toEqual(TrelloClient)
})