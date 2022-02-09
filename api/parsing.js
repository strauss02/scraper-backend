import * as cheerio from 'cheerio'
import { checkPageExistence } from './fetching.js'
import config from './config.js'
import { fetchHTML } from './fetching.js'
import { IGNORED_USERNAMES } from './constants.js'

/**
 *
 * @param {string} HTML - the content of the HTML page to parse.
 * @returns
 */
export function parseButtonLinks(HTML) {
  const $ = cheerio.load(HTML)
  const buttonsNodesObject = $('.btn-success')
  const buttonsNodesArray = Object.values(buttonsNodesObject)
  const hrefs = buttonsNodesArray.map((node) => {
    if (node['attribs']) {
      return node['attribs']['href']
    }
  })
  return hrefs
}

/**
 *
 * @param {string} entry - the HTML of the entry page to parse.
 * @returns {Object} - the parsed entry represented in an object.
 */
export async function parseInfoFromEntry(entry) {
  const $ = cheerio.load(entry)
  let info = {}
  info.title = parseTitleFromHTML($)
  info.content = parseContentFromHTML($)
  info = Object.assign(info, parseAuthorAndDateFromHTML($))
  return info
}

function parseTitleFromHTML($) {
  let title = $('h4').text()
  title = title.trim()

  return title
}

function parseContentFromHTML($) {
  const contentLines = []

  $('ol')
    .find('li')
    .each(function () {
      const $li = $(this)
      contentLines.push($li.text().trim())
    })

  return contentLines.join('\n')
}

// Product requirements state anoynymous author names must be normalized to ''
function parseAuthorAndDateFromHTML($) {
  // 21  is the index of the first character after "Posted by"
  // For future use this shouldn't be hard coded, rather be calculated by a parameter.
  const trimmedInfoLine = $('[class=col-sm-6]').text().slice(21, -1)
  const authorStringEndIndex = trimmedInfoLine.indexOf(' at ')
  let author = trimmedInfoLine.slice(0, authorStringEndIndex)
  const dateStartIndex = `${author} at `.length
  const dateUncut = trimmedInfoLine.slice(dateStartIndex)
  const date = normalizeDate(dateUncut).trim()
  // This normalization is performed last becuase the actual username had been used before to determine the beggining index of the date string.
  if (IGNORED_USERNAMES.includes(author)) {
    author = ''
  }

  return { date, author }
}

export async function getAllEntriesURLs() {
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
  }
  // Remove all the undefined values
  entriesURLs = entriesURLs.filter((item) => item)
  return entriesURLs
}

function normalizeDate(date) {
  // console.log('in date normalization:' + date)
  // const date1 = date.replace(/(\r\n|\n|\r)/gm, '')
  // const date2 = date1.replaceAll('\t', '')
  // return date2
  return date
}
