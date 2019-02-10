import _ from 'lodash'
import moment from 'moment-business-days'

class LeadtimeService {
    constructor(options) {
        this.leadtimeRepository = options.leadtimeRepository
        this.projectService = options.projectService
    }
    async calculate (projectName, period, leadtimeType) {
        const project = await this.projectService.getProject(projectName)
        if (project === undefined || project === null) {
            throw new Error(`Project ${projectName} not found`)
        }
        return await this.leadtimeRepository.find(project.id, period, leadtimeType === LeadtimeService.leadtimeTypes.done).then(tasks => {
            const tasksDto = []
            _.forEach(tasks, function (task) {
                const leadtimes = []
                for (let i = 1; i < task.transitions.length; i++) {
                    const taskStatus = task.transitions[i]
                    if (_.indexOf(project.statusDone, taskStatus.status) >= 0 || task.transitions.length - 1 === i) {
                        break
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
        })
    }
}
export default LeadtimeService
LeadtimeService.leadtimeTypes = { done: 'done', wip: 'wip' }