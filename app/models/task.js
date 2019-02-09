class Task {
    constructor(id, issueType, dateEnd, status, projectId, transitions = []) {
        this.id = id
        this.issueType = issueType
        this.dateEnd = dateEnd
        this.status = status
        this.projectId = projectId,
        this.transitions = transitions
    }
}

export default Task