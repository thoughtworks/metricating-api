import httpMocks from 'node-mocks-http'
import HealCheck from './healthcheck.route'

it('when call healtcheck then return OK with status 200', async () => {
    const healCheck = new HealCheck()
    const request = httpMocks.createRequest()
    const response = httpMocks.createResponse()

    await healCheck.check(request, response)

    expect(response._getData()).toMatchObject({ status: 'OK' })
    expect(response.statusCode).toBe(200)
})