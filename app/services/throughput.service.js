import _ from 'lodash'
import moment from 'moment'
import DateObj from '../models/date'

class ThroughputService {
    constructor(options) {
        this.throughputRepository = options.throughputRepository
        this.projectService = options.projectService
    }

    async calculate (projectName, period, periodTime) {
        const _this = this
        const project = await this.projectService.getProject(projectName)
        if (project === undefined) {
            throw new Error(`Project ${projectName} not found`)
        }
        return await this.throughputRepository.find(project.id, period).then(cards => {
            const issueTypeGroup = _.groupBy(cards, card => card.issueType)
            const throughput = []

            _.forEach(issueTypeGroup, function (issueTypes) {
                const forWeek = _.groupBy(issueTypes, card => _this._groupByDateEnd(card.dateEnd, periodTime))
                _.forEach(forWeek, (item) => {
                    throughput.push({
                        issueType: _.head(item).issueType,
                        throughput: item.length,
                        date: new DateObj(item[0].dateEnd)
                    })
                })
            })

            return {
                period,
                cards: throughput
            }
        })
    }

    _groupByDateEnd (dateEnd, periodTime) {
        switch (periodTime) {
            case ThroughputService.periodTimes.day: return moment(dateEnd).day()
            case ThroughputService.periodTimes.week: return moment(dateEnd).week()
        }
    }
}
export default ThroughputService
ThroughputService.periodTimes = { day: 'day', week: 'week' }