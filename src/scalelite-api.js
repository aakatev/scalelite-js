'use strict'

const HttpService = require('./http-service')
const { constructUrl } = require('./util')

class ScaleliteApi {
  constructor(baseUrl, secret) {
    this.secret = secret
    this.client = new HttpService(baseUrl)
  }

  async livenessCheck() {
    let callUrl = this.constructCall('')
    return this.client.call(callUrl)
  }

  async getServers() {
    let callUrl = this.constructCall('getServers')
    return this.client.call(callUrl).then((json) => {
      let servers = json.servers ? json.servers.server : []
      json.servers = Array.isArray(servers) ? servers : [servers]

      return json
    })
  }

  async getServerInfo(id) {
    let callUrl = this.constructCall('getServerInfo', { serverID: id })
    return this.client.call(callUrl)
  }

  async addServer(url, secret, loadMultiplier = null) {
    let callUrl = this.constructCall('addServer', {
      serverUrl: url,
      serverSecret: secret,
      loadMultiplier,
    })
    return this.client.call(callUrl)
  }

  async removeServer(id) {
    let callUrl = this.constructCall('removeServer', { serverID: id })
    return this.client.call(callUrl)
  }

  async enableServer(id) {
    let callUrl = this.constructCall('enableServer', { serverID: id })
    return this.client.call(callUrl)
  }

  async disableServer(id) {
    let callUrl = this.constructCall('disableServer', { serverID: id })
    return this.client.call(callUrl)
  }

  async setLoadMultiplier(id, loadMultiplier) {
    let callUrl = this.constructCall('setLoadMultiplier', {
      serverID: id,
      loadMultiplier,
    })
    return this.client.call(callUrl)
  }

  constructCall(action, parameters = {}) {
    return constructUrl(this.secret, action, parameters)
  }
}

module.exports = ScaleliteApi
