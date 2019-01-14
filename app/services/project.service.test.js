import Project from '../models/project'
import ProjectService from './project.service'
import ProjectRepository from '../repositories/project.repository';

describe('Create new Project', () => {
    it('given a new project name, then create new project', async () => {
        let project = new Project('project-name', 'jira')
        let projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, "find").mockImplementation(async () => null);
        jest.spyOn(projectRepository, "save").mockImplementation(async () => {
            project.id = 1 
            return project
        });

        const projectService = new ProjectService({projectRepository})

        project = await projectService.create(project)

        expect(project.id).not.toBeNull()
        expect(project.id).not.toBeUndefined()
        expect(project.name).toBe('project-name')
        expect(project.issueTracking).toBe('jira')
    })

    it('given a exists project name when create, then throw Exits exception', async () => {
        var project = new Project('project-name', 'jira')
        let projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, "find").mockImplementation(async (name) => {return new Project(name, '')});
        
        const projectService = new ProjectService({projectRepository})
        let error;
        try {
            await await projectService.create(project);
        } catch (e) {
            error = e;
        }

        expect(error).toEqual(new Error('The project project-name is alreade exists'))
    })

    it('given project with null name then throw argument exception', async () => {
        var project = new Project(null, 'jira')
    
        const projectService = new ProjectService({})
        let error;
        try {
            await await projectService.create(project);
        } catch (e) {
            error = e;
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })

    it('given project with undefined name then throw argument exception', async () => {
        var project = new Project(undefined, 'jira')
    
        const projectService = new ProjectService({})
        let error;
        try {
            await await projectService.create(project);
        } catch (e) {
            error = e;
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })

    it('given project with empty name then throw argument exception', async () => {
        var project = new Project('', 'jira')
    
        const projectService = new ProjectService({})
        let error;
        try {
            await await projectService.create(project);
        } catch (e) {
            error = e;
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })
})