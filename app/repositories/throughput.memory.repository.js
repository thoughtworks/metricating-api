import _ from 'lodash'
import ThroughputRepository from './throughput.repository'

let __throughputData = []

class ThroughputInMemoryRepository extends ThroughputRepository {
    async find(projectId, period) {
        return _.filter(__throughputData, function(task) {
            return task.projectId === projectId && task.dateEnd >= period.start.toDate() && task.dateEnd < period.end.toDate()
        })
    }
    async initialize(periods) {
        __throughputData = periods
    }
}
export default ThroughputInMemoryRepository