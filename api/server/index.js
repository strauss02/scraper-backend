import 'dotenv/config'
import language from '@google-cloud/language'

import app from './app.js'
import mongoose from 'mongoose'
import cron from 'node-cron'
import { getAllNewEntriesParsedInfo, getNewestEntryDate } from '../fetching.js'
import entry from '../db/models/entry.js'
import { addAnalysisToEntries } from '../analyzing.js'

/*************** 
MongoDB command to remove duplicates:

db.Entries.find({}, {date:1}).sort({_id:1}).forEach(function(doc){
    db.Entries.deleteOne({_id:{$gt:doc._id}, date:doc.date});
})

/*************** */

//: TODO: Add error handling.

const client = await new language.LanguageServiceClient()

await mongoose
  .connect('mongodb://localhost:27017/')
  .then((res) => console.log('connected to mongodb'))
  .catch(() => {
    console.log('problem connecting')
  })

export let newestEntryDateString = '10 Feb 2022, 21:28:42 UTC '

cron.schedule('*/1 * * * *', async () => {
  console.log('running a task every two minutes')
  //
  const latestEntry = await entry.findOne().sort({ date: -1 }).limit(1)
  console.log('latest entry', latestEntry)
  // convert to string
  const convertedDate = latestEntry['date'].toString()
  console.log('converted date', convertedDate)
  console.log(
    'this is the latest entry date: ',
    convertedDate,
    'Getting entries later than this date.'
  )
  newestEntryDateString = convertedDate
  //
  const data = await getAllNewEntriesParsedInfo()
  console.log('All pastes scraped and parsed. ')
  console.log('this is the raw data, right after scraping and parsing:', data)
  //
  // newestEntryDateString = await getNewestEntryDate(data)
  // console.log('Got latest entry date: ', newestEntryDateString)
  //
  const analyzedData = await addAnalysisToEntries(data, client)
  console.log('Data has been assigned with analysis.')
  await storeEntries(analyzedData)
  console.log('Data successfuly stored. Scraping job completed.')
  console.log(
    'latest date is currently:',
    newestEntryDateString,
    typeof newestEntryDateString
  )
})

async function storeEntries(data) {
  entry.insertMany(data, (err, res) => {
    if (err) {
      console.log('there was an error', err)
    } else {
      console.log('storage complete!')
    }
  })
}

app.listen(3001, () => {
  console.log('listening on 3001 lol')
})
