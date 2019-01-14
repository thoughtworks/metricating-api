import Project from '../models/project'
import ProjectService from './project'

describe('Create new Project', () => {
    it('given a new project name, then create new project', () => {
        var project = new Project('project-name', 'jira')
        const projectService = new ProjectService()

        project = projectService.save(project)

        expect(project.id).not.toBeNull()
        expect(project.id).not.toBeUndefined()
        expect(project.name).toBe('project-name')
        expect(project.issueTracking).toBe('jira')
    })
})