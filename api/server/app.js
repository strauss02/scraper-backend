import express from 'express'
import APIRouter from './routers/API.js'

const app = express()

app.use('/api', APIRouter)

app.get('/', (req, res) => {
  res.send('aloha')
})

export default app
