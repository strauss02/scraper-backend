import 'dotenv/config'
import language from '@google-cloud/language'
import app from './app.js'
import mongoose from 'mongoose'
import cron from 'node-cron'
import {
  getAllNewEntriesParsedInfo,
  getNewestEntryDate,
  setLatestEntryDate,
  newestEntryDateString,
} from '../fetching.js'
import entry from '../db/models/entry.js'
import { addAnalysisToEntries } from '../analyzing.js'

// Connect NLP API
const client = await new language.LanguageServiceClient()

// Connect database
await mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log('Connected successfully to MongoDB'))
  .catch((err) => {
    console.log('Connection to MongoDB failed.', err)
  })

// Cron scheme is set for 'every 2 minutes'
cron.schedule('*/2 * * * *', async () => {
  try {
    console.log('Running task scheduled for every 2 minutes')
    setLatestEntryDate()
    const data = await getAllNewEntriesParsedInfo()
    console.log(
      'All pastes scraped and parsed. This is the raw data, right after scraping and parsing: ',
      data
    )
    // Begin analysis phase
    const analyzedData = await addAnalysisToEntries(data, client)
    console.log('Data has been assigned with analysis.')
    await storeEntries(analyzedData)
    console.log('Data successfuly stored. Scraping job completed.')
    console.log(
      'Latest date is currently:',
      newestEntryDateString,
      'Type of value is:',
      typeof newestEntryDateString
    )
  } catch (error) {
    console.log(
      'Something went wrong while executing scheduled scraping task. Error:',
      error
    )
  }
})

async function storeEntries(data) {
  entry.insertMany(data, (err, res) => {
    if (err) {
      console.log('there was an error', err)
    } else {
      console.log('Entries stored in DB successfully!')
    }
  })
}

let PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server is listening on port', PORT)
})
