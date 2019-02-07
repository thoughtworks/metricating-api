import Period from '../models/period'
import Task from '../models/task'
import ThroughputInMemoryRepository from './throughput.memory.repository'

const initializeRepository = function () {
    const throughputRepository = new ThroughputInMemoryRepository()
    throughputRepository.initialize([
        new Task(1, 'User Story', new Date(2018, 11, 10), 'done'),
        new Task(2, 'User Story', new Date(2018, 11, 13), 'done'),
        new Task(3, 'User Story', new Date(2018, 11, 19), 'done'),
        new Task(4, 'Bug', new Date(2018, 11, 12), 'done'),
        new Task(5, 'Bug', new Date(2018, 11, 17), 'done'),
    ])
    return throughputRepository
}

it('when finding with a period of one week then return all task withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const tasks = await initializeRepository().find(period)

    expect(tasks).toHaveLength(3)
    expect(tasks.filter(task => task.issueType === 'User Story')).toHaveLength(2)
    expect(tasks.filter(task => task.issueType === 'Bug')).toHaveLength(1)
})

it('given a period has no tasks when find then return empty array', async () => {
    const period = new Period('2018W30', '2018W31')

    const tasks = await initializeRepository().find(period)

    expect(tasks).toHaveLength(0)
})