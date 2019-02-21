import Project from './project'

it('when constructor correct parameters then initialize al properties', () => {
    const project = new Project({ name: 'name1', issueTracking: 'issueTracking1', backlogList: ['backlog'], workingList: ['doing'], waitList: ['ready to do'], doneList: ['done']})

    expect(project.name).toBe('name1')
    expect(project.issueTracking).toBe('issueTracking1')
    expect(project.backlogList).toMatchObject(['backlog'])
    expect(project.workingList).toMatchObject(['doing'])
    expect(project.waitList).toMatchObject(['ready to do'])
    expect(project.doneList).toMatchObject(['done'])
})

it('when set constructor with undefined parameter then al properties is undefined', () => {
    const project = new Project()

    expect(project.name).toBe(undefined)
    expect(project.issueTracking).toBe(undefined)
    expect(project.backlogList).toBe(undefined)
    expect(project.workingList).toBe(undefined)
    expect(project.waitList).toBe(undefined)
    expect(project.doneList).toBe(undefined)
})

it('when set constructor with id parameter then al property id is defined', () => {
    const project = new Project({ id: 1 })

    expect(project.id).toBe(1)
})