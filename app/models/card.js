class Card {
    constructor(options) {
        if (options !== undefined) {
            this.id = options.id
            this.issueType = options.issueType
            this.dateEnd = options.dateEnd
            this.status = options.status
            this.projectId = options.projectId,
            this.transitions = options.transitions === undefined ? [] : options.transitions
        }
    }
}

export default Card