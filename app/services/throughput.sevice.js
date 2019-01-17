import _ from 'lodash'
import moment from 'moment'

class ThroughputService {
    constructor(options) {
        this.throughputRepository = options.throughputRepository
    }

    async calculate (period, periodTime) {
        const _this = this
        return await this.throughputRepository.find(period).then(tasks => {
            const issueTypeGroup = _.groupBy(tasks, task => task.issueType)
            const throughput = []

            _.forEach(issueTypeGroup, function (issueTypes) {
                const forWeek = _.groupBy(issueTypes, task => _this._groupByDateEnd(task.dateEnd, periodTime))
                _.forEach(forWeek, (item) => {
                    throughput.push({
                        issueType: _.head(item).issueType,
                        throughput: item.length,
                        date: _this._getDate(item[0].dateEnd, periodTime)
                    })
                })
            })

            return {
                period,
                tasks: throughput
            }
        })
    }
    _getDate(dateEnd, periodTime) {
        switch (periodTime) {
            case 'day': return moment(dateEnd).format('YYYY-MM-D')
            case 'week': return `${moment(dateEnd).year()}W${moment(dateEnd).week()}`
        }
    }
    _groupByDateEnd (dateEnd, periodTime) {
        switch (periodTime) {
            case 'day': return moment(dateEnd).day()
            case 'week': return moment(dateEnd).week()
        }
    }
}
export default ThroughputService