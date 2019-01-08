import JiraClient from 'jira-client'
import {} from 'dotenv/config'

class JiraApi {
    constructor() {
        this._jira = new JiraClient({
            protocol: 'https',
            host: process.env.ATLASSIAN_HOST,
            username: process.env.ATLASSIAN_USERNAME,
            password: process.env.ATLASSIAN_PASSWORD,
            apiVersion: '2',
            strictSSL: true,
        })
        this._boardConfiguration = this._jira.getConfiguration(process.env.ATLASSIAN_PROJECT_BOARD_ID)
        this._statuses = this._jira.listStatus()
    }

    getJiraClient() {
        return this._jira
    }
}

export default new JiraApi()
