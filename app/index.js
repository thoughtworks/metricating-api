import express from 'express'
import {} from 'dotenv/config'
import HealCheck from './routes/healthcheck.route'

const app = express()

app.get('/healCheck', new HealCheck().check)

app.listen(process.env.PORT)