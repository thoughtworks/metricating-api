import { fail } from 'assert'
import Period from '../models/period'
import Project from '../models/project'
import Card from '../models/card'
import CardStatus from '../models/cardStatus'
import LeadtimeInMemoryRepository from './leadtime.memory.repository'
import DataBase from './inmemory.database'

const projects = [
    new Project({ id: 1, name: 'name1', issueTracking: 'issueTracking', backlogList: ['BACKLOG'], workingList: ['doing'], waitList: ['ready to do'], doneList: ['done']}),
    new Project({ id: 2, name: 'name2', issueTracking: 'issueTracking', backlogList: ['BACKLOG'], workingList: ['doing'], waitList: ['ready to do'], doneList: ['done']}),
    new Project({ id: 3, name: 'name3', issueTracking: 'issueTracking', backlogList: ['BACKLOG', 'TODO'], workingList: ['doing'], waitList: ['ready to do'], doneList: ['done']})
]
const initializeRepository = function () {
    const dataBase = new DataBase()
    const leadtimeRepository = new LeadtimeInMemoryRepository({ dataBase })
    dataBase.initialize({
        projects,
        cards: [
            new Card({ id: 1, issueType: 'Bug', dateEnd: new Date(2018, 11, 10), status: 'done', projectId: 1, transitions: [
                new CardStatus({ cardId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 1, status: 'DOING', createDate: new Date(2018, 11, 11) }),
                new CardStatus({ cardId: 1, status: 'DONE', createDate: new Date(2018, 11, 10) })]}),
            new Card({ id: 2, issueType: 'Bug', dateEnd: undefined, status: 'doing', projectId: 1, transitions: [
                new CardStatus({ cardId: 2, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 2, status: 'DOING', createDate: new Date(2018, 11, 11) })]}),
            new Card({ id: 3, issueType: 'Bug', dateEnd: undefined, status: 'doing', projectId: 2, transitions: [
                new CardStatus({ cardId: 3, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 3, status: 'DOING', createDate: new Date(2018, 11, 10) })]}),
            new Card({ id: 4, issueType: 'Bug', dateEnd: undefined, status: 'backlog', projectId: 3, transitions: [
                new CardStatus({ cardId: 4, status: 'TODO', createDate: new Date(2018, 11, 11) }),
                new CardStatus({ cardId: 4, status: 'BACKLOG', createDate: new Date(2018, 11, 11) })]}),
            new Card({ id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 16), status: 'done', projectId: 2, transitions: [
                new CardStatus({ cardId: 5, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 5, status: 'DOING', createDate: new Date(2018, 11, 11) }),
                new CardStatus({ cardId: 5, status: 'DONE', createDate: new Date(2018, 11, 12) })]}),
            new Card({ id: 6, issueType: 'Bug', dateEnd: new Date(2018, 10, 25), status: 'done', projectId: 1, transitions: [
                new CardStatus({ cardId: 6, status: 'BACKLOG', createDate: new Date(2018, 10, 3) }),
                new CardStatus({ cardId: 6, status: 'DOING', createDate: new Date(2018, 10, 11) }),
                new CardStatus({ cardId: 6, status: 'DONE', createDate: new Date(2018, 10, 25) })]}),
            new Card({ id: 7, issueType: 'Bug', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1, transitions: [
                new CardStatus({ cardId: 7, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 7, status: 'DOING', createDate: new Date(2018, 11, 11) }),
                new CardStatus({ cardId: 7, status: 'DONE', createDate: new Date(2018, 11, 17) })]}),
            new Card({ id: 8, issueType: 'Bug', dateEnd: undefined, status: 'doing', projectId: 2, transitions: [
                new CardStatus({ cardId: 8, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 8, status: 'DOING', createDate: new Date(2018, 11, 9) })]}),
            new Card({ id: 9, issueType: 'Bug', dateEnd: undefined, status: 'doing', projectId: 2, transitions: [
                new CardStatus({ cardId: 9, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 9, status: 'DOING', createDate: new Date(2018, 11, 17) })]}),
        ]
    })
    return leadtimeRepository
}

it('when constructor is emtpy parameters then error', async () => {
    try {
        new LeadtimeInMemoryRepository()
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when constructor is undefined parameters then error', async () => {
    try {
        new LeadtimeInMemoryRepository(undefined)
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when database is undefined parameters then error', async () => {
    try {
        new LeadtimeInMemoryRepository({ database: undefined })
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when find without data, then return empty array', async () => {
    const period = new Period('2018W50', '2018W51')
    const leadtimeRepository = new LeadtimeInMemoryRepository({ dataBase: new DataBase() })

    const cards = await leadtimeRepository.find(new Project({ id: 5 }), period, true)

    expect(cards).toBeDefined()
    expect(cards).toHaveLength(0)
})

it('when finding with a period of one week and onlyDone then return all done card withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const cards = await initializeRepository().find(projects[0], period, true)

    expect(cards).toHaveLength(1)
    expect(cards[0].id).toBe(1)
})
it('when finding with a period of one week and wip then return all not done card withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const cards = await initializeRepository().find(projects[1], period, false)

    expect(cards).toHaveLength(1)
    expect(cards[0].id).toBe(3)
    expect(cards[0].dateEnd).toBe(undefined)
})

it('when finding with a period of one week and wip and only backlog then return all not done card withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const cards = await initializeRepository().find(projects[2], period, false)

    expect(cards).toHaveLength(0)
})