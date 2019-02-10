class ProjectService {
    constructor(options) {
        this.projectRepository = options.projectRepository
    }

    async create (project) {
        if (project.name === null || project.name === undefined || project.name === '')
            throw new Error('The name of project is requiered')

        await this.projectRepository.find(project.name)
            .then(async (result) => {
                if (result!== null && result !== undefined) {
                    throw new Error(`The project ${project.name} is alreade exists`)
                }
                project = await this.projectRepository.save(project)
            })
        return project
    }

    async getProject(projectName) {
        if (projectName === null || projectName === undefined || projectName === '') {
            throw new Error('The name of project is requiered')
        }
        return await this.projectRepository.find(projectName)
    }
}

export default ProjectService