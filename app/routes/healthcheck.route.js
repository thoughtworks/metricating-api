class HealCheck {
    async check (request, response) {
        response.status(200).send({ status: 'OK' })
    }
}

export default HealCheck