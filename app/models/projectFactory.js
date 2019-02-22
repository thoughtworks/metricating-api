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
                projectOptions.apiKey = data.apiKey
                projectOptions.apiToken = data.apiToken
                projectOptions.boardUrl = data.boardUrl
                return new ProjectTrello(projectOptions)
            }
            return null
        }
        throw new Error('The issueTracking is required.')
    }

    static __dataIsValid(data) {
        return data !== undefined &&
                data !== null &&
                data !== '' &&
                data.issueTracking !== undefined &&
                data.issueTracking !== null &&
                data.issueTracking !== ''
    }
}
export default ProjectFactory