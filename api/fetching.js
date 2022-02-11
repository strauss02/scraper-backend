import { parse } from 'url'
import http from 'http'
import https from 'https'
import SocksProxyAgent from 'socks-proxy-agent'
import bl from 'bl'
import {
  parseInfoFromEntry,
  parseButtonLinks,
  getAllEntriesURLs,
} from './parsing.js'
import config from './config.js'
import { newestEntryDateString } from './server/index.js'

export async function fetchHTML(URL) {
  const proxy = process.env.SOCKS_PROXY || 'socks5h://127.0.0.1:9050'
  console.log('Using proxy server %j', proxy)
  const endpoint = URL
  console.log('Attempting to GET %j', endpoint)
  // Prepare options for the http/s module by parsing the endpoint URL:
  let options = parse(endpoint)
  const agent = new SocksProxyAgent(proxy)
  // Here we pass the socks proxy agent to the http/s module:
  options.agent = agent
  // Depending on the endpoint's protocol, we use http or https module:
  const httpOrHttps = options.protocol === 'https:' ? https : http
  // Make an HTTP GET request:

  return new Promise((resolve, reject) => {
    httpOrHttps.get(options, (response) => {
      // response.setEncoding('utf8')
      if (response.statusCode == 418) {
        reject('page does not exist')
      }
      response.pipe(
        bl((err, data) => {
          if (err) {
            reject(err)
          }
          resolve(data.toString())
        })
      )
    })
  })
}

export function checkPageExistence(endpoint) {
  const proxy = process.env.SOCKS_PROXY || 'socks5h://127.0.0.1:9050'
  console.log('Using proxy server %j', proxy)
  console.log('Attempting to GET %j', endpoint)
  // Prepare options for the http/s module by parsing the endpoint URL:
  let options = parse(endpoint)
  const agent = new SocksProxyAgent(proxy)
  options.agent = agent

  return new Promise((resolve, reject) => {
    http.get(options, (response) => {
      resolve(response.statusCode == 418 ? false : true)
    })
  })
}

export async function getAllEntriesPromised() {
  const entriesURLs = await getAllEntriesURLs()
  let allEntriesPromised = entriesURLs.map(async (URL) => {
    const HTML = await fetchHTML(URL)
    const info = await parseInfoFromEntry(HTML)
    // Getting rid of entries older than the latest entry
    if (!isEntryNew(info, newestEntryDateString)) {
      return
    }
    return info
  })

  return allEntriesPromised
}

export async function getAllNewEntriesParsedInfo() {
  const allEntriesPromises = await getAllEntriesPromised()
  let allEntriesParsedInfo = await Promise.all(allEntriesPromises)
  allEntriesParsedInfo = allEntriesParsedInfo.filter((entry) => entry)
  return allEntriesParsedInfo
}

export async function getNewestEntryDate(entries) {
  // const latestEntry = await entry.findOne({}, { sort: { $natural: -1 } })
  // console.log('this is the latwest entry: ', latestEntry)

  return new Date(Math.max(...entries.map((entry) => new Date(entry.date))))
}

export function isEntryNew(entry, newestDate) {
  return new Date(entry.date) > new Date(newestDate) ? true : false
}
