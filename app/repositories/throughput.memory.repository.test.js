import Period from '../models/period'
import Task from '../models/task'
import ThroughputInMemoryRepository from './throughput.memory.repository'
import DataBase from './inmemory.database'

const initializeRepository = function () {
    const dataBase = new DataBase()
    const throughputRepository = new ThroughputInMemoryRepository({ dataBase })
    dataBase.initialize({ tasks: [
        new Task({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done', projectId: 1 }),
        new Task({ id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 13), status: 'done', projectId: 1 }),
        new Task({ id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 19), status: 'done', projectId: 1 }),
        new Task({ id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done', projectId: 1 }),
        new Task({ id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1 }),
    ]})
    return throughputRepository
}

it('when finding with a period of one week then return all task withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const tasks = await initializeRepository().find(1, period)

    expect(tasks).toHaveLength(3)
    expect(tasks.filter(task => task.issueType === 'User Story')).toHaveLength(2)
    expect(tasks.filter(task => task.issueType === 'Bug')).toHaveLength(1)
})

it('given a period has no tasks when find then return empty array', async () => {
    const period = new Period('2018W30', '2018W31')

    const tasks = await initializeRepository().find(1, period)

    expect(tasks).toHaveLength(0)
})

it('given not found projectId then return empty array', async () => {
    const period = new Period('2018W30', '2018W31')

    const tasks = await initializeRepository().find(2, period)

    expect(tasks).toHaveLength(0)
})