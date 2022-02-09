import { fetchHTML, checkPageExistence } from './fetching.js'
import {
  parseInfoFromEntry,
  parseButtonLinks,
  getAllEntriesURLs,
} from './parsing.js'
import config from './config.js'

async function getAllEntriesPromised() {
  const entriesURLs = await getAllEntriesURLs()
  const allEntriesPromised = entriesURLs.map(async (URL) => {
    const HTML = await fetchHTML(URL)
    const info = await parseInfoFromEntry(HTML)
    return info
  })

  return allEntriesPromised
}

async function getAllEntriesParsedInfo() {
  const allEntriesPromises = await getAllEntriesPromised()
  const allEntriesParsedInfo = await Promise.all(allEntriesPromises)
  console.log(allEntriesParsedInfo)
}

getAllEntriesParsedInfo()
