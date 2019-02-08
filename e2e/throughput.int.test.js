import request from 'supertest'
import server from '../app/index'
import Task from '../app/models/task'
import Project from '../app/models/project'

it('given any params but without data return empty tasks', async () => {
    const response = await request(server.app).get('/throughput/projectName')
        .query({ start: '2018W50', end: '2018W51', periodTime: 'week' })

    expect(response.body.msg).toBe('Project projectName not found')
    expect(response.statusCode).toBe(400)
})

it('given correct params when initialize data then return correct throughput', async () => {
    server.throughputRepository.initialize([
        new Task(1, 'User Story', new Date(2018, 11, 17), 'done', 1),
        new Task(2, 'User Story', new Date(2018, 11, 18), 'done', 1),
        new Task(3, 'User Story', new Date(2018, 11, 29), 'done', 1),
        new Task(4, 'Bug', new Date(2018, 11, 20), 'done', 1),
        new Task(5, 'Bug', new Date(2018, 11, 29), 'done', 1),
    ])
    server.projectRepository.initialize([
        new Project('projectName', 'any', 'done')
    ])
    const response = await request(server.app).get('/throughput/projectName')
        .query({ start: '2018W51', end: '2018W52', periodTime: 'week' })

    expect(response.statusCode).toBe(200)
    expect(response.body.tasks).toHaveLength(2)
    expect(response.body.tasks.find(task => task.issueType === 'User Story').throughput).toBe(2)
    expect(response.body.tasks.find(task => task.issueType === 'Bug').throughput).toBe(1)
})

it('given incorrect periodTime then return 422 and error message', async () => {
    const response = await request(server.app).get('/throughput/projectName')
        .query({ start: '2018W50', end: '2018W51', periodTime: 'InvalidPeriodTime' })

    expect(response.body).toMatchObject(
        [{
            location: 'query',
            param: 'periodTime',
            value: 'InvalidPeriodTime',
            msg: 'must be a "day" or "week" values'
        }]
    )
    expect(response.statusCode).toBe(422)
})

it('given without params then return 422 and error message', async () => {
    const response = await request(server.app).get('/throughput/projectName')

    expect(response.body).toMatchObject([
        { location: 'query', param: 'start', msg: 'it is mandatory' },
        { location: 'query', param: 'end', msg: 'it is mandatory' },
        { location: 'query', param: 'periodTime', msg: 'it is mandatory' },
        { location: 'query', param: 'periodTime', msg: 'must be a "day" or "week" values' }
    ])
    expect(response.statusCode).toBe(422)
})

it('given incorrect start param then return 422 and error message', async () => {
    const response = await request(server.app).get('/throughput/projectName')
        .query({ start: '2019W91', end: '2018W51', periodTime: 'week' })

    expect(response.body).toMatchObject(
        [{
            location: 'query',
            param: 'start',
            value: '2019W91',
            msg: 'it is invalid format'
        }]
    )
    expect(response.statusCode).toBe(422)
})

it('given incorrect end param then return 422 and error message', async () => {
    const response = await request(server.app).get('/throughput/projectName')
        .query({ start: '2019W51', end: '2018W81', periodTime: 'week' })

    expect(response.body).toMatchObject(
        [{
            location: 'query',
            param: 'end',
            value: '2018W81',
            msg: 'it is invalid format'
        }]
    )
    expect(response.statusCode).toBe(422)
})