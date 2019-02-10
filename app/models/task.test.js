import Task from './task'

it('when constructor correct parameters then initialize al properties', () => {
    const task = new Task({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 10), status: 'done', projectId: 1 })

    expect(task.id).toBe(1)
    expect(task.issueType).toBe('User Story')
    expect(task.dateEnd.getFullYear()).toBe(2018)
    expect(task.dateEnd.getMonth()).toBe(11)
    expect(task.dateEnd.getDate()).toBe(10)
    expect(task.status).toBe('done')
    expect(task.projectId).toBe(1)
    expect(task.transitions).toHaveLength(0)
})

it('when set constructor with undefined parameter then al properties is undefined', () => {
    const task = new Task()

    expect(task.id).toBe(undefined)
    expect(task.issueType).toBe(undefined)
    expect(task.dateEnd).toBe(undefined)
    expect(task.status).toBe(undefined)
    expect(task.projectId).toBe(undefined)
    expect(task.transitions).toBe(undefined)
})