import JiraClient from './JiraClient'

it('returns the Jira API to explore it', () => {
    const jiraApi = JiraClient.getJiraAPI()
    expect(jiraApi).toBeDefined()
    console.log(jiraApi)
})