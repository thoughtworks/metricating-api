import JiraApi from './JiraApi'

it('uses the jira client to check if all data we need is available', () => {
    const jiraClient = JiraApi.getJiraClient()
    const boardId = 1

    jiraClient.getConfiguration(boardId).then((config) => {
        console.log('👉 These are the board columns and their possible statuses')
        const columns = []
        config.columnConfig.columns.map((column) => {
            const statusIds = []
            column.statuses.map((status) => {
                statusIds.push(status.id)
            })
            columns.push({
                name: column.name,
                statuses: statusIds,
            })
        })
        console.log(columns)
    })

    jiraClient.listStatus().then((statuses) => {
        console.log('👉 These are all our statuses')
        const statusNames = []
        statuses.map((status) => {
            statusNames.push({
                id: status.id,
                name: status.name,
            })
        })
        console.log(statusNames)
    })

    jiraClient.getIssuesForBoard(boardId).then((results) => {
        console.log('👉 These are our issues')
        const issues = []
        results.issues.map((issue) => {
            issues.push({
                summary: issue.fields.summary,
                status: issue.fields.status.name,
            })
        })
        console.log(issues)
    })
})
