import _ from 'lodash'
import moment from 'moment-business-days'

class LeadtimeService {
    constructor(options) {
        this.leadtimeRepository = options.leadtimeRepository
        this.projectService = options.projectService
    }
    async calculate (projectName, period, leadtimeType) {
        const project = await this.projectService.getProject(projectName)
        if (project === undefined) {
            throw new Error(`Project ${projectName} not found`)
        }
        const cards = await this.leadtimeRepository.find(project, period, leadtimeType === LeadtimeService.leadtimeTypes.done)
        const cardsDto = []
        _.forEach(cards, function (card) {
            const leadtimes = []
            for (let i = 0; i < card.transitions.length; i++) {
                const cardStatus = card.transitions[i]
                if (_.indexOf(project.backlogList, cardStatus.status) >= 0 || _.indexOf(project.doneList, cardStatus.status) >= 0 || card.transitions.length - 1 === i) {
                    continue
                }
                leadtimes.push({
                    name: cardStatus.status,
                    leadtime: moment(card.transitions[i+1].createDate).businessDiff(moment(cardStatus.createDate))
                })
            }
            cardsDto.push({
                transitions: leadtimes,
                id: card.id,
                issueType: card.issueType
            })
        })
        return cardsDto
    }
}
export default LeadtimeService
LeadtimeService.leadtimeTypes = { done: 'done', wip: 'wip' }