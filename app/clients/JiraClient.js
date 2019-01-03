import JiraApi from 'jira-client'
require('dotenv').config()

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
    }
    getJiraAPI() {
        return this._jira
    }
}

export default new JiraClient()