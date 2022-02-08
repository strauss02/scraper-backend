import fetchHTML from './fetch.js'
import { parseInfoFromEntry, parseButtonLinks } from './utils.js'
import config from './config.js'

const response = await fetchHTML(config.STRONGHOLD_URL)

const testEntryURL = parseButtonLinks(response)[0]
console.log(testEntryURL)

const testEntry = await fetchHTML(testEntryURL)

// console.log(testEntry)

console.log(parseInfoFromEntry(testEntry))
