import express from 'express'
import APIRouter from './routers/API.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.use('/api', APIRouter)

app.get('/', (req, res) => {
  res.send('aloha')
})

export default app
