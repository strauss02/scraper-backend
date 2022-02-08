import { fetchHTML, checkPageExistence } from './fetch.js'
import { parseInfoFromEntry, parseButtonLinks } from './utils.js'
import config from './config.js'

async function getAllEntriesURLs() {
  let pageNum = 0
  let urlTemplate = `${config.STRONGHOLD_URL}?page=${pageNum}`
  let entriesURLs = []
  let pageExistence = await checkPageExistence(urlTemplate)
  while (pageExistence) {
    await fetchHTML(urlTemplate)
      .then((res) => {
        const entryLinks = parseButtonLinks(res)
        entriesURLs = entriesURLs.concat(entryLinks)
        pageNum += 1
        urlTemplate = `${config.STRONGHOLD_URL}?page=${pageNum}`
      })
      .catch((err) => {
        pageExistence = false
      })
    console.log(pageNum, pageExistence, entriesURLs)
  }
  // Remove all the undefined values
  entriesURLs = entriesURLs.filter((item) => item)
  return entriesURLs
}

// const response = await fetchHTML(config.STRONGHOLD_URL)

// const testEntryURL = parseButtonLinks(response)[0]
// console.log(testEntryURL)

// const testEntry = await fetchHTML(testEntryURL)

// console.log(testEntry)

// console.log(parseInfoFromEntry(testEntry))

console.log('get urls:', await getAllEntriesURLs())
