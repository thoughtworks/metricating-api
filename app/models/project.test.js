import Project from './project'

it('when constructor correct parameters then initialize al properties', () => {
    const project = new Project({ name: 'name1', issueTracking: 'issueTracking1', statusDone: 'done1' })

    expect(project.name).toBe('name1')
    expect(project.issueTracking).toBe('issueTracking1')
    expect(project.statusDone).toBe('done1')
})

it('when set constructor with undefined parameter then al properties is undefined', () => {
    const project = new Project()

    expect(project.name).toBe(undefined)
    expect(project.issueTracking).toBe(undefined)
    expect(project.statusDone).toBe(undefined)
})