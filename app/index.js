import express from 'express'
import {} from 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
//import swaggerDocument from './swagger.json'

import HealCheck from './routes/healthcheck.route'
import ThroughputRoute from './routes/throughput.route'
import ThroughputService from './services/throughput.service'
import ThroughputInMemoryRepository from './repositories/throughput.memory.repository'
import ProjectInMemoryRepository from './repositories/project.memory.repository'

const app = express()
const throughputRepository = new ThroughputInMemoryRepository()
const projectRepository = new ProjectInMemoryRepository()
const throughputService = new ThroughputService({ throughputRepository, projectRepository })
const throughputRoute = new ThroughputRoute({ throughputService })
app.use(express.json())

const swaggerDocument = require('./swagger')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/healCheck', new HealCheck().check)
app.get('/throughput/:projectName', [throughputRoute.validate()], (req, res) => throughputRoute.calculate(req, res))

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT)
}
// eslint-disable-next-line no-undef
module.exports = {
    app,
    throughputRepository,
    projectRepository
}