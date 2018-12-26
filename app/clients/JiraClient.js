import jira from 'jira-client'

class JiraClient {
    getAllIssues() {
        return jira.searchJira()
    }
}

export default new JiraClient()