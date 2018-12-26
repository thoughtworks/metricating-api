import JiraClient from './JiraClient'
import jira from 'jira-client'

jest.mock('jira-client', () => ({
   searchJira: jest.fn()
}))

beforeEach(() => {
    jira.searchJira.mockClear()
})

it('fetches Jira issues using the Jira client', () => {
    jira.searchJira.mockReturnValue([1, 2, 3])
    const issues = JiraClient.getAllIssues()
    expect(issues).toEqual([1, 2, 3])
})