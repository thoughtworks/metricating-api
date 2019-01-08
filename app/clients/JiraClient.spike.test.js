import JiraClient from './JiraClient'

it('returns the Jira API to explore it', () => {
    const jiraApi = JiraClient.getJiraAPI()
    expect(jiraApi).toBeDefined()

    const boardId = 1

    jiraApi.getConfiguration(boardId).then(config => {
        console.log('👉 These are the board columns and their possible statuses')
        let columns = []
        config.columnConfig.columns.map(column => {
            let statusIds = []
            column.statuses.map(status => {
                statusIds.push(status.id)
            })
            columns.push({
                name: column.name,
                statuses: statusIds
            })
        })
        console.log(columns)
    })

    jiraApi.listStatus().then(statuses => {
        console.log('👉 These are all our statuses')
        let statusNames = []
        statuses.map(status => {
            statusNames.push({
                id: status.id,
                name: status.name
            })
        })
        console.log(statusNames)
    })

    jiraApi.getIssuesForBoard(boardId).then(results => {
        console.log('👉 These are our issues');
        let issues = []
        results.issues.map(issue => {
            issues.push({
                summary: issue.fields.summary,
                status: issue.fields.status.name
            })
        })
        console.log(issues)
    })

})