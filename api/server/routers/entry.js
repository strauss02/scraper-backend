import express from 'express'
import Entry from './../../db/models/entry.js'
const router = express.Router()

router.get('/all', (req, res) => {
  // res.send('you wantit all')
  Entry.find({}, (err, entries) => {
    res.send(entries)
  })
})
export default router
