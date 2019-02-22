import request from 'supertest'
import server from '../app/index'
import Card from '../app/models/card'
import Project from '../app/models/project'

it('given any params but without data return empty cards', async () => {
    const response = await request(server.app).get('/throughput/projectName')
        .query({ start: '2018W50', end: '2018W51', periodTime: 'week' })

    expect(response.body.msg).toBe('Project projectName not found')
    expect(response.statusCode).toBe(400)
})

it('given correct params when initialize data then return correct throughput', async () => {
    const dataBase = server.container.resolve('dataBase')
    dataBase.initialize({ cards: [
        new Card({ id: 1, issueType: 'User Story', dateEnd: new Date(2018, 11, 17), status: 'done', projectId: 1 }),
        new Card({ id: 2, issueType: 'User Story', dateEnd: new Date(2018, 11, 18), status: 'done', projectId: 1 }),
        new Card({ id: 3, issueType: 'User Story', dateEnd: new Date(2018, 11, 29), status: 'done', projectId: 1 }),
        new Card({ id: 4, issueType: 'Bug', dateEnd: new Date(2018, 11, 20), status: 'done', projectId: 1 }),
        new Card({ id: 5, issueType: 'Bug', dateEnd: new Date(2018, 11, 29), status: 'done', projectId: 1 }),
    ], projects: [
        new Project({ name: 'projectName', issueTracking: 'any', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], waitList: ['READY TODO', 'READY FOR QA'], doneList: ['done']})
    ]})
    const response = await request(server.app).get('/throughput/projectName')
        .query({ start: '2018W51', end: '2018W52', periodTime: 'week' })

    expect(response.statusCode).toBe(200)
    expect(response.body.cards).toHaveLength(2)
    expect(response.body.cards.find(card => card.issueType === 'User Story').throughput).toBe(2)
    expect(response.body.cards.find(card => card.issueType === 'Bug').throughput).toBe(1)
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