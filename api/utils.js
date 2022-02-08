import * as cheerio from 'cheerio'
import { children } from 'cheerio/lib/api/traversing.js'
import { innerText } from 'domutils'
import fs from 'fs'

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

export function parseInfoFromEntry(entry) {
  const $ = cheerio.load(entry)
  const info = {}
  info.title = parseTitleFromHTML($)
  info.content = parseContentFromHTML($)
  return info
}

function parseTitleFromHTML($) {
  const title = $('h4').text()
  return title
}

function parseContentFromHTML($) {
  const contentLines = []

  $('ol')
    .find('li')
    .each(function () {
      const $li = $(this)
      contentLines.push($li.text())
    })

  return contentLines.join('\n')
}
