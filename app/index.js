import express from 'express'
import {} from 'dotenv/config'
import HealCheck from './routes/healthcheck.route'
import ThroughputRoute from './routes/throughput.route'
import ThroughputService from './services/throughput.sevice'
import ThroughputInMemoryRepository from './repositories/throughput.memory.repository'

const app = express()
const throughputRepository = new ThroughputInMemoryRepository()
const throughputService = new ThroughputService({ throughputRepository })
const throughputRoute = new ThroughputRoute({ throughputService })
app.use(express.json())

app.get('/healCheck', new HealCheck().check)
app.get('/throughput', [throughputRoute.validate()], (req, res) => throughputRoute.calculate(req, res))

app.listen(process.env.PORT)