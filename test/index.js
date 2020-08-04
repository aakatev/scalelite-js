require('dotenv').config()
const assert = require('assert')
const Scalelite = require('../src/index').ScaleliteApi

const TEST_HOOKS_TIMEOUT = 6000

const scalelite = new Scalelite(
  process.env.SCALELITE_URL,
  process.env.SCALELITE_SECRET
)

describe('Test 1', () => {
  it('Get servers', () => {
    return scalelite.getServers().then((json) => {
      assert.equal(Array.isArray(json.servers), true)
    })
  })
})

describe('Test 2', () => {
  let serverId
  before(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite
      .addServer(
        'https://example.com/bigbluebutton/api',
        'fd745d448764599b07351c5ac1718c564baae4b6d45276be'
      )
      .then((json) => {
        serverId = json.server.serverID
      })
  })

  after(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite.removeServer(serverId)
  })

  it('Get Server Info', () => {
    return scalelite.getServerInfo(serverId).then((json) => {
      assert.equal(json.returncode, 'SUCCESS')
      assert.equal(json.server.serverID, serverId)
    })
  })
})

describe('Test 3', () => {
  let serverId
  before(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite
      .addServer(
        'https://example.com/bigbluebutton/api',
        'fd745d448764599b07351c5ac1718c564baae4b6d45276be'
      )
      .then((json) => {
        serverId = json.server.serverID
        return scalelite.enableServer(serverId)
      })
  })

  after(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite.removeServer(serverId)
  })

  it('Test Server Enable', () => {
    return scalelite.getServerInfo(serverId).then((json) => {
      assert.equal(json.returncode, 'SUCCESS')
      assert.equal(json.server.serverID, serverId)
      assert.equal(json.server.enabled, true)
    })
  })
})

describe('Test 4', () => {
  let serverId
  let loadMultiplier = '0.5'
  before(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite
      .addServer(
        'https://example.com/bigbluebutton/api',
        'fd745d448764599b07351c5ac1718c564baae4b6d45276be'
      )
      .then((json) => {
        serverId = json.server.serverID
        return scalelite.setLoadMultiplier(serverId, loadMultiplier)
      })
  })

  after(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite.removeServer(serverId)
  })

  it('Load Multiplier (Legal)', () => {
    return scalelite.getServerInfo(serverId).then((json) => {
      assert.equal(json.returncode, 'SUCCESS')
      assert.equal(json.server.loadMultiplier, loadMultiplier)
    })
  })
})

describe('Test 5', () => {
  let serverId
  let loadMultiplier = '-0.5'
  before(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite
      .addServer(
        'https://example.com/bigbluebutton/api',
        'fd745d448764599b07351c5ac1718c564baae4b6d45276be'
      )
      .then((json) => {
        serverId = json.server.serverID
        return scalelite.setLoadMultiplier(serverId, loadMultiplier)
      })
  })

  after(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite.removeServer(serverId)
  })

  it('Load Multiplier (Legal)', () => {
    return scalelite.getServerInfo(serverId).then((json) => {
      assert.equal(json.returncode, 'SUCCESS')
      assert.equal(json.server.loadMultiplier, loadMultiplier)
    })
  })
})

describe('Test 6', () => {
  let serverId
  let loadMultiplier = 'illegal'
  before(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite
      .addServer(
        'https://example.com/bigbluebutton/api',
        'fd745d448764599b07351c5ac1718c564baae4b6d45276be'
      )
      .then((json) => {
        serverId = json.server.serverID
        return scalelite.setLoadMultiplier(serverId, loadMultiplier)
      })
  })

  after(function () {
    this.timeout(TEST_HOOKS_TIMEOUT)
    return scalelite.removeServer(serverId)
  })

  it('Load Multiplier (Legal)', () => {
    return scalelite.getServerInfo(serverId).then((json) => {
      assert.equal(json.returncode, 'SUCCESS')
      assert.equal(Number(json.server.loadMultiplier), 1)
    })
  })
})
