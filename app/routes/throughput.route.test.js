import httpMocks from 'node-mocks-http'
import { validationResult } from 'express-validator/check'
import ThroughputService from '../services/throughput.service'
import Period from '../models/period'
import ThroughputRoute from './throughput.route'

jest.mock('../services/throughput.service.js')
jest.mock('express-validator/check')

const defaultRequest = function() {
    return httpMocks.createRequest({
        method: 'GET',
        url: '/throughput/projectName',
        params: {
            projectName: 'projectName'
        },
        query: {
            start: '2018W51',
            end: '2018W52',
            periodTime: ThroughputService.periodTimes.week
        }
    })
}

describe('test calculate throughput', () => {
    it('given start date, end date and period time then return throughput', async () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })
        const period = new Period('2018W51', '2018W52')
        const request = defaultRequest()

        const response = httpMocks.createResponse()
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn().mockReturnValue(true)
            }
        })
        const calculate = jest.spyOn(throughputService, 'calculate')
        calculate.mockResolvedValue({ period, tasks: []})

        await throughputRoute.calculate(request, response)
        const dataResult = response._getData()

        expect(dataResult).toMatchObject({
            period,
            tasks: []
        })
        expect(response.statusCode).toBe(200)
        expect(calculate).toHaveBeenCalledWith('projectName', period, ThroughputService.periodTimes.week)
    })

    it('given invalid period time then return status 400 and error message', async () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })
        const request = httpMocks.createRequest()
        const response = httpMocks.createResponse()
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn(),
                array: jest.fn().mockReturnValue({
                    errors: [{
                        location: 'body',
                        param: 'periodTime',
                        msg: 'Invalid value'
                    }]
                })
            }
        })

        await throughputRoute.calculate(request, response)
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

    it('when throughput service throw error then return 422', async () => {
        const throughputService = new ThroughputService({})
        const throughputRoute = new ThroughputRoute({ throughputService })
        const period = new Period('2018W51', '2018W52')
        const request = defaultRequest()

        const response = httpMocks.createResponse()
        await validationResult.mockImplementation(() => {
            return {
                isEmpty: jest.fn().mockReturnValue(true)
            }
        })
        const calculate = jest.spyOn(throughputService, 'calculate')
        calculate.mockImplementation(() => {
            throw new Error('Project projectName not found')
        })

        await throughputRoute.calculate(request, response)
        const errorResult = JSON.parse(response._getData())

        expect(errorResult).toMatchObject({ msg: 'Project projectName not found' })
        expect(response.statusCode).toBe(400)
        expect(calculate).toHaveBeenCalledWith('projectName', period, ThroughputService.periodTimes.week)
    })
})