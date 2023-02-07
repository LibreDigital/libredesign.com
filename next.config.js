const fs = require('fs')
module.exports = {
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    acsb: fs.readFileSync('./acsb.js').toString(),
    ga: fs.readFileSync('./ga.js').toString()
  },
  images: {
    domains: [
      'cdn-libre-assets.s3.us-west-1.amazonaws.com'
    ],
  },
}
