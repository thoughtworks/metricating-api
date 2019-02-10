class TaskStatus {
    constructor(options) {
        if (options !== undefined) {
            this.taskId = options.taskId
            this.status = options.status
            this.createDate = options.createDate
        }
    }
}

export default TaskStatus