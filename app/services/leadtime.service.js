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
        const tasks = await this.leadtimeRepository.find(project, period, leadtimeType === LeadtimeService.leadtimeTypes.done)
        const tasksDto = []
        _.forEach(tasks, function (task) {
            const leadtimes = []
            for (let i = 0; i < task.transitions.length; i++) {
                const taskStatus = task.transitions[i]
                if (_.indexOf(project.backlogList, taskStatus.status) >= 0 || _.indexOf(project.doneList, taskStatus.status) >= 0 || task.transitions.length - 1 === i) {
                    continue
                }
                leadtimes.push({
                    name: taskStatus.status,
                    leadtime: moment(task.transitions[i+1].createDate).businessDiff(moment(taskStatus.createDate))
                })
            }
            tasksDto.push({
                transitions: leadtimes,
                id: task.id,
                issueType: task.issueType
            })
        })
        return tasksDto
    }
}
export default LeadtimeService
LeadtimeService.leadtimeTypes = { done: 'done', wip: 'wip' }