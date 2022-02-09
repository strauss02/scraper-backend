import express from 'express'
import entryRouter from './entry.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('aloha')
})

router.use('/entry', entryRouter)

export default router
