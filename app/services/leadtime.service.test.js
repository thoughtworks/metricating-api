import { when } from 'jest-when'
import LeadtimeRepository from '../repositories/leadtime.repository'
import Period from '../models/period'
import Project from '../models/project'
import Card from '../models/card'
import CardStatus from '../models/cardStatus'
import LeadtimeService from './leadtime.service'
import ProjectService from './project.service'

jest.mock('./project.service')
jest.mock('../repositories/leadtime.repository')

let projectService= null
let leadtimeService = null
let leadtimeRepository = null
let project = null
beforeEach(() => {
    project = new Project({ id: 1, name: 'projectName', issueTracking: 'trello', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], waitList: ['READY TODO', 'READY FOR QA'], doneList: ['DONE']})
    leadtimeRepository = new LeadtimeRepository()
    projectService= new ProjectService()
    leadtimeService = new LeadtimeService({ leadtimeRepository, projectService })
})

describe('when call calulate leadtime', async () => {
    it('given project not found then throw new Error', async () => {
        projectService.getProject.mockResolvedValue(undefined)
        let error
        try {
            await leadtimeService.calculate('projectNotFound', null, LeadtimeService.leadtimeTypes.done)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('Project projectNotFound not found'))
    })

    it('when call calulate leadtime for projectName, period and leadtimeTypes.done then return leadtime', async () => {
        const period = new Period('2019W01', '2019W03')
        when(projectService.getProject).calledWith('projectName').mockResolvedValue(project)
        when(leadtimeRepository.find).calledWith(project, period, true).mockResolvedValue([
            new Card({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1, transitions: [
                new CardStatus({ cardId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 1, status: 'ANALYSIS', createDate: new Date(2018, 11, 11) }),
                new CardStatus({ cardId: 1, status: 'READY TODO', createDate: new Date(2018, 11, 12) }),
                new CardStatus({ cardId: 1, status: 'DOING', createDate: new Date(2018, 11, 13) }),
                new CardStatus({ cardId: 1, status: 'READY FOR QA', createDate: new Date(2018, 11, 17) }),
                new CardStatus({ cardId: 1, status: 'QA', createDate: new Date(2018, 11, 18) }),
                new CardStatus({ cardId: 1, status: 'Review', createDate: new Date(2018, 11, 18) }),
                new CardStatus({ cardId: 1, status: 'DONE', createDate: new Date(2018, 11, 19) })
            ]})
        ])

        const result = await leadtimeService.calculate('projectName', period, LeadtimeService.leadtimeTypes.done)

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
        const period = new Period('2019W01', '2019W03')
        when(projectService.getProject).calledWith('projectName').mockResolvedValue(project)
        when(leadtimeRepository.find).calledWith(project, period, false).mockResolvedValue([
            new Card({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1, transitions: [
                new CardStatus({ cardId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 1, status: 'ANALYSIS', createDate: new Date(2018, 11, 11) }),
                new CardStatus({ cardId: 1, status: 'READY TODO', createDate: new Date(2018, 11, 12) }),
                new CardStatus({ cardId: 1, status: 'DOING', createDate: new Date(2018, 11, 13) }),
                new CardStatus({ cardId: 1, status: 'READY FOR QA', createDate: new Date(2018, 11, 17) })
            ]})
        ])

        const result = await leadtimeService.calculate('projectName', period, LeadtimeService.leadtimeTypes.wip)

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
        const period = new Period('2019W01', '2019W03')
        project.doneList.push('INPRODUCTION')
        when(projectService.getProject).calledWith('projectName').mockResolvedValue(project)
        when(leadtimeRepository.find).calledWith(project, period, true).mockResolvedValue([
            new Card({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1, transitions: [
                new CardStatus({ cardId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                new CardStatus({ cardId: 1, status: 'ANALYSIS', createDate: new Date(2018, 11, 11) }),
                new CardStatus({ cardId: 1, status: 'READY TODO', createDate: new Date(2018, 11, 12) }),
                new CardStatus({ cardId: 1, status: 'DOING', createDate: new Date(2018, 11, 13) }),
                new CardStatus({ cardId: 1, status: 'READY FOR QA', createDate: new Date(2018, 11, 17) }),
                new CardStatus({ cardId: 1, status: 'QA', createDate: new Date(2018, 11, 18) }),
                new CardStatus({ cardId: 1, status: 'Review', createDate: new Date(2018, 11, 18) }),
                new CardStatus({ cardId: 1, status: 'DONE', createDate: new Date(2018, 11, 19) }),
                new CardStatus({ cardId: 1, status: 'INPRODUCTION', createDate: new Date(2018, 11, 20) })
            ]})
        ])

        const result = await leadtimeService.calculate('projectName', period, LeadtimeService.leadtimeTypes.done)

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

    it('when project contains two backlog status and call calulate leadtime for projectName, period and leadtimeTypes.wip then return leadtime', async () => {
        const period = new Period('2019W01', '2019W03')
        project.backlogList.push('TODO')
        when(projectService.getProject).calledWith('projectName').mockResolvedValue(project)
        when(leadtimeRepository.find).calledWith(project, period, true).mockResolvedValue([
            new Card({
                id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1, transitions: [
                    new CardStatus({ cardId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
                    new CardStatus({ cardId: 1, status: 'TODO', createDate: new Date(2018, 11, 4) }),
                    new CardStatus({ cardId: 1, status: 'ANALYSIS', createDate: new Date(2018, 11, 11) }),
                    new CardStatus({ cardId: 1, status: 'READY TODO', createDate: new Date(2018, 11, 12) }),
                    new CardStatus({ cardId: 1, status: 'DOING', createDate: new Date(2018, 11, 13) })
                ]
            })
        ])

        const result = await leadtimeService.calculate('projectName', period, LeadtimeService.leadtimeTypes.done)

        expect(result).toBeDefined()
        expect(result).toMatchObject([
            {
                id: 1,
                issueType: 'User Story',
                transitions: [
                    { name: 'ANALYSIS', leadtime: 1 },
                    { name: 'READY TODO', leadtime: 1 }
                ]
            }
        ])
    })
})

describe('definition for LeadtimeService.leadtimeTypes', () => {
    it('LeadtimeService.leadtimeTypes.done is "done"', () => {
        expect(LeadtimeService.leadtimeTypes.done).toBe('done')
    })
    it('LeadtimeService.leadtimeTypes.done is "wip"', () => {
        expect(LeadtimeService.leadtimeTypes.wip).toBe('wip')
    })
})