import TrelloSyncService from './syncs/sync.trello.service'

class SyncFactory {
    getSync (project) {
        if (project.issueTracking === 'trello') {
            return new TrelloSyncService()
        }
        throw new Error(`Synchronization not implemented for issue tracker ${project.issueTracking}`)
    }
}

export default SyncFactory