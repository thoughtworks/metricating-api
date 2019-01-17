import Project from '../models/project'
import ProjectRepository from '../repositories/project.repository'
import ProjectService from './project.service'

describe('Create new Project', () => {
    it('given a new project name, then create new project', async () => {
        let project = new Project('project-name', 'jira', 'cardEnding')
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => null)
        jest.spyOn(projectRepository, 'save').mockImplementation(async () => {
            project.id = 1
            return project
        })

        const projectService = new ProjectService({ projectRepository })

        project = await projectService.create(project)

        expect(project.id).not.toBeNull()
        expect(project.id).not.toBeUndefined()
        expect(project.name).toBe('project-name')
        expect(project.issueTracking).toBe('jira')
        expect(project.statusDone).toBe('cardEnding')
    })

    it('given a exists project name when create, then throw Exits exception', async () => {
        const project = new Project('project-name', 'jira', 'done')
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
        const project = new Project(null, 'jira', 'done')

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
        const project = new Project(undefined, 'jira', 'done')

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
        const project = new Project('', 'jira', 'done')

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