import { fail } from 'assert'
import Project from '../models/project'
import SyncFactory from './syncfactory.service'

it('when create a new syncFactory then is defined', async () => {
    const syncFactory = new SyncFactory()

    expect(syncFactory).toBeDefined()
})

it('when call getSync with project.issueTracking trello, then return TrelloSyncService', () => {
    const syncFactory = new SyncFactory()

    const trelloSyncService = syncFactory.getSync(new Project({ issueTracking: 'trello' }))

    expect(trelloSyncService).toBeDefined()
})

it('when call getSync with project.issueTracking not implemented, then return Error not implemented exception', () => {
    const syncFactory = new SyncFactory()

    try {
        syncFactory.getSync(new Project({ issueTracking: 'newIssueTracker' }))
        fail()
    } catch (error) {
        expect(error).toEqual(new Error('Synchronization not implemented for issue tracker newIssueTracker'))
    }
})