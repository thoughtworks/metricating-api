import express from 'express'
import {} from 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import { createContainer, InjectionMode, asClass, Lifetime } from 'awilix'

import HealCheck from './routes/healthcheck.route'
import ThroughputRoute from './routes/throughput.route'
import ThroughputService from './services/throughput.service'
import ThroughputInMemoryRepository from './repositories/throughput.memory.repository'
import ProjectInMemoryRepository from './repositories/project.memory.repository'
import ProjectRoute from './routes/project.route'
import ProjectService from './services/project.service'
import LeadtimeRoute from './routes/leadtime.route';
import LeadtimeInMemoryRepository from './repositories/leadtime.memory.repository';
import LeadtimeService from './services/leadtime.service';

const app = express()

const container = createContainer({
    injectionMode: InjectionMode.PROXY
})
container.register({
    throughputRepository: asClass(ThroughputInMemoryRepository, { lifetime: Lifetime.TRANSIENT }),
    throughputService: asClass(ThroughputService, { lifetime: Lifetime.TRANSIENT }),
    throughputRoute: asClass(ThroughputRoute, { lifetime: Lifetime.TRANSIENT }),

    projectRepository: asClass(ProjectInMemoryRepository, { lifetime: Lifetime.TRANSIENT }),
    projectService: asClass(ProjectService, { lifetime: Lifetime.TRANSIENT }),
    projectRoute: asClass(ProjectRoute, { lifetime: Lifetime.TRANSIENT }),

    leadtimeRepository: asClass(LeadtimeInMemoryRepository, { lifetime: Lifetime.TRANSIENT }),
    leadtimeService: asClass(LeadtimeService, { lifetime: Lifetime.TRANSIENT }),
    leadtimeRoute: asClass(LeadtimeRoute, { lifetime: Lifetime.TRANSIENT }),

    healchekRoute: asClass(HealCheck, { lifetime: Lifetime.TRANSIENT })
})

app.use(express.json())

const swaggerDocument = require('./swagger')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/healCheck', container.resolve('healchekRoute').check)
app.get('/throughput/:projectName', [container.resolve('throughputRoute').validate()], (req, res) => container.resolve('throughputRoute').calculate(req, res))
app.get('/leadtime/:projectName', [container.resolve('leadtimeRoute').validate()], (req, res) => container.resolve('leadtimeRoute').calculate(req, res))
app.post('/project', [container.resolve('projectRoute').validate()], (req, res) => container.resolve('projectRoute').create(req, res))

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT)
}
// eslint-disable-next-line no-undef
module.exports = {
    app,
    container
}