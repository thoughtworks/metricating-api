import request from 'supertest'
import server from '../app/index'

it('when call healCheck then return 200 and OK', async () => {
    const response = await request(server.app).get('/healCheck')

    expect(response.body.status).toBe('OK')
    expect(response.statusCode).toBe(200)
})