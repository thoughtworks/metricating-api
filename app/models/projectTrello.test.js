import ProjectTrello from './projectTrello'

it('when constructor correct parameters then initialize al properties', () => {
    const project = new ProjectTrello({ name: 'name1', issueTracking: 'issueTracking1', backlogList: ['backlog'], workingList: ['doing'], waitList: ['ready to do'], doneList: ['done'], apiKey: 'apiKey', apiToken: 'apiToken', boardId: 'u9Mb1sqn' })

    expect(project.name).toBe('name1')
    expect(project.issueTracking).toBe('issueTracking1')
    expect(project.backlogList).toMatchObject(['backlog'])
    expect(project.workingList).toMatchObject(['doing'])
    expect(project.waitList).toMatchObject(['ready to do'])
    expect(project.doneList).toMatchObject(['done'])
    expect(project.apiKey).toBe('apiKey')
    expect(project.apiToken).toBe('apiToken')
    expect(project.boardId).toBe('u9Mb1sqn')
})

it('when set constructor with undefined parameter then al properties is undefined', () => {
    const project = new ProjectTrello()

    expect(project.name).toBe(undefined)
    expect(project.issueTracking).toBe(undefined)
    expect(project.backlogList).toBe(undefined)
    expect(project.workingList).toBe(undefined)
    expect(project.waitList).toBe(undefined)
    expect(project.doneList).toBe(undefined)
    expect(project.apiKey).toBe(undefined)
    expect(project.apiToken).toBe(undefined)
    expect(project.boardId).toBe(undefined)
})