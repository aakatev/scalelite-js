'use strict'

const axios = require('axios')
const { parseXml } = require('./util')

class HttpService {
  constructor(baseUrl) {
    this.client = axios.create({ baseURL: baseUrl })
  }

  async call(url) {
    return this.client
      .get(url, {
        headers: { Accept: 'text/xml, application/json, text/plain, */*' },
      })
      .then((response) => {
        return response.data
      })
      .then(function (xml) {
        return parseXml(xml).response
      })
  }
}

module.exports = HttpService
