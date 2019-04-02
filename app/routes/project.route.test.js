import httpMocks from 'node-mocks-http'
import { validationResult } from 'express-validator/check'
import ProjectTrello from '../models/projectTrello'
import ProjectService from '../services/project.service.js'
import ProjectRoute from './project.route'

jest.mock('../services/project.service.js')
jest.mock('express-validator/check')

let request
let response
let projectService
let projectRoute
let createService
let project
const defaultRequest = function() {
    return httpMocks.createRequest({
        method: 'POST',
        url: '/project',
        body: {
            name: 'ProjectName',
            issueTracking: 'trello',
            backlogList: ['BACKLOG'],
            workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'],
            waitList: ['READY TODO', 'READY FOR QA'],
            doneList: ['DONE'],
            apiKey: 'apiKey',
            apiToken: 'apiToken',
            boardId: 'boardId'
        }
    })
}

beforeEach(() => {
    request = defaultRequest()
    response = httpMocks.createResponse()
    projectService = new ProjectService({})
    projectRoute = new ProjectRoute({ projectService })
    createService = jest.spyOn(projectService, 'create')
    project = new ProjectTrello({ name: 'ProjectName', issueTracking: 'trello', backlogList: ['BACKLOG'], workingList: ['ANALYSIS', 'DOING', 'QA', 'Review'], waitList: ['READY TODO', 'READY FOR QA'], doneList: ['DONE'], apiKey: 'apiKey', apiToken: 'apiToken', boardId: 'boardId' })
})

describe('test create a new Project for Trello', () => {
    it('given name, issueTracking, status and trello apikey, apiToken and url in body request then create a new ProjectTrello', async () => {
        createService.mockResolvedValue(project)
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn().mockReturnValue(true),
            }
        })
        await projectRoute.create(request, response)
        const dataResult = response._getData()

        expect(dataResult).toMatchObject(project)
        expect(response.statusCode).toBe(201)
        expect(createService).toHaveBeenCalledWith(project)
    })

    it('when project exits then return error', async () => {
        createService.mockImplementation(() => {
            throw new Error('The project ProjectName is alreade exists')
        })
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn().mockReturnValue(true),
            }
        })
        await projectRoute.create(request, response)
        const errorResult = JSON.parse(response._getData())

        expect(errorResult).toMatchObject([{ msg: 'The project ProjectName is alreade exists' }])
        expect(response.statusCode).toBe(400)
        expect(createService).toHaveBeenCalledWith(project)
    })

    it('when validationResult contains errors, then return errors with 422 status code', async () => {
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest.fn().mockReturnValue({
                    errors: [{
                        location: 'body',
                        param: 'ProjectName',
                        msg: 'Invalid value'
                    }]
                })
            }
        })

        await projectRoute.create(request, response)
        const errorResult = JSON.parse(response._getData())
        expect(errorResult).toMatchObject({
            errors: [{
                location: 'body',
                param: 'ProjectName',
                msg: 'Invalid value'
            }]
        })
        expect(response.statusCode).toBe(422)
    })
})