import * as cheerio from 'cheerio'
import fs from 'fs'

/**
 *
 * @param {string} HTML - the content of the HTML page to parse.
 * @returns
 */
function parseButtonLinks(HTML) {
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
