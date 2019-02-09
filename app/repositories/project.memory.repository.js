import _ from 'lodash'
import ProjectRepository from './project.repository'

class ProjectInMemoryRepository extends ProjectRepository {
    constructor(options) {
        super()
        this.dataBase = options.dataBase
    }
    async find(projectName) {
        return _.find(this.dataBase.getData().projects, function(project) {
            return project.name === projectName
        })
    }
    async save(project) {
        project.id = this.dataBase.getData().projects.length + 1
        this.dataBase.getData().projects.push(project)
        return project
    }
}
export default ProjectInMemoryRepository