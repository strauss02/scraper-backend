import express from 'express'
import Entry from './../../db/models/entry.js'

const router = express.Router()

const today = {
  iso: {
    start: () => new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    now: () => new Date().toISOString(),
    end: () => new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
  },
  local: {
    start: () =>
      new Date(
        new Date(new Date().setHours(0, 0, 0, 0)).toString().split('GMT')[0] +
          ' UTC'
      ).toISOString(),
    now: () =>
      new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString(),
    end: () =>
      new Date(
        new Date(new Date().setHours(23, 59, 59, 999))
          .toString()
          .split('GMT')[0] + ' UTC'
      ).toISOString(),
  },
}

router.get('/today_count', async (req, res) => {
  const todayCount = await Entry.countDocuments({
    date: {
      $gte: today.iso.start(),
    },
  })

  res.json(todayCount)
})

router.get('/hourly', async (req, res) => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  // 7 hours back
  let array = []

  let lastCount = 0

  const entriesPerHour = await arr.map(async (hour) => {
    let currentDate = new Date()
    currentDate.setHours(currentDate.getHours() - hour)
    console.log(currentDate)
    let hourLater = new Date(currentDate.getTime()).setHours(
      currentDate.getHours() + 1
    )
    console.log(hourLater)
    console.log(currentDate)
    const hourCount = await Entry.countDocuments({
      date: {
        $gte: currentDate,
        $lt: hourLater,
      },
    })

    return hourCount
  })
  console.log(entriesPerHour)
  await Promise.all(entriesPerHour).then((result) => res.send(result))
})

router.get('/topic_count', async (req, res) => {
  const analysi = await Entry.distinct('analysis')
  let topics = analysi.map((analysi) => {
    if (analysi.entitySentiment.entities) {
      // return analysi.entitySentiment.entities
      return analysi.entitySentiment.entities.map((entity) => {
        if (entity.salience < 0.15 && entity.name != 'onion') {
          return entity.name
        }
        return
      })
    }
  })

  topics = topics.flat().filter((topic) => topic)

  const topicCountMap = {}

  topics.forEach((topic) => {
    let count = topics.filter((anyTopic) => anyTopic == topic).length
    topicCountMap[topic] = count
  })

  res.send(topicCountMap)
})

export default router
