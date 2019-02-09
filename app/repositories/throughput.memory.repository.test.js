import Period from '../models/period'
import Task from '../models/task'
import ThroughputInMemoryRepository from './throughput.memory.repository'
import DataBase from './inmemory.database'

const initializeRepository = function () {
    const dataBase = new DataBase()
    const throughputRepository = new ThroughputInMemoryRepository({ dataBase })
    dataBase.initialize({ tasks: [
        new Task(1, 'User Story', new Date(2018, 11, 10), 'done', 1),
        new Task(2, 'User Story', new Date(2018, 11, 13), 'done', 1),
        new Task(3, 'User Story', new Date(2018, 11, 19), 'done', 1),
        new Task(4, 'Bug', new Date(2018, 11, 12), 'done', 1),
        new Task(5, 'Bug', new Date(2018, 11, 17), 'done', 1),
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