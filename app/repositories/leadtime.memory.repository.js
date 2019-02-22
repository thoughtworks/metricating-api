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
        return _.filter(this.dataBase.getData().tasks, function(task) {
            if (onlyDone) {
                return task.projectId === project.id && task.dateEnd >= period.start.toDate() && task.dateEnd < period.end.toDate()
            }
            return task.projectId === project.id && task.dateEnd === undefined &&
            _.some(task.transitions, function(taskStatus) {
                return _.indexOf(project.backlogList, taskStatus.status) === -1 &&
                        taskStatus.createDate >= period.start.toDate() &&
                        taskStatus.createDate < period.end.toDate()
            })
        })
    }
}
export default LeadtimeInMemoryRepository