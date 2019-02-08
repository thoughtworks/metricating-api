import Period from '../models/period'
import ThroughputRepository from '../repositories/throughput.repository'
import Task from '../models/task'
import ThroughputService from './throughput.service'

jest.mock('../repositories/throughput.repository')

describe('when calculate throughput', () => {
    it('given start period and end period then throughput is defined', async () => {
        const throughputRepository = new ThroughputRepository()
        const throughputService = new ThroughputService({ throughputRepository })
        const period = new Period('2018W50', '2018W51')
        throughputRepository.find.mockResolvedValue([])
        const throughput = await throughputService.calculate(period, ThroughputService.periodTimes.day)

        expect(throughput).toBeDefined()
    })

    it('given tree user story and two bugs with status done in period then return group by issueType with sum the items.', async () => {
        const throughputRepository = new ThroughputRepository()
        const period = new Period('2018W51', '2018W52')
        const throughputService = new ThroughputService({ throughputRepository })
        throughputRepository.find.mockResolvedValue([
            new Task(1, 'User Story', new Date(2018, 11, 17), 'done'),
            new Task(2, 'User Story', new Date(2018, 11, 18), 'done'),
            new Task(3, 'User Story', new Date(2018, 11, 19), 'done'),
            new Task(4, 'Bug', new Date(2018, 11, 20), 'done'),
            new Task(5, 'Bug', new Date(2018, 11, 21), 'done'),
        ])

        const throughput = await throughputService.calculate(period, ThroughputService.periodTimes.week)

        expect(throughput.tasks).toHaveLength(2)
        expect(throughput.tasks.find(task => task.issueType === 'User Story').throughput).toBe(3)
        expect(throughput.tasks.find(task => task.issueType === 'Bug').throughput).toBe(2)
    })

    it('given the period show throughput by weeks', async () => {
        const throughputRepository = new ThroughputRepository()
        const period = new Period('2018W50', '2018W52')
        const throughputService = new ThroughputService({ throughputRepository })
        throughputRepository.find.mockResolvedValue([
            new Task(1, 'User Story', new Date(2018, 11, 10), 'done'),
            new Task(2, 'User Story', new Date(2018, 11, 13), 'done'),
            new Task(3, 'User Story', new Date(2018, 11, 19), 'done'),
            new Task(4, 'Bug', new Date(2018, 11, 12), 'done'),
            new Task(5, 'Bug', new Date(2018, 11, 21), 'done'),
        ])

        const throughput = await throughputService.calculate(period, ThroughputService.periodTimes.week)

        expect(throughput.tasks).toHaveLength(4)
        expect(throughput.tasks.find(task => task.date === '2018W50' && task.issueType === 'User Story').throughput).toBe(2)
        expect(throughput.tasks.find(task => task.date === '2018W51' && task.issueType === 'User Story').throughput).toBe(1)
        expect(throughput.tasks.find(task => task.date === '2018W50' && task.issueType === 'Bug').throughput).toBe(1)
        expect(throughput.tasks.find(task => task.date === '2018W51' && task.issueType === 'Bug').throughput).toBe(1)
    })

    it('given the period show throughput by days', async () => {
        const throughputRepository = new ThroughputRepository()
        const period = new Period('2018W50', '2018W50')
        const throughputService = new ThroughputService({ throughputRepository })
        throughputRepository.find.mockResolvedValue([
            new Task(1, 'User Story', new Date(2018, 11, 10), 'done'),
            new Task(2, 'User Story', new Date(2018, 11, 10), 'done'),
            new Task(3, 'User Story', new Date(2018, 11, 14), 'done'),
            new Task(4, 'Bug', new Date(2018, 11, 12), 'done'),
            new Task(5, 'Bug', new Date(2018, 11, 12), 'done'),
        ])

        const throughput = await throughputService.calculate(period, ThroughputService.periodTimes.day)

        expect(throughput.tasks).toHaveLength(3)
        expect(throughput.tasks.find(task => task.date === '2018-12-10' && task.issueType === 'User Story').throughput).toBe(2)
        expect(throughput.tasks.find(task => task.date === '2018-12-14' && task.issueType === 'User Story').throughput).toBe(1)
        expect(throughput.tasks.find(task => task.date === '2018-12-12' && task.issueType === 'Bug').throughput).toBe(2)
    })
})