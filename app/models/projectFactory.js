import _ from 'lodash'
import ProjectTrello from './projectTrello'

class ProjectFactory {
    static instanceProject(data) {
        if (ProjectFactory.__dataIsValid(data)) {
            const projectOptions = {
                name: data.name,
                issueTracking: data.issueTracking.toLowerCase(),
                backlogList: data.backlogList,
                workingList: data.workingList,
                waitList: data.waitList,
                doneList: data.doneList
            }
            if (data.issueTracking.toLowerCase() === 'trello') {
                ProjectFactory.__trelloValidation(data)
                projectOptions.apiKey = data.apiKey
                projectOptions.apiToken = data.apiToken
                projectOptions.boardId = data.boardId
                return new ProjectTrello(projectOptions)
            }
            return null
        }
        throw new Error('The issueTracking is required.')
    }

    static __trelloValidation(data) {
        if (_.isEmpty(data.apiKey)) {
            throw new Error('The apiKey is required.')
        }
        if (_.isEmpty(data.apiToken)) {
            throw new Error('The apiToken is required.')
        }
        if (_.isEmpty(data.boardId)) {
            throw new Error('The boardId is required.')
        }
    }

    static __dataIsValid(data) {
        return _.isPlainObject(data) && !_.isEmpty(data.issueTracking)
    }
}
export default ProjectFactory