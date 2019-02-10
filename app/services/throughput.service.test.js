import Period from '../models/period'
import Project from '../models/project'
import ThroughputRepository from '../repositories/throughput.repository'
import Task from '../models/task'
import ProjectService from './project.service'
import ThroughputService from './throughput.service'

jest.mock('./project.service')
jest.mock('../repositories/throughput.repository')

let throughputRepository = null
let projectService= null
let throughputService = null

beforeEach(() => {
    throughputRepository = new ThroughputRepository()
    projectService= new ProjectService()
    throughputService = new ThroughputService({ throughputRepository, projectService })
})

describe('when calculate throughput', async () => {
    it('given start period and end period then throughput is defined', async () => {
        const period = new Period('2018W50', '2018W51')
        throughputRepository.find.mockResolvedValue([])
        projectService.getProject.mockResolvedValue(new Project())
        const throughput = await throughputService.calculate('projectName', period, ThroughputService.periodTimes.day)

        expect(throughput).toBeDefined()
    })

    it('given tree user story and two bugs with status done in period then return group by issueType with sum the items.', async () => {
        const period = new Period('2018W51', '2018W52')
        projectService.getProject.mockResolvedValue(new Project())
        throughputRepository.find.mockResolvedValue([
            new Task({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 17), status: 'done' }),
            new Task({ id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 18), status: 'done' }),
            new Task({ id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 19), status: 'done' }),
            new Task({ id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 20), status: 'done' }),
            new Task({ id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 21), status: 'done' }),
        ])

        const throughput = await throughputService.calculate('projectName', period, ThroughputService.periodTimes.week)

        expect(throughput.tasks).toHaveLength(2)
        expect(throughput.tasks.find(task => task.issueType === 'User Story').throughput).toBe(3)
        expect(throughput.tasks.find(task => task.issueType === 'Bug').throughput).toBe(2)
    })

    it('given the period show throughput by weeks', async () => {
        const period = new Period('2018W50', '2018W52')
        projectService.getProject.mockResolvedValue(new Project())
        throughputRepository.find.mockResolvedValue([
            new Task({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done' }),
            new Task({ id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 13), status: 'done' }),
            new Task({ id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 19), status: 'done' }),
            new Task({ id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done' }),
            new Task({ id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 21), status: 'done' }),
        ])

        const throughput = await throughputService.calculate('projectName', period, ThroughputService.periodTimes.week)

        expect(throughput.tasks).toHaveLength(4)
        expect(throughput.tasks.find(task => task.date === '2018W50' && task.issueType === 'User Story').throughput).toBe(2)
        expect(throughput.tasks.find(task => task.date === '2018W51' && task.issueType === 'User Story').throughput).toBe(1)
        expect(throughput.tasks.find(task => task.date === '2018W50' && task.issueType === 'Bug').throughput).toBe(1)
        expect(throughput.tasks.find(task => task.date === '2018W51' && task.issueType === 'Bug').throughput).toBe(1)
    })

    it('given the period show throughput by days', async () => {
        const period = new Period('2018W50', '2018W50')
        projectService.getProject.mockResolvedValue(new Project())
        throughputRepository.find.mockResolvedValue([
            new Task({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done' }),
            new Task({ id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done' }),
            new Task({ id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 14), status: 'done' }),
            new Task({ id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done' }),
            new Task({ id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done' }),
        ])

        const throughput = await throughputService.calculate('projectName', period, ThroughputService.periodTimes.day)

        expect(throughput.tasks).toHaveLength(3)
        expect(throughput.tasks.find(task => task.date === '2018-12-10' && task.issueType === 'User Story').throughput).toBe(2)
        expect(throughput.tasks.find(task => task.date === '2018-12-14' && task.issueType === 'User Story').throughput).toBe(1)
        expect(throughput.tasks.find(task => task.date === '2018-12-12' && task.issueType === 'Bug').throughput).toBe(2)
    })

    it('when not found project then error', async () => {
        projectService.getProject.mockResolvedValue(null)
        let error
        try {
            await throughputService.calculate('projectNotFound', null, ThroughputService.periodTimes.day)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('Project projectNotFound not found'))
    })
})