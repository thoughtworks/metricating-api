import Project from '../models/project'
import ProjectService from './project.service'
import ProjectRepository from '../repositories/project.repository';

describe('Create new Project', () => {
    it('given a new project name, then create new project', async () => {
        var project = new Project('project-name', 'jira')
        const projectRepository = new ProjectRepository()
        const projectService = new ProjectService({projectRepository})

        project = await projectService.save(project)

        expect(project.id).not.toBeNull()
        expect(project.id).not.toBeUndefined()
        expect(project.name).toBe('project-name')
        expect(project.issueTracking).toBe('jira')
    })

    it('given a exists project name when create, then throw Exits exception', async () => {
        var project = new Project('project-name', 'jira')
        const projectRepository = new ProjectRepository()
        await projectRepository.save(project)
        
        const projectService = new ProjectService({projectRepository})
        let error;
        try {
            await await projectService.save(project);
        } catch (e) {
            error = e;
        }

        expect(error).toEqual(new Error('The project project-name is alreade exists'))
    })
})