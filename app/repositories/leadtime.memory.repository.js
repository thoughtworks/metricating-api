import _ from 'lodash'
import LeadtimeRepository from './leadtime.repository'

class LeadtimeInMemoryRepository extends LeadtimeRepository {
    constructor(options) {
        super()
        this.dataBase = options.dataBase
    }
    async find(projectId, period, onlyDone) {
        return _.filter(this.dataBase.getData().tasks, function(task) {
            if (onlyDone) {
                return task.projectId === projectId && task.dateEnd >= period.start.toDate() && task.dateEnd < period.end.toDate()
            }
            return task.projectId === projectId && task.dateEnd === undefined && task.transitions.length > 1 &&
            _.some(_.slice(task.transitions, 1), function(taskStatus) {
                return taskStatus.createDate >= period.start.toDate() && taskStatus.createDate < period.end.toDate()
            })
        })
    }
}
export default LeadtimeInMemoryRepository