import _ from 'lodash'
import LeadtimeRepository from './leadtime.repository'

class LeadtimeInMemoryRepository extends LeadtimeRepository {
    constructor(options) {
        super()
        if (options!== undefined && options.dataBase !== undefined) {
            this.dataBase = options.dataBase
        } else {
            throw new Error('DataBase is not defined')
        }
    }
    async find(project, period, onlyDone) {
        return _.filter(this.dataBase.getData().cards, function(card) {
            if (onlyDone) {
                return card.projectId === project.id && card.dateEnd >= period.start.toDate() && card.dateEnd < period.end.toDate()
            }
            return card.projectId === project.id && card.dateEnd === undefined &&
            _.some(card.transitions, function(cardStatus) {
                return _.indexOf(project.backlogList, cardStatus.status) === -1 &&
                        cardStatus.createDate >= period.start.toDate() &&
                        cardStatus.createDate < period.end.toDate()
            })
        })
    }
}
export default LeadtimeInMemoryRepository