import TrelloClient from 'trello'
import TrelloApi from './TrelloApi'
import {} from 'dotenv/config'

const trelloClient = new TrelloClient(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN)
const trelloApi = new TrelloApi({ trelloClient })

const boardId = '5c4b1810df96d6427d4930fc'

it('uses the trello client to check if all data we need is available', async () => {
    const lists = await trelloClient.getListsOnBoard(boardId)
    console.log('👉 These are the board columns (also called lists in Trello)', lists)

    const cards = await trelloClient.getCardsOnBoard(boardId)
    console.log('👉 These are all the cards in the board', cards)

    const actions = await trelloClient.getCardActions('5c4f1d17b64c0b30606fd389')
    console.log('👉 Here are all the update actions of one card')
    actions.forEach(action => {
        action.type === 'updateCard' && console.log(`On ${action.date} the card went from ${action.data.listBefore.name} to ${action.data.listAfter.name}`)
    })
})

it('uses the trello api to determine the columns of all cards', async () => {
    const snapshot = await trelloApi.getAllBoardCardsAndTheirColumnNames(boardId)
    console.log('👉 Here`s a snapshot of current cards and their corresponding columns', snapshot)
})