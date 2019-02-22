class CardStatus {
    constructor(options) {
        if (options !== undefined) {
            this.cardId = options.cardId
            this.status = options.status
            this.createDate = options.createDate
        }
    }
}

export default CardStatus