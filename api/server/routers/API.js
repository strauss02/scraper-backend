import express from 'express'
import entryRouter from './entry.js'
import statsRouter from './stats.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('aloha')
})

router.use('/entry', entryRouter)
router.use('/stats', statsRouter)

export default router
