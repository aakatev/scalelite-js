# scalelite-js

JavaScript wrapper for [Scalelite API](https://github.com/blindsidenetworks/scalelite/pull/289)

## Installation

Using npm

```bash
npm install scalelite-js
```

You will also need approriate version of scalelite api. You can find it on my [GitHub](https://github.com/aakatev/scalelite/tree/develop) or [DockerHub](https://hub.docker.com/r/aakatev/scalelite).

## Usage

```javascript
const Scalelite = require('scalelite-js').ScaleliteApi

const scalelite = new Scalelite(
  process.env.SCALELITE_URL, // should be in form http://example.com/scalelite/api
  process.env.SCALELITE_SECRET
)

// Get all servers
scalelite.getServers().then((json) => {
  console.log(json.servers)
})

// Add server
scalelite.addServers('https://example.com/bigbluebutton/api', 'f3765e7f5e805c8911046ea5d2ad40ba7bea35355d56dfa3').then((json) => {
  console.log(json.server.serverID)
})
```

For more examples refer to [test](test) directory.


## Run Tests

Clone repo, install all dependencies, and run `npm run test`. It will launch mocha.