import request from 'supertest'
import server from '../app/index'
import Project from '../app/models/project'

describe('create new project', () => {
    it('when call create a new project with correct parameters, then create them', async () => {
        const response = await request(server.app).post('/project')
            .send({ name: 'ProjectName', issueTracking: 'Trello', statusDone: ['done']})
            .set('Accept', 'application/json')

        expect(response.body.id).toBe(1)
        expect(response.body.name).toBe('ProjectName')
        expect(response.body.issueTracking).toBe('Trello')
        expect(response.body.statusDone).toMatchObject(['done'])
        expect(response.statusCode).toBe(201)
    })

    it('given exists project with the same name when call create a new project then return error', async () => {
        const projectRepository = server.container.resolve('projectRepository')
        projectRepository.initialize([
            new Project('projectName', 'any', 'done')
        ])

        const response = await request(server.app).post('/project')
            .send({ name: 'projectName', issueTracking: 'Trello', statusDone: ['done']})
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
                    param: 'statusDone'
                },
            ]
        )
    })
})