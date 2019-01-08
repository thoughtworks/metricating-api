import JiraApi from 'jira-client'
import {} from 'dotenv/config'

class JiraClient {
    constructor() {
        this._jira = new JiraApi({
            protocol: 'https',
            host: process.env.ATLASSIAN_HOST,
            username: process.env.ATLASSIAN_USERNAME,
            password: process.env.ATLASSIAN_PASSWORD,
            apiVersion: '2',
            strictSSL: true
        })
        this._boardConfiguration = this._jira.getConfiguration(process.env.ATLASSIAN_PROJECT_BOARD_ID)
        this._statuses = this._jira.listStatus()
    }
    getJiraAPI() {
        return this._jira
    }
}

export default new JiraClient()