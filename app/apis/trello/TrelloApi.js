import TrelloClient from 'trello'
import {} from 'dotenv/config'

class TrelloApi {
    constructor() {
        this._trello = new TrelloClient(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN)
    }
    getTrelloClient() {
        return this._trello
    }
}

export default new TrelloApi()