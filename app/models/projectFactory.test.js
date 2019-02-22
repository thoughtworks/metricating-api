import ProjectTrello from './projectTrello'
import ProjectFactory from './projectFactory'

let body

describe('instance Trello', () => {
    beforeEach(() => {
        body = {
            name: 'ProjectName',
            issueTracking: 'trello',
            backlogList: ['BACKLOG'],
            workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'],
            waitList: ['READY TODO', 'READY FOR QA'],
            doneList: ['DONE'],
            apiKey: 'apiKey',
            apiToken: 'apiToken',
            boardUrl: 'boardUrl'
        }
    })

    it('when issueTracker is trello then return new TrelloProject', () => {
        const projectTrello = new ProjectTrello({ name: 'ProjectName', issueTracking: 'trello', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], waitList: ['READY TODO', 'READY FOR QA'], doneList: ['DONE'], apiKey: 'apiKey', apiToken: 'apiToken', boardUrl: 'boardUrl' })
        const result = ProjectFactory.instanceProject(body)

        expect(result).toBeDefined()
        expect(result).toMatchObject(projectTrello)
    })

    it('when issueTracker is TreLlO then return new TrelloProject', () => {
        body.issueTracking = 'TreLlO'
        const projectTrello = new ProjectTrello({ name: 'ProjectName', issueTracking: 'trello', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], waitList: ['READY TODO', 'READY FOR QA'], doneList: ['DONE'], apiKey: 'apiKey', apiToken: 'apiToken', boardUrl: 'boardUrl' })
        const result = ProjectFactory.instanceProject(body)

        expect(result).toBeDefined()
        expect(result).toMatchObject(projectTrello)
    })

    it('when issueTracker is trello then apiKey is required', () => {
        body.apiKey = undefined
        let error
        try {
            ProjectFactory.instanceProject(body)
        } catch (e) {
            error = e
        }
        expect(error).toEqual(new Error('The apiKey is required.'))
    })

    it('when issueTracker is trello then apiToken is required', () => {
        body.apiToken = undefined
        let error
        try {
            ProjectFactory.instanceProject(body)
        } catch (e) {
            error = e
        }
        expect(error).toEqual(new Error('The apiToken is required.'))
    })

    it('when issueTracker is trello then boardUrl is required', () => {
        body.boardUrl = undefined
        let error
        try {
            ProjectFactory.instanceProject(body)
        } catch (e) {
            error = e
        }
        expect(error).toEqual(new Error('The boardUrl is required.'))
    })
})

describe('General validation', () => {
    const issueTrackingIsRequiredValidation = function (body) {
        let error
        try {
            ProjectFactory.instanceProject(body)
        } catch (e) {
            error = e
        }
        expect(error).toEqual(new Error('The issueTracking is required.'))
    }

    it('when issueTracking is undefined then error', () => {
        issueTrackingIsRequiredValidation({ issueTracking: undefined })
    })

    it('when issueTracking is empty then error', () => {
        issueTrackingIsRequiredValidation({ issueTracking: '' })
    })

    it('when issueTracking is null then error', () => {
        issueTrackingIsRequiredValidation({ issueTracking: null })
    })

    it('when data is null then error', () => {
        issueTrackingIsRequiredValidation(null)
    })

    it('when data is undefined then error', () => {
        issueTrackingIsRequiredValidation(undefined)
    })

    it('when data is empty then error', () => {
        issueTrackingIsRequiredValidation('')
    })

    it('when issueTracker is not defined then return null', () => {
        const body = {
            issueTracking: 'NOT DEFINED ISSUE TRACKING'
        }
        const result = ProjectFactory.instanceProject(body)

        expect(result).toBe(null)
    })
})