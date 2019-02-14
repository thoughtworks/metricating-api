import _ from 'lodash'
import ThroughputRepository from './throughput.repository'

class ThroughputInMemoryRepository extends ThroughputRepository {
    constructor(options) {
        super()
        if (options!== undefined && options.dataBase !== undefined) {
            this.dataBase = options.dataBase
        } else {
            throw new Error('DataBase is not defined')
        }
    }
    async find(projectId, period) {
        return _.filter(this.dataBase.getData().tasks, function(task) {
            return task.projectId === projectId && task.dateEnd >= period.start.toDate() && task.dateEnd < period.end.toDate()
        })
    }
}
export default ThroughputInMemoryRepository