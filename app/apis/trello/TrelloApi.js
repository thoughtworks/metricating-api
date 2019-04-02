export default class TrelloApi {
    setTrelloClient(trelloClient) {
        this._trello = trelloClient
    }

    getTrelloClient() {
        return this._trello
    }

    async getAllBoardCardsAndTheirColumnNames(boardId) {
        const cardsWithColumnNames = []
        const lists = await this._trello.getListsOnBoard(boardId)
        const cards = await this._trello.getCardsOnBoard(boardId)
        cards.forEach(card => {
            const cardColumn = this._findCardColumn(card.idList, lists)
            cardsWithColumnNames.push({ id: card.id, name: card.name, column: cardColumn.name })
        })
        return cardsWithColumnNames
    }

    _findCardColumn(idList, lists) {
        for (const list of lists) {
            if (list.id === idList) {
                return list
            }
        }
    }
}