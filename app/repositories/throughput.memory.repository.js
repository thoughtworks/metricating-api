import _ from 'lodash'
import ThroughputRepository from './throughput.repository'

let __throughputData = []

class ThroughputInMemoryRepository extends ThroughputRepository {
    async find(period) {
        return _.filter(__throughputData, function(task) {
            return task.dateEnd >= period.start.toDate() && task.dateEnd < period.end.toDate()
        })
    }
    async initialize(periods) {
        __throughputData = periods
    }
}
export default ThroughputInMemoryRepository