let PORT = process.env.PORT || 3000

if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
  const envConfig = require('dotenv').config()
  if(envConfig.error) throw envConfig.error

  const expressserver = require('./server')
  const fs = require('fs')
  const path = require('path')
  var https = require('https')

  PORT = 8443
  var certOptions = {
    key: fs.readFileSync(path.resolve('server/dev-certs/server.key')),
    cert: fs.readFileSync(path.resolve('server/dev-certs/server.crt'))
  }
  var server = https.createServer(certOptions, expressserver)

  server.listen(PORT, function () {
    console.log('Listening on secure port', PORT)
  })

} else {
  console.log(process.env.NODE_ENV)
  const server = require('./server')

  server.listen(PORT, function () {
    console.log('Listening on port', PORT)
  })
}
