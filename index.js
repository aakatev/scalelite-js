require('dotenv').config()

const Scalelite = require('./src/index').ScaleliteApi

const scalelite = new Scalelite(
  process.env.SCALELITE_URL,
  process.env.SCALELITE_SECRET
)

scalelite
  .getServers()
  .then((json) => {
    console.log(json)
  })
  .catch((e) => console.log(e))

// scalelite
//   .removeServer('0e1851ab-96c0-4ab0-837e-e1c8eee1d652')
//   .then((json) => {
//     console.log(json)
//   })
//   .catch((e) => console.log(e))

// scalelite
//   .addServer(
//     'https://sandbox.edduus.io/bigbluebutton/api',
//     'OHPVngYTwV7I4d0W0yyhHqtKeQwlCBepwKr24fdVRs'
//   )
//   .then((json) => {
//     console.log(json)
//   })
//   .catch((e) => console.log(e))

// scalelite
//   .addServer(
//     'http://test-install.blindsidenetworks.com/bigbluebutton/api',
//     '8cd8ef52e8e101574e400365b55e11a6'
//   )
//   .then((json) => {
//     console.log(json)
//   })
//   .catch((e) => console.log(e))
