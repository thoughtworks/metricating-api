import _ from 'lodash'
import moment from 'moment'

class ThroughputService {
    constructor(options){
        this.throughputRepository = options.throughputRepository
    }

    async calculate (period, periodTime){
        return await this.throughputRepository.find(period).then(tasks =>{            
            let issueTypeGroup = _.groupBy(tasks, task => task.issueType)
            let throughput = []
            
            _.forEach(issueTypeGroup, function (issueTypes) {
                var forWeek = _.groupBy(issueTypes, task => moment(task.dateEnd).week())
                _.forEach(forWeek, (item, k) => {
                    throughput.push({
                        issueType: _.head(item).issueType,
                        throughput: item.length,
                        period: moment(item[0].dateEnd).year()+'W'+moment(item[0].dateEnd).week()
                    })
                })
            })

            return {
                period: period,
                tasks: throughput
            }
        })
    }
}
export default ThroughputService