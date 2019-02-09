import _ from 'lodash'
import ProjectRepository from './project.repository'

let __projectData = []

class ProjectInMemoryRepository extends ProjectRepository {
    async find(projectName) {
        return _.find(__projectData, function(project) {
            return project.name === projectName
        })
    }
    async save(project) {
        project.id = __projectData.length + 1
        __projectData.push(project)
        return project
    }
    async initialize(projects) {
        __projectData = projects
        for (let i = 0; i < __projectData.length; i++) {
            __projectData[i].id = i + 1
        }
    }
}
export default ProjectInMemoryRepository