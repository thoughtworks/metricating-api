class Project {
    constructor(options) {
        if (options !== undefined) {
            this.id = undefined
            this.name = options.name
            this.issueTracking = options.issueTracking
            this.statusDone = options.statusDone
        }
    }
}
export default Project