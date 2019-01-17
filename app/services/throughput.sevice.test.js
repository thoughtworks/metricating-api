import Period from '../models/period'
import ThroughputRepository from '../repositories/throughput.repository'
import ThroughputService from './throughput.sevice'

describe('when calculate throughput', () => {
    it('given start period and end period then throughput is defined', async () => {
        const throughputRepository = new ThroughputRepository()
        const throughputService = new ThroughputService({ throughputRepository })
        const period = new Period('2018W50', '2018W51')

        const throughput = await throughputService.calculate(period, 'day')

        expect(throughput).toBeDefined()
    })

    it('given tree user story and two bugs with status done in period then return group by issueType with sum the items.', async () => {
        const throughputRepository = new ThroughputRepository()
        const period = new Period('2018W51', '2018W52')
        const throughputService = new ThroughputService({ throughputRepository })
        jest.spyOn(throughputRepository, 'find').mockImplementation(async () => {
            return [
                { id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 17), status: 'done' },
                { id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 18), status: 'done' },
                { id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 19), status: 'done' },
                { id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 20), status: 'done' },
                { id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 21), status: 'done' },
            ]
        })

        const throughput = await throughputService.calculate(period, 'week')

        expect(throughput.tasks).toHaveLength(2)
        expect(throughput.tasks.find(task => task.issueType === 'User Story').throughput).toBe(3)
        expect(throughput.tasks.find(task => task.issueType === 'Bug').throughput).toBe(2)
    })

    it('given the period show throughput by weeks', async () => {
        const throughputRepository = new ThroughputRepository()
        const period = new Period('2018W50', '2018W52')
        const throughputService = new ThroughputService({ throughputRepository })
        jest.spyOn(throughputRepository, 'find').mockImplementation(async () => {
            return [
                { id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done' },
                { id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 13), status: 'done' },
                { id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 19), status: 'done' },
                { id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done' },
                { id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 21), status: 'done' },
            ]
        })

        const throughput = await throughputService.calculate(period, 'week')

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
        jest.spyOn(throughputRepository, 'find').mockImplementation(async () => {
            return [
                { id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done' },
                { id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done' },
                { id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 14), status: 'done' },
                { id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done' },
                { id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done' },
            ]
        })

        const throughput = await throughputService.calculate(period, 'day')

        expect(throughput.tasks).toHaveLength(3)
        expect(throughput.tasks.find(task => task.date === '2018-12-10' && task.issueType === 'User Story').throughput).toBe(2)
        expect(throughput.tasks.find(task => task.date === '2018-12-14' && task.issueType === 'User Story').throughput).toBe(1)
        expect(throughput.tasks.find(task => task.date === '2018-12-12' && task.issueType === 'Bug').throughput).toBe(2)
    })
})