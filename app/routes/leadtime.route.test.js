import httpMocks from 'node-mocks-http'
import { validationResult } from 'express-validator/check'
import LeadtimeService from '../services/leadtime.service'
import Period from '../models/period'
import LeadtimeRoute from './leadtime.route'

jest.mock('../services/leadtime.service.js')
jest.mock('express-validator/check')

let request
let response
let leadtimeRoute
let leadtimeServiceCalculate
const defaultRequest = function() {
    return httpMocks.createRequest({
        method: 'GET',
        url: '/leadtime/projectName',
        params: {
            projectName: 'projectName'
        },
        query: {
            start: '2018W51',
            end: '2018W52',
            leadtimeType: LeadtimeService.leadtimeTypes.done
        }
    })
}

const resultLeadTime = function() {
    return [
        {
            id: 1,
            issueType: 'User Story',
            transitions: [
                { name: 'ANALYSIS', leadtime: 1 },
                { name: 'READY TODO', leadtime: 1 },
                { name: 'DOING', leadtime: 2 },
                { name: 'READY FOR QA', leadtime: 1 },
                { name: 'QA', leadtime: 0 },
                { name: 'Review', leadtime: 1 }
            ],
        }
    ]
}

describe('test calculate leadtime', () => {
    beforeEach(async () => {
        request = defaultRequest()
        response = httpMocks.createResponse()
        const leadtimeService = new LeadtimeService({})
        leadtimeRoute = new LeadtimeRoute({ leadtimeService })
        leadtimeServiceCalculate = jest.spyOn(leadtimeService, 'calculate')
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn().mockReturnValue(true),
            }
        })
    })

    it('given projectName, period and leadtimeType then return leadtime', async () => {
        leadtimeServiceCalculate.mockResolvedValue(resultLeadTime())

        await leadtimeRoute.calculate(request, response)
        const dataResult = response._getData()

        expect(dataResult).toMatchObject(resultLeadTime())
        expect(response.statusCode).toBe(200)
        expect(leadtimeServiceCalculate).toHaveBeenCalledWith('projectName', new Period('2018W51', '2018W52'), LeadtimeService.leadtimeTypes.done)
    })

    it('when leadtime service throw error, then return statusCode 400 and error message', async () => {
        leadtimeServiceCalculate.mockImplementation(() => {
            throw new Error('Project projectName not found')
        })

        await leadtimeRoute.calculate(request, response)
        const errorResult = JSON.parse(response._getData())

        expect(errorResult).toMatchObject({ msg: 'Project projectName not found' })
        expect(response.statusCode).toBe(400)
        expect(leadtimeServiceCalculate).toHaveBeenCalledWith('projectName', new Period('2018W51', '2018W52'), LeadtimeService.leadtimeTypes.done)
    })

    it('when result validation request is invalid, then return 422 statusCode and error message', async () => {
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn().mockReturnValue(false),
                array: jest.fn().mockReturnValue({
                    errors: [{
                        location: 'body',
                        param: 'periodTime',
                        msg: 'Invalid value'
                    }]
                })
            }
        })

        await leadtimeRoute.calculate(request, response)

        const errorResult = JSON.parse(response._getData())
        expect(errorResult).toMatchObject({
            errors: [{
                location: 'body',
                param: 'periodTime',
                msg: 'Invalid value'
            }]
        })
        expect(response.statusCode).toBe(422)
    })
})