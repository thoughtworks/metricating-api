import _ from 'lodash'
import LeadtimeRepository from './leadtime.repository'

let __leadtimeData = []

class LeadtimeInMemoryRepository extends LeadtimeRepository {
    async find(projectId, period, onlyDone) {
        return _.filter(__leadtimeData, function(task) {
            if (onlyDone) {
                return task.projectId === projectId && task.dateEnd >= period.start.toDate() && task.dateEnd < period.end.toDate()
            }
            return task.projectId === projectId && task.dateEnd === undefined && task.transitions.length > 1 &&
            _.some(_.slice(task.transitions, 1), function(taskStatus) {
                return taskStatus.createDate >= period.start.toDate() && taskStatus.createDate < period.end.toDate()
            })
        })
    }

    async initialize(leadtime) {
        __leadtimeData = leadtime
    }
}
export default LeadtimeInMemoryRepository