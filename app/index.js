import express from 'express'
import {} from 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import { createContainer, InjectionMode, asClass, Lifetime } from 'awilix'

import HealCheck from './routes/healthcheck.route'
import ThroughputRoute from './routes/throughput.route'
import ThroughputService from './services/throughput.service'
import ThroughputInMemoryRepository from './repositories/throughput.memory.repository'
import ProjectInMemoryRepository from './repositories/project.memory.repository'

const app = express()

const container = createContainer({
    injectionMode: InjectionMode.PROXY
})
container.register({
    throughputRepository: asClass(ThroughputInMemoryRepository, { lifetime: Lifetime.TRANSIENT }),
    projectRepository: asClass(ProjectInMemoryRepository, { lifetime: Lifetime.TRANSIENT }),
    throughputService: asClass(ThroughputService, { lifetime: Lifetime.TRANSIENT }),
    throughputRoute: asClass(ThroughputRoute, { lifetime: Lifetime.TRANSIENT }),
})

app.use(express.json())

const swaggerDocument = require('./swagger')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/healCheck', new HealCheck().check)
app.get('/throughput/:projectName', [container.resolve('throughputRoute').validate()], (req, res) => container.resolve('throughputRoute').calculate(req, res))

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT)
}
// eslint-disable-next-line no-undef
module.exports = {
    app,
    container
}