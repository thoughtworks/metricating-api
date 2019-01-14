class Project{
    constructor(name, issueTracking, statusDone = 'done'){
        this.id = undefined
        this.name = name
        this.issueTracking = issueTracking
        this.statusDone = statusDone
    }
}
export default Project