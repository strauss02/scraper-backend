import {
  fetchHTML,
  checkPageExistence,
  getAllEntriesParsedInfo,
} from './fetching.js'
import {
  parseInfoFromEntry,
  parseButtonLinks,
  getAllEntriesURLs,
} from './parsing.js'
import config from './config.js'

getAllEntriesParsedInfo()
