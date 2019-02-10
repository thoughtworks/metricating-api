import TaskStatus from './taskStatus'

it('when constructor correct parameters then initialize al properties', () => {
    const taskStatus = new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) })

    expect(taskStatus.taskId).toBe(1)
    expect(taskStatus.status).toBe('BACKLOG')
    expect(taskStatus.createDate.getFullYear()).toBe(2018)
    expect(taskStatus.createDate.getMonth()).toBe(11)
    expect(taskStatus.createDate.getDate()).toBe(3)
})

it('when set constructor with undefined parameter then al properties is undefined', () => {
    const taskStatus = new TaskStatus()

    expect(taskStatus.taskId).toBe(undefined)
    expect(taskStatus.status).toBe(undefined)
    expect(taskStatus.createDate).toBe(undefined)
})