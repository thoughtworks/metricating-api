import HealCheck from './healthcheck.route'

const request = {
    body: {},
}

const response = {
    sendCalledWith: '',
    statusValue: 0,
    status(arg) {
        this.statusValue = arg
        return this
    },
    send(arg) {
        this.sendCalledWith = arg
        return this
    }
}

it('when call healtcheck then return OK with status 200', async () => {
    const healCheck = new HealCheck()

    await healCheck.check(request, response)

    expect(response.sendCalledWith).toMatchObject({ status: 'OK' })
})