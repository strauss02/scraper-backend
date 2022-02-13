import express from 'express'
import Entry from './../../db/models/entry.js'
const router = express.Router()

router.get('/all', (req, res) => {
  Entry.find({}, (err, entries) => {
    res.send(entries)
  })
})

router.get('/count', (req, res) => {
  Entry.countDocuments({}, (err, entries) => {
    res.json(Number(entries))
  })
})

// Get last X results
router.get('/:quantity', async (req, res) => {
  if (isNaN(req.params.quantity)) {
    return res.send([])
  }
  const quantity = Number(req.params.quantity)

  const lastEntries = await Entry.find().sort({ date: -1 }).limit(quantity)
  res.send(lastEntries)
})

router.get('/search/:query', async (req, res) => {
  const query = req.params.query
  console.log(query)
  if (!query) {
    res.send(null)
  }
  const searchResults = await Entry.find({
    $or: [
      {
        title: { $regex: query, $options: 'i' },
      },
      {
        content: { $regex: query, $options: 'i' },
      },
    ],
  })
  res.send(searchResults)
})
export default router
