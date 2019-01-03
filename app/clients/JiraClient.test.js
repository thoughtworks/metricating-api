import JiraClient from './JiraClient'

it('returns the Jira API to explore it', () => {
    const jiraApi = JiraClient.getJiraAPI()
    expect(jiraApi).toBeDefined()

    const results = jiraApi.searchJira()
    .then(results => {
        console.log(results)
    })
    .catch(error => {
        console.log(error)
    })

})