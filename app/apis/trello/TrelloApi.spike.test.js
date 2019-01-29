import TrelloApi from './TrelloApi'

it('uses the jira client to check if all data we need is available', () => {
    const trelloClient = TrelloApi.getTrelloClient()
    const boardId = '5c4b1810df96d6427d4930fc'

    trelloClient.getListsOnBoard(boardId).then(lists => {
        console.log('👉 These are the board columns (also called lists in Trello)')
        console.log(lists)
    })

    trelloClient.getCardsOnBoard(boardId).then(lists => {
        console.log('👉 These are all the cards in the board')
        console.log(lists)
    })
})