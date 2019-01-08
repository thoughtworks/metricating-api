import JiraApi from './JiraApi'
import JiraClient from 'jira-client'

jest.mock('jira-client')

it('initializes as a singleton', () => {
    expect(JiraClient).toHaveBeenCalledTimes(1)
})

it('fetches board configuration and statuses on init', () => {
    const mockJiraApi = JiraClient.mock.instances[0]

    expect(mockJiraApi.getConfiguration).toHaveBeenCalledTimes(1)
    expect(mockJiraApi.listStatus).toHaveBeenCalledTimes(1)
})