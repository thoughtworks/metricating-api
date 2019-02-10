import LeadtimeRepository from '../repositories/leadtime.repository'
import Period from '../models/period'
import Project from '../models/project'
import Task from '../models/task'
import TaskStatus from '../models/taskStatus'
import LeadtimeService from './leadtime.service'
import ProjectService from './project.service'

jest.mock('./project.service')
jest.mock('../repositories/leadtime.repository')

let projectService= null
let leadtimeService = null
let leadtimeRepository = null

beforeEach(() => {
    leadtimeRepository = new LeadtimeRepository()
    projectService= new ProjectService()
    leadtimeService = new LeadtimeService({ leadtimeRepository, projectService })
})

describe('when call calulate leadtime', async () => {
    it('given project not found then throw new Error', async () => {
        projectService.getProject.mockResolvedValue(null)
        let error
        try {
            await leadtimeService.calculate('projectNotFound', null, LeadtimeService.leadtimeTypes.done)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('Project projectNotFound not found'))
    })

    it('when call calulate leadtime for projectName, period and leadtimeTypes.done then return leadtime', async () => {
        projectService.getProject.mockResolvedValue(new Project({ name: 'projectName', issueTracking: 'trello', statusDone: ['DONE']}))
        leadtimeRepository.find.mockResolvedValue([
            new Task(1, 'User Story', new Date(2018, 11, 17), 'done', 1, [
                new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new TaskStatus({ taskId: 1, status: 'ANALYSIS', createDate: new Date(2018, 11, 11) }),
                new TaskStatus({ taskId: 1, status: 'READY TODO', createDate: new Date(2018, 11, 12) }),
                new TaskStatus({ taskId: 1, status: 'DOING', createDate: new Date(2018, 11, 13) }),
                new TaskStatus({ taskId: 1, status: 'READY FOR QA', createDate: new Date(2018, 11, 17) }),
                new TaskStatus({ taskId: 1, status: 'QA', createDate: new Date(2018, 11, 18) }),
                new TaskStatus({ taskId: 1, status: 'Review', createDate: new Date(2018, 11, 18) }),
                new TaskStatus({ taskId: 1, status: 'DONE', createDate: new Date(2018, 11, 19) })
            ])
        ])

        const result = await leadtimeService.calculate('projectName', new Period('2019W01', '2019W03'), LeadtimeService.leadtimeTypes.done)

        expect(result).toBeDefined()
        expect(result).toMatchObject([
            {
                id: 1,
                issueType: 'User Story',
                transitions: [
                    { name: 'ANALYSIS', leadtime: 1 },
                    { name: 'READY TODO', leadtime: 1 },
                    { name: 'DOING', leadtime: 2 },
                    { name: 'READY FOR QA', leadtime: 1 },
                    { name: 'QA', leadtime: 0 },
                    { name: 'Review', leadtime: 1 }
                ],
            }
        ])
    })
    it('when call calulate leadtime for projectName, period and leadtimeTypes.wip then return leadtime', async () => {
        projectService.getProject.mockResolvedValue(new Project({ name: 'projectName', issueTracking: 'trello', statusDone: ['DONE']}))
        leadtimeRepository.find.mockResolvedValue([
            new Task(1, 'User Story', new Date(2018, 11, 17), 'done', 1, [
                new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new TaskStatus({ taskId: 1, status: 'ANALYSIS', createDate: new Date(2018, 11, 11) }),
                new TaskStatus({ taskId: 1, status: 'READY TODO', createDate: new Date(2018, 11, 12) }),
                new TaskStatus({ taskId: 1, status: 'DOING', createDate: new Date(2018, 11, 13) }),
                new TaskStatus({ taskId: 1, status: 'READY FOR QA', createDate: new Date(2018, 11, 17) })
            ])
        ])

        const result = await leadtimeService.calculate('projectName', new Period('2019W01', '2019W03'), LeadtimeService.leadtimeTypes.wip)

        expect(result).toBeDefined()
        expect(result).toMatchObject([
            {
                id: 1,
                issueType: 'User Story',
                transitions: [
                    { name: 'ANALYSIS', leadtime: 1 },
                    { name: 'READY TODO', leadtime: 1 },
                    { name: 'DOING', leadtime: 2 }
                ],
            }
        ])
    })
    it('when project contains two done status and call calulate leadtime for projectName, period and leadtimeTypes.done then return leadtime', async () => {
        projectService.getProject.mockResolvedValue(new Project({ name: 'projectName', issueTracking: 'trello', statusDone: ['DONE', 'INPRODUCTION']}))
        leadtimeRepository.find.mockResolvedValue([
            new Task(1, 'User Story', new Date(2018, 11, 17), 'done', 1, [
                new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new TaskStatus({ taskId: 1, status: 'ANALYSIS', createDate: new Date(2018, 11, 11) }),
                new TaskStatus({ taskId: 1, status: 'READY TODO', createDate: new Date(2018, 11, 12) }),
                new TaskStatus({ taskId: 1, status: 'DOING', createDate: new Date(2018, 11, 13) }),
                new TaskStatus({ taskId: 1, status: 'READY FOR QA', createDate: new Date(2018, 11, 17) }),
                new TaskStatus({ taskId: 1, status: 'QA', createDate: new Date(2018, 11, 18) }),
                new TaskStatus({ taskId: 1, status: 'Review', createDate: new Date(2018, 11, 18) }),
                new TaskStatus({ taskId: 1, status: 'DONE', createDate: new Date(2018, 11, 19) }),
                new TaskStatus({ taskId: 1, status: 'INPRODUCTION', createDate: new Date(2018, 11, 20) })
            ])
        ])

        const result = await leadtimeService.calculate('projectName', new Period('2019W01', '2019W03'), LeadtimeService.leadtimeTypes.done)

        expect(result).toBeDefined()
        expect(result).toMatchObject([
            {
                id: 1,
                issueType: 'User Story',
                transitions: [
                    { name: 'ANALYSIS', leadtime: 1 },
                    { name: 'READY TODO', leadtime: 1 },
                    { name: 'DOING', leadtime: 2 },
                    { name: 'READY FOR QA', leadtime: 1 },
                    { name: 'QA', leadtime: 0 },
                    { name: 'Review', leadtime: 1 }
                ],
            }
        ])
    })
})