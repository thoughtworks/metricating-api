import { when } from 'jest-when'

import TrelloClient from 'trello'
import TrelloApi from './TrelloApi'

jest.mock('trello')
const trelloClient = new TrelloClient('my key', 'my token')
const trelloApi = new TrelloApi(trelloClient)

it('has a method that exposes the trello client', () => {
    const instanceTrelloClient = trelloApi.getTrelloClient()
    expect(instanceTrelloClient.constructor).toEqual(TrelloClient)
})

it('finds the column in which each issue is at a given snapshot', async () => {
    const boardId = 'some-board-id'
    when(trelloClient.getListsOnBoard).calledWith(boardId).mockResolvedValue([
        { id: 'list-1', name: 'In analysis' },
        { id: 'list-2', name: 'In development' }
    ])
    when(trelloClient.getCardsOnBoard).calledWith(boardId).mockResolvedValue([
        { id: 'card-1', name: 'An issue being analyzed', idList: 'list-1' },
        { id: 'card-2', name: 'An issue being developed', idList: 'list-2' }
    ])

    const snapshot = await trelloApi.getAllBoardCardsAndTheirColumnNames(boardId)

    expect(snapshot).toEqual([
        { name: 'An issue being analyzed', column: 'In analysis' },
        { name: 'An issue being developed', column: 'In development' },
    ])

    trelloClient.getListsOnBoard.mockClear()
    trelloClient.getCardsOnBoard.mockClear()
})