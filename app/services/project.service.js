class ProjectService {
    constructor(options) {
        this.projectRepository = options.projectRepository
        this.syncFactory = options.syncFactory
    }

    async create (project) {
        if (project.name === null || project.name === undefined || project.name === '')
            throw new Error('The name of project is requiered')

        return await this.projectRepository.find(project.name)
            .then(async (result) => {
                if (result!== null && result !== undefined) {
                    throw new Error(`The project ${project.name} is alreade exists`)
                }
                return await this.projectRepository.save(project)
            })
    }

    async getProject(projectName) {
        if (projectName === null || projectName === undefined || projectName === '') {
            throw new Error('The name of project is requiered')
        }
        return await this.projectRepository.find(projectName)
    }

    async sync(projectName) {
        const project = await this.getProject(projectName)
        if (project === undefined) {
            throw new Error(`Project ${projectName} not found`)
        }
        const syncService = this.syncFactory.getSync(project)
        syncService.sync()
    }
}

export default ProjectService