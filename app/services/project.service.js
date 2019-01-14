class ProjectService{
    constructor(options){
        this.projectRepository = options.projectRepository
    }

    async save (project) {
        await this.projectRepository.find(project.name)
        .then(async (result) => {
            if (result!== null && result !== undefined){
                throw new Error('The project '+project.name+' is alreade exists')
            }
            project = await this.projectRepository.save(project)
        })
        return project
    }
}

export default ProjectService