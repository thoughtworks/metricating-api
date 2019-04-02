import Project from './project'

class ProjectTrello extends Project {
    constructor(options) {
        super(options)
        if (options !== undefined) {
            this.apiKey = options.apiKey
            this.apiToken = options.apiToken
            this.boardId = options.boardId
        }
    }
}

export default ProjectTrello