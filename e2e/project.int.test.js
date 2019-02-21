import request from 'supertest'
import server from '../app/index'
import Project from '../app/models/project'

describe('create new project', () => {
    it('when call create a new project with correct parameters, then create them', async () => {
        const response = await request(server.app).post('/project')
            .send({ name: 'ProjectName', issueTracking: 'Trello', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], waitList: ['READY TODO', 'READY FOR QA'], doneList: ['DONE']})
            .set('Accept', 'application/json')

        expect(response.body.id).toBe(1)
        expect(response.body.name).toBe('ProjectName')
        expect(response.body.issueTracking).toBe('Trello')
        expect(response.body.backlogList).toMatchObject(['BACKLOG'])
        expect(response.body.workingList).toMatchObject(['ANALYSIS', 'DOING', 'QA', 'Review'])
        expect(response.body.waitList).toMatchObject(['READY TODO', 'READY FOR QA'])
        expect(response.body.doneList).toMatchObject(['DONE'])
        expect(response.statusCode).toBe(201)
    })

    it('given exists project with the same name when call create a new project then return error', async () => {
        const dataBase = server.container.resolve('dataBase')
        dataBase.initialize({ projects: [
            new Project({ name: 'projectName', issueTracking: 'any', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], doneList: ['DONE']})
        ]})

        const response = await request(server.app).post('/project')
            .send({ name: 'projectName', issueTracking: 'Trello', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], doneList: ['DONE']})
            .set('Accept', 'application/json')

        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject(
            [{
                msg: 'The project projectName is alreade exists'
            }]
        )
    })

    it('without any parameters then error response and status 422', async () => {
        const response = await request(server.app).post('/project')

        expect(response.statusCode).toBe(422)
        expect(response.body).toMatchObject(
            [
                {
                    location: 'body',
                    msg: 'it is mandatory',
                    param: 'name'
                },
                {
                    location: 'body',
                    msg: 'it is mandatory',
                    param: 'issueTracking'
                },
                {
                    location: 'body',
                    msg: 'it is mandatory',
                    param: 'backlogList'
                },
                {
                    location: 'body',
                    msg: 'it is mandatory',
                    param: 'workingList'
                },
                {
                    location: 'body',
                    msg: 'it is mandatory',
                    param: 'doneList'
                },
            ]
        )
    })
})