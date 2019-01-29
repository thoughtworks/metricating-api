import JiraClient from 'jira-client'
import JiraApi from './JiraApi'

jest.mock('jira-client')

it('initializes as a singleton', () => {
    expect(JiraClient).toHaveBeenCalledTimes(1)
})

it('fetches board configuration and statuses on init', () => {
    const mockJiraApi = JiraClient.mock.instances[0]

    expect(mockJiraApi.getConfiguration).toHaveBeenCalledTimes(1)
    expect(mockJiraApi.listStatus).toHaveBeenCalledTimes(1)
})

it('has a method that exposes the jira client', () => {
    const instanceJiraClient = JiraApi.getJiraClient()
    expect(instanceJiraClient.constructor).toEqual(JiraClient)
})