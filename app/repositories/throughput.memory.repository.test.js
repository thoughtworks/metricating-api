import { fail } from 'assert'
import Period from '../models/period'
import Card from '../models/card'
import ThroughputInMemoryRepository from './throughput.memory.repository'
import DataBase from './inmemory.database'

const initializeRepository = function () {
    const dataBase = new DataBase()
    const throughputRepository = new ThroughputInMemoryRepository({ dataBase })
    dataBase.initialize({ cards: [
        new Card({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done', projectId: 1 }),
        new Card({ id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 13), status: 'done', projectId: 1 }),
        new Card({ id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 19), status: 'done', projectId: 1 }),
        new Card({ id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done', projectId: 1 }),
        new Card({ id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1 }),
        new Card({ id: 6, issueType: 'Bug', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 3 }),
        new Card({ id: 7, issueType: 'User Story', dateEnd: new Date(2018, 11, 9), status: 'done', projectId: 1 })
    ]})
    return throughputRepository
}
it('when constructor is emtpy parameters then error', async () => {
    try {
        new ThroughputInMemoryRepository()
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when constructor is undefined parameters then error', async () => {
    try {
        new ThroughputInMemoryRepository(undefined)
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when database is undefined parameters then error', async () => {
    try {
        new ThroughputInMemoryRepository({ database: undefined })
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when finding with a period of one week then return all card withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const cards = await initializeRepository().find(1, period)

    expect(cards).toHaveLength(3)
    expect(cards.filter(card => card.issueType === 'User Story')).toHaveLength(2)
    expect(cards.filter(card => card.issueType === 'Bug')).toHaveLength(1)
})

it('given a period has no cards when find then return empty array', async () => {
    const period = new Period('2018W30', '2018W31')

    const cards = await initializeRepository().find(1, period)

    expect(cards).toHaveLength(0)
})

it('given not found projectId then return empty array', async () => {
    const period = new Period('2018W50', '2018W51')

    const cards = await initializeRepository().find(2, period)

    expect(cards).toHaveLength(0)
})