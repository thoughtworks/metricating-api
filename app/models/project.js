class Project {
    constructor(options) {
        if (options !== undefined) {
            this.id = options.id
            this.name = options.name
            this.backlogList = options.backlogList
            this.workingList = options.workingList
            this.waitList = options.waitList
            this.doneList = options.doneList
            this.issueTracking = options.issueTracking
        }
    }
}
export default Project