import TrelloSyncService from './sync.trello.service'

it('when create a new SyncTrelloService then is defined', async () => {
    const trelloSyncService = new TrelloSyncService()

    expect(trelloSyncService).toBeDefined()
})

it('when call sync then return null', async () => {
    const trelloSyncService = new TrelloSyncService()

    const result = await trelloSyncService.sync()

    expect(result).toBe(null)
})