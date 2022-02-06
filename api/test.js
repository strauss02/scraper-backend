import fetch from 'node-fetch'
// const HttpsProxyAgent = require('https-proxy-agent')
import HttpsProxyAgent from 'https-proxy-agent'
const test = async () => {
  const proxyAgent = new HttpsProxyAgent('http://141.226.8.53:8080')
  const response = await fetch('https://httpbin.org/ip?json', {
    agent: proxyAgent,
  })
  const body = await response.text()
  console.log(body)
}

test()

// const URL =
//   'socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all'

// const response = await fetch(URL)
// const body = await response.text()

// console.log(body)
