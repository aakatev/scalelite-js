'use strict'

const queryString = require('query-string')
const crypto = require('hash.js')
const parser = require('fast-xml-parser')

let constructUrl = (secret, action, parameters) => {
  parameters.checksum = getChecksum(secret, action, parameters)
  return `/${action}?${encodeQueryString(parameters)}`
}

let getChecksum = (secret, action, parameters) => {
  let combination = `${action}${encodeQueryString(parameters)}${secret}`
  return getSha1(combination)
}

let getSha1 = (word) => {
  return crypto.sha1().update(word).digest('hex')
}

let encodeQueryString = (parameters) => {
  return queryString.stringify(parameters)
}

let parseXml = (xml) => {
  return parser.parse(xml)
}

module.exports = {
  constructUrl,
  getChecksum,
  getSha1,
  encodeQueryString,
  parseXml,
}
