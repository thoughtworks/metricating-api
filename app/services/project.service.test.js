import { fail } from 'assert'
import { when } from 'jest-when'
import Project from '../models/project'
import ProjectRepository from '../repositories/project.repository'
import ProjectService from './project.service'

let project = null
jest.mock('../repositories/project.repository')

beforeEach(() => {
    project = new Project({ id: 1, name: 'project-name', issueTracking: 'jira', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], waitList: ['READY TODO', 'READY FOR QA'], doneList: ['DONE']})
})

describe('Create new Project', () => {
    it('when find project return null and given a new project name, then create new project', async () => {
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => null)
        jest.spyOn(projectRepository, 'save').mockImplementation(async () => {
            project.id = 1
            return project
        })

        const projectService = new ProjectService({ projectRepository })

        const projectReturn = await projectService.create(project)

        expect(projectReturn.id).not.toBeNull()
        expect(projectReturn.id).not.toBeUndefined()
        expect(projectReturn.name).toBe('project-name')
        expect(projectReturn.issueTracking).toBe('jira')
        expect(projectReturn.doneList[0]).toBe('DONE')
    })

    it('when find project return undefined and given a new project name, then create new project', async () => {
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => undefined)
        jest.spyOn(projectRepository, 'save').mockImplementation(async () => {
            project.id = 1
            return project
        })

        const projectService = new ProjectService({ projectRepository })

        const projectReturn = await projectService.create(project)

        expect(projectReturn.id).not.toBeNull()
        expect(projectReturn.id).not.toBeUndefined()
        expect(projectReturn.name).toBe('project-name')
        expect(projectReturn.issueTracking).toBe('jira')
        expect(projectReturn.doneList[0]).toBe('DONE')
    })

    it('given a exists project name when create, then throw Exits exception', async () => {
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async (name) => {
            return new Project(name, '')
        })

        const projectService = new ProjectService({ projectRepository })
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The project project-name is alreade exists'))
    })

    it('given project with null name then throw argument exception', async () => {
        project.name = null
        const projectService = new ProjectService({})
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })

    it('given project with undefined name then throw argument exception', async () => {
        project.name = undefined
        const projectService = new ProjectService({})
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })

    it('given project with empty name then throw argument exception', async () => {
        project.name = ''

        const projectService = new ProjectService({})
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })
})

describe('Get Project', () => {
    it('when getProject with exits name, then retunr project', async () => {
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => {
            return project
        })

        const projectService = new ProjectService({ projectRepository })
        const getProject = await projectService.getProject('project-name')

        expect(getProject).toEqual(project)
    })

    it('when getProject with not exits name, then retunr undefined', async () => {
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => {
            return undefined
        })

        const projectService = new ProjectService({ projectRepository })
        const getProject = await projectService.getProject('project-name')

        expect(getProject).toEqual(undefined)
    })

    it('when getProject with null projectName then return error', async () => {
        const projectService = new ProjectService({ })
        try {
            await projectService.getProject(null)
        } catch (error) {
            expect(error).toEqual(new Error('The name of project is requiered'))
        }
    })

    it('when getProject with empty projectName then return error', async () => {
        const projectService = new ProjectService({ })
        try {
            await projectService.getProject('')
        } catch (error) {
            expect(error).toEqual(new Error('The name of project is requiered'))
        }
    })

    it('when getProject with undefined projectName then return error', async () => {
        const projectService = new ProjectService({ })
        try {
            await projectService.getProject(undefined)
        } catch (error) {
            expect(error).toEqual(new Error('The name of project is requiered'))
        }
    })
})

describe('When call sync project', () => {
    it('with not found projectName then return Error', async () => {
        const projectRepository = new ProjectRepository()

        when(projectRepository.find).calledWith('project-name').mockResolvedValue(undefined)
        const projectService = new ProjectService({ projectRepository })

        try {
            await projectService.sync('project-name')
            fail()
        } catch (error) {
            expect(error).toEqual(new Error('Project project-name not found'))
        }
    })
    it('with exist project, then call syncFactory', async () => {
        const syncService = {
            sync: jest.fn()
        }
        const syncFactory = {
            getSync: jest.fn()
        }
        when(syncFactory.getSync).calledWith(project).mockReturnValue(syncService)
        const projectRepository = new ProjectRepository()
        when(projectRepository.find).calledWith('project-name').mockResolvedValue(project)
        const projectService = new ProjectService({ projectRepository, syncFactory })

        await projectService.sync('project-name')

        expect(syncService.sync).toBeCalled()
    })
})