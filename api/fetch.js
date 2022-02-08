import { parse } from 'url'
import http from 'http'
import https from 'https'
import SocksProxyAgent from 'socks-proxy-agent'
import config from './config.js'
import util from 'util'
import { resolve } from 'path'
import bl from 'bl'

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
      console.log(response.statusCode)
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
      console.log(response.statusCode)
      resolve(response.statusCode == 418 ? false : true)
    })
  })
}
