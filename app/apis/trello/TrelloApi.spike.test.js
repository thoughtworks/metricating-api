import TrelloClient from 'trello'
import {} from 'dotenv/config'

it('uses the trello client to check if all data we need is available', () => {
    const trelloClient = new TrelloClient(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN)
    const boardId = '5c4b1810df96d6427d4930fc'

    trelloClient.getListsOnBoard(boardId).then(lists => {
        console.log('👉 These are the board columns (also called lists in Trello)')
        console.log(lists)
    })

    trelloClient.getCardsOnBoard(boardId).then(cards => {
        console.log('👉 These are all the cards in the board')
        console.log(cards)
    })
})