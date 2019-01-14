class ProjectRepository{
    constructor(){
        this.__projects = []
    }

    async find(name){
        return this.__projects.find(project => project.name === name)
    }
    
    async save(project){
        project.id = this.__projects.length + 1
        this.__projects.push(project)
        return project
    }
}
export default ProjectRepository