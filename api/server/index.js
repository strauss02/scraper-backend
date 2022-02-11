import 'dotenv/config'
import language from '@google-cloud/language'

import app from './app.js'
import mongoose from 'mongoose'
import cron from 'node-cron'
import { getAllNewEntriesParsedInfo, getNewestEntryDate } from '../fetching.js'
import entry from '../db/models/entry.js'
import { addAnalysisToEntries } from '../analyzing.js'

const client = await new language.LanguageServiceClient()

await mongoose
  .connect('mongodb://localhost:27017/')
  .then((res) => console.log('connected to mongodb'))
  .catch(() => {
    console.log('problem connecting')
  })

export let newestEntryDateString = '1 Jan 1970, 00:00:00 UTC'

cron.schedule('*/2 * * * *', async () => {
  console.log('running a task every two minutes')
  const data = await getAllNewEntriesParsedInfo()
  console.log(data)
  newestEntryDateString = getNewestEntryDate(data)
  const analyzedData = await addAnalysisToEntries(data, client)
  console.log(analyzedData)

  await storeEntries(analyzedData)
})

async function storeEntries(data) {
  entry.insertMany(data, (err, res) => {
    if (err) {
      console.log('there was an error', err)
    } else {
      console.log(res)
    }
  })
}

app.listen(3001, () => {
  console.log('listening on 3001 lol')
})
